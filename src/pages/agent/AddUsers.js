import '../../assets/styles/addClients.css'
import { authentication } from '../../helpers/firebase'
import { httpsCallable } from 'firebase/functions'
import { functions } from '../../helpers/firebase'
import { useEffect, useState } from 'react'
import { Form, Row, Col } from 'react-bootstrap'
import Upload from '../../components/uploader/Upload'
import Header from '../../components/header/Header'
import { useForm } from '../../hooks/useForm'
import useAuth from '../../contexts/Auth'
import Loader from '../../components/Loader'

function AddUsers() {
    const { authClaims } = useAuth()
    const addUser = httpsCallable(functions,'addUser')
    useEffect(() => { document.title = 'Britam - Add Clients' }, [])

    const [comprehensive, setComprehensive] = useState(false)
    const [windscreen, setWindscreen] = useState(false)
    const [mtp, setMTP] = useState(false)
    
    const [policyType, setPolicyType] = useState('')
    const [ isLoading, setIsLoading ] = useState(false)

    const [fields, handleFieldChange] = useForm({
        added_by_uid: authentication.currentUser.uid,
        user_role: 'Customer',
        email: '',
        name: '',
        dob: '',
        gender: '',
        phone: '',
        address: '',
        licenseNo: '',
        NIN: '',
        photo: '',
        policyType: policyType,
    })

    const handleSubmit = async (event) => {
        setIsLoading(true)
        event.preventDefault()
        if(comprehensive) fields['comprehensive'] = true
        if(mtp) fields['mtp'] = true
        if (windscreen) fields['windscreen'] = true

        // fields['added_by_uid'] = authentication.currentUser.uid
        fields['added_by_name'] = authentication.currentUser.displayName

        await addUser(fields).then((results) => {
            setIsLoading(false)
            document.form4.reset()
        }).then(() => alert(`successfully added ${fields.name}`)).catch((err) => {
            console.log(err)
        })
    }

    const { user_role } = fields

    return (
        <div className='components'>
            <Header title="Add Clients" subtitle="ADD A NEW CLIENT" />
            <div class="addComponentsData mb-3">
                    {isLoading && 
                        <div className='loader-wrapper'>
                            <Loader />
                        </div>
                    }
                    <Form name='form4' onSubmit={handleSubmit}>
                    <Row>
                        <Form.Group className="m-3 categories" width="200px">
                            <Form.Select aria-label="User role" id='category' onChange={({target: {value}}) => setPolicyType(value)}>
                                <option value={""}>Policy Type</option>
                                {authClaims.mtp && <option value="mtp">MTP</option>}
                                {authClaims.comprehensive && <option value="comprehensive">Comprehensive</option>}
                                {authClaims.windscreen && <option value="windscreen">Windscreen</option>}
                                {authClaims.newImports && <option value="newImport">New Imports</option>}
                                {authClaims.transit && <option value="transit">Transit</option>}
                            </Form.Select>
                        </Form.Group>

                        {authClaims.comprehensive &&
                            <Form.Group className="m-3 categories" width="200px">
                                <Form.Select aria-label="User role" id='category'>
                                    <option value={""}>Type of Client</option>
                                    <option value="individual">Individual</option>
                                    <option value="corporateEntity">Corporate Entity</option>
                                </Form.Select>
                            </Form.Group>
                        }
                    </Row>

                        <Form.Group className="mb-3" >
                            <Form.Label htmlFor='name'>Name<span className='required'>*</span></Form.Label>
                            <Form.Control id="name" placeholder="Name" onChange={handleFieldChange} required />
                        </Form.Group>
                        <Row className="mb-3">
                            <Form.Group as={Col} className='addFormGroups'>
                                <Form.Label htmlFor='dob'>Date of birth</Form.Label>
                                <Form.Control type="date" id="dob" onChange={handleFieldChange} />
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
                                    {authClaims.comprehensive &&
                                        <div>
                                            <input type="radio" name="gender" id="gender" value="corporate" className='addFormRadio' onChange={handleFieldChange}/>
                                            <label htmlFor="female">Corporate Entity</label>
                                        </div>
                                    }
                                </div>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} className='addFormGroups'>
                                <Form.Label htmlFor='email'>Email Address</Form.Label>
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
                        <Form.Label htmlFor='NIN'>NIN</Form.Label>
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
                        </>
                    }
                        <Form.Label htmlFor='upload'>Upload Profile photo</Form.Label>
                        <Upload />
                    <div id='submit' ><input type="submit" value="Submit" className='btn btn-primary cta submitcta' />
                    </div>
                    </Form>
            </div>
        </div>
    )
}

export default AddUsers

