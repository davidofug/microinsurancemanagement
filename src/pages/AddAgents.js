import generatedData from '../helpers/generatedClients';
import '../assets/styles/addClients.css'
import { useEffect } from 'react'

function AddAgents() {

    useEffect(() => {
        document.title = 'Britam - Add Agents'
    }, [])

    return (
        <div className='components'>
            <div className='heading'>
                <h1 className='title'>Add Agents</h1>
                <p className="subtitle">ADD A NEW Agents</p>
            </div>

            <div className="table-card componentsData" >  
                <form action="">
                    <div id="client_name">
                        <label htmlFor="" >Name <span className='required'>*</span></label>
                        <input type="text" name="" id="" placeholder="Enter Agent's name"/>
                    </div>
                    <div id="dob">
                        <div id='date'>
                            <label htmlFor="">Date Of Birth</label>
                            <input type="date" name="" id="" />
                        </div>
                        <div id='gender'>
                            <lable>Gender <span className='required'>*</span></lable>
                            <div>
                                <input type="radio" name="gender" id="gender" />
                                <label htmlFor="gender">Male</label>
                                <input type="radio" name="gender" id="" />
                                <label htmlFor="gender">Female</label>
                            </div>
                        </div>
                    </div>
                    <div id="contact">
                        <div>
                            <label htmlFor="">email</label>
                            <input type="text" name="" id="" />
                        </div>
                        <div>
                            <label htmlFor="">telephone Number <span className='required'>*</span></label>
                            <input type="tel" name="" id="" />
                        </div>
                    </div>
                    <div id='address'>
                        <label htmlFor="">Address</label>
                        <textarea name="" id="" cols="30" rows="10"></textarea>
                    </div >
                    <div id="upload">image goes here</div>
                    <div id='submit' ><input type="submit" value="Submit" className='btn btn-primary cta' /></div>
                </form>
            </div>
        </div>
    )
}

export default AddAgents
