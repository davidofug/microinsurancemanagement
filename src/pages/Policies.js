
import { useState, useEffect } from 'react'
import { Form,Row, Col, Table, Button, Modal } from 'react-bootstrap'
import '../styles/Policies.css'

// import moment from 'moment'

// import AddClient from '../parts/AddClient'

function Policies() {

    useEffect(() => {
        document.title = 'Britam - Policies'
    }, [])

    const [ clientDetails, setClientDetails ] = useState({}) 

    // const [ referenceNo, setReferenceNo ] = useState('')
    // const [ plateNo, setPlateNo ] = useState('')
    // const [ seatingCapacity, setSeatingCapacity ] = useState('')
    // const [ ccPower, setccPower ] = useState('')
    // const [ grossWeight, setGrossWeight ] = useState('')
    // const [ category, setCategory ] = useState('')
    // const [ motorClass, setMotorClass ] = useState('')
    // const [ chasisNumber, setChasisNumber ] = useState('')
    // const [ motorMake, setMotorMake ] = useState('')
    // const [ vehicleUse, setVehicleUse ] = useState('')
    // const [ totalPremium, setTotalPremium ] = useState(0)
    // const [ policyStartDate, setPolicyStartDate ] = useState(moment())

    const [ stickers, setStickers ] = useState([
        {
            referenceNo: '',
            seatingCapacity: '',
            ccPower: '',
            grossWeight: '',
            category:'',
            motorClass:'',
            chasisNo:'',
            motorMake:'',
            vehicleUse:'',
            totalPremium:'',
            policyStartDate: ''
        }     
    ])

    const addStickerMotorDetails = () => {
        setStickers([
            ...stickers,
            {
                referenceNo: '',
                seatingCapacity: '',
                ccPower: '',
                grossWeight: '',
                category:'',
                motorClass:'',
                chasisNo:'',
                motorMake:'',
                vehicleUse:'',
                totalPremium:'',
                policyStartDate: ''
            } 
        ])
        console.log(stickers)
    }

    const removeStickerMotorDetails = (index) => {
        setStickers([...stickers].splice(index, 1))
    }


    const renderStickerDetails = (singleSticker, index) => {
        return (
            <React.Fragment key={index}>
                <div style={{display:"flex", gap: "20px"}}>
                {/* {addAnotherSticker} */}
                    <Table striped bordered>
                        <tbody> 
                            <tr>
                                <td style={{verticalAlign:"top"}}>{index + 1 > 9 ? index + 1 : `0${index+1}`}</td>
                                <td>
                                    <Form.Group controlId="referenceNo">
                                        <Form.Control type="text" placeholder="Reference No" value={singleSticker.referenceNo}/>
                                    </Form.Group>
                                </td>
                                <td>
                                    <Form.Group controlId="plateNo">
                                        <Form.Control type="text" placeholder="Plate No" value={singleSticker.plateNo}/>
                                    </Form.Group>
                                </td>
                                <td>
                                    <Form.Group controlId="seatingCapacity">
                                        <Form.Control type="text" placeholder="Seating Capacity" value={singleSticker.seatingCapacity}/>
                                    </Form.Group>
                                </td>
                                <td>
                                    <Form.Group controlId="ccPower">
                                        <Form.Control type="text" placeholder="CC Power" value={singleSticker.ccPower} />
                                    </Form.Group>
                                </td>
                            </tr>
                            <tr style={{backgroundColor:"#FFFFFF"}}>
                                <td></td>
                                <td>
                                    <Form.Group controlId="grossWeight">
                                        <Form.Control type="text" placeholder="Gross Weight" value={singleSticker.grossWeight} />
                                    </Form.Group>
                                </td>
                                <td>
                                    <Form.Group controlId="category" value={singleSticker.category}> 
                                        <Form.Select aria-label="category">
                                            <option>-Select Category-</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </Form.Select>
                                    </Form.Group>
                                </td>
                                <td>
                                    <Form.Group controlId="motorClass" value={singleSticker.motorClass}>
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
                                        <Form.Control type="text" placeholder="Chasis No" value={singleSticker.chasisNo}/>
                                    </Form.Group>
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>
                                    <Form.Group controlId="motorMake" value={singleSticker.motorMake}>
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
                                        <Form.Select aria-label="Vehicle Use" value={singleSticker.vehicleUse}>
                                            <option>Vehicle use</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </Form.Select>
                                    </Form.Group>
                                </td>
                                <td>
                                    <Form.Group controlId="totalPremium" value={singleSticker.totalPremium}>
                                        <Form.Control type="text" placeholder="Total Premium"/>
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
            </React.Fragment>           
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
