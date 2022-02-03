import { Modal, Table } from 'react-bootstrap'
// import { getAuth  } from "firebase/auth";
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../helpers/firebase'
import { useState, useEffect } from 'react'
import { ImFilesEmpty } from 'react-icons/im'
import Loader from './Loader';


function StickerModal({ name, user_id }) {

    useEffect(() => {
        getPolicies()
        return () => getPolicies()
    }, [])

    const [policies, setPolicies] = useState([])
    const policyCollectionRef = collection(db, "policies");

    const getPolicies = async() => {
        const data = await getDocs(policyCollectionRef);
        setPolicies(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        // const policiesArray = (data.docs.map((doc) => ({ ...doc.data(), id: doc.id })).filter(policy => policy.added_by_uid === user_id))
        // policiesArray.length === 0 ? setPolicies(null) : setPolicies(policiesArray)
    }


    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title> Agent {name} Issued stickers</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {policies !== null && policies.length > 0
                ?
                    <Table responsive hover striped>
                        <thead>
                            <tr>
                                <th>Client</th><th>StickerNo.</th><th>Start Date</th><th>End Date</th><th>No.Plate</th><th>Commission</th>
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
                        <p>{name} has no added stickers yet</p>
                    </div>
                    :
                    <Loader />
                }
            </Modal.Body>
        </>
    )
}

export default StickerModal
