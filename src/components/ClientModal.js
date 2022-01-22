import { Modal, Form, Row, Col, Button } from 'react-bootstrap'

function ClientModal({ singleDoc, handleClose }) {

  const modalSubmit = (event) => {
      event.preventDefault()
      console.log("submitted")
  }

    return (
        <>
        <Modal.Header closeButton>
          <Modal.Title>Edit {singleDoc.name}'s Details</Modal.Title>
        </Modal.Header>
        <Form id="update_client" onSubmit={modalSubmit}>
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
                  name=""
                  id="claimantName"
                  placeholder="Enter Client's name"
                  value={singleDoc.name}
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
                  id="dateReported"
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
                                <Form.Control type="email" id="email" placeholder="Enter email" value={singleDoc.email}/>
                            </Form.Group>
                            <Form.Group as={Col} className='addFormGroups'>
                                <Form.Label htmlFor='phone'>Phone Number <span className='required'>*</span></Form.Label>
                                <Form.Control type="tel" id="phone" placeholder="Enter phone number" value={singleDoc.meta.phone} />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                            <Form.Label htmlFor='address'>Address</Form.Label>
                            <Form.Control id="address" placeholder="Enter your address" value={singleDoc.meta.address}/>
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
