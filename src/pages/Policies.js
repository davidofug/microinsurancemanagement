
import React, { useState, useEffect } from 'react'
import { httpsCallable } from 'firebase/functions'
import { functions } from '../helpers/firebase'

import { Form,Row, Col, Table, Button, Modal } from 'react-bootstrap'
import { useForm } from '../hooks/useForm'
import dynamicFields from '../helpers/multipleChoice'
// import Header from '../parts/header/Header'
import '../styles/Policies.css'
import moment from 'moment'
import { db } from '../helpers/firebase'
import { collection, addDoc } from 'firebase/firestore'
import { authentication } from '../helpers/firebase'


// import AddClient from '../parts/AddClient'
// enlarging the size of + and -

function Policies() {
    const listUsers = httpsCallable(functions,'listUsers')
 
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [ existingClient, setExistingClient ] = useState(null)
    const [ existingCustomers, setExistingCustomers ] = useState([])
    const [ classes, setClasses ] = useState([])
    const [ vehicleUses, setVehicleUses ] = useState([])
    const [ policyStartDate, setPolicyStartDate ] = useState(null)
    const [ policyEndDate, setPolicyEndDate ] = useState(null)
    const [ currency, setCurrency ] = useState({})
    const [ suggestions, setSuggestions ] = useState([])
    
    // const [users, setUsers] = useState(null)
    const [ newClient, handleClientDetails] = useForm({
        name:'',
        DOB:'',
        gender:'',
        email:'',
        phone_number:'',
        address:''
    })

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
    
    const { currencies, make, categories } = dynamicFields
    let date = moment().format("l")

    useEffect(() => {
        document.title = 'Britam - Policies'

        listUsers().then(({data}) => {
            setExistingCustomers(data.filter(user => user?.role?.Customer))
            // console.log(data.filter(user => user?.role?.Customer))
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    const handleInputChange = (index, event) => {
        const values = [...stickers]
        values[index][event.target.name] = event.target.value                                        
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
    }

    const removeStickerMotorDetails = (index) => {
        if(stickers.length > 1){
            const stickersDetails = [...stickers]
            stickersDetails.splice(index, 1)
            setStickers(stickersDetails)
        }
        return
    }

    // firebase collections
    const policiesRef = collection(db, "policies")
    const clientsRef = collection(db, "clients")

    //createPolicies
    const createPolicies = async(event) => {
        event.preventDefault()
        await addDoc(policiesRef, {
            currency,
            stickersDetails: stickers,
            clientDetails: existingClient?.name ? existingClient : newClient,
            uid: authentication.currentUser.uid
        })
    }

    //createClients
    const createClient = async(event) => {
        event.preventDefault()
        await addDoc(clientsRef, {
            clientDetails,
            uid: authentication.currentUser.uid
        })
    }
    

    const renderStickerDetails = (singleSticker, index) => {
        return (
            <React.Fragment key={index}>
                <tr className="table-row">
                    <td className="sticker-number" style={{verticalAlign:"middle", paddingLeft:"1vw", paddingRight:"1vw"}}>{index + 1 > 9 ? index + 1 : `0${index+1}`}</td>
                    <td className="first-cell" style={{paddingLeft:"1vh", paddingRight:"1vh"}}>
                        <div style={{display:"flex", flexDirection:"column", gap:"2vh"}}>
                            <div>
                                <Form.Group controlId="referenceNo">
                                    <Form.Control type="text" name="referenceNo" placeholder="Reference No" value={singleSticker.referenceNo} onChange={event => handleInputChange(index, event)}/>
                                </Form.Group>
                            </div>
                            <div>
                                <Form.Group controlId="grossWeight">
                                    <Form.Control type="text" name="grossWeight" placeholder="Gross Weight" value={singleSticker.grossWeight} onChange={event => handleInputChange(index, event)} />
                                </Form.Group>
                            </div>
                            <div>
                                <Form.Group controlId="motorMake" value={singleSticker.motorMake}>
                                    <Form.Select type="text" name="motorMake" aria-label="Motor Make" onChange={event => handleInputChange(index, event)}>
                                        <option>Motor Make</option>
                                        {make.map((motorMake, index) => <option key={index} value={motorMake[0]}>{motorMake[1]}</option>)}
                                    </Form.Select>
                                </Form.Group >
                            </div>
                        </div>
                    </td>
                    <td className="second-cell"style={{paddingLeft:"1vh", paddingRight:"1vh"}}>
                        <div style={{display:"flex", flexDirection:"column", gap:"2vh"}}>
                            <div>
                                <Form.Group controlId="plateNo">
                                    <Form.Control type="text" name="plateNo" placeholder="Plate No" value={singleSticker.plateNo} onChange={event => handleInputChange(index, event)}/>
                                </Form.Group>
                            </div>
                            <div>
                                <Form.Group controlId="category" >
                                    <Form.Select type="text" name="category" aria-label="category" value={singleSticker.category} onChange={event => {
                                        handleInputChange(index, event)

                                        const result = categories.filter(category => category.label === event.target.value)
                                        const [ category ] = result
                                        // eslint-disable-next-line no-lone-blocks
                                        console.log(date)

                                        if(category?.classes?.length > 0) {
                                            const [ {classes} ] = result
                                            setClasses(classes)
                                        } else {
                                            setClasses([])
                                        }

                                        if(category?.vehicle_use?.length > 0) {
                                            const [{ vehicle_use }] = result
                                            setVehicleUses(vehicle_use)
                                        } else {
                                            setVehicleUses([])
                                        }

                                    }}>
                                        <option>-Select Category-</option>
                                        {categories.map((category, index) => <option key={index} value={category["label"]}>{category["label"]}</option>)}
                                    </Form.Select>
                                </Form.Group>
                            </div>
                            <div>
                                <Form.Group controlId="vehicleUse">
                                    <Form.Select type="text" name="vehicleUse" aria-label="Vehicle Use" value={singleSticker.vehicleUse} onChange={event => handleInputChange(index, event)}>
                                        <option>Vehicle use</option>
                                        {vehicleUses.map((item, index) => <option key={index} value={item}>{item}</option>)}
                                    </Form.Select>
                                </Form.Group>
                            </div>
                        </div>
                    </td>
                    <td className="third-cell" style={{paddingLeft:"1vh", paddingRight:"1vh"}}>
                        <div style={{display:"flex", flexDirection:"column", gap:"2vh"}}>
                            <div>
                                <Form.Group controlId="seatingCapacity">
                                    <Form.Control type="text" name="seatingCapacity" placeholder="Seating Capacity" value={singleSticker.seatingCapacity} onChange={event => handleInputChange(index, event)}/>
                                </Form.Group>
                            </div>
                            <div>
                                <Form.Group controlId="motorClass" >
                                    <Form.Select type="text" name="motorClass" aria-label="Motor Class" value={singleSticker.motorClass} onChange={event => handleInputChange(index, event)}>
                                        <option>Class</option>
                                        {classes.map((item, index) => <option key={index} value={item}>{item}</option>)}
                                    </Form.Select>
                                </Form.Group>
                            </div>
                            <div>
                                <Form.Group controlId="totalPremium" >
                                    <Form.Control type="text" name="totalPremium" placeholder="Total Premium" value={singleSticker.totalPremium} onChange={event => handleInputChange(index, event)} />
                                </Form.Group>
                            </div>
                        </div>
                    </td>
                    <td className="fourth-cell" style={{verticalAlign:"top", paddingLeft:"1vh", paddingRight:"1vh"}}>
                        <div style={{display:"flex", flexDirection:"column", gap:"2vh"}}>
                            <div>
                                <Form.Group controlId="ccPower">
                                    <Form.Control type="text" name="ccPower" placeholder="CC Power" value={singleSticker.ccPower} onChange={event => handleInputChange(index, event)}/>
                                </Form.Group>
                            </div>
                            <div>
                                <Form.Group controlId="chasisNo" aria-label="chasisNo">
                                    <Form.Control type="text" name="chasisNo" placeholder="Chasis No" value={singleSticker.chasisNo} onChange={event => handleInputChange(index, event)}/>
                                </Form.Group>
                            </div>
                            <div>

                            </div>
                        </div>
                    </td>
                    <td id="form-buttons" className="fifth-cell" style={{paddingLeft:"1vh", paddingRight:"1vh", verticalAlign:"middle"}}>
                        <div className="form-buttons">
                            <div>
                                <button style={{height:"30px", width:"30px", borderRadius:"50%", backgroundColor:"#CF144C", border:"none", color:"white"}}
                                    onClick={() => removeStickerMotorDetails(index)}
                                    type="button"
                                >-</button>
                            </div>
                            <div>
                                <button style={{height:"30px", width:"30px", borderRadius:"50%", backgroundColor:"#1475CF", border:"none", color:"white"}}
                                    onClick={() => addStickerMotorDetails()}
                                    type="button"
                                >+</button>
                            </div>
                        </div>
                    </td>
                </tr>
            </React.Fragment>
        )
    }

    const getExistingClient = ( text ) => { 
            if(existingCustomers !== null) {
                // console.log(existingCustomers)
                let matches = existingCustomers.filter(customer => {
                    const regex = new RegExp(`${text}`, "gi") 
                    return customer.email.match(regex) || customer.name.match(regex)
                })
                // console.log(matches)
                setSuggestions(matches)
                setExistingClient(text)
            }    

    }
    // const handleSubmit = () => 

    // }
    const suggestionHandler = (text) => {
        setSuggestions([])
        setExistingClient(text)
    }



    return (
        <div className='components'>
            <div className='heading'>
                <h1 className='title'>Policies</h1>
                <p>MANAGING POLICIES</p>
            </div>
            <div className="table-card componentsData" style={{paddingBottom:"10vh"}}>
                <Form onSubmit={createPolicies}>
                    <div style={{paddingTop:"4vh", paddingBottom:"4vh"}}>
                        <Row style={{paddingTop:"2vh"}}>
                            <h1>
                                Client
                            </h1>
                        </Row>
                        <Row style={{gap:"2vw"}}>
                            <Col className="client-details" style={{display:"flex", justifyContent:"flex-start"}}>
                                <Form.Group className="mb-3" controlId="clientDetails">
                                    <Form.Control type="text" placeholder="Existing" value={ existingClient?.name } onChange={event => {
                                        const existingClient = getExistingClient(event.target.value)
                                        setClientDetails(existingClient)
                                    }}/>
                                </Form.Group>
                            </Col>
                            {
                                suggestions?.length > 0 && 
                                    <Row>
                                        {
                                            suggestions.map((suggestion, index) => <div key={index} onClick={() => {
                                                suggestionHandler(suggestion)
                                                // console.log(suggestion)
                                            }}>{suggestion.name}</div>)
                                        }
                                    </Row>
                                
                            }
                            <Col className="add-new-client" style={{display:"flex", justifyContent:"flex-end"}}>
                                <button className="new-client-cta  sm btn-primary" variant="primary" type="button" onClick={handleShow}> Add New Client </button>
                            </Col>
                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                <Modal.Title>Add New Client</Modal.Title>
                                </Modal.Header>
                                <Form onSubmit={createClient}>
                                    <Modal.Body>
                                        <Form.Group className="mb-3" controlId="name">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control placeholder="Enter name" id="name" onChange={handleClientDetails}/>
                                        </Form.Group>
                                        <Row className="mb-3">
                                            <Form.Group as={Col} controlId="email" style={{"display": "flex", "flex-direction": "column", "align-items": "start"}}>
                                                <Form.Label>Date of birth</Form.Label>
                                                <Form.Control type="date" id="DOB" onChange={handleClientDetails}/>
                                            </Form.Group>
                                            <Form.Group as={Col} controlId="formGridEmail" style={{"display": "flex", "flex-direction": "column", "align-items": "start"}}>
                                                <Form.Label>Gender</Form.Label>
                                                {/* <div style={{"display": "flex", "gap": "10px"}}>
                                                    <div>
                                                        <input type="radio" name="gender" id="gender" style={{"margin-right": "5px"}} onChange={handleFieldChange}/>
                                                        <label htmlFor="gender">Male</label>
                                                    </div>
                                                    <div>
                                                        <input type="radio" name="gender" id="gender" style={{"margin-right": "5px"}} onChange={handleFieldChange}/>
                                                        <label htmlFor="gender">Female</label>
                                                    </div>
                                                </div> */}
                                                <Row>
                                                    <Col sm="4">
                                                        <Form.Check
                                                        type="radio"
                                                        label="Male"
                                                        name="gender"
                                                        id="gender"
                                                        value="male"
                                                        onChange={
                                                            handleClientDetails
                                                        }
                                                        />
                                                    </Col>
                                                    <Col sm="4">
                                                        <Form.Check
                                                        type="radio"
                                                        label="Female"
                                                        name="gender"
                                                        id="gender"
                                                        value="female"
                                                        onChange={
                                                            handleClientDetails
                                                        }
                                                        />
                                                    </Col>
                                                </Row>

                                            </Form.Group>
                                        </Row>

                                        <Row className="mb-3">
                                            <Form.Group as={Col} controlId="formGridEmail" style={{"display": "flex", "flex-direction": "column", "align-items": "start"}}>
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control type="email" placeholder="Enter email" id="email"  onChange={handleClientDetails}/>
                                            </Form.Group>
                                            <Form.Group as={Col} controlId="formGridEmail" style={{"display": "flex", "flex-direction": "column", "align-items": "start"}}>
                                                <Form.Label>Phone Number</Form.Label>
                                                <Form.Control type="tel" placeholder="Enter phone number" id="phone_number" onChange={handleClientDetails}/>
                                            </Form.Group>
                                        </Row>
                                        <Form.Group className="mb-3" controlId="formGridAddress1">
                                            <Form.Label>Address</Form.Label>
                                            <Form.Control placeholder="Enter your address" id="address" onChange={handleClientDetails}/>
                                        </Form.Group>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="primary" onClick={() => {
                                            handleClose()
                                        }} id="submit" type="submit">
                                            Submit
                                        </Button>
                                    </Modal.Footer>
                                </Form>
                            </Modal>
                        </Row>
                    </div>
                    <Row style={{paddingBottom:"6vh", display:"flex"}}>
                        <div className="currency">
                            <Form.Group classname="mb-3" controlId="currency">
                                <Form.Select type="text" name="currency" aria-label="currency" id="currency" onChange={(event)=>{
                                    setCurrency(event.target.value)
                                    // console.log(authentication.currentUser.uid)
                                    
                                    }}>
                                    <option>Currency</option>
                                    {currencies.map((currency, index) => <option value={currencies["code"]}>{currency["code"]}</option>)}  
                                </Form.Select>
                            </Form.Group>
                        </div>
                    </Row>
                    {}

                    <Table striped bordered>
                        <tbody>
                            {stickers.map(renderStickerDetails)}
                        </tbody>
                    </Table>
                    {/*Sticker form details container.*/}


                    <div className="dates">
                        {
                            moment(policyEndDate).isValid() === true ?
                                <>
                                    <div style={{display:"flex", justifyContent:"flex-start", paddingTop:"4vh", paddingBottom:"4vh"}}>
                                        <div >
                                            <Form.Group controlId="policyStartDate"  >
                                                <Form.Label><h5>Policy Start Date</h5></Form.Label>
                                                <Form.Control type="date" name="policy_start_date" value={policyStartDate} defaultValue={date} onChange={event=> {
                                                    setPolicyEndDate(moment(event.target.value).add(1, 'years').subtract(1, 'days').calender())
                                                    setPolicyStartDate(event.target.value)
                                                }}/>
                                            </Form.Group>
                                        </div>
                                    </div>
                                    <Row style={{paddingBottom:"3vh"}}>
                                        <Col>
                                            <Form.Group controlId="policyEndDate" id="policy-end-date" >
                                                <Form.Label><h5>Policy End Date</h5></Form.Label>
                                                <Form.Control type="text" name="policy_start_date" value={ policyEndDate } readOnly/>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </>
                                :
                                <Row style={{paddingTop:"4vh", paddingBottom:"4vh"}}>
                                    <Col>
                                        <Form.Group controlId="policyStartDate" >
                                            <Form.Label><h5>Policy Start Date</h5></Form.Label>
                                            <Form.Control type="date" name="policy_start_date" value={policyStartDate} defaultValue={date} onChange={event=> {
                                                setPolicyStartDate(event.target.value)
                                                setPolicyEndDate(moment(event.target.value).add(1, 'years').calendar())
                                                console.log(`end ${policyEndDate}`)
                                                // console.log(policyStartDate)
                                            }}/>
                                        </Form.Group>
                                    </Col>
                                </Row>

                        }

                        <div style={{display:"flex", width:"100%", justifyContent:"flex-end"}}>
                            <div>
                                <Button variant="primary" type="submit">
                                    Process 3rd Party
                                </Button>
                            </div>
                        </div>
                        {/* {console.log(fields)}   */}
                    </div> 
                </Form>
            </div>
        </div>
    )
}

export default Policies