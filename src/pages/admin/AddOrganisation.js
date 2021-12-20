import generatedData from '../../helpers/generatedClients';
import '../../assets/styles/addClients.css'
import { useEffect } from 'react'
import { Form } from 'react-bootstrap'

function AddOrganisation() {

    useEffect(() => {
        document.title = 'Britam - Add Clients'
    }, [])

    return (
        <div className='components'>
            <div className='heading'>
                <h1 className='title'>Add Organisations</h1>
                <p className="subtitle">ADD A NEW ORGANISATIONS</p>
            </div>

            <div class="componentsData" style={{"display": "flex", justifyContent: "center", "background-color": "#fff", "margin-top": "60px", "border-radius": "10px"}}>
            {/* <div className="table-card" >   */}
                <form action="">
                <Form>
                    <Form.Group className="mb-3" controlId="formGridAddress1">
                            <Form.Label>Organisations Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter organisation's email" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGridAddress1">
                            <Form.Label>Contact Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter organisation email" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGridAddress1">
                            <Form.Label>Contact telephone Number <span className='required'>*</span></Form.Label>
                            <Form.Control type="tel" placeholder="Enter phone Number" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGridAddress1">
                            <Form.Label>Address</Form.Label>
                            <Form.Control placeholder="Enter your address" />
                    </Form.Group>
                    <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>upload Organisation Logo</Form.Label>
                            <Form.Control type="file" />
                    </Form.Group>
                    <div id='submit' ><input type="submit" value="Submit" className='btn btn-primary cta' /></div>
                    </Form>
                </form>
            </div>
            {/* </div> */}
        </div>
    )
}

export default AddOrganisation
