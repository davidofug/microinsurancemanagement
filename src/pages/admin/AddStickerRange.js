import React from 'react'
import Header from '../../parts/header/Header'
import { Row, Form, Col } from 'react-bootstrap'

function AddStickerRange() {
    return (
        <div className='components'>
            <Header title="Add Sticker Number" subtitle="ADD NEW STICKER NUMBERS" />

            <div className="componentsData table-card" >
                <h6>Add Sticker Details</h6>
                <form>
                    <Row>
                        <Form.Group className="mb-3" >
                            <Form.Label htmlFor='name'>Select Category</Form.Label>
                            <Form.Select aria-label="User role" id='category'>
                                <option value="hide">--Select Category--</option>
                                <option value="mtp">Motor Bike</option>
                                <option value="comprehensive">Motor Transt</option>
                                <option value="windscreen">Motor Private</option>
                                <option value="windscreen">Motor Commercial</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label htmlFor='name'>Sticker Nos Range</Form.Label>
                                <Col>
                                    <Form.Control type="text" id='name' placeholder="From:" required style={{marginRight: "5px"}}/>
                                    <Form.Control type="text" id='name' placeholder="To:" required style={{marginLeft: "5px"}}/>
                                </Col>
                        </Form.Group>
                        
                        <Form.Group className="mb-3" >
                            <Form.Label htmlFor='name'>Total Amount Received</Form.Label>
                            <Form.Control type="text" id='name' placeholder="Enter organisation's name" required/>
                        </Form.Group>
                    </Row>
                </form>
            </div>
            
        </div>
    )
}

export default AddStickerRange
