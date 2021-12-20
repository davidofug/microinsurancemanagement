import generatedData from '../helpers/generatedClients';
import '../assets/styles/addClients.css'
import { useEffect } from 'react'

function AddClients() {

    useEffect(() => {
        document.title = 'Britam - Add Clients'
    }, [])

    return (
        <div className='components'>
            <div className='heading'>
                <h1 className='title'>Add Clients</h1>
                <p className="subtitle">ADD A NEW CLIENTS</p>
            </div>

            <div class="componentsData" style={{"display": "flex", justifyContent: "center", "background-color": "#fff", "margin-top": "60px", "border-radius": "10px"}}>
            {/* <div className="table-card">   */}
                <form action="">
                    <div className="client_name">
                        <label htmlFor="" >Name <span className='required'>*</span></label>
                        <input type="text" name="" id="" placeholder="Enter Client's name"/>
                    </div>
                    <div id="contact" style={{"border": "1px solid red"}}>
                        <div id="dob" >
                            <div id='date'>
                                <label htmlFor="">Date Of Birth</label>
                                <input type="date" name="" id="" />
                            </div>
                        </div>
                        <div style={{"border": "1px solid green"}}>
                            <label>Gender <span className='required'>*</span></label>
                            <div id='gender' style={{"display": "flex", "gap": "20px"}} >
                                <div>
                                    <input type="radio" name="gender" id=""/>
                                    <label htmlFor="gender">Male</label>
                                </div>
                                <div>
                                    <input type="radio" name="gender" id="" />
                                    <label htmlFor="gender">Female</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="contact" style={{"border": "1px solid red"}}>
                        <div>
                            <label htmlFor="" >email</label>
                            <input type="text" name="" id="" />
                        </div>
                        <div>
                            <label htmlFor="">telephone Number <span className='required'>*</span></label>
                            <input type="tel" name="" id="" />
                        </div>
                    </div>
                    <div id='address' className="client_name">
                        <label htmlFor="">Address</label>
                        <textarea name="" id="" cols="30" rows="10"></textarea>
                    </div >
                    <div id="upload" className="client_name">image goes here</div>
                    <div id='submit' ><input type="submit" value="Submit" className='btn btn-primary cta' /></div>
                </form>
            </div>
        </div>
    )
}

export default AddClients
