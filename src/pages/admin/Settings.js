import { useEffect, useState } from 'react'
import '../../styles/Settings.css'
import { Form, Row, Col, Alert } from 'react-bootstrap'
import { MdCheckCircle } from 'react-icons/md'
import Header from '../../components/header/Header'
import DefaultAvatar from '../../components/DefaultAvatar'
import { authentication } from "../../helpers/firebase";

function Settings() {

    const [ selectedTab, setSelectedTab ] = useState(1)

    useEffect(() => {
        document.title = 'Britam - User Profile'
    }, [])

    const toggleTab = (index) => setSelectedTab(index);

    const [editFormData, setEditFormData] = useState({
        name: "Charles Kasasira",
        number: "077123456",
        date: "1962-10-09",
        gender: "",
        branch: "Kampala",
        email: "charleskasasira@gmail.com",
        address: "Namuwongo",
    });

    const handleEditFormChange = (event) => {
        event.preventDefault();
        const fieldName = event.target.getAttribute("name")
        const newFormData = { ...editFormData }
        newFormData[fieldName] = event.target.value
    
        setEditFormData(newFormData);
      };

    const handleEditFormSubmit = (event) => {
        event.preventDefault();
    }



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
                        <div>
                            <div className="tabs-content">
                                <div className={selectedTab === 1 ? "content  active-content" : "content"}>
                                    <div id="edit_profile">
                                        <Form onSubmit={handleEditFormSubmit}>
                                            <h2>Edit Profile</h2>
                                            <hr />
                                            <DefaultAvatar />
                                            <Row className="mb-3">
                                                <Form.Group as={Col} controlId="formGridEmail" style={{"display": "flex", "flex-direction": "column", "align-items": "start"}}>
                                                    <Form.Label>Name</Form.Label>
                                                    <Form.Control 
                                                    name="name"
                                                    value={authentication.currentUser.displayName}
                                                    onChange={handleEditFormChange} />
                                                </Form.Group>
                                                <Form.Group as={Col} controlId="formGridEmail" style={{"display": "flex", "flex-direction": "column", "align-items": "start"}}>
                                                    <Form.Label>Phone Number</Form.Label>
                                                    <Form.Control type="tel"
                                                        name="number" 
                                                        value={authentication.currentUser.phoneNumber} 
                                                        onChange={handleEditFormChange}
                                                    />
                                                </Form.Group>
                                            </Row>
                                            <Row className="mb-3">
                                                <Form.Group as={Col} controlId="formGridEmail" style={{"display": "flex", "flex-direction": "column", "align-items": "start"}}>
                                                    <Form.Label>Date of birth</Form.Label>
                                                    <Form.Control type="date" name="date" value={editFormData.date} onChange={handleEditFormChange}/>
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
                                                <Form.Control onChange={handleEditFormChange}
                                                    name="email"
                                                    value={authentication.currentUser.email} />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formGridAddress1">
                                                <Form.Label>Address</Form.Label>
                                                <Form.Control value={editFormData.address} name="address" onChange={handleEditFormChange} />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formGridAddress1">
                                                <Form.Label>Branch Name</Form.Label>
                                                <Form.Control value={editFormData.branch} name="branch" onChange={handleEditFormChange} />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formGridAddress1">
                                                <Form.Label>Enter Password to confirm</Form.Label>
                                                <Form.Control type="password" placeholder='Password' />
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
                                            <Form.Label htmlFor='oldPassword'>Old Password</Form.Label>
                                            <Form.Control type="password" id='oldPassword' placeholder="Enter old password" />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formGridAddress1">
                                            <Form.Label htmlFor='newPassword'>New Password</Form.Label>
                                            <Form.Control type="password" id='newPassword' placeholder="Enter new password" />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formGridAddress1">
                                            <Form.Label htmlFor='confirmPassword'>Confirm Password</Form.Label>
                                            <Form.Control placeholder="Match password" id='confirmPassword' type="password" />
                                        </Form.Group>
                                        <input type="submit" value="Update Password" className="btn btn-primary cta" />                              
                                </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default Settings
