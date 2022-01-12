import { Form, Row } from 'react-bootstrap'
import useForm from '../../hooks/useForm'
// import { useState } from 'react'


function AddClient() {
    const [ newClient, handleClientDetails ] = useForm({
        name: '',
        DOB: '',
        gender: '',
        email: '',
        phone_number: '',
        address: ''
    }) 

    return (
        <Form>
            <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control placeholder="Enter name" value={newClient.name} id="name" onChange={handleClientDetails}/>
            </Form.Group>
            <Row className="mb-3">
                <Form.Group as={Col} style={{"display": "flex", "flex-direction": "column", "align-items": "start"}}>
                    <Form.Label>Date of birth</Form.Label>
                    <Form.Control type="date" id="DOB" value={newClient.DOB} onChange={handleClientDetails}/>
                </Form.Group>
                <Form.Group as={Col} style={{"display": "flex", "flex-direction": "column", "align-items": "start"}}>
                    <Form.Label>Gender</Form.Label>
                    <div style={{"display": "flex", "gap": "10px"}}>
                        <div style={{display: "flex"}}>
                            <input type="radio" name="gender" id="gender" style={{"margin-right": "5px"}} value="male" onChange={handleClientDetails}/>
                            <label htmlFor="gender">Male</label>
                        </div>
                        <div style={{display: "flex"}}>
                            <input type="radio" name="gender" id="gender" style={{"margin-right": "5px"}} value="female"onChange={handleClientDetails}/>
                            <label htmlFor="gender">Female</label>
                        </div>
                    </div>
                </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group as={Col} style={{"display": "flex", "flex-direction": "column", "align-items": "start"}}>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={newClient.email} id="email"  onChange={handleClientDetails}/>
                </Form.Group>
                <Form.Group as={Col} style={{"display": "flex", "flex-direction": "column", "align-items": "start"}}>
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="tel" placeholder="Enter phone number" value={newClient.phone_number} id="phone_number" onChange={handleClientDetails}/>
                </Form.Group>
            </Row>
            <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control placeholder="Enter your address" id="address" value={newClient.address} onChange={handleClientDetails}/>
            </Form.Group>
        </Form>   
    )
}

export default AddClient
