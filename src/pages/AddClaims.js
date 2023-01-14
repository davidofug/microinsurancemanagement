import '../assets/styles/addClients.css'
import { useEffect, useState } from 'react'
import { Form, Row, Col } from 'react-bootstrap'
import Header from '../components/header/Header'
import { authentication, db } from '../helpers/firebase'
import { collection, addDoc } from 'firebase/firestore'
import { useForm } from '../hooks/useForm'
import Loader from '../components/Loader'
import useAuth from '../contexts/Auth';
import UploadFile from '../components/uploader/UploadFile'
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from '../helpers/firebase'

import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Chat from '../components/messenger/Chat'

import '../styles/ctas.css'

function AddClaims({parent_container}) {

    useEffect(() => document.title = 'Add Claims - SWICO', [])

    const [ isLoading, setIsLoading ] = useState(false)
    // initialising the logs doc.
    const logCollectionRef = collection(db, "logs");

    const [ attachedDocs, setAttachedDocs ] = useState('')

    console.log(attachedDocs)

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
        attachedDocuments: [],
        status: 'pending'
    })


    console.log(fields.attachedDocuments)

    console.log([ ...attachedDocs ])

    const createClaim = async (event) => {
        setIsLoading(true)
        event.preventDefault()
        fields["added_by_name"] = authentication.currentUser.displayName

        if(attachedDocs){
            const arrayOfDocs = [ ...attachedDocs ]
            arrayOfDocs.forEach(( attachedDoc, index ) => {
                const storageRef = ref(storage, `images/${attachedDoc.name}`)
                const uploadTask = uploadBytesResumable(storageRef, attachedDoc)

                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                            // const prog = Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100
                            // setProgress(prog)
                    },
                    (error) => console.log(error),
                    async () => {
                                    await getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
                                    fields.attachedDocuments = [...fields.attachedDocuments, downloadUrl]
                            })
                            .then( async() => {
                                if(index === arrayOfDocs.length - 1){
                                    await addDoc(claimsCollectionRef, fields)
                                    .then(() => toast.success(`successfully added ${fields.claimantName}'s claim`, {position: "top-center"}))
                                    .then(async () => {
                                        await addDoc(logCollectionRef, {
                                            timeCreated: `${new Date().toISOString().slice(0, 10)} ${ new Date().getHours()}:${ new Date().getMinutes()}:${ new Date().getSeconds()}`,
                                            type: 'claim creation',
                                            status: 'successful',
                                            message: `Successfully created ${fields.claimantName}'s claim by ${authentication.currentUser.displayName}`
                                        })
                                    })
                                    .catch(async () => {
                                        toast.error(`Failed: couldn't added ${fields.claimantName}'s claim`, {position: "top-center"});

                                        await addDoc(logCollectionRef, {
                                            timeCreated: `${new Date().toISOString().slice(0, 10)} ${ new Date().getHours()}:${ new Date().getMinutes()}:${ new Date().getSeconds()}`,
                                            type: 'claim creation',
                                            status: 'failed',
                                            message: `Failed to create ${fields.claimantName}'s claim by ${authentication.currentUser.displayName}`
                                        })
                                    })

                                    setIsLoading(false)
                                    document.form1.reset();
                                    setAttachedDocs('')
                                  }
                            })
                    }
                )
            })   
        } else{
            await addDoc(claimsCollectionRef, fields)
                .then(() => toast.success(`successfully added ${fields.claimantName}'s claim`, {position: "top-center"}))
                .then(async () => {
                    await addDoc(logCollectionRef, {
                        timeCreated: `${new Date().toISOString().slice(0, 10)} ${ new Date().getHours()}:${ new Date().getMinutes()}:${ new Date().getSeconds()}`,
                        type: 'claim creation',
                        status: 'successful',
                        message: `Successfully created ${fields.claimantName}'s claim by ${authentication.currentUser.displayName}`
                    })
                })
                .catch(async () => {
                    toast.error(`Failed: couldn't added ${fields.claimantName}'s claim`, {position: "top-center"});

                    await addDoc(logCollectionRef, {
                        timeCreated: `${new Date().toISOString().slice(0, 10)} ${ new Date().getHours()}:${ new Date().getMinutes()}:${ new Date().getSeconds()}`,
                        type: 'claim creation',
                        status: 'failed',
                        message: `Failed to create ${fields.claimantName}'s claim by ${authentication.currentUser.displayName}`
                    })
                })

                setIsLoading(false)
                document.form1.reset();
                setAttachedDocs('')
        }
    }

      const sendToClaimTeam = () => {}

      let today;
      new Date().getMonth()+1 >= 10 ? today = `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`
    : today = `${new Date().getFullYear()}-0${new Date().getMonth()+1}-${new Date().getDate()}`


    return (
        <div /* className='components' */>
            <Header title="Add Claim" subtitle="ADD A NEW CLAIM NOTIFICATION" />
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
                        <Form.Group as={Col} style={{"display": "flex", "flex-direction": "column", "align-items": "start"}} md="4">
                            <Form.Label htmlFor='stickerNumber'>Reference Number</Form.Label>
                            <Form.Control type="text" name="" id="refNumber" placeholder="Enter Ref Number" onChange={handleFieldChange} required/>
                        </Form.Group>
                            {/* <Form.Group as={Col} style={{"display": "flex", "flex-direction": "column", "align-items": "start"}}>
                            </Form.Group>
                            <Form.Group as={Col} style={{"display": "flex", "flex-direction": "column", "align-items": "start"}}>
                            </Form.Group>
                            <Form.Group as={Col} style={{"display": "flex", "flex-direction": "column", "align-items": "start"}}>
                            </Form.Group> */}  
                        </Row>
                        <div id="group-2-add-claims" className="mb-3">
                        {/* <h5>Claim Details</h5> */}
                            <Form.Group as={Col} style={{"display": "flex", "flex-direction": "column", "align-items": "start"}} md="7"> 
                                <Form.Label htmlFor='dateReported'>Date Reported</Form.Label>
                                <Form.Control type="date" id="dateReported" onChange={handleFieldChange} max={today} required/>
                            </Form.Group>
                            {authClaims.agent
                            ?
                            <Form.Group as={Col} style={{"display": "flex", "flex-direction": "column", "align-items": "start"}} md="7">
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
                            
                            <Form.Group as={Col} style={{"display": "flex", "flex-direction": "column", "align-items": "start"}} md="7">
                                <Form.Label htmlFor='numberPlate'>Plate No.</Form.Label>
                                <Form.Control type="text" name="" id="numberPlate" placeholder="Enter plate No." onChange={handleFieldChange}/>
                            </Form.Group>
                            <Form.Group as={Col} style={{"display": "flex", "flex-direction": "column", "align-items": "start"}} md="7">
                                <Form.Label htmlFor='stickerNumber'>Sticker No.</Form.Label>
                                <Form.Control type="text" name="" id="stickerNumber" placeholder="Enter Sticker Number" onChange={handleFieldChange} required/>
                            </Form.Group>
                        </div>
                        <h5>Claimant Details</h5>
                        <div id="group-1-add-claims" className="mb-3">
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
                        </div>
                        <Row className="mb-3">
                            <Form.Group as={Col} style={{"display": "flex", "flex-direction": "column", "align-items": "start"}}>
                                <Form.Label htmlFor='estimate'>Claim Estimate</Form.Label>
                                <Form.Control type="text" name="" id="estimate" placeholder="Enter Claim Estimate Amount" onChange={handleFieldChange} required/>
                            </Form.Group>
                            
                        </Row>
                        <Form.Group as={Col} style={{"display": "flex", "flex-direction": "column", "align-items": "start"}}>
                                <Form.Label htmlFor='detailsOfIncident'>Details of Incident</Form.Label>
                                <Form.Control type="text" name="" id="detailsOfIncident" placeholder="Enter details of incident" onChange={handleFieldChange} required/>
                        </Form.Group>
                        
                        <Form.Group className="mb-3 mt-3">
                            <Form.Label>Upload support documents (max: <b>2 files</b>)</Form.Label>
                            <UploadFile setAttachedDocs={setAttachedDocs} attachedDocs={attachedDocs} />
                        </Form.Group>
                        
                        <div id='submit' ><input type="submit" value="Submit" className='btn cta' /></div>
                    </Form>
                    </div>
            </div>
            <div style={{width:"100%", position:"fixed", bottom:"0px", display:"flex", justifyContent:"flex-end"}} className={parent_container ? "chat-container" : "expanded-menu-chat-container"}>
              <Chat />
            </div> 
        </div>
    )
}

export default AddClaims
