import '../../assets/styles/addClients.css'
import { useEffect } from 'react'
import { Form } from 'react-bootstrap'
import Header from '../../parts/header/Header'
import Upload from '../../parts/uploader/Upload'

function AddOrganisation() {

    useEffect(() => { document.title = 'Britam - Add Organisations'}, [])

    return (
        <div className='components'>
            <Header title="Add Organisations" subtitle="ADD A NEW ORGANISATION" />

            <div class="componentsData" style={{"display": "flex", justifyContent: "center", "background-color": "#fff", "margin-top": "60px", "border-radius": "10px"}}>
                <Form>
                    <div style={{"display": "grid", "grid-template-columns": "1fr 1fr", "gap": "50px"}}>
                        <div>
                            <Form.Group className="mb-3" controlId="formGridAddress1">
                                    <Form.Label>Organisations Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter organisation's email" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGridAddress1">
                                    <Form.Label>Organisation Email <span className='required'>*</span></Form.Label>
                                    <Form.Control type="tel" placeholder="Enter Email" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGridAddress1">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control placeholder="Enter your address" />
                            </Form.Group>
                            <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>upload Organisation Logo</Form.Label>
                                    <Form.Control type="file" />
                            </Form.Group>
                        </div>
                        <div>
                            <Form.Group className="mb-3" controlId="formGridAddress1">
                                    <Form.Label>Contact Role</Form.Label>
                                    <Form.Control type="email" placeholder="Role" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGridAddress1">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control type="email" placeholder="e.g Mr/Mrs/Ms" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGridAddress1">
                                    <Form.Label>Contact Name</Form.Label>
                                    <Form.Control type="email" placeholder="Enter contact's name" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGridAddress1">
                                    <Form.Label>Contact Phone</Form.Label>
                                    <Form.Control type="email" placeholder="Enter contact's phone number" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGridAddress1">
                                    <Form.Label>Contact Email</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGridAddress1">
                                    <Form.Label>Contact Password</Form.Label>
                                    <Form.Control type="email" placeholder="create password" />
                            </Form.Group>

                        </div>
                    </div>

                    <div id='submit' ><input type="submit" value="Submit" className='btn btn-primary cta' /></div>
                    </Form>
            </div>
        </div>
    )
}

export default AddOrganisation
