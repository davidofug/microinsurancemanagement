import logo from '../../assets/imgs/britam-logo2.png'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { getDoc, collection, doc, updateDoc} from 'firebase/firestore'
import { db } from '../../helpers/firebase'
import './PolicyDetails.css'
import { currencyFormatter } from '../../helpers/currency.format'
import { Modal, Form, Col } from 'react-bootstrap'
import useDialog from '../../hooks/useDialog'

import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function PolicyDetails() {
    useEffect(() => { document.title = "Britam - Sticker Details"; getMTP(id)}, []);

    const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [editID, setEditID] = useState(null);

  const [ showPayment, handleShowPayment, handleClosePayment ] = useDialog()

    // Confirm Box
  const [ openToggleCancel, setOpenToggleCancel ] = useState(false)
  window.onclick = (event) => {
    if(openToggleCancel === true) {
      if (!event.target.matches('.wack') && !event.target.matches('#myb')) { 
        setOpenToggleCancel(false)
    }
    }
  }

  // cancel a policy
  const handleCancel = async (id) => {
    console.log("handle cancel")
}

    const { id } = useParams()  

    const [ policy, setPolicy ] = useState({})
    const policyCollectionRef = collection(db, "policies");

    const getMTP = async (id) => {
        const policyRef = doc(db, "policies", id)
        const data = await getDoc(policyRef);
        // console.log(data.data())
        setPolicy(data.data())
      }

      const handleSubmitPayment = async (event) => {

        event.preventDefault()
        handleClosePayment()
        const docRef = doc(db, "policies", id);
        await updateDoc(docRef, {
            stickersDetails: [{
                basicPremium: "",
                category: policy.stickersDetails[0].category,
                ccPower: policy.stickersDetails[0].ccPower,
                chasisNo: policy.stickersDetails[0].chasisNo,
                grossWeight: policy.stickersDetails[0].grossWeight,
                motorClass: policy.stickersDetails[0].motorClass,
                motorMake: policy.stickersDetails[0].motorMake,
                plateNo: policy.stickersDetails[0].plateNo,
                referenceNo: policy.stickersDetails[0].referenceNo,
                seatingCapacity: policy.stickersDetails[0].seatingCapacity,
                stampDuty: policy.stickersDetails[0].stampDuty,
                status: "paid",
                stickerFee: policy.stickersDetails[0].stickerFee,
                totalPremium: policy.stickersDetails[0].totalPremium,
                trainingLevy: policy.stickersDetails[0].trainingLevy,
                vat: policy.stickersDetails[0].vat,
                vehicleUse: policy.stickersDetails[0].vehicleUse

            }]
        });
        toast.success('Payment Reference successfully saved.', {position: "top-center"});
      }

      console.log(policy)

      
    
    return (
        <div style={{margin: "30px"}}>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <div>
                    <img src={logo} width={150} height="auto" alt="britam" />
                </div>
                <div id="policyDetails">
                    <p>Receipt # 12801</p>
                    <p>{policy.policyStartDate} 10:49:40 AM</p>
                    <p><b>License No:</b> C04/987</p>
                    <p><b>Company Code:</b> 5643</p>
                    {/* <span>{(policy.category).toUpperCase()}</span> */}
                </div>
            </div>


            <div className={openToggleCancel ? 'myModal is-active': 'myModal'}>
                <div className="modal__content wack">
                <h1 className='wack'>Confirm</h1>
                <p className='wack'>Are you sure you want to cancel</p>
                <div className="buttonContainer wack" >
                    <button id="yesButton" onClick={() => {
                    setOpenToggleCancel(false)
                    handleCancel(editID)
                    }} className='wack'>Yes</button>
                    <button id="noButton" onClick={() => setOpenToggleCancel(false)} className='wack'>No</button>
                </div>
                </div>
            </div>

            
            <Modal show={show} onHide={handleClose} className="hideOnPrint" >
                <Modal.Header closeButton className='hideOnPrint'>
                    <Modal.Title className='hideOnPrint'>Print Sticker #{policy.stickersDetails && policy.stickersDetails[0].referenceNo}</Modal.Title>
                </Modal.Header>
                {show &&
                    <Modal.Body id="stickerPrint">
                            <p>{policy.clientDetails.name}</p>
                            <p>9000</p>
                            <p>{policy.stickersDetails[0].plateNo} {policy.stickersDetails[0].motorMake}</p>
                            <p>{policy.stickersDetails[0].seatingCapacity}</p>
                            <p>{policy.stickersDetails[0].ccPower}</p>
                            <p>{policy.stickersDetails[0].chasisNo}</p>
                            <p>{currencyFormatter(policy.stickersDetails[0].totalPremium)} {policy.currency}</p>
                            <p>{policy.policyStartDate}</p>
                            <p>{policy.policyEndDate}</p>
                            <p>Britam Insurance Co. (U) Ltd.</p>
                            <p>{policy.added_by_name}</p>
                    </Modal.Body>
                }
                <Modal.Footer className="hideOnPrint">
                    <button className='btn btn-primary cta hideOnPrint' onClick={() => {
                        window.print()
                    }} >Print</button>
                </Modal.Footer>
            </Modal>

            <Modal show={showPayment} onHide={handleClosePayment}>
            <form onSubmit={handleSubmitPayment}>
                <Modal.Header closeButton>
                    <Modal.Title>Process with Payments</Modal.Title>
                </Modal.Header>
                <Modal.Body id="stickerPrint">
                    
                        <Form.Group as={Col} className='addFormGroups'>
                            <Form.Label htmlFor='paymentReference'>Enter Payment Reference</Form.Label>
                            <Form.Control type="text" id="paymentReference" />
                        </Form.Group>
                    
                </Modal.Body>
                <Modal.Footer className="hideOnPrint">
                    <button className='btn btn-primary cta hideOnPrint'>Submit</button>
                </Modal.Footer>
                </form>
            </Modal>

            <hr></hr>

            <div className='fromTo'>
                <div id='from'>
                    <b>Britam Insurance Co. (U) Ltd</b>
                    <p>Plot 24A Akii-Bua Rd.</p>
                    <p>Nakasero P.O.Box 36583 Kampala</p>
                    <p>Uganda</p>
                    <p>C: britamug@britam.com 0312305600</p>
                </div>
                {policy.clientDetails != undefined &&
                    <div id="to">
                        <p>To: <b>{policy.clientDetails.name}</b></p>
                        <p>Address: {policy.clientDetails.meta.address}</p>
                    </div>
                }

                {policy.policyStartDate != undefined && 
                    <div id="date">
                        <p><b>Start Date</b> {policy.policyStartDate}</p>
                        <p><b>End Date</b> {policy.policyEndDate}</p>
                    </div>
                }
            </div>

            {policy.clientDetails != undefined &&
            <>
                <table>
                    <thead>
                        <tr>
                            <th>Motor Type</th>
                            <th>Chassis No.</th>
                            <th>Plate No.</th>
                            <th>No. of seats</th>
                            <th>Power(CC)</th>
                            <th>Use</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody style={{padding: "5px"}}>
                        <tr>
                            <td>{policy.stickersDetails[0].motorMake}</td>
                            <td>{policy.stickersDetails[0].chasisNo}</td>
                            <td>{policy.stickersDetails[0].plateNo}</td>
                            <td>{policy.stickersDetails[0].seatingCapacity}</td>
                            <td>{policy.stickersDetails[0].ccPower}</td>
                            <td>{policy.stickersDetails[0].vehicleUse}</td>
                            <td>
                                {policy.stickersDetails[0].status === 'paid' &&
                                    <tr>
                                        <button className='btn btn-warning mb-2 mt-2' onClick={handleShow}>Print Sticker</button>
                                    </tr>
                                }
                                    <tr>
                                        <button className='btn btn-danger mb-2 mt-2' 
                                        onClick={() => {
                                            setOpenToggleCancel(true)
                                        }}>Cancel Sticker</button>
                                    </tr>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <b>Cost of Insurance</b>
                <hr></hr>
                <div style={{display: "flex", justifyContent: "space-between"}}><p>Total Premium:</p> <span style={{marginRight: "12rem"}}><b>{policy.currency} </b>{currencyFormatter(policy.stickersDetails[0].totalPremium)}</span></div>
                <hr></hr>
            </>
            }

            <p><span className='prepared'>Prepared by:  </span><b>{policy.added_by_name}</b></p>
            {policy.stickersDetails && policy.stickersDetails[0].status !== 'paid' && <button className='btn btn-success' onClick={handleShowPayment}>$ Proceed with Payments</button>}
        </div>
    )
}

export default PolicyDetails
