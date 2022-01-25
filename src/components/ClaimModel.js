import { Table, Modal, Form, Col, Row, Button } from "react-bootstrap";

export function ClaimModelNotification({ singleDoc }) {
  return <div>
      <Modal.Header closeButton>
          <Modal.Title>View Claim Settlement</Modal.Title>
        </Modal.Header>
        <Form id="update_claim">
          <Modal.Body>
                <div className="mb-3">
                  Status:
                  <span style={{backgroundColor: "#337ab7", padding: ".4em .6em", borderRadius: ".25em", color: "#fff", fontSize: "85%"}}
                  > {singleDoc.status}</span>
                </div>
                

          <h5>Client Details</h5>
            <Row className="mb-3">
              <Form.Group
                as={Col}
                style={{
                  display: "flex",
                  "flex-direction": "column",
                  "align-items": "start",
                }}
              >
                <Form.Label htmlFor="claimantName">Name</Form.Label>
                <p>{singleDoc.claimantName}</p>
              </Form.Group>
              <Form.Group
                as={Col}
                style={{
                  display: "flex",
                  "flex-direction": "column",
                  "align-items": "start",
                }}
              >
                <Form.Label htmlFor="claimantEmail">Email Address</Form.Label>
                <p>{singleDoc.claimantEmail}</p>
              </Form.Group>
            </Row>

            <Form.Group
                as={Col}
                style={{
                  display: "flex",
                  "flex-direction": "column",
                  "align-items": "start",
                }}
              >
                <Form.Label htmlFor="claimantPhoneNumber">
                  Phone Number
                </Form.Label>
                <p>{singleDoc.claimantPhoneNumber}</p>
              </Form.Group>

              <hr />
            


            <Row className="mb-3">
              <Form.Group
                as={Col}
                style={{
                  display: "flex",
                  "flex-direction": "column",
                  "align-items": "start",
                }}
              >
                <Form.Label htmlFor="dateReported">Date Reported</Form.Label>
                <p>{singleDoc.dateReported}</p>
              </Form.Group>
              <Form.Group
                as={Col}
                style={{
                  display: "flex",
                  "flex-direction": "column",
                  "align-items": "start",
                }}
              >
                <Form.Label htmlFor="policyType">Policy Type</Form.Label>
                <p>{singleDoc.policyType}</p>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              
              <Form.Group
                as={Col}
                style={{
                  display: "flex",
                  "flex-direction": "column",
                  "align-items": "start",
                }}
              >
                <Form.Label htmlFor="stickerNumber">Sticker No.</Form.Label>
                <p>{singleDoc.stickerNumber}</p>
              </Form.Group>

              <Form.Group
                as={Col}
                style={{
                  display: "flex",
                  "flex-direction": "column",
                  "align-items": "start",
                }}
              >
                <Form.Label htmlFor="numberPlate">Plate No.</Form.Label>
                <p>{singleDoc.numberPlate}</p>
              </Form.Group>
            </Row>
            
            <Row>
              
              <Form.Group
                as={Col}
                style={{
                  display: "flex",
                  "flex-direction": "column",
                  "align-items": "start",
                }} className="mb-3"
              >
                <Form.Label htmlFor="dateOfIncident">
                  Date of Incident
                </Form.Label>
                <p>{singleDoc.dateOfIncident}</p>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group
                as={Col}
                style={{
                  display: "flex",
                  "flex-direction": "column",
                  "align-items": "start",
                }}
              >
                <Form.Label htmlFor="estimate">Claim Estimate</Form.Label>
                <p>{singleDoc.estimate}</p>
              </Form.Group>
            </Row>
            
          </Modal.Body>
        </Form>
  </div>;
}

export function ClaimModel({singleDoc, handleClose, handleFieldChange, modalSubmit}) {

    return <div>
        <Modal.Header closeButton>
          <Modal.Title>Edit {singleDoc.claimantName}'s Claim</Modal.Title>
        </Modal.Header>
        <Form id="update_claim" onSubmit={modalSubmit}>
          <Modal.Body>
            <Row className="mb-3">
              <Form.Group
                as={Col}
                style={{
                  display: "flex",
                  "flex-direction": "column",
                  "align-items": "start",
                }}
              >
                <Form.Label htmlFor="dateReported">Date Reported</Form.Label>
                <Form.Control
                  type="date"
                  id="dateReported"
                  defaultValue={singleDoc.dateReported}
                  onChange={handleFieldChange}
                />
              </Form.Group>
              <Form.Group
                as={Col}
                style={{
                  display: "flex",
                  "flex-direction": "column",
                  "align-items": "start",
                }}
              >
                <Form.Label htmlFor="policyType">Policy</Form.Label>
                <Form.Select
                  aria-label="User role"
                  id="policyType"
                  defaultValue={singleDoc.policyType}
                  onChange={handleFieldChange}
                >
                  <option value="hide">--Select Category--</option>
                  <option value="mtp">MTP</option>
                  <option value="comprehensive">Comprehensive</option>
                  <option value="windscreen">Windscreen</option>
                </Form.Select>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group
                as={Col}
                style={{
                  display: "flex",
                  "flex-direction": "column",
                  "align-items": "start",
                }}
              >
                <Form.Label htmlFor="numberPlate">Plate No.</Form.Label>
                <Form.Control
                  type="text"
                  name=""
                  id="numberPlate"
                  defaultValue={singleDoc.numberPlate}
                  placeholder="Enter plate No."
                  onChange={handleFieldChange}
                />
              </Form.Group>
              <Form.Group
                as={Col}
                style={{
                  display: "flex",
                  "flex-direction": "column",
                  "align-items": "start",
                }}
              >
                <Form.Label htmlFor="stickerNumber">Sticker No.</Form.Label>
                <Form.Control
                  type="text"
                  name=""
                  id="stickerNumber"
                  defaultValue={singleDoc.stickerNumber}
                  placeholder="Enter Sticker Number"
                  onChange={handleFieldChange}
                />
              </Form.Group>
            </Row>
            <h5>Claimant Details</h5>
            <Row className="mb-3">
              <Form.Group
                as={Col}
                style={{
                  display: "flex",
                  "flex-direction": "column",
                  "align-items": "start",
                }}
              >
                <Form.Label htmlFor="claimantName">Name</Form.Label>
                <Form.Control
                  type="text"
                  name=""
                  id="claimantName"
                  defaultValue={singleDoc.claimantName}
                  placeholder="Enter Claimant's name"
                  onChange={handleFieldChange}
                />
              </Form.Group>
              <Form.Group
                as={Col}
                style={{
                  display: "flex",
                  "flex-direction": "column",
                  "align-items": "start",
                }}
              >
                <Form.Label htmlFor="claimantEmail">Email Address</Form.Label>
                <Form.Control
                  type="text"
                  name=""
                  id="claimantEmail"
                  placeholder="Enter claimant's email"
                  defaultValue={singleDoc.claimantEmail}
                  onChange={handleFieldChange}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group
                as={Col}
                style={{
                  display: "flex",
                  "flex-direction": "column",
                  "align-items": "start",
                }}
              >
                <Form.Label htmlFor="claimantPhoneNumber">
                  Phone Number
                </Form.Label>
                <Form.Control
                  type="text"
                  name=""
                  id="claimantPhoneNumber"
                  defaultValue={singleDoc.claimantPhoneNumber}
                  placeholder="Enter Claimant's phone number"
                  onChange={handleFieldChange}
                />
              </Form.Group>
              <Form.Group
                as={Col}
                style={{
                  display: "flex",
                  "flex-direction": "column",
                  "align-items": "start",
                }}
              >
                <Form.Label htmlFor="dateOfIncident">
                  Date of Incident
                </Form.Label>
                <Form.Control
                  type="date"
                  name=""
                  id="dateOfIncident"
                  defaultValue={singleDoc.dateOfIncident}
                  onChange={handleFieldChange}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group
                as={Col}
                style={{
                  display: "flex",
                  "flex-direction": "column",
                  "align-items": "start",
                }}
              >
                <Form.Label htmlFor="estimate">Claim Estimate</Form.Label>
                <Form.Control
                  type="text"
                  name=""
                  id="estimate"
                  defaultValue={singleDoc.estimate}
                  placeholder="Enter Claim Estimate"
                  onChange={handleFieldChange}
                />
              </Form.Group>
            </Row>
            
          </Modal.Body>
          <Modal.Footer>
          <Button
              variant="primary"
              type="submit"
              onClick={handleClose}
              id="submit"
            >
              Submit
            </Button>
          </Modal.Footer>
        </Form>
    </div>
}
