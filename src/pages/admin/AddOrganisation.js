import { useEffect } from 'react'
import { Form } from 'react-bootstrap'
import '../../assets/styles/addClients.css'
import Header from '../../parts/header/Header'

export default function AddOrganisation() {

    useEffect(() => { document.title = 'Britam - Add Organisations'})

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
                                            <Form.Control type="text" placeholder="Enter organisation's email" />
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
                                            <Form.Control id='role' type="email" placeholder="Role" />
                                    </Form.Group>
                                    <Form.Group className="mb-3" >
                                            <Form.Label htmlFor='title'>Title</Form.Label>
                                            <Form.Control id='title' type="email" placeholder="e.g Mr/Mrs/Ms" />
                                    </Form.Group>
                                    <Form.Group className="mb-3" >
                                            <Form.Label htmlFor='name'>Contact Name <span className='required'>*</span></Form.Label>
                                            <Form.Control id='name' type="email" placeholder="Enter contact's name" />
                                    </Form.Group>
                                    <Form.Group className="mb-3" >
                                            <Form.Label htmlFor='phone'>Contact Phone <span className='required'>*</span></Form.Label>
                                            <Form.Control id="phone" type="email" placeholder="Enter contact's phone number" />
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
