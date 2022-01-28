import { useEffect, useState } from 'react'
import '../styles/Settings.css'
import { Form, Alert, Modal, Button, Badge } from 'react-bootstrap'
import { MdCheckCircle } from 'react-icons/md'
import Header from '../components/header/Header'
import DefaultAvatar from '../components/DefaultAvatar'
import { authentication, db, functions } from '../helpers/firebase'
import { AiOutlineEdit } from 'react-icons/ai'
import { httpsCallable } from 'firebase/functions';
import useDialog from '../hooks/useDialog'
import useAuth from '../contexts/Auth'
import { getAuth, updateProfile, updateEmail, updatePassword } from "firebase/auth";
import { getDoc, doc, updateDoc } from 'firebase/firestore'
import { useForm } from '../hooks/useForm'

import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Settings() {

    const [ show, handleShow, handleClose ] = useDialog()

    const [fields, handleFieldChange] = useForm({
        uid: authentication.currentUser.uid,
    })

    useEffect(() => { document.title = 'Britam - User Profile'; getUserMeta();}, [])

    const [ meta, setMeta ] = useState([])

    

    const auth = getAuth()
    const { currentUser } = auth;
    const { authClaims } = useAuth()

    const getUserMeta = async () => {
        const docRef = doc(db, "usermeta", currentUser.uid);
        const docSnap = await getDoc(docRef);
        setMeta(docSnap.data());
      };

   const handleEditFormSubmit = async(event) => {
       event.preventDefault()
    const docRef = doc(db, "usermeta", currentUser.uid);

    updateProfile(auth.currentUser, {
        displayName: event.target.name.value
      }).then(() => {
        
      }).catch((error) => {
        console.log(error)
      });

      updateEmail(auth.currentUser, event.target.email.value).then(() => {
        console.log("email update")
      }).catch((error) => {
        console.log(error)
      });


    await updateDoc(docRef, {
        phone: event.target.phone.value,
        address: event.target.address.value
    });
    toast.success('Successfully updated', {position: "top-center"});
    getUserMeta()
   }

   const handlePasswordChange = async (event) => {
    event.preventDefault()

    /* const credential = authentication.EmailAuthProvider.credential(
        auth.currentUser.email,
        event.target.oldPassword.value
      );

      auth.currentUser.reauthenticateWithCredential(credential).then(function() {
        console.log("successfully got the password")
      }).catch(function(error) {
        console.log("password failed", error)
      }); */

    if(event.target.password.value === event.target.newPassword.value){
        updatePassword(auth.currentUser, event.target.password.value).then(() => {
            toast.success('Successfully updated password', {position: "top-center"});
          }).catch((error) => {
            error.code === "auth/weak-password" 
                ? toast.error('Weak password', {position: "top-center"})
                : error.code === 'auth/requires-recent-login' 
                    ? toast.error('This action requires you to re-login in first', {position: "top-center"})
                    : toast.error('Failed, Try again', {position: "top-center"}); 
            
          });
    } else{
        toast.error("Password doesn't match", {position: "top-center"});
    }
   }

//    console.log(currentUser.reloadUserInfo.passwordHash)
console.log(authentication)

    return (
        <div className='components'>
            <Header title="Setting" subtitle="CUSTOMIZE YOUR ACCOUNT" />
            <ToastContainer />

            <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Form id="update_claim" onSubmit={handleEditFormSubmit}>
          <Modal.Body>
                <DefaultAvatar />
                <Form.Group className="mb-3" controlId="formGridAddress1">
                    <Form.Label htmlFor='newPassword'>Change Name</Form.Label>
                    <Form.Control type="text" id='name' placeholder="Enter full Name" defaultValue={currentUser.displayName}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGridAddress1">
                    <Form.Label htmlFor='newPassword'>Change Email</Form.Label>
                    <Form.Control type="email" id='email' placeholder="Enter new address" defaultValue={currentUser.email}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGridAddress1">
                    <Form.Label htmlFor='newPassword'>Change Phone Number</Form.Label>
                    <Form.Control type="tel" id='phone' placeholder="Enter new phone number" defaultValue={meta.phone} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGridAddress1">
                    <Form.Label htmlFor='newPassword'>Change Address</Form.Label>
                    <Form.Control type="text" id='address' placeholder="Enter new address" defaultValue={meta.address}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGridAddress1">
                    <Form.Label htmlFor='newPassword'>Enter Password to confirm</Form.Label>
                    <Form.Control type="password" id='newPassword' placeholder="Enter password" />
                </Form.Group>
          </Modal.Body>
          <Modal.Footer>
          <Button
              variant="primary"
              type="submit"
              onClick={handleClose}
              id="submit"
            >
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

                <div >
                                <div id="edit_profile" className="componentsData myProfile shadow-sm mb-3">
                                        <div className='mt-3'>
                                            <h2>Profile</h2>
                                            <p>User Detail</p>
                                            <div className='profileSection'>
                                                <div className="avatarSection">
                                                    <DefaultAvatar />
                                                    <div>
                                                        <h6 style={{margin: "0"}}>{currentUser.displayName}</h6>
                                                        <p>{currentUser.email}</p>
                                                    </div>
                                                </div>
                                                <button className="btn btn-primary cta" onClick={handleShow}><AiOutlineEdit /></button>
                                                
                                            </div>
                                            
                                        </div>

                                        <div className='mb-3 mt-3'>
                                        <h6>General Information</h6>
                                            <div style={{display: "flex", justifyContent: "space-between", padding: "0 2rem"}} className='mb-2'>
                                                <th style={{paddingRight: "10rem"}}><p>Role</p></th>
                                                {authClaims.agent && <td><Badge>Agent</Badge></td>}
                                                {authClaims.supervisor && <td><Badge>Supervisor</Badge></td>}
                                                {authClaims.admin && <td><Badge>Admin</Badge></td>}
                                                {authClaims.superadmin && <td><Badge>Super Admin</Badge></td>}
                                            </div>
                                            <div style={{display: "flex", justifyContent: "space-between", padding: "0 2rem"}} className='mb-2'>
                                                <th style={{paddingRight: "10rem"}}><p>Gender</p></th>
                                                <td><p>{meta.gender}</p></td>
                                            </div>
                                            <div style={{display: "flex", justifyContent: "space-between", padding: "0 2rem"}} className='mb-2'>
                                                <th style={{paddingRight: "10rem"}}><p>Address</p></th>
                                                <td><p>{meta.address}</p></td>
                                            </div>
                                            <div style={{display: "flex", justifyContent: "space-between", padding: "0 2rem"}} className='mb-2'>
                                                <th style={{paddingRight: "10rem"}}><p>Contact</p></th>
                                                <td><p>{meta.phone}</p></td>
                                            </div>
                                        </div>
                                        
                                        
                                </div>

                                <div id="edit_profile" className="componentsData myProfile shadow-sm mb-3">
                                        <div>
                                            <h2>Notification</h2>
                                            <Alert variant='success'> <MdCheckCircle /> You don't have any notifications</Alert>
                                            
                                        </div>
                                </div>

                                <div id="edit_profile" className="componentsData myProfile shadow-sm mb-3">
                                        <form onSubmit={handlePasswordChange}>
                                            <h2>Password and Security</h2>
                                            <p>change your password</p>
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
                                            <Form.Control placeholder="Match password" id='password' type="password" />
                                        </Form.Group>
                                        <input type="submit" value="Update Password" className="btn btn-primary cta" />                              
                                        </form>
                                </div>
                </div>
        </div>
    )
}

export default Settings


