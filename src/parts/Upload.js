import React from 'react'
import {Form} from 'react-bootstrap'

export default function Upload() {
    return (
        <div className='upload-container'>
            {/* <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>upload profile image</Form.Label>
                <Form.Control type="file" />
            </Form.Group> */}
            <input type="file" className='file-upload' />
        </div>
    )
}
