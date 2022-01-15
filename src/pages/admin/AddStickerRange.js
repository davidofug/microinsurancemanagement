import React from 'react'
import Header from '../../components/header/Header'
import { Row, Form, Col } from 'react-bootstrap'
import { useState } from 'react'

function AddStickerRange() {


    const [ totalSticker, setTotalSticker ] = useState(0)
    const [ totalFrom, setTotalFrom ] = useState(0)
    const [ totalTo, setTotalTo ] = useState(0)

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
                                <option value="comprehensive">Motor Transit</option>
                                <option value="windscreen">Motor Private</option>
                                <option value="windscreen">Motor Commercial</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label htmlFor='name'>Sticker Nos Range</Form.Label>
                                <Col>
                                    <Form.Control type="number" id='name' placeholder="0" required style={{marginRight: "5px"}} onChange={(e) => {
                                        setTotalFrom(e.target.value)
                                        setTotalSticker(totalTo - totalFrom)
                                        }}/>
                                    <Form.Control type="number" id='name' placeholder="0" required style={{marginLeft: "5px"}} onChange={(e) => {
                                        setTotalTo(e.target.value)
                                        setTotalSticker(totalTo - totalFrom)
                                        }}/>
                                </Col>
                        </Form.Group>
                        
                        <Form.Group className="mb-3" >
                            <Form.Label htmlFor='name'>Total Amount Received</Form.Label>
                            <Form.Control type="text" id='name' value={totalSticker} readOnly/>
                        </Form.Group>
                    </Row>
                    <input type="submit" className='btn btn-primary cta' value="Submit" />
                </form>
            </div>
            
        </div>
    )
}

export default AddStickerRange
