import { Form, Modal, Button } from 'react-bootstrap'
import DefaultAvatar from './DefaultAvatar';
import { MdSave } from 'react-icons/md'

function UpdateUser({currentUser, handleEditFormSubmit, meta}) {
  return (
      <>
        <Modal.Header closeButton>
            <Modal.Title>Edit {currentUser.displayName}</Modal.Title>
            </Modal.Header>
        <form id="update_claim" onSubmit={handleEditFormSubmit}>
          <Modal.Body>
                <DefaultAvatar />
                <Form.Group className="mb-3">
                    <Form.Label htmlFor='newPassword'>Change Name</Form.Label>
                    <Form.Control type="text" id='name' placeholder="Enter full Name" defaultValue={currentUser.displayName}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor='newPassword'>Change Email</Form.Label>
                    <Form.Control type="email" id='email' placeholder="Enter new address" defaultValue={currentUser.email}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor='newPassword'>Change Phone Number</Form.Label>
                    <Form.Control type="tel" id='phone' placeholder="Enter new phone number" defaultValue={meta.phone} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor='newPassword'>Change Address</Form.Label>
                    <Form.Control type="text" id='address' placeholder="Enter new address" defaultValue={meta.address}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor='submitPassword'>Enter Password to confirm</Form.Label>
                    <Form.Control type="password" id='submitPassword' placeholder="Enter password" required/>
                </Form.Group>
          </Modal.Body>
          <Modal.Footer>
          <Button variant="primary" type="submit" id="submit"><div style={{justifyContent: "center", alignItems: "center"}}><MdSave /> Save</div></Button>
          </Modal.Footer>
        </form>
      </>

  )
}

export default UpdateUser;
