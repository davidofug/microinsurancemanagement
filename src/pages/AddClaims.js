import '../assets/styles/addClients.css'
import { useEffect } from 'react'
import { Form, Row, Col } from 'react-bootstrap'

function AddClaims() {

    useEffect(() => document.title = 'Britam - Add Claims', [])

    return (
        <div className='components'>
            <header className='heading'>
                <h1 className='title'>Add Claim</h1>
                <p className="subtitle">ADD A NEW CLAIM</p>
            </header>

            <div className="table-card componentsData">  
                <form action="">
                    <Form>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridEmail" style={{"display": "flex", "flex-direction": "column", "align-items": "start"}}>
                                <Form.Label>Date Reported</Form.Label>
                                <Form.Control type="text" name="" id="" placeholder="Enter Client's name"/>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridEmail" style={{"display": "flex", "flex-direction": "column", "align-items": "start"}}>
                                <Form.Label>Policy</Form.Label>
                                <Form.Control type="text" name="" id="" placeholder="Enter Client's name"/>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridEmail" style={{"display": "flex", "flex-direction": "column", "align-items": "start"}}>
                                <Form.Label>Plate No.</Form.Label>
                                <Form.Control type="text" name="" id="" placeholder="Enter Client's name"/>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridEmail" style={{"display": "flex", "flex-direction": "column", "align-items": "start"}}>
                                <Form.Label>Sticker No.</Form.Label>
                                <Form.Control type="text" name="" id="" placeholder="Enter Client's name"/>
                            </Form.Group>
                        </Row>
                        <h3>Claimant Details</h3>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridEmail" style={{"display": "flex", "flex-direction": "column", "align-items": "start"}}>
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" name="" id="" placeholder="Enter Client's name"/>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridEmail" style={{"display": "flex", "flex-direction": "column", "align-items": "start"}}>
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control type="text" name="" id="" placeholder="Enter Client's name"/>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridEmail" style={{"display": "flex", "flex-direction": "column", "align-items": "start"}}>
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control type="text" name="" id="" placeholder="Enter Client's name"/>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridEmail" style={{"display": "flex", "flex-direction": "column", "align-items": "start"}}>
                                <Form.Label>Date of Incident</Form.Label>
                                <Form.Control type="text" name="" id="" placeholder="Enter Client's name"/>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridEmail" style={{"display": "flex", "flex-direction": "column", "align-items": "start"}}>
                                <Form.Label>Claim Estimate</Form.Label>
                                <Form.Control type="text" name="" id="" placeholder="Enter Client's name"/>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridEmail" style={{"display": "flex", "flex-direction": "column", "align-items": "start"}}>
                                
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridEmail" style={{"display": "flex", "flex-direction": "column", "align-items": "start"}}>
                                
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridEmail" style={{"display": "flex", "flex-direction": "column", "align-items": "start"}}>
                                
                            </Form.Group>
                        </Row>
                        <Form.Group as={Col} controlId="formGridEmail" style={{"display": "flex", "flex-direction": "column", "align-items": "start"}}>
                                <Form.Label>Details of Incident</Form.Label>
                                <Form.Control type="text" name="" id="" placeholder="Enter Client's name"/>
                        </Form.Group>
                        
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>upload support documents</Form.Label>
                            <Form.Control type="file" />
                        </Form.Group>
                        
                        <div id='submit' ><input type="submit" value="Submit" className='btn btn-primary cta' /></div>
                    </Form>
                </form>
            </div>
        </div>
    )
}

export default AddClaims
