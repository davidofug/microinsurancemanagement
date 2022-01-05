import { useEffect } from 'react'
import { Form } from 'react-bootstrap'
import '../../assets/styles/addClients.css'
import Header from '../../parts/header/Header'
import { authentication, db } from '../../helpers/firebase'
import { collection, addDoc } from 'firebase/firestore'
import { useForm } from '../../hooks/useForm'

export default function AddOrganisation() {

    useEffect(() => { document.title = 'Britam - Add Organisations'}, [])

    const organisationsCollectionRef = collection(db, 'organisations')
    const [fields, handleFieldChange] = useForm({
        uid: authentication.currentUser.uid,
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
        alert(`successfully added ${fields.name}`)
        document.form2.reset()
      }

    return (
        <div className='components'>
            <Header title="Add Organisations" subtitle="ADD A NEW ORGANISATION" />

            <div className="componentsData">
                <div id="addForm">
                        <Form name='form2' onSubmit={createOrganisation}>
                            <div className='organisation-columns'>
                                <div>
                                    <Form.Group className="mb-3" >
                                            <Form.Label>Organisations Name <span className='required'>*</span></Form.Label>
                                            <Form.Control type="text" id='name' placeholder="Enter organisation's name" onChange={handleFieldChange} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" >
                                            <Form.Label htmlFor="org_email">Organisation Email <span className='required'>*</span></Form.Label>
                                            <Form.Control id="org_email" type="tel" placeholder="Enter Email" onChange={handleFieldChange} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" >
                                            <Form.Label htmlFor="tel">Organisation Phone No. <span className='required'>*</span></Form.Label>
                                            <Form.Control id="tel" type="tel" placeholder="Phone Number" onChange={handleFieldChange} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" >
                                            <Form.Label htmlFor='address'>Address</Form.Label>
                                            <Form.Control id="address" placeholder="Enter your address" onChange={handleFieldChange}/>
                                    </Form.Group>
                                    <Form.Group controlId="formFile" className="mb-3">
                                            <Form.Label htmlFor='logo'>upload Organisation Logo</Form.Label>
                                            <Form.Control id='logo' type="file" onChange={handleFieldChange} />
                                    </Form.Group>
                                </div>
                                <div>
                                    <Form.Group className="mb-3" >
                                            <Form.Label htmlFor='role'>Contact Role <span className='required'>*</span></Form.Label>
                                            <Form.Control id='role' type="text" placeholder="Role" onChange={handleFieldChange} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" >
                                            <Form.Label htmlFor='title'>Title</Form.Label>
                                            <Form.Control id='title' type="text" placeholder="e.g Mr/Mrs/Ms" onChange={handleFieldChange} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" >
                                            <Form.Label htmlFor='contactName'>Contact Name <span className='required'>*</span></Form.Label>
                                            <Form.Control id='contactName' type="text" placeholder="Enter contact's name" onChange={handleFieldChange} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" >
                                            <Form.Label htmlFor='contactPhoneNumber'>Contact Phone <span className='required'>*</span></Form.Label>
                                            <Form.Control id="contactPhoneNumber" type="tel" placeholder="Enter phone number" onChange={handleFieldChange} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" >
                                            <Form.Label htmlFor='contact_email'>Contact Email</Form.Label>
                                            <Form.Control id="contact_email" type="email" placeholder="Enter email" onChange={handleFieldChange} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" >
                                            <Form.Label htmlFor='password'>Contact Password</Form.Label>
                                            <Form.Control id="password" type="text" placeholder="Create password" onChange={handleFieldChange} />
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
