import '../../assets/styles/addClients.css'
import { useEffect } from 'react'
import { Form, Row, Col, Dropdown, DropdownButton, ButtonGroup } from 'react-bootstrap'
import Upload from '../../parts/uploader/Upload'
import Header from '../../parts/header/Header'

function AddSupervisors() {

    useEffect(() => {document.title = 'Britam - Add Supervisors'}, [])

    return (
        <div className='components'>
            <Header title="Add Supervisors" subtitle="ADD A NEW SUPERVISOR" />

            <div class="addComponentsData">
                <div>
                <Form>
                        <Form.Group className="mb-3" >
                            <Form.Label htmlFor='name'>Name <span className='required'>*</span></Form.Label>
                            <Form.Control id="name" placeholder="supervisor's name" />
                        </Form.Group>
                        <Row className="mb-3">
                            <Form.Group as={Col} className='addFormGroups'>
                                <Form.Label htmlFor='date'>Date of birth</Form.Label>
                                <Form.Control type="date" id="date" />
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
                        <Form.Group className="mb-3" >
                            <Form.Label htmlFor='license'>License No.</Form.Label>
                            <Form.Control id="license" placeholder="license No." />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label htmlFor='nin'>NIN</Form.Label>
                            <Form.Control id="nin" placeholder="NIN" />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label htmlFor='access'>User Access Role</Form.Label>
                            <div>
                                <select name="stickerCategory" id="stickerCategory">
                                    <option value="hide">--sticker category--</option>
                                    <option value="MTP">MTP</option>
                                    <option value="Comprehensive">Comprehensive</option>
                                    <option value="Windscreen">Windscreen</option>
                                </select>
                            </div>
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

export default AddSupervisors
