import { Modal, Form, Row, Col, Button } from 'react-bootstrap'
import { getAuth  } from "firebase/auth";
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../helpers/firebase'

import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


function ClientModal({ singleDoc, handleClose, handleFieldChange }) {

  const auth = getAuth();

  const handleEditFormSubmit = async(event) => {
    event.preventDefault()

    const docRef = doc(db, "usermeta", singleDoc.uid);
    await updateDoc(docRef, {
        address: event.target.address.value,
        phone: event.target.phone.value,
        date_of_birth: event.target.date_of_birth.value,
        licenseNo: event.target.licenseNo.value,
        NIN: event.target.NIN.value,
        gender: event.target.gender.value
    });
    toast.success('Successfully updated', {position: "top-center"});
}


console.log(singleDoc)

    return (
        <>
        <ToastContainer />
        <Modal.Header closeButton>
          <Modal.Title>Edit {singleDoc.name}'s Details</Modal.Title>
        </Modal.Header>
        <Form id="update_client" onSubmit={handleEditFormSubmit}>
          <Modal.Body>
            <Form.Group
                as={Col}
                style={{
                  display: "flex",
                  "flex-direction": "column",
                  "align-items": "start",
                }}
              >
                <Form.Label htmlFor="claimantName">Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter Client's name"
                  defaultValue={singleDoc.name}
                  onChange={handleFieldChange}
                />
              </Form.Group>
              <Row className='mb-3'>
              <Form.Group
                as={Col}
                style={{
                  display: "flex",
                  "flex-direction": "column",
                  "align-items": "start",
                }}
              >
                <Form.Label htmlFor="dateReported">Date of birth</Form.Label>
                <Form.Control
                  type="date"
                  id="date_of_birth"
                  defaultValue={singleDoc.meta.date_of_birth}
                />
              </Form.Group>
              <Form.Group as={Col} className='addFormGroups'>
                                <Form.Label htmlFor='gender' checked="male">Gender <span className='required'>*</span></Form.Label>
                                <div className='gender-options'>
                                    {singleDoc.meta.gender === "male" ? 
                                      <>
                                        <div>
                                        <input type="radio" name="gender" id="gender" value="male" className='addFormRadio' defaultChecked/>
                                            <label htmlFor="male">Male</label>
                                        </div>
                                        <div>
                                            <input type="radio" name="gender" id="gender" value="female" className='addFormRadio'/>
                                            <label htmlFor="female">Female</label>
                                        </div>
                                      </> :
                                      <>
                                        <div>
                                        <input type="radio" name="gender" id="gender" value="male" className='addFormRadio' />
                                            <label htmlFor="male">Male</label>
                                        </div>
                                        <div>
                                            <input type="radio" name="gender" id="gender" value="female" className='addFormRadio' defaultChecked/>
                                            <label htmlFor="female">Female</label>
                                        </div>
                                      </>
                                    }
                                </div>
                            </Form.Group>
                            </Row>

                            <Form.Group as={Col} className='addFormGroups'>
                                <Form.Label htmlFor='email'>Email Address</Form.Label>
                                <Form.Control type="email" id="email" placeholder="Enter email" defaultValue={singleDoc.email}/>
                            </Form.Group>

                            <Form.Group as={Col} className='addFormGroups'>
                                <Form.Label htmlFor='NIN'>NIN</Form.Label>
                                <Form.Control type="text" id="NIN" placeholder="Enter email" defaultValue={singleDoc.meta.NIN}/>
                            </Form.Group>

                            <Row>
                              <Form.Group as={Col} className='addFormGroups'>
                                  <Form.Label htmlFor='phone'>Phone Number</Form.Label>
                                  <Form.Control type="tel" id="phone" defaultValue={singleDoc.meta.phone} />
                              </Form.Group>
                              <Form.Group as={Col} className='addFormGroups'>
                                  <Form.Label htmlFor='licenseNo'>LicenseNo</Form.Label>
                                  <Form.Control type="text" id="licenseNo" defaultValue={singleDoc.meta.licenseNo} />
                              </Form.Group>
                            </Row>
                            

                            <Form.Group className="mb-3" >
                            <Form.Label htmlFor='address'>Address</Form.Label>
                            <Form.Control id="address" placeholder="Enter your address" defaultValue={singleDoc.meta.address}/>
                    </Form.Group>
            
          </Modal.Body>
          <Modal.Footer>
            <Button
                variant="primary"
                type="submit"
                onClick={() => {
                  handleClose();
                }}
                id="submit"
              >
                Submit
              </Button>
          </Modal.Footer>
        </Form>
      </>
    )
}

export default ClientModal
