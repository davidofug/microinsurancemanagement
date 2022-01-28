import '../assets/styles/addClients.css'
import { useEffect, useState } from 'react'
import { Form, Row, Col } from 'react-bootstrap'
import Header from '../components/header/Header'
import { authentication, db } from '../helpers/firebase'
import { collection, addDoc } from 'firebase/firestore'
import { useForm } from '../hooks/useForm'
import Loader from '../components/Loader'
import useAuth from '../contexts/Auth';

import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function AddClaims() {

    useEffect(() => document.title = 'Britam - Add Claims', [])

    const [ isLoading, setIsLoading ] = useState(false)

    const { authClaims } = useAuth()

    const claimsCollectionRef = collection(db, 'claims')
    const [fields, handleFieldChange] = useForm({
        uid: authentication.currentUser.uid,
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
        status: 'pending'

    })

    const createClaim = async (event) => {
        try{
            setIsLoading(true)
            event.preventDefault()
            fields["added_by_name"] = authentication.currentUser.displayName
            await addDoc(claimsCollectionRef, fields)
            toast.success(`successfully added ${fields.claimantName}'s claim`, {position: "top-center"});

            // send claim to Britam claim team on creation showing agent who created the notification.
            const sendToClaimTeam = () => {}


            setIsLoading(false)
            document.form1.reset();
        } catch(error){
            console.log(error)
        }
      }

      let today;
      new Date().getMonth()+1 >= 10 ? today = `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`
    : today = `${new Date().getFullYear()}-0${new Date().getMonth()+1}-${new Date().getDate()}`


    return (
        <div className='components'>
            <Header title="Add Claim" subtitle="ADD A NEW CLAIM" />
            <ToastContainer/>
            

            <div className="addComponentsData mb-5 shadow-sm">  
            {isLoading && 
                <div className='loader-wrapper'>
                        <Loader />
                </div>
            }
                <div>
                    <Form name="form1" onSubmit={createClaim}>
                        <Row className="mb-3">
                        <h5>Claim Details</h5>
                        <Form.Group as={Col} style={{"display": "flex", "flex-direction": "column", "align-items": "start"}}>
                                <Form.Label htmlFor='stickerNumber'>Reference Number</Form.Label>
                                <Form.Control type="text" name="" id="refNumber" placeholder="Enter Ref Number" onChange={handleFieldChange} required/>
                            </Form.Group>
                            <Form.Group as={Col} style={{"display": "flex", "flex-direction": "column", "align-items": "start"}}>
                            </Form.Group>
                            <Form.Group as={Col} style={{"display": "flex", "flex-direction": "column", "align-items": "start"}}>
                            </Form.Group>
                            <Form.Group as={Col} style={{"display": "flex", "flex-direction": "column", "align-items": "start"}}>
                            </Form.Group>
                            
                        </Row>
                        <Row className="mb-3">
                        <h5>Claim Details</h5>
                            <Form.Group as={Col} style={{"display": "flex", "flex-direction": "column", "align-items": "start"}}>
                                <Form.Label htmlFor='dateReported'>Date Reported</Form.Label>
                                <Form.Control type="date" id="dateReported" onChange={handleFieldChange} max={today} required/>
                            </Form.Group>
                            {authClaims.agent
                            ?
                            <Form.Group as={Col} style={{"display": "flex", "flex-direction": "column", "align-items": "start"}}>
                            <Form.Label htmlFor='policyType'>Policy</Form.Label>
                            <Form.Select aria-label="User role" id="policyType" onChange={handleFieldChange} required>
                                <option value="hide">--Select Category--</option>
                                {authClaims.mtp && <option value="mtp">MTP</option>}
                                {authClaims.comprehensive && <option value="comprehensive">Comprehensive</option>}
                                {authClaims.windscreen && <option value="windscreen">Windscreen</option>}
                                {authClaims.newImport && <option value="newImport">New Import</option>}
                                {authClaims.transit && <option value="transit">Transit</option>}
                            </Form.Select>
                        </Form.Group>
                            :
                            <Form.Group as={Col} style={{"display": "flex", "flex-direction": "column", "align-items": "start"}}>
                                <Form.Label htmlFor='policyType'>Policy</Form.Label>
                                <Form.Select aria-label="User role" id="policyType" onChange={handleFieldChange} required>
                                    <option value="hide">--Select Category--</option>
                                    <option value="mtp">MTP</option>
                                    <option value="comprehensive">Comprehensive</option>
                                    <option value="windscreen">Windscreen</option>
                                    <option value="newImport">New Import</option>
                                    <option value="transit">Transit</option>
                                </Form.Select>
                            </Form.Group>
                            }
                            

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
                                <Form.Control type="text" name="" id="claimantName" placeholder="Enter Claimant's name" onChange={handleFieldChange} required/>
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
                                <Form.Control type="date" name="" id="dateOfIncident" onChange={handleFieldChange} max={today} />
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
                                <Form.Control type="text" name="" id="detailsOfIncident" placeholder="Enter details of incident" onChange={handleFieldChange} required/>
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                            <Form.Label>upload support documents</Form.Label>
                            <Form.Control type="file" id="attachedDocuments" onChange={handleFieldChange} />
                            <Form.Control type="file" id="attachedDocuments" onChange={handleFieldChange} />
                            <Form.Control type="file" id="attachedDocuments" onChange={handleFieldChange} />
                        </Form.Group>
                        
                        <div id='submit' ><input type="submit" value="Submit" className='btn btn-primary cta' /></div>
                    </Form>
                    </div>
            </div>
        </div>
    )
}

export default AddClaims
