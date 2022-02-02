import { Modal, Form, Row, Col, Button, Table } from 'react-bootstrap'
import { getAuth  } from "firebase/auth";
import { collection, getDocs } from 'firebase/firestore'
import { useState, useEffect } from 'react'
import { ImFilesEmpty } from 'react-icons/im'
import Loader from './Loader';
import { httpsCallable } from 'firebase/functions';
import { db, functions } from '../helpers/firebase'


function SupervisorDetails({ name, user_id }) {

    useEffect(() => {
        getPolicies()
    }, [])

    const [policies, setPolicies] = useState([])
    const policyCollectionRef = collection(db, "policies");

    const getPolicies = async() => {
        const data = await getDocs(policyCollectionRef);
        const policiesArray = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))

        const listUsers = httpsCallable(functions, 'listUsers')
        
        listUsers().then(({data}) => {
            const myAgents = data.filter(user => user.role.agent).filter(agent => agent.meta.added_by_uid === user_id).map(agentuid => agentuid.uid)
            
            const usersUnderSupervisor = [ ...myAgents, user_id ]

            const supervisorMtpPolicies = policiesArray.filter(policy => usersUnderSupervisor.includes(policy.added_by_uid))
            supervisorMtpPolicies.length === 0 ? setPolicies(null) : setPolicies(supervisorMtpPolicies)
        })
    }


    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>{name}'s Issued stickers</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {policies !== null && policies.length > 0
                ?
                    <Table responsive hover striped>
                        <thead>
                            <tr>
                                <th>Client</th><th>StickerNo.</th><th>Start Date</th><th>End Date</th><th>No.Plate</th><th>Commission</th><th>Status</th><th>Added by</th>
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
            </Modal.Body>
        </>
    )
}

export default SupervisorDetails
