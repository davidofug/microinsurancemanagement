
import React, { useState, useEffect } from 'react'
import { Form,Row, Col, Table, Button, Modal } from 'react-bootstrap'
import { useForm } from '../hooks/useForm'

import '../styles/Policies.css'


// import moment from 'moment'

// import AddClient from '../parts/AddClient'

function Policies() {
    const [field, handleFieldChange] = useForm({})
    

    useEffect(() => {
        document.title = 'Britam - Policies'
    }, [])

    
    const [ clientDetails, setClientDetails ] = useState({}) 

    const [ stickers, setStickers ] = useState([
        {
            referenceNo:'',
            plateNo:'',
            seatingCapacity:'',
            ccPower:'',
            grossWeight:'',
            category:'', 
            motorClass:'',
            chasisNo:'',
            motorMake:'',
            vehicleUse:'',
            totalPremium:''
        }
    ])

    const handleInputChange = (index, event) => {
        const values = [...stickers]
        values[index][event.target.name] = event.target.value
        // console.log(event.name, event.target.value)
        setStickers(values)
    }

    const addStickerMotorDetails = () => {
        setStickers([
            ...stickers,
            {
                referenceNo:'',
                plateNo:'',
                seatingCapacity:'',
                ccPower:'',
                grossWeight:'',
                category:'', 
                motorClass:'',
                chasisNo:'',
                motorMake:'',
                vehicleUse:'',
                totalPremium:''
            }
        ])
        // console.log(stickers)
    }

    const removeStickerMotorDetails = (index) => {
        if(stickers.length > 1){
            const stickersDetails = [...stickers]
            stickersDetails.splice(index, 1)
            setStickers(stickersDetails)
        }
        return
        // const filteredStickers = stickers.filter(sticker => sticker !== stickers[index])
        // setStickers(filteredStickers)
    }


    const renderStickerDetails = (singleSticker, index) => {
        return (
            
            <div style={{display:"flex", gap: "20px"}} key={index}>
            {/* {addAnotherSticker} */}
                <Table striped bordered>
                    <tbody> 
                        <tr>
                            <td style={{verticalAlign:"top"}}>{index + 1 > 9 ? index + 1 : `0${index+1}`}</td>
                            <td>
                                <Form.Group controlId="referenceNo">
                                    <Form.Control type="text" name="referenceNo" placeholder="Reference No" value={singleSticker.referenceNo} onChange={event => handleInputChange(index, event)}/>
                                </Form.Group>
                            </td>
                            <td>
                                <Form.Group controlId="plateNo">
                                    <Form.Control type="text" name="plateNo" placeholder="Plate No" value={singleSticker.plateNo} onChange={event => handleInputChange(index, event)}/>
                                </Form.Group>
                            </td>
                            <td>
                                <Form.Group controlId="seatingCapacity">
                                    <Form.Control type="text" name="seatingCapacity" placeholder="Seating Capacity" value={singleSticker.seatingCapacity} onChange={event => handleInputChange(index, event)}/>
                                </Form.Group>
                            </td>
                            <td>
                                <Form.Group controlId="ccPower">
                                    <Form.Control type="text" name="ccPower" placeholder="CC Power" value={singleSticker.ccPower} onChange={event => handleInputChange(index, event)}/>
                                </Form.Group>
                            </td>
                        </tr>
                        <tr style={{backgroundColor:"#FFFFFF"}}>
                            <td></td>
                            <td>
                                <Form.Group controlId="grossWeight">
                                    <Form.Control type="text" name="grossWeight" placeholder="Gross Weight" value={singleSticker.grossWeight} onChange={event => handleInputChange(index, event)} />
                                </Form.Group>
                            </td>
                            <td>
                                <Form.Group controlId="category" > 
                                    <Form.Select type="text" name="category" aria-label="category" value={singleSticker.category} onChange={event => handleInputChange(index, event)}>
                                        <option>-Select Category-</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </Form.Select>
                                </Form.Group>
                            </td>
                            <td>
                                <Form.Group controlId="motorClass" >
                                    <Form.Select type="text" name="motorClass" aria-label="Motor Class" value={singleSticker.motorClass} onChange={event => handleInputChange(index, event)}>
                                        <option>Class</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </Form.Select>
                                </Form.Group>
                            </td>
                            <td>
                                <Form.Group controlId="chasisNo" aria-label="chasisNo">
                                    <Form.Control type="text" name="chasisNo" placeholder="Chasis No" value={singleSticker.chasisNo} onChange={event => handleInputChange(index, event)}/>
                                </Form.Group>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                <Form.Group controlId="motorMake" value={singleSticker.motorMake}>
                                    <Form.Select type="text" name="motorMake" aria-label="Motor Make" onChange={event => handleInputChange(index, event)}>
                                        <option>Motor make</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </Form.Select>
                                </Form.Group >
                            </td>
                            <td>
                                <Form.Group controlId="vehicleUse">
                                    <Form.Select type="text" name="vehicleUse" aria-label="Vehicle Use" value={singleSticker.vehicleUse} onChange={event => handleInputChange(index, event)}>
                                        <option>Vehicle use</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </Form.Select>
                                </Form.Group>
                            </td>
                            <td>
                                <Form.Group controlId="totalPremium" >
                                    <Form.Control type="text" name="totalPremium" placeholder="Total Premium" value={singleSticker.totalPremium} onChange={event => handleInputChange(index, event)} />
                                </Form.Group>
                            </td>
                            <td></td>
                        </tr>
                    </tbody>
                </Table>
                <div style={{display:"flex", flexDirection:"column", gap:"5px", justifyContent:"flex-end", paddingBottom:"40px"}}>
                    <button style={{height:"30px", width:"30px", borderRadius:"50%", backgroundColor:"#CF144C", border:"none", color:"white"}}
                        onClick={() => removeStickerMotorDetails(index)}
                        type="button"
                    >-</button>
                    <button style={{height:"30px", width:"30px", borderRadius:"50%", backgroundColor:"#1475CF", border:"none", color:"white"}} 
                        onClick={() => addStickerMotorDetails()}
                        type="button"
                    >+</button>
                </div>
            </div>          
        )
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
    // const handleSubmit = () => {

    // }

    

    return (
        <div className='components'> 
            <div>
                <h1 className='title'>Policies</h1>
                <p>MANAGING POLICIES</p>
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
                                <button className="btn btn-primary"> Add New Client </button> 
                            </Col>
                        </Row>
                    </div>
                    
                    {/*Sticker form details container.*/}
                    {stickers.map(renderStickerDetails)}
                    
                    
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
                                <Button variant="primary" type="submit" >
                                    Process 3rd Party
                                </Button>
                            </div>
                        </div>
                        {console.log(stickers)}  
                    </div> 
                </Form>
            </div>
        </div>
    )
}

export default Policies
