import { Modal, Form, Row, Col, Button } from 'react-bootstrap'
import { db } from '../helpers/firebase';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore'
import { authentication } from '../helpers/firebase';
import { useState } from 'react'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// firebase storage..
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from '../helpers/firebase'

function OrganisationModal({ singleDoc, handleClose, getOrganisations }) {

    const [ logo, setLogo ] = useState('')
    // initialising the logs doc.
    const logCollectionRef = collection(db, "logs");

    console.log(logo)

    let logoUrl = ""
  
    const modalSubmit = async (event) => {
        event.preventDefault()

        const organisationRef = doc(db, "organisations", singleDoc.id);

        if(logo){
            const storageRef = ref(storage, `images/${logo.name}`)
            const uploadTask = uploadBytesResumable(storageRef, logo)

            uploadTask.on(
                    "state_changed",
                    (snapshot) => {},
                    (error) => console.log(error), async () => {
                                    await getDownloadURL(uploadTask.snapshot.ref)
                                            .then((downloadUrl) => {
                                                logoUrl = downloadUrl
                                    })
                                            .then(async () => {
                                                await updateDoc(organisationRef, {
                                                    uid: authentication.currentUser.uid,
                                                    category: event.target.category.value,
                                                    name: event.target.name.value,
                                                    org_email: event.target.org_email.value,
                                                    tel: event.target.tel.value,
                                                    address: event.target.address.value,
                                                    logo: logoUrl,
                                                    role: event.target.role.value,
                                                    title: event.target.title.value,
                                                    contactName: event.target.contactName.value,
                                                    contactPhoneNumber: event.target.contactPhoneNumber.value,
                                                    contact_email: event.target.contact_email.value
                                                })
                                                    .then(() => {
                                                            toast.success(`successfully updated organisation`, {position: "top-center"})
                                                    })
                                                    .then(async () => {
                                                            await addDoc(logCollectionRef, {
                                                                    timeCreated: `${new Date().toISOString().slice(0, 10)} ${ new Date().getHours()}:${ new Date().getMinutes()}:${ new Date().getSeconds()}`,
                                                                    type: 'organisation creation',
                                                                    status: 'successful',
                                                                    message: `Successfully updated organisation: ${singleDoc.name} by ${authentication.currentUser.displayName}`
                                                            })
                                                    })
                                                    .catch(async () => {
                                                            toast.error(`Failed: couldn't update organisation`, {position: "top-center"});

                                                            await addDoc(logCollectionRef, {
                                                                    timeCreated: `${new Date().toISOString().slice(0, 10)} ${ new Date().getHours()}:${ new Date().getMinutes()}:${ new Date().getSeconds()}`,
                                                                    type: 'organisation creation',
                                                                    status: 'failed',
                                                                    message: `Failed to update organisation: ${singleDoc.name} by ${authentication.currentUser.displayName}`
                                                            })
                                                    })
                                            })
                    }
            )
    } else{
        await updateDoc(organisationRef, {
            uid: authentication.currentUser.uid,
            category: event.target.category.value,
            name: event.target.name.value,
            org_email: event.target.org_email.value,
            tel: event.target.tel.value,
            address: event.target.address.value,
            role: event.target.role.value,
            title: event.target.title.value,
            contactName: event.target.contactName.value,
            contactPhoneNumber: event.target.contactPhoneNumber.value,
            contact_email: event.target.contact_email.value
        })
            .then(() => {
                    toast.success(`successfully updated organisation`, {position: "top-center"})
            })
            .then(async () => {
                    await addDoc(logCollectionRef, {
                            timeCreated: `${new Date().toISOString().slice(0, 10)} ${ new Date().getHours()}:${ new Date().getMinutes()}:${ new Date().getSeconds()}`,
                            type: 'organisation creation',
                            status: 'successful',
                            message: `Successfully updated organisation: ${singleDoc.name} by ${authentication.currentUser.displayName}`
                    })
            })
    }       
    handleClose()  
    getOrganisations()
    
    }
    




    return (
        <>

            <Modal.Header closeButton>
                <Modal.Title>Edit {singleDoc.name}</Modal.Title>
            </Modal.Header>
            <form onSubmit={modalSubmit}>
                <Modal.Body>
                <Form.Group as={Col} style={{ display: "flex", "flex-direction": "column", "align-items": "start"}}>
                    <Form.Label htmlFor="name">Organisation Name</Form.Label>
                    <Form.Control type="text" id="name" defaultValue={singleDoc.name} />
                </Form.Group>

                <Form.Group as={Col} style={{ display: "flex", "flex-direction": "column", "align-items": "start"}}>
                    <Form.Label htmlFor="category">Category</Form.Label>
                    <Form.Select aria-label="User role" id='category' defaultValue={singleDoc.category}>
                        <option value="hide">--Select Category--</option>
                        <option value="mtp">Bank</option>
                        <option value="comprehensive">Brokers</option>
                        <option value="windscreen">MTN</option>
                        <option value="windscreen">Shell</option>
                        <option value="windscreen">others</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group as={Col} style={{ display: "flex", "flex-direction": "column", "align-items": "start"}}>
                    <Form.Label htmlFor="org_email">Email</Form.Label>
                    <Form.Control type="email" id="org_email" defaultValue={singleDoc.org_email} required/>
                </Form.Group>

                <Row>
                    <Form.Group as={Col} style={{ display: "flex", "flex-direction": "column", "align-items": "start"}}>
                        <Form.Label htmlFor="tel">Contact</Form.Label>
                        <Form.Control type="text" id="tel" defaultValue={singleDoc.tel} />
                    </Form.Group>

                    <Form.Group as={Col} style={{ display: "flex", "flex-direction": "column", "align-items": "start"}}>
                        <Form.Label htmlFor="address">Address</Form.Label>
                        <Form.Control type="text" id="address" defaultValue={singleDoc.address} />
                    </Form.Group>
                </Row>

                <hr></hr>
                <p style={{color: "#76859a"}}>Contact's Details</p>
                <Form.Group as={Col} style={{ display: "flex", "flex-direction": "column", "align-items": "start"}}>
                    <Form.Label htmlFor="contactName">Name</Form.Label>
                        <Row>
                            <Col><Form.Control type="text" id="title" className='col-4' defaultValue={singleDoc.title} /></Col>
                            <Col xs={10}><Form.Control type="text" id="contactName" className='col-8' defaultValue={singleDoc.contactName} /></Col>
                        </Row>
                </Form.Group>

                <Row>
                <Form.Group as={Col} style={{ display: "flex", "flex-direction": "column", "align-items": "start"}}>
                    <Form.Label htmlFor="tel">Role</Form.Label>
                    <Form.Control type="text" id="role" defaultValue={singleDoc.role} />
                </Form.Group>

                <Form.Group as={Col} style={{ display: "flex", "flex-direction": "column", "align-items": "start"}}>
                    <Form.Label htmlFor="contactPhoneNumber">Phone Number</Form.Label>
                    <Form.Control type="text" id="contactPhoneNumber" defaultValue={singleDoc.contactPhoneNumber} />
                </Form.Group>
                </Row>

                <Form.Group as={Col} style={{ display: "flex", "flex-direction": "column", "align-items": "start"}}>
                    <Form.Label htmlFor="contact_email">Email</Form.Label>
                    <Form.Control type="email" id="contact_email" defaultValue={singleDoc.contact_email} required/>
                </Form.Group>

                <Form.Group as={Col} style={{ display: "flex", "flex-direction": "column", "align-items": "start"}} className='mt-3'>
                    <input type="file" onChange={(event) => setLogo(event.target.files[0])} />
                    <img src={singleDoc.logo} width={150} alt='logo' />
                </Form.Group>
               

                

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit" onClick={handleClose} id="submit">
                        Save Changes
                    </Button>
                </Modal.Footer>
            </form>
        </>
    )
}

export default OrganisationModal
