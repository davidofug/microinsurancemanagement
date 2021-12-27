import { useEffect, useState } from 'react'
import '../../styles/Settings.css'
import profile from '../../assets/imgs/image 2.png'
import { Form, Row, Col, Alert } from 'react-bootstrap'
import { MdCheckCircle } from 'react-icons/md'
import { FaRegUserCircle } from 'react-icons/fa'
import Header from '../../parts/header/Header'

function Settings() {

    const [ selectedTab, setSelectedTab ] = useState(1)

    useEffect(() => document.title = 'Britam - User Profile', [])

    const toggleTab = (index) => setSelectedTab(index);

    return (
        <div className='components'>
            <Header title="My Profile" subtitle="MANAGE YOUR ACCOUNT" />

                <div class="componentsData">
                    <div id='settings_columns'>
                        <div id="options">
                            <ul>
                                <li><button onClick={() => toggleTab(1)} className={selectedTab === 1 ? "tabs active-tabs" : "tabs"}>Edit Profile</button></li>
                                <li><button onClick={() => toggleTab(2)} className={selectedTab === 2 ? "tabs active-tabs" : "tabs"}>Notifications</button></li>
                                <li><button onClick={() => toggleTab(3)} className={selectedTab === 3 ? "tabs active-tabs" : "tabs"}>Edit Password</button></li>
                            </ul>
                        </div>
                                <form action="">
                        <div className="tabs-content">
                            <div className={selectedTab === 1 ? "content  active-content" : "content"}>
                                <div id="edit_profile">
                                    <Form>
                                        <h2>Edit Profile</h2>
                                        <hr />
                                        <img src={profile} alt="profile image" />
                                        <Row className="mb-3">
                                            <Form.Group as={Col} controlId="formGridEmail" style={{"display": "flex", "flex-direction": "column", "align-items": "start"}}>
                                                <Form.Label>Name</Form.Label>
                                                <Form.Control value="Charles Kasasira" />
                                            </Form.Group>
                                            <Form.Group as={Col} controlId="formGridEmail" style={{"display": "flex", "flex-direction": "column", "align-items": "start"}}>
                                                <Form.Label>Phone Number</Form.Label>
                                                <Form.Control type="tel" value="077123456" />
                                            </Form.Group>
                                        </Row>
                                        <Row className="mb-3">
                                            <Form.Group as={Col} controlId="formGridEmail" style={{"display": "flex", "flex-direction": "column", "align-items": "start"}}>
                                                <Form.Label>Date of birth</Form.Label>
                                                <Form.Control type="date" value="09/10/1962"/>
                                            </Form.Group>
                                            <Form.Group as={Col} controlId="formGridEmail" style={{"display": "flex", "flex-direction": "column", "align-items": "start"}}>
                                                <Form.Label>Gender</Form.Label>
                                                <div style={{"display": "flex", "gap": "10px"}}>
                                                    <div>
                                                        <input type="radio" name="gender" id="" style={{"margin-right": "5px"}} checked/>
                                                        <label htmlFor="gender">Male</label>
                                                    </div>
                                                    <div>
                                                        <input type="radio" name="gender" id="" style={{"margin-right": "5px"}}/>
                                                        <label htmlFor="gender">Female</label>
                                                    </div>
                                                </div>
                                            </Form.Group>
                                        </Row>
                                        <Form.Group className="mb-3" controlId="formGridAddress1">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control value="charleskasasira01@gmail.com" />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formGridAddress1">
                                            <Form.Label>Address</Form.Label>
                                            <Form.Control value="Namuwongo" />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formGridAddress1">
                                            <Form.Label>Branch Name</Form.Label>
                                            <Form.Control value="Kampala" />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formGridAddress1">
                                            <Form.Label>Enter Password to confirm</Form.Label>
                                            <Form.Control placeholder='Password' />
                                        </Form.Group>
                                        <input type="submit" value="Update Profile" className="btn btn-primary cta" />
                                        
                                    </Form>
                                </div>
                            </div>
                            <div className={selectedTab === 2 ? "content  active-content" : "content"}>
                                <h2>Notifications</h2>
                                <hr />
                                <p>
                                    <Alert variant='success'> <MdCheckCircle /> You don't have any notifications</Alert>
                                </p>
                            </div>
                            <div className={selectedTab === 3 ? "content  active-content" : "content"}
                                >
                                <h2>Edit Password</h2>
                                <hr />
                                <Form>                            
                                    <Form.Group className="mb-3" controlId="formGridAddress1">
                                        <Form.Label>Old Password</Form.Label>
                                        <Form.Control type="password" placeholder="Enter old password" />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formGridAddress1">
                                        <Form.Label>New Password</Form.Label>
                                        <Form.Control type="password" placeholder="Enter new password" />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formGridAddress1">
                                        <Form.Label>Confirm Password</Form.Label>
                                        <Form.Control placeholder="Match password" type="password" />
                                    </Form.Group>
                                    <input type="submit" value="Update Password" className="btn btn-primary cta" />                              
                            </Form>
                            </div>
                        </div>
                                </form>
                    </div>
                </div>
        </div>
    )
}

export default Settings
