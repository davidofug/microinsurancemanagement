import '../assets/styles/addClients.css'
import { useEffect } from 'react'
import { Form, Row, Col} from 'react-bootstrap';
import Upload from '../parts/uploader/Upload';
import Header from '../parts/header/Header';

function AddClients() {

    useEffect(() => document.title = 'Britam - Add Clients', [])

    return (
        <div className='components'>
            <Header title="Add Clients" subtitle="ADD A NEW CLIENT" />

            <div className="componentsData" >


            <div id="addForm">
                    <Form>
                        <Form.Group className="mb-3" >
                            <Form.Label>Name <span className='required'>*</span></Form.Label>
                            <Form.Control placeholder="Enter Client's name" />
                        </Form.Group>
                        <Row className="mb-3">
                            <Form.Group as={Col} className='addFormGroups'>
                                <Form.Label>Date of birth</Form.Label>
                                <Form.Control type="date" />
                            </Form.Group>
                            <Form.Group as={Col} className='addFormGroups'>
                                <Form.Label htmlFor='gender'>Gender <span className='required'>*</span></Form.Label>
                                <div className='gender-options'>
                                    <div>
                                        <input type="radio" name="gender" id="male" className='addFormRadio'/>
                                        <label htmlFor="male">Male</label>
                                    </div>
                                    <div>
                                        <input type="radio" name="gender" id="female" className='addFormRadio'/>
                                        <label htmlFor="female">Female</label>
                                    </div>
                                </div>
                            </Form.Group>
                        </Row>
                        
                        <Row className="mb-3">
                            <Form.Group as={Col} className='addFormGroups'>
                                <Form.Label htmlFor='email'>Email Address</Form.Label>
                                <Form.Control type="email" id="email" placeholder="Enter email" />
                            </Form.Group>
                            <Form.Group as={Col} className='addFormGroups'>
                                <Form.Label htmlFor='phone'>Phone Number <span className='required'>*</span></Form.Label>
                                <Form.Control type="tel" id="phone" placeholder="Enter phone number" />
                            </Form.Group>
                        </Row>
                        <Form.Group className="mb-3" >
                            <Form.Label htmlFor='address'>Address</Form.Label>
                            <Form.Control id="address" placeholder="Enter your address" />
                        </Form.Group>
                        <Form.Label htmlFor='upload'>Upload Profile photo</Form.Label>
                        <Upload />
                    <div id='submit' ><input type="submit" value="Submit" className='btn btn-primary cta submitcta' /></div>
                    </Form>

                </div>
            </div>
        </div>
    )
}

export default AddClients
