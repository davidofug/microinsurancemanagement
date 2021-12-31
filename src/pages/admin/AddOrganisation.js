import { useEffect } from 'react'
import { Form } from 'react-bootstrap'
import '../../assets/styles/addClients.css'
import Header from '../../parts/header/Header'
import { db } from '../../helpers/firebase'
import { collection, addDoc } from 'firebase/firestore'
import { useForm } from '../../hooks/useForm'

export default function AddOrganisation() {

    useEffect(() => { document.title = 'Britam - Add Organisations'}, [])

    const organisationsCollectionRef = collection(db, 'organisations')
    const [fields, handleFieldChange] = useForm({
        name: '',
        org_email: '',
        tel: '',
        address: '',
        logo: '',
        role: '',
        title: '',
        contactName: '',
        contactPhoneNumber: '',
        contact_email: '',
        password: ''

    })

    const createOrganisation = async (event) => {
        event.preventDefault()
        await addDoc(organisationsCollectionRef, fields)
      }

    return (
        <div className='components'>
            <Header title="Add Organisations" subtitle="ADD A NEW ORGANISATION" />

            <div className="componentsData">
                <div id="addForm">
                        <Form>
                            <div className='organisation-columns'>
                                <div>
                                    <Form.Group className="mb-3" >
                                            <Form.Label>Organisations Name <span className='required'>*</span></Form.Label>
                                            <Form.Control type="text" id='name' placeholder="Enter organisation's email" />
                                    </Form.Group>
                                    <Form.Group className="mb-3" >
                                            <Form.Label htmlFor="org_email">Organisation Email <span className='required'>*</span></Form.Label>
                                            <Form.Control id="org_email" type="tel" placeholder="Enter Email" />
                                    </Form.Group>
                                    <Form.Group className="mb-3" >
                                            <Form.Label htmlFor="tel">Organisation Phone No. <span className='required'>*</span></Form.Label>
                                            <Form.Control id="tel" type="tel" placeholder="Phone Number" />
                                    </Form.Group>
                                    <Form.Group className="mb-3" >
                                            <Form.Label htmlFor='address'>Address</Form.Label>
                                            <Form.Control id="address" placeholder="Enter your address" />
                                    </Form.Group>
                                    <Form.Group controlId="formFile" className="mb-3">
                                            <Form.Label htmlFor='logo'>upload Organisation Logo</Form.Label>
                                            <Form.Control id='logo' type="file" />
                                    </Form.Group>
                                </div>
                                <div>
                                    <Form.Group className="mb-3" >
                                            <Form.Label htmlFor='role'>Contact Role <span className='required'>*</span></Form.Label>
                                            <Form.Control id='role' type="text" placeholder="Role" />
                                    </Form.Group>
                                    <Form.Group className="mb-3" >
                                            <Form.Label htmlFor='title'>Title</Form.Label>
                                            <Form.Control id='title' type="email" placeholder="e.g Mr/Mrs/Ms" />
                                    </Form.Group>
                                    <Form.Group className="mb-3" >
                                            <Form.Label htmlFor='contactName'>Contact Name <span className='required'>*</span></Form.Label>
                                            <Form.Control id='contactName' type="email" placeholder="Enter contact's name" />
                                    </Form.Group>
                                    <Form.Group className="mb-3" >
                                            <Form.Label htmlFor='contactPhoneNumber'>Contact Phone <span className='required'>*</span></Form.Label>
                                            <Form.Control id="contactPhoneNumber" type="email" placeholder="Enter contact's phone number" />
                                    </Form.Group>
                                    <Form.Group className="mb-3" >
                                            <Form.Label htmlFor='contact_email'>Contact Email</Form.Label>
                                            <Form.Control id="contact_email" type="email" placeholder="Enter email" />
                                    </Form.Group>
                                    <Form.Group className="mb-3" >
                                            <Form.Label htmlFor='password'>Contact Password</Form.Label>
                                            <Form.Control id="password" type="email" placeholder="create password" />
                                    </Form.Group>
                                </div>
                            </div>
                            <div id='submit' ><input type="submit" value="Submit" className='btn btn-primary cta' /></div>
                        </Form>
                </div>
            </div>
        </div>
    )
}
