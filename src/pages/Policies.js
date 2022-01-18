import React, { useState, useEffect } from 'react'
import { httpsCallable } from 'firebase/functions'
import { functions } from '../helpers/firebase'

import { Form,Row, Col, Table, Button, Modal, Alert } from 'react-bootstrap'
import { useForm } from '../hooks/useForm'
import dynamicFields from '../helpers/multipleChoice'
import '../styles/Policies.css'
import moment from 'moment'
import Upload from '../components/uploader/Upload';


// import AddClient from '../components/AddClient'

import { db } from '../helpers/firebase'
import { collection, addDoc } from 'firebase/firestore'
import { authentication } from '../helpers/firebase'
import { FaSolarPanel } from 'react-icons/fa'
// import AddClient from '../parts/AddClient'
// enlarging the size of + and -

function Policies({cat, btn_txt, pol}) {

    const listUsers = httpsCallable(functions,'listUsers')
    const addUser = httpsCallable(functions, 'addUser')
 
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [ existingClients, setExistingClients ] = useState([])
    const [ classes, setClasses ] = useState([])
    const [ vehicleUses, setVehicleUses ] = useState([])
    const [ policyStartDate, setPolicyStartDate ] = useState(null)
    const [ policyEndDate, setPolicyEndDate ] = useState(null)
    const [ currency, setCurrency ] = useState({})
    const [ client, setClient ] = useState({})
    const [ contactPerson, handleContactPerson ] = useForm({
        name:'',
        gender:'',
        phone:'',
        address:'',
        NIN:''
    })

    
    const [ comprehensiveClient, setComprehensiveClient ] = useState('') 
    const [ comprehensiveExistingClient, setComprehensiveExistingClient ] = useState(false)

    const [ newClient, handleClientDetails ] = useForm({
        user_role: 'Customer',
        email:'',
        name:'',
        dob:'',
        gender:'',
        phone:'',
        address:'',
        licenseNo:'',
        NIN: '',
        TIN: '',
        photo:''
    })

    const [ individualComprehensiveClient, handleIndividualComprehensiveClient ] = useForm({
        user_role: 'Customer',
        email:'',
        name:'',
        dob:'',
        gender:'',
        phone:'',
        address:'',
        licenseNo:'',
        NIN: '',
        TIN: '',
        photo:''    
    })

    const [ corporateComprehensiveEntity, handleCoporateComprehensiveEntity ] = useForm({
        user_role: 'Customer', 
        email:'',
        name:'',
        entityTIN:''
    })

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
            totalPremium:'',
            basicPremium:'',
            stickerFee:6000,
            stampDuty:35000
        }
    ])
    
    const { currencies, make, categories } = dynamicFields

    useEffect(() => {
        document.title = 'Britam - Policies'

        listUsers().then(({data}) => {
            setExistingClients(data.filter(user => user?.role?.Customer))
            console.log(data.filter(user => user?.role?.Customer))
            console.log(data)
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    const handleInputChange = (index, event) => {
        const values = [...stickers]
        const stickerFee = 6000
        let totalSubjectToVat = stickerFee
        let trainingLevy = 0.005
        
        if(event.target.name === 'totalPremium' || event.target.name === 'seatingCapacity' || event.target.name === 'grossWeight' || event.target.name === 'basicPremium' || event.target.name === 'ccPower' ){
            if( Number(event.target.value) >= 0 ) { 
                values[index][event.target.name] = event.target.value
            } 
        }        
        else{
            values[index][event.target.name] = event.target.value    
        }

        if(event.target.name === 'basicPremium') { 
            if(Number(event.target.value) >= 0) {
                trainingLevy *= Number(event.target.value)
                values[index]['trainingLevy'] = trainingLevy
                totalSubjectToVat += (Number(event.target.value) + trainingLevy)
            } 
            values[index]['vat'] = 0.18 * totalSubjectToVat
        } else {
            values[index]['vat'] = 0.18 * stickerFee
            values[index]['trainingLevy'] = 0
        }
        
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
                totalPremium:'',
                basicPremium:'',
                stickerFee: 6000,
                stampDuty: 35000,
                status: 'new',
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

    //createPolicies
    const handleSubmit = async(event) => {
        event.preventDefault()
        const clientInfo = cat === "comprehensive" ? await handleComprehesiveClientInfo(comprehensiveClient, individualComprehensiveClient, corporateComprehensiveEntity, contactPerson) || client : client
    
        await addDoc(policiesRef, {
            currency,
            stickersDetails: stickers,
            clientDetails: clientInfo,
            added_by_uid: authentication.currentUser.uid,
            added_by_name: authentication.currentUser.displayName,  
            policyStartDate: policyStartDate, 
            policyEndDate: policyEndDate,
            category: cat,
            totalValuation: await generateTotalValuation(stickers)
        })        

        client['added_by_uid'] = authentication.currentUser.uid
        client['added_by_name'] = authentication.currentUser.displayName
        
        
        addUser(clientInfo).then((results) => {
            alert(`Successfully created stickers and added ${clientInfo.name}`)
            document.policy.reset()
            setPolicyEndDate('')
            setPolicyStartDate('')
        }).catch( error => console.log( error ))
 

        setStickers([
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
                totalPremium:'',
                basicPremium:'',
                stickerFee: 6000,
                stampDuty: 35000,
                status: 'new',
            }
        ])

        console.log(
            {
                currency,
                stickersDetails: stickers,
                clientDetails: cat === "comprehensive" ? await handleComprehesiveClientInfo(comprehensiveClient, individualComprehensiveClient, corporateComprehensiveEntity, contactPerson) : client,
                added_by_uid: authentication.currentUser.uid,
                added_by_name: authentication.currentUser.displayName,  
                policyStartDate: moment(policyStartDate).toDate(), 
                policyEndDate: moment(policyEndDate).toDate(),
                category: cat,
                totalValuation: await generateTotalValuation(stickers)
            }
        )
    }    

    const handleComprehesiveClientInfo = async (type, individualClient, organisationInfo, contactInfo) => {
        if(type === "Individual") {
            return await {...individualClient, type: type}
        } else if (type === "Corporate Entity") {
            return await { ...organisationInfo, contactPerson : contactInfo, type: type}
        } else if (type === "Existing") {
            return await { ...client }
        }
    }

    

    const { user_role } = newClient
    const [ comprehensive, setComprehensive ] = useState(false)
    const [ windscreen, setWindscreen ] = useState(false)
    const [ mtp, setMTP ] = useState(false)

    const generateTotalValuation = async ( stickers ) => {
        let totalValuation = 0
        for(let i = 0; i < stickers.length; i++) {
            const { stampDuty, basicPremium, totalPremium, vat, trainingLevy, stickerFee } = stickers[i]
            const commission = Number(basicPremium >= 0) ? 0.1 * basicPremium : 0
            totalValuation += (stampDuty + Number(totalPremium) + vat + trainingLevy + stickerFee + commission + (Number(basicPremium >= 0) ? Number(basicPremium) : 0))
        } 

        return await totalValuation    
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
                                    <Form.Control type="text" name="referenceNo" placeholder="Reference No" value={singleSticker.referenceNo} onChange={event => handleInputChange(index, event)} required/>
                                </Form.Group>
                            </div>
                            <div>
                                <Form.Group controlId="grossWeight">
                                    <Form.Control type="text" name="grossWeight" placeholder="Gross Weight" value={singleSticker.grossWeight} onChange={event => handleInputChange(index, event)} required/>
                                </Form.Group>
                            </div>
                            <div>
                                <Form.Group controlId="motorMake" value={singleSticker.motorMake}>
                                    <Form.Select type="text" name="motorMake" aria-label="Motor Make" onChange={event => handleInputChange(index, event)} required>
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
                                    <Form.Control type="text" name="plateNo" placeholder="Plate No" value={singleSticker.plateNo} onChange={event => handleInputChange(index, event)} required/>
                                </Form.Group>
                            </div>
                            <div>
                                <Form.Group controlId="category" >
                                    <Form.Select type="text" name="category" aria-label="category" value={singleSticker.category} required onChange={event => {
                                        handleInputChange(index, event)

                                        const result = categories.filter(category => category.label === event.target.value)
                                        const [ category ] = result
                                        // eslint-disable-next-line no-lone-blocks
                                        // console.log(date)

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
                                    <Form.Control type="text" name="seatingCapacity" placeholder="Seating Capacity" value={singleSticker.seatingCapacity} onChange={event => handleInputChange(index, event)} required/>
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
                                    <Form.Control type="text" name="totalPremium" placeholder="Total Premium" value={singleSticker.totalPremium} onChange={event => handleInputChange(index, event)} required/>
                                </Form.Group>
                            </div>
                        </div>
                    </td>
                    <td className="fourth-cell" style={{verticalAlign:"top", paddingLeft:"1vh", paddingRight:"1vh"}}>
                        <div style={{display:"flex", flexDirection:"column", gap:"2vh"}}>
                            <div>
                                <Form.Group controlId="ccPower">
                                    <Form.Control type="text" name="ccPower" placeholder="CC Power" value={singleSticker.ccPower} onChange={event => handleInputChange(index, event)} required/>
                                </Form.Group>
                            </div>
                            <div>
                                <Form.Group controlId="chasisNo" aria-label="chasisNo">
                                    <Form.Control type="text" name="chasisNo" placeholder="Chasis No" value={singleSticker.chasisNo} onChange={event => {
                                        handleInputChange(index, event) 
                                    }} required/>
                                </Form.Group>
                            </div>
                            {
                                cat === 'comprehensive' ?
                                <div>
                                    <Form.Group controlId="chasisNo" aria-label="chasisNo">
                                        <Form.Control type="text" name="basicPremium" placeholder="BasicPremium" value={singleSticker.basicPremium} onChange={event => {
                                            handleInputChange(index, event) 
                                        }} required/>
                                    </Form.Group>
                                </div>
                                : 
                                <div>
                                    
                                </div>
                            }   
                        </div>
                    </td>
                    {
                        cat === 'comprehensive'
                        ?
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
                        : 
                        <td>

                        </td>
                    }    
                </tr>
            </React.Fragment>
        )
    }

    return (
        <div className='components'>
            <div className='heading'>
                <h1 className='title'>Policies</h1>
                <p>MANAGING {pol.toUpperCase()} POLICIES</p>
            </div>
            <div className="table-card componentsData" style={{paddingBottom:"10vh"}}>
                <Form name="policy" onSubmit={handleSubmit}>
                    <div style={{paddingTop:"4vh", paddingBottom:"4vh"}}>
                        <Row style={{paddingTop:"2vh"}}>
                            <h1>
                                Client
                            </h1>
                        </Row>
                        <Row>
                            {
                                cat === "comprehensive" ? 
                                <Col className="client-details" md={3}>
                                    <Form.Group className="mb-3" controlId="clientDetails">
                                        <Form.Control list="clientNames" placeholder='Existing comprehensive client' id="existingClient"onChange={()=> {
                                            const list = document.getElementById('clientNames')
                                            for(let clientName = 0; clientName < list.options.length; clientName++) {
                                                if(list.options[clientName].value === document.getElementById('existingClient').value) {
                                                    setClient(JSON.parse(list.options[clientName].getAttribute('data-value')))   
                                                    setComprehensiveClient('Existing')
                                                }
                                            }
                                            console.log(client)
                                        }}/>
                                            <datalist id="clientNames" >
                                                {existingClients.map(customer => <option data-value={JSON.stringify(customer)} value={customer.name}/>)}
                                            </datalist> 
                                    </Form.Group>
                                </Col>
                                :
                                <Col className="client-details" md={3}>
                                    <Form.Group className="mb-3" controlId="clientDetails">
                                        <Form.Control list="clientNames" placeholder='Existing client' id="existingClient"onChange={()=> {
                                            const list = document.getElementById('clientNames')
                                            for(let clientName = 0; clientName < list.options.length; clientName++) {
                                                if(list.options[clientName].value === document.getElementById('existingClient').value) {
                                                    setClient(JSON.parse(list.options[clientName].getAttribute('data-value')))   
                                                    
                                                }
                                            }
                                            console.log(client)
                                        }}/>
                                            <datalist id="clientNames" >
                                                {existingClients.map(customer => <option data-value={JSON.stringify(customer)} value={customer.name}/>)}
                                            </datalist> 
                                    </Form.Group>
                                </Col>
                            }
                            
                            
                            
                            {   
                                newClient.name.length > 1 && newClient.email.length > 1 ? 
                                <Col md={8} className="add-new-client" >
                                    <button className="new-client-cta  sm btn-primary" variant="primary" type="button" onClick={handleShow}> Edit Client Details </button>
                                </Col> : 
                                <Col md={8} className="add-new-client" >
                                    <button className="new-client-cta  sm btn-primary" variant="primary" type="button" onClick={handleShow}> Add New Client </button>
                                </Col>
                            }
                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Add New Client</Modal.Title>
                                </Modal.Header>
                                
                                <Modal.Body>
                                    <Form name='form4' onSubmit={handleSubmit}>
                                        { 
                                            cat ==='comprehensive' ?
                                            <>
                                                <Row> 
                                                    <Form.Group controlId="motorClass" className="mb-3">
                                                        <Form.Select type="text" name="clientType" aria-label="clientType" onChange={(event) => {
                                                                setComprehensiveClient(event.target.value)
                                                            }}>
                                                            <option>Client Type</option>
                                                            <option value="Individual">Individual</option>
                                                            <option value="Corporate Entity">Corporate Entity</option>
                                                        </Form.Select>
                                                    </Form.Group>
                                                </Row>
                                                {
                                                    comprehensiveClient === "Corporate Entity" 
                                                    &&
                                                    <>                                             
                                                        <h5>
                                                            Organisation Details
                                                        </h5>
                                                        <Form.Group className="mb-3" >
                                                            <Form.Label htmlFor='name'>Entity Name<span className='required'>*</span></Form.Label>
                                                            <Form.Control id="name" placeholder="Entity Name" value={corporateComprehensiveEntity.name} onChange={handleCoporateComprehensiveEntity} required/>
                                                        </Form.Group>
                                                        <Row className="mb-3">
                                                            <Form.Group as={Col} className="addFormGroups" >
                                                                <Form.Label htmlFor='TIN'>TIN</Form.Label>
                                                                <Form.Control id="entityTIN" placeholder="Entity TIN" value={corporateComprehensiveEntity.entityTIN} onChange={handleCoporateComprehensiveEntity}/>
                                                            </Form.Group>
                                                            <Form.Group as={Col} className='addFormGroups'>
                                                                <Form.Label htmlFor='email'>Entity Email</Form.Label>
                                                                <Form.Control type="email" id="email" placeholder="Entity Email" value={corporateComprehensiveEntity.entityEmail} onChange={handleCoporateComprehensiveEntity} required/>
                                                            </Form.Group>
                                                        </Row>

                                                        <Row className="mb-3">
                                                            <h5>
                                                                Contact person Details
                                                            </h5>
                                                            <Form.Group className="mb-3" >
                                                                <Form.Label htmlFor='name'>Name<span className='required'>*</span></Form.Label>
                                                                <Form.Control id="name" placeholder="Contact Person" value={contactPerson.contactName} onChange={handleContactPerson} required/>
                                                            </Form.Group>
                                                            <Form.Group as={Col} className='addFormGroups'>
                                                                <Form.Label htmlFor='gender'>Gender <span className='required'>*</span></Form.Label>
                                                                <div className='gender-options' style={{display:"flex", gap: "5px"}}>
                                                                    <div style={{display: "flex", gap: "5px", alignItems: "center"}}>
                                                                        <input type="radio" id="gender" value="male" className='addFormRadio' onChange={handleContactPerson}/>
                                                                        <label htmlFor="male">Male</label>
                                                                    </div>
                                                                    <div style={{display: "flex", gap: "5px", alignItems:"center"}}>
                                                                        <input type="radio" name="gender" value="female" className='addFormRadio' onChange={handleContactPerson}/>
                                                                        <label htmlFor="female">Female</label>
                                                                    </div>
                                                                </div>
                                                            </Form.Group>
                                                        </Row>

                                                        <Row className="mb-3">
                                                            <Form.Group as={Col} className='addFormGroups'>
                                                                <Form.Label htmlFor='phone'>Phone Number <span className='required'>*</span></Form.Label>
                                                                <Form.Control type="tel" id="phone" placeholder="Enter phone number" value={contactPerson.phone} onChange={handleContactPerson}/>
                                                            </Form.Group>
                                                        </Row>
                                                        <Form.Group className="mb-3" >
                                                            <Form.Label htmlFor='address'>Address</Form.Label>
                                                            <Form.Control id="address" placeholder="Enter your address" value={contactPerson.address} onChange={handleContactPerson}/>
                                                        </Form.Group>
                                                        <Row className="mb-3">
                                                            <Form.Group as={Col} className="addFormGroups" >
                                                                <Form.Label htmlFor='NIN'>NIN</Form.Label>
                                                                <Form.Control id="NIN" placeholder="NIN" value={contactPerson.NIN} onChange={handleContactPerson}/>
                                                            </Form.Group>
                                                        </Row>
                                                    </>
                                                }    
                                                {
                                                    comprehensiveClient === "Individual" &&
                                                    <>
                                                        <Form.Group className="mb-3" >
                                                            <Form.Label htmlFor='name'>Name<span className='required'>*</span></Form.Label>
                                                            <Form.Control id="name" placeholder="Name" value={individualComprehensiveClient.name} onChange={handleIndividualComprehensiveClient} required/>
                                                        </Form.Group>
                                                        <Row className="mb-3">
                                                            <Form.Group as={Col} className='addFormGroups'>
                                                                <Form.Label htmlFor='dob'>Date of birth</Form.Label>
                                                                <Form.Control type="date" id="dob" value={individualComprehensiveClient.dob} onChange={handleIndividualComprehensiveClient}/>
                                                            </Form.Group>
                                                            <Form.Group as={Col} className='addFormGroups'>
                                                                <Form.Label htmlFor='gender'>Gender <span className='required'>*</span></Form.Label>
                                                                <div className='gender-options'>
                                                                    <div style={{display: "flex", gap: "5px", alignItems:"center"}}> 
                                                                        <input type="radio" name="gender" id="gender" value="male" className='addFormRadio' onChange={handleIndividualComprehensiveClient}/>
                                                                        <label htmlFor="male">Male</label>
                                                                    </div>
                                                                    <div style={{display: "flex", gap: "5px", alignItems:"center"}}> 
                                                                        <input type="radio" name="gender" id="gender" value="female" className='addFormRadio' onChange={handleIndividualComprehensiveClient}/>
                                                                        <label htmlFor="female">Female</label>
                                                                    </div>
                                                                </div>
                                                            </Form.Group>
                                                        </Row>

                                                        <Row className="mb-3">
                                                            <Form.Group as={Col} className='addFormGroups'>
                                                                <Form.Label htmlFor='email'>Email Address</Form.Label>
                                                                <Form.Control type="email" id="email" placeholder="Enter email" value={individualComprehensiveClient.email} onChange={handleIndividualComprehensiveClient} required/>
                                                            </Form.Group>
                                                            <Form.Group as={Col} className='addFormGroups'>
                                                                <Form.Label htmlFor='phone'>Phone Number <span className='required'>*</span></Form.Label>
                                                                <Form.Control type="tel" id="phone" placeholder="Enter phone number" value={individualComprehensiveClient.phone} onChange={handleIndividualComprehensiveClient}/>
                                                            </Form.Group>
                                                        </Row>
                                                        <Form.Group className="mb-3" >
                                                            <Form.Label htmlFor='address'>Address</Form.Label>
                                                            <Form.Control id="address" placeholder="Enter your address" value={individualComprehensiveClient.address} onChange={handleIndividualComprehensiveClient}/>
                                                        </Form.Group>
                                                        <Row className="mb-3">
                                                            <Form.Group as={Col} className="addFormGroups" >
                                                                <Form.Label htmlFor='NIN'>NIN</Form.Label>
                                                                <Form.Control id="NIN" placeholder="NIN" value={individualComprehensiveClient.NIN} onChange={handleIndividualComprehensiveClient}/>
                                                            </Form.Group>
                                                        </Row>
                                                        <Row className="mb-3">
                                                            <Form.Group as={Col} className="addFormGroups" >
                                                                <Form.Label htmlFor='TIN'>TIN</Form.Label>
                                                                <Form.Control id="TIN" placeholder="TIN" value={individualComprehensiveClient.TIN} onChange={handleIndividualComprehensiveClient}/>
                                                            </Form.Group>
                                                        </Row>
                                                        <Form.Label htmlFor='upload'>Upload Profile photo</Form.Label>
                                                        <Upload />
                                                    </>
                                                }
                                            </>                                                      
                                            : 
                                            <>
                                                <Form.Group className="mb-3" >
                                                    <Form.Label htmlFor='name'>Name<span className='required'>*</span></Form.Label>
                                                    <Form.Control id="name" placeholder="Name" value={newClient.name} onChange={handleClientDetails} required/>
                                                </Form.Group>
                                                <Row className="mb-3">
                                                    <Form.Group as={Col} className='addFormGroups'>
                                                        <Form.Label htmlFor='dob'>Date of birth</Form.Label>
                                                        <Form.Control type="date" id="dob" value={newClient.dob} onChange={handleClientDetails} />
                                                    </Form.Group>
                                                    <Form.Group as={Col} className='addFormGroups'>
                                                        <Form.Label htmlFor='gender'>Gender <span className='required'>*</span></Form.Label>
                                                        <div className='gender-options'>
                                                            <div style={{display: "flex", gap: "5px", alignItems:"center"}}>
                                                                <input type="radio" name="gender" id="gender" value="male" className='addFormRadio' onChange={handleClientDetails}/>
                                                                <label htmlFor="male">Male</label>
                                                            </div>
                                                            <div style={{display: "flex", gap: "5px", alignItems:"center"}}>
                                                                <input type="radio" name="gender" id="gender" value="female" className='addFormRadio' onChange={handleClientDetails}/>
                                                                <label htmlFor="female">Female</label>
                                                            </div>
                                                        </div>
                                                    </Form.Group>
                                                </Row>

                                                <Row className="mb-3">
                                                    <Form.Group as={Col} className='addFormGroups'>
                                                        <Form.Label htmlFor='email'>Email Address</Form.Label>
                                                        <Form.Control type="email" id="email" placeholder="Enter email" value={newClient.email} onChange={handleClientDetails} required/>
                                                    </Form.Group>
                                                    <Form.Group as={Col} className='addFormGroups'>
                                                        <Form.Label htmlFor='phone'>Phone Number <span className='required'>*</span></Form.Label>
                                                        <Form.Control type="tel" id="phone" placeholder="Enter phone number" value={newClient.phone} onChange={handleClientDetails}/>
                                                    </Form.Group>
                                                </Row>
                                                <Form.Group className="mb-3" >
                                                    <Form.Label htmlFor='address'>Address</Form.Label>
                                                    <Form.Control id="address" placeholder="Enter your address" value={newClient.address} onChange={handleClientDetails}/>
                                                </Form.Group>
                                                <Row className="mb-3">
                                                    <Form.Group as={Col} className="addFormGroups" >
                                                        <Form.Label htmlFor='NIN'>NIN</Form.Label>
                                                        <Form.Control id="NIN" placeholder="NIN" value={newClient.NIN} onChange={handleClientDetails}/>
                                                    </Form.Group>
                                                </Row>
                                                { user_role === 'agent' &&
                                                    <>
                                                        <Form.Group className="mb-3" >
                                                            <Form.Label htmlFor='agentcan'>Agent Can?</Form.Label>
                                                        </Form.Group>
                                                        <Form.Group className="mb-3" controlId="comprehensive">
                                                            <Form.Check type="checkbox" label="Handle Comprehensive" id="handle_comprehensive" value="true" onChange={(event) => setComprehensive(!comprehensive)}/>
                                                        </Form.Group>
                                                        <Form.Group className="mb-3" controlId="mtp">
                                                            <Form.Check type="checkbox" label="Handle Motor Third Party" id="handle_mtp" value={true} onChange={()=> setMTP(!mtp)}/>
                                                        </Form.Group>
                                                        <Form.Group className="mb-3" controlId="windscreen">
                                                            <Form.Check type="checkbox" label="Handle Windscreen" id="handle_windscreen" value={true} onChange={()=> setWindscreen(!windscreen)}/>
                                                        </Form.Group>
                                                    </>
                                                }
                                                <Form.Label htmlFor='upload'>Upload Profile photo</Form.Label>
                                                <Upload />
                                            </>
                                        }
                                        
                                        
                                    </Form>
                                </Modal.Body>

                                <Modal.Footer>
                                    <Button variant="primary" onClick={() => {
                                        handleClose()
                                        setClient(newClient)
                                    }}>
                                        Save
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </Row>
                    </div>
                    <Row style={{paddingBottom:"6vh", display:"flex"}}>
                        <div className="currency">
                            <Form.Group classname="mb-3" controlId="currency">
                                <Form.Select type="text" name="currency" aria-label="currency" id="currency" onChange={(event)=>{
                                    setCurrency(event.target.value)
                                    }}>
                                    <option>Currency</option>
                                    {currencies.map((currency, index) => <option value={currency["code"]}>{currency["code"]}</option>)}  
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

                    <div className="dates">
                        {
                            moment(policyEndDate).isValid() === true ?
                                <>
                                    <div style={{display:"flex", justifyContent:"flex-start", paddingTop:"4vh", paddingBottom:"4vh"}}>
                                        <div >
                                            <Form.Group controlId="policyStartDate"  >
                                                <Form.Label><h5>Policy Start Date</h5></Form.Label>
                                                <Form.Control type="date" name="policy_start_date" value={policyStartDate} onChange={event=> {
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
                                            <Form.Control type="date" name="policy_start_date" value={policyStartDate} onChange={event=> {
                                                setPolicyStartDate(event.target.value)
                                                setPolicyEndDate(moment(event.target.value).add(1, 'years').subtract(1, 'days').calendar())
                                            }}/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                        }
                        <div style={{display:"flex", width:"100%", justifyContent:"flex-end"}}>
                            <div>
                                <Button variant="primary" type="submit">
                                    {btn_txt}
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