import '../assets/styles/addClients.css'
import { authentication } from '../helpers/firebase'
import { httpsCallable } from 'firebase/functions'
import { functions } from '../helpers/firebase'
import { useEffect, useState } from 'react'
import { Form, Row, Col } from 'react-bootstrap'
import Upload from '../components/uploader/Upload'
import Header from '../components/header/Header'
import { useForm } from '../hooks/useForm'
import useAuth from '../contexts/Auth'
import Loader from '../components/Loader'

import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// firebase storage..
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from '../helpers/firebase'

function AddUsers() {
    const { authClaims } = useAuth()
    const addUser = httpsCallable(functions, 'addUser')
    useEffect(() => { document.title = 'Britam - Add Users' }, [])

    const [comprehensive, setComprehensive] = useState(false)
    const [windscreen, setWindscreen] = useState(false)
    const [mtp, setMTP] = useState(false)

    const [ isLoading, setIsLoading ] = useState(false)

    const [showOrganisation, setShowOrganisation] = useState(false)

    

    const checkedOrganisation = () => {
        if(document.getElementById('supervisorCheck').checked){
            setShowOrganisation(true)
        } else {
            setShowOrganisation(false)
        }
    }
    

    const [fields, handleFieldChange] = useForm({
        user_role: '',
        organisation: '',
        email: '',
        name: '',
        dob: '',
        gender: '',
        phone: '',
        address: '',
        licenseNo: '',
        NIN: '',
        photo: '',
    })


    const handleSubmit = (event) => {
        setIsLoading(true)
        event.preventDefault()
        if(comprehensive) fields['comprehensive'] = true
        if(mtp) fields['mtp'] = true
        if (windscreen) fields['windscreen'] = true

        fields['added_by_uid'] = authentication.currentUser.uid
        fields['added_by_name'] = authentication.currentUser.displayName


        addUser(fields).then((results) => {
            toast.success(`Successfully added ${fields.name}`, {position: "top-center"});
            setIsLoading(false)
            document.form3.reset()
        }).catch(() => {
            toast.error(`Failed: couldn't added ${fields.name}`, {position: "top-center"});
        })

    }

    const { user_role } = fields

    
    const [ url, setUrl ] = useState('')
    //const [ logo, setLogo ] = useState(null)
    const [ progress, setProgress ] = useState(0)

    const uploadLogo = (logo) => {
          const storageRef = ref(storage, `images/${logo.name}`)
          console.log(storageRef)
          const uploadTask = uploadBytesResumable(storageRef, logo)

          uploadTask.on(
                  "state_changed",
                  (snapshot) => {
                          const prog = Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100
                          setProgress(prog)
                  },
                  (error) => console.log(error),
                  async () => {
                                  await getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
                                  // setUrl(downloadUrl)
                                  fields.photo = downloadUrl
                                  console.log("file available at", downloadUrl)
                          })
                  }
          ) 
    }


    return (
        <div className='components'>
            <Header title="Add User" subtitle="ADD A NEW USER" />
            <ToastContainer/>
            <div className="addComponentsData shadow-sm">
                    {isLoading && 
                        <div className='loader-wrapper'>
                            <Loader />
                        </div>
                    }
                    <Form name='form3' onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" >
                        <Form.Label htmlFor='user_role'>User role<span className='required'>*</span></Form.Label>
                            <Form.Select aria-label="User role" controlId="user_role" id="user_role" onChange={handleFieldChange} required>
                                <option value="hide">--User Role--</option>
                                {authClaims.superadmin && <option value="superadmin">Super Admin</option>}
                                {authClaims.superadmin && <option value="admin">Admin</option>}
                                {(authClaims.superadmin || authClaims.admin) && <option value="supervisor">Supervisor</option>}
                                {(authClaims.supervisor || authClaims.admin) && <option value="agent">Agent</option>}
                                {(authClaims.supervisor || authClaims.agent) && <option value="Customer">Customer</option>}
                            </Form.Select>
                        </Form.Group>
                        { user_role === 'supervisor' && 
                            <Form.Group className="mb-3" >
                                <Form.Label htmlFor='organisation'>Organisation<span className='required'>*</span></Form.Label>
                                <Form.Control id="organisation" placeholder="organisation" onChange={handleFieldChange} required/>
                            </Form.Group>
                        }
                        <Form.Group className="mb-3" >
                            <Form.Label htmlFor='name'>Name<span className='required'>*</span></Form.Label>
                            <Form.Control id="name" placeholder="Name" onChange={handleFieldChange} required/>
                        </Form.Group>
                        <Row className="mb-3">
                            <Form.Group as={Col} className='addFormGroups'>
                                <Form.Label htmlFor='dob'>Date of birth</Form.Label>
                            <Form.Control type="date" id="dob" onChange={handleFieldChange} required/>
                            </Form.Group>
                            <Form.Group as={Col} className='addFormGroups'>
                                <Form.Label htmlFor='gender'>Gender <span className='required'>*</span></Form.Label>
                                <div className='gender-options'>
                                    <div>
                                    <input type="radio" name="gender" id="gender" value="male" className='addFormRadio' onChange={handleFieldChange}/>
                                        <label htmlFor="male">Male</label>
                                    </div>
                                    <div>
                                        <input type="radio" name="gender" id="gender" value="female" className='addFormRadio' onChange={handleFieldChange}/>
                                        <label htmlFor="female">Female</label>
                                    </div>
                                </div>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} className='addFormGroups'>
                                <Form.Label htmlFor='email'>Email Address <span className='required'>*</span></Form.Label>
                                <Form.Control type="email" id="email" placeholder="Enter email" onChange={handleFieldChange} />
                            </Form.Group>
                            <Form.Group as={Col} className='addFormGroups'>
                                <Form.Label htmlFor='phone'>Phone Number <span className='required'>*</span></Form.Label>
                                <Form.Control type="tel" id="phone" placeholder="Enter phone number"  onChange={handleFieldChange} required/>
                            </Form.Group>
                        </Row>
                        <Form.Group className="mb-3" >
                            <Form.Label htmlFor='address'>Address</Form.Label>
                            <Form.Control id="address" placeholder="Enter your address"  onChange={handleFieldChange}/>
                    </Form.Group>
                    <Row className="mb-3">
                    <Form.Group as={Col} className="addFormGroups" >
                        <Form.Label htmlFor='license'>License No.</Form.Label>
                        <Form.Control id="licenseNo" placeholder="license No." onChange={handleFieldChange} />
                    </Form.Group>
                    <Form.Group as={Col} className="addFormGroups" >
                        <Form.Label htmlFor='nin'>NIN</Form.Label>
                        <Form.Control id="NIN" placeholder="NIN" onChange={handleFieldChange}/>
                        </Form.Group>
                    </Row>
                    { user_role === 'agent' &&
                        <>
                            <Form.Group className="mb-3" >
                                <Form.Label htmlFor='agentcan'>Agent Can?</Form.Label>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="comprehensive">
                                <Form.Check type="checkbox" label="Handle Comprehensive" id="handle_comprehensive" value="true" onChange={(event) => setComprehensive(!comprehensive)}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="mtp">
                                <Form.Check type="checkbox" label="Handle Motor Third Party" id="handle_mtp" value={true} onChange={()=> setMTP(!mtp)}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="windscreen">
                                <Form.Check type="checkbox" label="Handle Windscreen" id="handle_windscreen" value={true} onChange={()=> setWindscreen(!windscreen)}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="windscreen">
                                <Form.Check type="checkbox" label="Handle New Imports" id="handle_windscreen" value={true} onChange={()=> setWindscreen(!windscreen)}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="windscreen">
                                <Form.Check type="checkbox" label="Handle Transit" id="handle_windscreen" value={true} onChange={()=> setWindscreen(!windscreen)}/>
                            </Form.Group>
                        </>
                    }
                        <Form.Label htmlFor='upload'>Upload Profile photo</Form.Label>
                        <Upload uploadLogo={uploadLogo}/>

                    {fields.name !== "" & fields.email !== ""
                    ?
                        <div id='submit' ><input type="submit" value="Submit" className='btn btn-primary cta submitcta' /></div>
                    :
                        <div id='submit' ><input type="button" value="Submit" className='btn btn-primary cta submitcta' style={{background: "rgba(20, 117, 207, 0.4)", border: "1px solid #a1c8ec"}}/></div>
                    }
                    </Form>
            </div>
        </div>
    )
}

export default AddUsers

