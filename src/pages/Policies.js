import { useState } from 'react'
import { Form,Row, Col, Table, Button, Modal } from 'react-bootstrap';
import '../styles/Policies.css'

import moment from 'moment'

import AddClient from '../parts/AddClient'

function Policies() {
    const [ clientDetails, setClientDetails ] = useState({}) 

    const [ referenceNo, setReferenceNo ] = useState('')
    const [ plateNo, setPlateNo ] = useState('')
    const [ seatingCapacity, setSeatingCapacity ] = useState('')
    const [ ccPower, setccPower ] = useState('')
    const [ grossWeight, setGrossWeight ] = useState('')
    const [ category, setCategory ] = useState('')
    const [ motorClass, setMotorClass ] = useState('')
    const [ chasisNumber, setChasisNumber ] = useState('')
    const [ motorMake, setMotorMake ] = useState('')
    const [ vehicleUse, setVehicleUse ] = useState('')
    const [ totalPremium, setTotalPremium ] = useState(0)
    const [ policyStartDate, setPolicyStartDate ] = useState(moment())

    const [ show, setShow ] = useState(false)

    const handleClose = () => {
        setShow(false)
    }

    const handleShow = () => {
        setShow(true)
    }


    const getExistingClient = ( name ) => { 

        // Dummy existing user data.
        // Implementation to be done based on the accessibility of the source of data and data structure implemementing the data bank.
        if(name) return (
            {
                name: 'david',
                email: 'davidderrickanyuru@gmail.com',
                nin:'CM97005509WTVG'
            }
        )
    }
    const handleSubmit = () => {

    }

    const addEmptyStickerForm = () => {
        return "boom"

    }

    return (
        <div className='components'> 
            <div>
                <h1 className='title'>Policies</h1>
                <p>MANAGINE POLICIES</p>
            </div>
            <div id="add_client_group">
                <div></div>
                <button className="btn btn-primary cta">Add policy</button>
            </div>
            <div className="table-card" style={{paddingBottom:"10vh"}}>

                <Form>
                    <div style={{paddingTop:"4vh", paddingBottom:"4vh"}}>
                        <Row style={{paddingTop:"2vh"}}>
                            <h1>
                                Client
                            </h1>    
                        </Row>
                        <Row style={{paddingBottom:"4vh"}}>
                            <Col xs="2">
                                <Form.Group className="mb-3" controlId="clientDetails">
                                    <Form.Control type="text" placeholder="Existing" onChange={event => {
                                        const existingClientDetails = getExistingClient(event.target.value)
                                        // console.log(existingClientDetails)
                                        setClientDetails(existingClientDetails)
                                    }}/>
                                </Form.Group>
                            </Col>
                            <Col xs="3">
                                <button className="btn btn-primary" onClick={ handleShow }> Add New Client </button> 
                            </Col>
                        </Row>
                    </div>
                    
                    {/*Sticker form details container.*/}
                    <div style={{display:"flex", gap: "20px"}}>
                        {/* {addAnotherSticker} */}
                        <Table striped bordered>
                            <tbody>
                                <tr>
                                    <td colspan="5">No.</td>
                                </tr>
                                <tr>
                                    <td style={{verticalAlign:"top"}}>01</td>
                                    <td>
                                        <Form.Group controlId="referenceNo">
                                            <Form.Control type="text" placeholder="Reference No" onChange={event => event.target.value}/>
                                        </Form.Group>
                                    </td>
                                    <td>
                                        <Form.Group controlId="plateNo">
                                            <Form.Control type="text" placeholder="Plate No" />
                                        </Form.Group>
                                    </td>
                                    <td>
                                        <Form.Group controlId="seatingCapacity">
                                            <Form.Control type="text" placeholder="Seating Capacity" />
                                        </Form.Group>
                                    </td>
                                    <td>
                                        <Form.Group controlId="ccPower">
                                            <Form.Control type="text" placeholder="CC Power" />
                                        </Form.Group>
                                    </td>
                                </tr>
                                <tr style={{backgroundColor:"#FFFFFF"}}>
                                    <td></td>
                                    <td>
                                        <Form.Group controlId="grossWeight">
                                            <Form.Control type="text" placeholder="Gross Weight" />
                                        </Form.Group>
                                    </td>
                                    <td>
                                        <Form.Group controlId="category"> 
                                            <Form.Select aria-label="category">
                                                <option>-Select Category-</option>
                                                <option value="1">One</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </td>
                                    <td>
                                        <Form.Group controlId="motorClass">
                                            <Form.Select aria-label="Motor Class">
                                                <option>Class</option>
                                                <option value="1">One</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </td>
                                    <td>
                                        <Form.Group controlId="chasisNo" aria-label="chasisNo">
                                            <Form.Control type="text" placeholder="Chasis No" />
                                        </Form.Group>
                                    </td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>
                                        <Form.Group controlId="motorMake">
                                            <Form.Select aria-label="Motor Make">
                                                <option>Motor make</option>
                                                <option value="1">One</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </Form.Select>
                                        </Form.Group >
                                    </td>
                                    <td>
                                        <Form.Group controlId="vehicleUse">
                                            <Form.Select aria-label="Vehicle Use">
                                                <option>Vehicle use</option>
                                                <option value="1">One</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </td>
                                    <td>
                                        <Form.Group controlId="totalPremium" >
                                            <Form.Control type="text" placeholder="Total Premium"/>
                                        </Form.Group>
                                    </td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </Table>
                        <div style={{display:"flex", flexDirection:"column", gap:"5px", justifyContent:"flex-end", paddingBottom:"40px"}}>
                            <button style={{height:"30px", width:"30px", borderRadius:"50%", backgroundColor:"#CF144C", border:"none", color:"white"}}>-</button>
                            <button style={{height:"30px", width:"30px", borderRadius:"50%", backgroundColor:"#1475CF", border:"none", color:"white"}} onClick={addEmptyStickerForm}>+</button>
                        </div>
                    </div>
                    <div>
                        <Row style={{paddingTop:"4vh", paddingBottom:"4vh"}}>
                            <Col xs="3">
                                <Form.Group controlId="policyStartDate" >
                                    <Form.Label><h5>Policy Start Date</h5></Form.Label>
                                    <Form.Control type="date" placeholder=""/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <div style={{display:"flex", justifyContent:"flex-end"}}>
                            <div>
                                <Button variant="primary" type="submit">
                                    Process 3rd Party
                                </Button>
                            </div>
                        </div>  
                    </div> 
                </Form>
            </div>
        </div>
    )
}

export default Policies
