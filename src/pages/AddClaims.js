import '../assets/styles/addClients.css'
import { useEffect } from 'react'
import { Form, Row, Col } from 'react-bootstrap'
import Header from '../parts/header/Header'
import { db } from '../helpers/firebase'
import { collection, addDoc } from 'firebase/firestore'
import { useForm } from '../hooks/useForm'

function AddClaims() {

    useEffect(() => document.title = 'Britam - Add Claims', [])

    const claimsCollectionRef = collection(db, 'claims')
    const [fields, handleFieldChange] = useForm({
        refNumber: '',
        dateReported: '',
        policyType: '',
        numberPlate: '',
        stickerNumber: '',
        claimantName: '',
        claimantEmail: '',
        claimantPhoneNumber: '',
        dateOfIncident: '',
        claimEstimate: '',
        detailsOfIncident: '',
        attachedDocuments: '',
        status: ''

    })

    const createClaim = async (event) => {
        event.preventDefault()
        await addDoc(claimsCollectionRef, fields)
      }

    return (
        <div className='components'>
            <Header title="Add Claim" subtitle="ADD A NEW CLAIM" />

            <div className="table-card componentsData">  
                    <Form onSubmit={createClaim}>
                        <Row className="mb-3">
                        <h5>Claim Details</h5>
                            <Form.Group as={Col} style={{"display": "flex", "flex-direction": "column", "align-items": "start"}}>
                                <Form.Label htmlFor='dateReported'>Date Reported</Form.Label>
                                <Form.Control type="date" id="dateReported" onChange={handleFieldChange} />
                            </Form.Group>
                            <Form.Group as={Col} style={{"display": "flex", "flex-direction": "column", "align-items": "start"}}>
                                <Form.Label htmlFor='policyType'>Policy</Form.Label>
                                <Form.Select aria-label="User role" id="policyType" onChange={handleFieldChange}>
                                    <option value="hide">--User Role--</option>
                                    <option value="mtp">MTP</option>
                                    <option value="comprehensive">Comprehensive</option>
                                    <option value="windscreen">Windscreen</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group as={Col} style={{"display": "flex", "flex-direction": "column", "align-items": "start"}}>
                                <Form.Label htmlFor='numberPlate'>Plate No.</Form.Label>
                                <Form.Control type="text" name="" id="numberPlate" placeholder="Enter plate No." onChange={handleFieldChange}/>
                            </Form.Group>
                            <Form.Group as={Col} style={{"display": "flex", "flex-direction": "column", "align-items": "start"}}>
                                <Form.Label htmlFor='stickerNumber'>Sticker No.</Form.Label>
                                <Form.Control type="text" name="" id="stickerNumber" placeholder="Enter Sticker Number" onChange={handleFieldChange}/>
                            </Form.Group>
                        </Row>
                        <h5>Claimant Details</h5>
                        <Row className="mb-3">
                            <Form.Group as={Col} style={{"display": "flex", "flex-direction": "column", "align-items": "start"}}>
                                <Form.Label htmlFor='claimantName'>Name</Form.Label>
                                <Form.Control type="text" name="" id="claimantName" placeholder="Enter Claimant's name" onChange={handleFieldChange}/>
                            </Form.Group>
                            <Form.Group as={Col} style={{"display": "flex", "flex-direction": "column", "align-items": "start"}}>
                                <Form.Label htmlFor='claimantEmail'>Email Address</Form.Label>
                                <Form.Control type="text" name="" id="claimantEmail" placeholder="Enter claimant's email" onChange={handleFieldChange}/>
                            </Form.Group>
                            <Form.Group as={Col} style={{"display": "flex", "flex-direction": "column", "align-items": "start"}}>
                                <Form.Label htmlFor='claimantPhoneNumber'>Phone Number</Form.Label>
                                <Form.Control type="text" name="" id="claimantPhoneNumber" placeholder="Enter Claimant's phone number" onChange={handleFieldChange}/>
                            </Form.Group>
                            <Form.Group as={Col} style={{"display": "flex", "flex-direction": "column", "align-items": "start"}}>
                                <Form.Label htmlFor='dateOfIncident'>Date of Incident</Form.Label>
                                <Form.Control type="date" name="" id="dateOfIncident" onChange={handleFieldChange}/>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} style={{"display": "flex", "flex-direction": "column", "align-items": "start"}}>
                                <Form.Label htmlFor='estimate'>Claim Estimate</Form.Label>
                                <Form.Control type="text" name="" id="estimate" placeholder="Enter Claim Estimate" onChange={handleFieldChange}/>
                            </Form.Group>
                            
                        </Row>
                        <Form.Group as={Col} style={{"display": "flex", "flex-direction": "column", "align-items": "start"}}>
                                <Form.Label htmlFor='detailsOfIncident'>Details of Incident</Form.Label>
                                <Form.Control type="text" name="" id="detailsOfIncident" placeholder="Enter details of incident" onChange={handleFieldChange}/>
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                            <Form.Label>upload support documents</Form.Label>
                            <Form.Control type="file" id="attachedDocuments" onChange={handleFieldChange} />
                        </Form.Group>
                        
                        <div id='submit' ><input type="submit" value="Submit" className='btn btn-primary cta' /></div>
                    </Form>
            </div>
        </div>
    )
}

export default AddClaims
