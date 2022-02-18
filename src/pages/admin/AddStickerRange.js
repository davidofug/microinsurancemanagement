import Header from '../../components/header/Header'
import { Row, Form, Col } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { authentication, functions, db } from '../../helpers/firebase'
import { collection, addDoc } from 'firebase/firestore'
import Loader from '../../components/Loader'
import { httpsCallable } from 'firebase/functions';

import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Chat from '../../components/messenger/Chat'

import '../../styles/ctas.css'

function AddStickerRange({parent_container}) {

    useEffect(() => {document.title = 'Britam - Add Sticker Range'; getSupervisors()}, [])

    const [ isLoading, setIsLoading ] = useState(false)


    const [ rangeFrom, setRangeFrom ] = useState(0)
    const [ rangeTo, setRangeTo ] = useState(0)
    const rangesCollectionRef = collection(db, 'ranges')

    // getting supervisors
    const [ supervisors, setSupervisors ] = useState([])
    const getSupervisors = () => {
        const listUsers = httpsCallable(functions, 'listUsers')
        listUsers().then((results) => {
            const mySupervisors = results.data.filter(user => user.role.supervisor).filter(supervisor => supervisor.meta.added_by_uid === authentication.currentUser.uid)
            setSupervisors(mySupervisors)
        }).catch((err) => {
        })
    }

    const handleStickerRange = async (event) => {
        setIsLoading(true)
        event.preventDefault()
        try{
            await addDoc(rangesCollectionRef, {
                timeCreated: `${new Date().toISOString().slice(0, 10)} ${ new Date().getHours()}:${ new Date().getMinutes()}:${ new Date().getSeconds()}`,
                added_by_uid: authentication.currentUser.uid,
                added_by_name: authentication.currentUser.displayName,
                category: event.target.category.value,
                rangeFrom: event.target.rangeFrom.value,
                rangeTo: event.target.rangeTo.value,
                assignedTo: event.target.assignedTo.value,
                used: [],
                returned: [],
                agentAssignTo: []
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

                        <Form.Group className="mb-3" >
                            <Form.Label htmlFor='assignedTo'>Assign to:</Form.Label>
                            <Form.Control list="supervisorNames" placeholder="Enter supervisor's name" id="assignedTo"/>
                            <datalist id="supervisorNames" >
                                {supervisors.map(supervisor => <option data-value={JSON.stringify(supervisor)} value={supervisor.name}/>)}
                            </datalist> 
                        </Form.Group>
                    </Row>
                    <input type="submit" className='btn btn-primary cta' value="Submit" />
                </form>
            </div>
            <div style={{width:"100%", position:"fixed", bottom:"0px", display:"flex", justifyContent:"flex-end"}} className={parent_container ? "chat-container" : "expanded-menu-chat-container"}>
              <Chat />
            </div>    
        </div>
    )
}

export default AddStickerRange
