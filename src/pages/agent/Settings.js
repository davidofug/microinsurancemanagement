import { useEffect, useState } from 'react'
import '../../styles/Settings.css'
import { Form, Row, Col, Alert, Modal, Button, Badge } from 'react-bootstrap'
import { MdCheckCircle } from 'react-icons/md'
import Header from '../../components/header/Header'
import DefaultAvatar from '../../components/DefaultAvatar'
import { authentication } from '../../helpers/firebase'
import { AiOutlineEdit } from 'react-icons/ai'

function Settings() {

    const [ selectedTab, setSelectedTab ] = useState(1)
    const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    useEffect(() => document.title = 'Britam - User Profile', [])

    const toggleTab = (index) => setSelectedTab(index);

    const [editFormData, setEditFormData] = useState({
        name: "John Doe",
        number: "077123456",
        date: "1999-10-09",
        gender: "",
        branch: "Kampala",
        email: "johndoe@gmail.com",
        address: "Kisugu",
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

    console.log(authentication.currentUser)

    return (
        <div className='components'>
            <Header title="Setting" subtitle="CUSTOMIZE YOUR ACCOUNT" />


            <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Form id="update_claim" >
          <Modal.Body>
                <DefaultAvatar />
                <Form.Group className="mb-3" controlId="formGridAddress1">
                    <Form.Label htmlFor='newPassword'>Change Name</Form.Label>
                    <Form.Control type="password" id='newPassword' placeholder="Enter full Name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGridAddress1">
                    <Form.Label htmlFor='newPassword'>Change Phone Number</Form.Label>
                    <Form.Control type="password" id='newPassword' placeholder="Enter new phone number" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGridAddress1">
                    <Form.Label htmlFor='newPassword'>Change Email</Form.Label>
                    <Form.Control type="password" id='newPassword' placeholder="Enter new email" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGridAddress1">
                    <Form.Label htmlFor='newPassword'>Change Address</Form.Label>
                    <Form.Control type="password" id='newPassword' placeholder="Enter new address" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGridAddress1">
                    <Form.Label htmlFor='newPassword'>Enter Password to confirm</Form.Label>
                    <Form.Control type="password" id='newPassword' placeholder="Enter password" />
                </Form.Group>
            <Button
              variant="primary"
              type="submit"
              onClick={() => {
                handleClose();
              }}
              id="submit"
            >
              Save
            </Button>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Form>
      </Modal>

                <div class="componentsData myProfile">
                                <div id="edit_profile">
                                        <form onSubmit={handleEditFormSubmit}>
                                            <h2>Profile</h2>
                                            <p>User Detail</p>
                                            <div className='profileSection'>
                                                <div className="avatarSection">
                                                    <DefaultAvatar />
                                                    <div>
                                                        <h6 style={{margin: "0"}}>{authentication.currentUser.displayName}</h6>
                                                        <p>{authentication.currentUser.email}</p>
                                                    </div>
                                                </div>
                                                <button className="btn btn-primary cta" onClick={handleShow}><AiOutlineEdit /></button>
                                                
                                            </div>
                                            <Badge >Agent</Badge>

                                            
                                            
                                        </form>
                                </div>

                                <div id="edit_profile">
                                        <form onSubmit={handleEditFormSubmit}>
                                            <h2>Notification</h2>
                                            <Alert variant='success'> <MdCheckCircle /> You don't have any notifications</Alert>
                                            
                                        </form>
                                </div>

                                <div id="edit_profile">
                                        <form onSubmit={handleEditFormSubmit}>
                                            <h2>Password and Security</h2>
                                            <p>change your password</p>
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
                                        </form>
                                </div>
                </div>
        </div>
    )
}

export default Settings


