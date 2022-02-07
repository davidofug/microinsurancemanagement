import { Modal, Table, Form } from 'react-bootstrap'
import { collection, getDocs, updateDoc, doc, getDoc } from 'firebase/firestore'
import { authentication, db } from '../helpers/firebase'
import { useState, useEffect } from 'react'
import { ImFilesEmpty } from 'react-icons/im'
import Loader from './Loader';


function StickerModal({ name, user_id }) {

    useEffect(() => { getPolicies(); getStickerRange() }, [])

    const [policies, setPolicies] = useState([])
    const policyCollectionRef = collection(db, "policies");

    const getPolicies = async() => {
        const data = await getDocs(policyCollectionRef);
        const policiesArray = data.docs.map((doc) => ({ ...doc.data(), id: doc.id })).filter(policy => policy.added_by_uid === user_id)
        policiesArray.length === 0 ? setPolicies(null) : setPolicies(policiesArray)
    }

      // get sticker Numbers.
  const [stickerRange, setStickerRange] = useState([]);
  const rangesCollectionRef = collection(db, "ranges");

  const getStickerRange = async () => {
    const data = await getDocs(rangesCollectionRef)
    const rangeArray = data.docs.map((doc) => ({ ...doc.data(), id: doc.id })).filter(range => range.assignedTo === authentication.currentUser.displayName)
    rangeArray.length === 0 ? setStickerRange(null) : setStickerRange(rangeArray)
    
  }

  // submit sticker range to agent.
  const [ rangeID, setRangeID ] = useState("")
  const [ rangeDoc, setRangeDoc ] = useState("")

  const handleSubmit = async (event) => {
      event.preventDefault()

      setRangeID(stickerRange.filter(range => range.rangeFrom <= event.target.agentFrom.value && range.rangeTo >= event.target.agentTo.value).map(range => range.id)[0])

      if(rangeID !== ''){
        const docRef = doc(db, "ranges", rangeID)

        // const data = await getDoc(docRef)

        await getDoc(docRef)
            .then((result) => {const data = result.data(); return data})
            // .then((data) => console.log(data))
            .then( async (data) => {
                await updateDoc(docRef, {
                    agentAssignTo: [ ...data.agentAssignTo, {
                        agent_uid: user_id,
                        agentFrom: event.target.agentFrom.value,
                        agentTo: event.target.agentTo.value
                    }]
                }).then(() => console.log("successful"))
                    .catch(error => console.log(error))
            })

        
      } else{
            console.log("no id yet.")
      }

}

//   console.log(rangeID)
  console.log(stickerRange)

  
  

    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title> {name}'s Issued stickers</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {stickerRange.map(range => 
                    <>
                       <b>Category</b>: {range.category} <b>Range</b>: {range.rangeFrom} to {range.rangeTo} <b>Used</b>: {range.used.map(used => <span>[{used} ]</span>)} <br />
                    </>)}
                <form className='m-0' onSubmit={handleSubmit}>
                <Form.Group className="mb-3" >
                            <Form.Label htmlFor='category'>Select Sticker Range</Form.Label>
                            <Form.Select aria-label="User role" id='category' required onChange={(event) => {
                                // setRangeDoc(range)
                                setRangeID(event.target.value)
                            }}>
                                <option value={""}>--Select Sticker Range--</option>
                                {stickerRange.map(range => {
                                    return <option value={range.id}>{range.rangeFrom} - {range.rangeTo}</option>
                                })}
                                {/* <option value="">--Select Category--</option>
                                <option value="Motor Bike">Motor Bike</option>
                                <option value="Motor Transit">Motor Transit</option>
                                <option value="Motor Private">Motor Private</option>
                                <option value="Motor Commercial">Motor Commercial</option> */}
                            </Form.Select>
                        </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label htmlFor='category'>Assign Sticker Number to Agent</Form.Label>
                        <Form.Control type="text" placeholder='from' className='mb-2' id="agentFrom" required />
                        <Form.Control type="text" placeholder='to' id="agentTo" required />
                        <input type="submit" className='btn btn-primary cta mt-2' value="submit" />
                    </Form.Group>
                </form>

                <p>Stickers Issued: <b>{policies !== undefined ? policies.length : 0}</b></p>
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
