import generatedData from '../../helpers/generatedClients';
import '../../assets/styles/addClients.css'
import { useEffect } from 'react'
import { Form, Row, Col } from 'react-bootstrap'

function AddSupervisors() {

    useEffect(() => {
        document.title = 'Britam - Add Supervisors'
    }, [])

    return (
        <div className='components'>
            <div className='heading'>
                <h1 className='title'>Add Supervisors</h1>
                <p className="subtitle">ADD A NEW Supervisors</p>
            </div>

            <div class="componentsData" style={{"display": "flex", justifyContent: "center", "background-color": "#fff", "margin-top": "60px", "border-radius": "10px"}}>
                <form action="">
                <Form>
                        <Form.Group className="mb-3" controlId="formGridAddress1">
                            <Form.Label>Name</Form.Label>
                            <Form.Control placeholder="Enter name" />
                        </Form.Group>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridEmail" style={{"display": "flex", "flex-direction": "column", "align-items": "start"}}>
                                <Form.Label>Date of birth</Form.Label>
                                <Form.Control type="date" />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridEmail" style={{"display": "flex", "flex-direction": "column", "align-items": "start"}}>
                                <Form.Label>Gender</Form.Label>
                                <div style={{"display": "flex", "gap": "10px"}}>
                                    <div>
                                        <input type="radio" name="gender" id="" style={{"margin-right": "5px"}}/>
                                        <label htmlFor="gender">Male</label>
                                    </div>
                                    <div>
                                        <input type="radio" name="gender" id="" style={{"margin-right": "5px"}}/>
                                        <label htmlFor="gender">Female</label>
                                    </div>
                                </div>
                            </Form.Group>
                        </Row>
                        
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridEmail" style={{"display": "flex", "flex-direction": "column", "align-items": "start"}}>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridEmail" style={{"display": "flex", "flex-direction": "column", "align-items": "start"}}>
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control type="tel" placeholder="Enter phone number" />
                            </Form.Group>
                        </Row>
                        <Form.Group className="mb-3" controlId="formGridAddress1">
                            <Form.Label>Address</Form.Label>
                            <Form.Control placeholder="Enter your address" />
                        </Form.Group>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>upload profile image</Form.Label>
                            <Form.Control type="file" />
                        </Form.Group>
                    <div id='submit' ><input type="submit" value="Submit" className='btn btn-primary cta' /></div>
                    </Form>
                </form>
            </div>
        </div>
    )
}

export default AddSupervisors
