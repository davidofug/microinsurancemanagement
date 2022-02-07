import { Modal, Form, Row, Col, Button, Table } from 'react-bootstrap'
import { getAuth  } from "firebase/auth";
import { collection, getDocs } from 'firebase/firestore'
import { useState, useEffect } from 'react'
import { ImFilesEmpty } from 'react-icons/im'
import Loader from './Loader';
import { httpsCallable } from 'firebase/functions';
import { db, functions, authentication } from '../helpers/firebase'


function SupervisorDetails({ name, user_id }) {

    useEffect(() => {
        getPolicies()
        getStickerRange()
    }, [])

    const [policies, setPolicies] = useState([])
    const [ agents, setAgents ] = useState([])
    const policyCollectionRef = collection(db, "policies");

    const getPolicies = async() => {
        const data = await getDocs(policyCollectionRef);
        const policiesArray = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))

        const listUsers = httpsCallable(functions, 'listUsers')
        
        listUsers().then(({data}) => {
            const myAgents = data.filter(user => user.role.agent).filter(agent => agent.meta.added_by_uid === user_id)
            const myAgentsID = myAgents.map(agentuid => agentuid.uid)
            const usersUnderSupervisor = [ ...myAgentsID, user_id ]

            myAgents.length === 0 ? setAgents(null) : setAgents(myAgents)
            const supervisorMtpPolicies = policiesArray.filter(policy => usersUnderSupervisor.includes(policy.added_by_uid))
            supervisorMtpPolicies.length === 0 ? setPolicies(null) : setPolicies(supervisorMtpPolicies)
        })
    }

    // get sticker Numbers.
  const [stickerRange, setStickerRange] = useState([]);
  const rangesCollectionRef = collection(db, "ranges");

  const getStickerRange = async () => {
    const data = await getDocs(rangesCollectionRef)
    const rangeArray = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    rangeArray.length === 0 ? setStickerRange(null) : setStickerRange(rangeArray)
    
  }

  console.log(stickerRange.filter(range => range.assignedTo === 'Charles Kasasira'))

    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>{name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {stickerRange.filter(range => range.assignedTo === name).map(range => 
                    <>
                       <b>Range :</b> {range.rangeFrom} - {range.rangeTo}<br />
                    </>
                )}
                <br />
                <h6>Stickers Sold Under {name}</h6>


                {policies !== null && policies.length > 0
                ?
                    <Table responsive hover striped>
                        <thead>
                            <tr>
                                <th>Client</th><th>StickerNo.</th><th>Start Date</th><th>End Date</th><th>No.Plate</th><th>Total Valuation</th><th>Commission</th><th>Status</th><th>Added by</th>
                            </tr>
                        </thead>
                        <tbody>
                            {policies.map(policy => (
                                <tr>
                                    <td>{policy.clientDetails && policy.clientDetails.name}</td>
                                    <td>{policy.clientDetails && policy.clientDetails.name}</td>
                                    <td>{policy.clientDetails && policy.policyStartDate}</td>
                                    <td>{policy.clientDetails && policy.policyEndDate}</td>
                                    <td>{policy.stickersDetails && policy.stickersDetails[0].plateNo}</td>
                                    <td>{policy.totalValuation}</td>
                                    <td>2,191</td>
                                    <td>
                                        {policy.stickersDetails && policy.stickersDetails[0].status === 'new'  && 
                                            <span
                                                style={{backgroundColor: "#337ab7", padding: ".4em .6em", borderRadius: ".25em", color: "#fff", fontSize: "85%"}}
                                            >{policy.stickersDetails[0].status}</span>
                                        }
                                        {policy.stickersDetails && policy.stickersDetails[0].status === 'paid'  && 
                                            <span
                                                style={{backgroundColor: "#3EC089", padding: ".4em .6em", borderRadius: ".25em", color: "#fff", fontSize: "85%"}}
                                            >paid</span>
                                        }
                                        {policy.stickersDetails && policy.stickersDetails[0].status === 'renewed'  && 
                                            <span
                                                style={{backgroundColor: "#337ab7", padding: ".4em .6em", borderRadius: ".25em", color: "#fff", fontSize: "85%"}}
                                            >{policy.stickersDetails[0].status}</span>
                                        }
                                        {policy.stickersDetails && policy.stickersDetails[0].status === 'cancelled'  && 
                                            <span
                                                style={{backgroundColor: "#ffc107", padding: ".4em .6em", borderRadius: ".25em", color: "#fff", fontSize: "85%"}}
                                            >{policy.stickersDetails[0].status}</span>
                                        }
                                        {policy.stickersDetails && policy.stickersDetails[0].status === 'expired'  && 
                                            <span
                                                style={{backgroundColor: "#dc3545", padding: ".4em .6em", borderRadius: ".25em", color: "#fff", fontSize: "85%"}}
                                            >{policy.stickersDetails[0].status}</span>
                                        }
                                    </td>
                                    <td>{policy.added_by_name}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th colSpan={2}>Grand Totals</th><th></th><th></th><th></th><th></th><th></th><th></th><th></th>
                            </tr>
                        </tfoot>
                    </Table>
                :
                    policies === null
                    ?
                    <div className="no-table-data">
                        <i><ImFilesEmpty /></i>
                        <h4>No stickers yet</h4>
                        <p>{name} has no stickers yet</p>
                    </div>
                    :
                    <Loader />
                }

                <div className='mt-3'>
                    <h6>Agents under {name}</h6>

                    {agents !== null && agents.length > 0
                ?
                    <Table responsive hover striped>
                        <thead>
                            <tr>
                                <th>Name</th><th>Email</th><th>Category</th><th>Gender</th><th>Contact</th><th>Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            {agents.map(agent => (
                                <tr>
                                    <td>{agent.name}</td>
                                    <td>{agent.email}</td>
                                    <td>
                                        {agent.role.mtp && <div>MTP</div>}
                                        {agent.role.comprehensive && <div>Comprehensive</div>}
                                        {agent.role.windscreen && <div>Windscreen</div>}
                                        {agent.role.newImport && <div>New Import</div>}
                                        {agent.role.transit && <div>Transit</div>}
                                    </td>
                                    <td>{agent.meta.gender}</td>
                                    <td>{agent.meta.phone}</td>
                                    <td>{agent.meta.address}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                :
                    policies === null
                    ?
                    <div className="no-table-data">
                        <i><ImFilesEmpty /></i>
                        <h4>No agents yet</h4>
                        <p>{name} has no agents yet</p>
                    </div>
                    :
                    <Loader />
                }
                </div>
                
            </Modal.Body>
        </>
    )
}

export default SupervisorDetails
