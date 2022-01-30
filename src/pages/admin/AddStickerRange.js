import Header from '../../components/header/Header'
import { Row, Form, Col } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { authentication, db } from '../../helpers/firebase'
import { collection, addDoc } from 'firebase/firestore'
import Loader from '../../components/Loader'

import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function AddStickerRange() {

    useEffect(() => {document.title = 'Britam - Add Sticker Range'}, [])

    const [ isLoading, setIsLoading ] = useState(false)


    const [ rangeFrom, setRangeFrom ] = useState(0)
    const [ rangeTo, setRangeTo ] = useState(0)
    const rangesCollectionRef = collection(db, 'ranges')

    const handleStickerRange = async (event) => {
        setIsLoading(true)
        event.preventDefault()
        try{
            await addDoc(rangesCollectionRef, {
                added_by_uid: authentication.currentUser.uid,
                added_by_name: authentication.currentUser.displayName,
                category: event.target.category.value,
                rangeFrom: event.target.rangeFrom.value,
                rangeTo: event.target.rangeTo.value,
                used: []
            })
            toast.success(`Successfully added sticker Range`, {position: "top-center"});
            document.stickerForm.reset()
            setIsLoading(false)
        } catch(error){
            toast.error(`Failed to added sticker Range`, {position: "top-center"});
            console.log(error)
            setIsLoading(false)
        }
        
    }

    return (
        <div className='components'>
            <Header title="Add Sticker Number" subtitle="ADD NEW STICKER NUMBERS" />
            <ToastContainer />

            <div className="addComponentsData shadow-sm mb-3" >
                {isLoading && 
                    <div className='loader-wrapper'>
                        <Loader />
                    </div>
                }
                {/* <h6>Add Sticker Details</h6> */}
                <form name='stickerForm' onSubmit={handleStickerRange}>
                    <Row>
                        <Form.Group className="mb-3" >
                            <Form.Label htmlFor='category'>Select Category</Form.Label>
                            <Form.Select aria-label="User role" id='category' required>
                                <option value="">--Select Category--</option>
                                <option value="Motor Bike">Motor Bike</option>
                                <option value="Motor Transit">Motor Transit</option>
                                <option value="Motor Private">Motor Private</option>
                                <option value="Motor Commercial">Motor Commercial</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label htmlFor='name'>Sticker Nos Range</Form.Label>
                                <Col>
                                        <Form.Control type="number" id='rangeFrom' placeholder="From" required style={{marginRight: "5px"}} onChange={(e) => {
                                            setRangeFrom(+e.target.value)
                                        }}/>

                                        <Form.Control type="number" id='rangeTo' placeholder="To" required style={{marginLeft: "5px"}} onChange={(e) => {
                                        setRangeTo(+e.target.value)
                                        }}/>
                                    
                                </Col>
                        </Form.Group>
                        
                        <Form.Group className="mb-3" >
                            <Form.Label htmlFor='name'>Total Amount Received</Form.Label>
                            <Form.Control type="text" id='total' value={(rangeTo > 0) ? rangeTo - rangeFrom : ''} readOnly/>
                        </Form.Group>
                    </Row>
                    <input type="submit" className='btn btn-primary cta' value="Submit" />
                </form>
            </div>
            
        </div>
    )
}

export default AddStickerRange
