import React from 'react'

function PolicyModal() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    return (
        <>
            <Modal.Header closeButton>
                                <Modal.Title>Add New Client</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                <Form>
                        <Form.Group className="mb-3" >
                            <Form.Label>Name <span className='required'>*</span></Form.Label>
                            <Form.Control placeholder="Enter Client's name" />
                        </Form.Group>
                        <Row className="mb-3">
                            <Form.Group as={Col} className='addFormGroups'>
                                <Form.Label>Date of birth</Form.Label>
                                <Form.Control type="date" />
                            </Form.Group>
                            <Form.Group as={Col} className='addFormGroups'>
                                <Form.Label htmlFor='gender'>Gender <span className='required'>*</span></Form.Label>
                                <div className='gender-options'>
                                    <div>
                                        <input type="radio" name="gender" id="male" className='addFormRadio'/>
                                        <label htmlFor="male">Male</label>
                                    </div>
                                    <div>
                                        <input type="radio" name="gender" id="female" className='addFormRadio'/>
                                        <label htmlFor="female">Female</label>
                                    </div>
                                </div>
                            </Form.Group>
                        </Row>
                        
                        <Row className="mb-3">
                            <Form.Group as={Col} className='addFormGroups'>
                                <Form.Label htmlFor='email'>Email Address</Form.Label>
                                <Form.Control type="email" id="email" placeholder="Enter email" />
                            </Form.Group>
                            <Form.Group as={Col} className='addFormGroups'>
                                <Form.Label htmlFor='phone'>Phone Number <span className='required'>*</span></Form.Label>
                                <Form.Control type="tel" id="phone" placeholder="Enter phone number" />
                            </Form.Group>
                        </Row>
                        <Form.Group className="mb-3" >
                            <Form.Label htmlFor='address'>Address</Form.Label>
                            <Form.Control id="address" placeholder="Enter your address" />
                        </Form.Group>
                        <Form.Label htmlFor='upload'>Upload Profile photo</Form.Label>
                        <Upload />
                    <div id='submit' ><input type="submit" value="Submit" className='btn btn-primary cta submitcta' onClick={handleClose} /></div>
                    </Form>
                                </Modal.Body>
        </>
    )
}

export default PolicyModal
