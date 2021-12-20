import generatedData from '../helpers/generatedClients';
import '../assets/styles/addClients.css'
import { useEffect } from 'react'

function AddClaims() {

    useEffect(() => {
        document.title = 'Britam - Add Clients'
    }, [])

    return (
        <div className='components'>
            <div className='heading'>
                <h1 className='title'>Add Claim</h1>
                <p className="subtitle">ADD A NEW CLAIM</p>
            </div>

            <div className="table-card componentsData">  
                <form action="">
                    <div id="row">      
                         <div id="client_name">
                            <label htmlFor="" >Date Reported</label>
                            <input type="text" name="" id="" placeholder="Enter Client's name"/>
                        </div>
                         <div id="client_name">
                            <label htmlFor="" >Policy</label>
                            <input type="text" name="" id="" placeholder="Enter Client's name"/>
                        </div>
                         <div id="client_name">
                            <label htmlFor="" >Plate No.</label>
                            <input type="text" name="" id="" placeholder="Enter Client's name"/>
                        </div>
                         <div id="client_name">
                            <label htmlFor="" >Sticker No.</label>
                            <input type="text" name="" id="" placeholder="Enter Client's name"/>
                        </div>
                    </div>
                    <h3>Claimant Details</h3>
                    <div id="row">      
                         <div id="client_name">
                            <label htmlFor="" >Name</label>
                            <input type="text" name="" id="" placeholder="Enter Client's name"/>
                        </div>
                         <div id="client_name">
                            <label htmlFor="" >Email Address</label>
                            <input type="text" name="" id="" placeholder="Enter Client's name"/>
                        </div>
                         <div id="client_name">
                            <label htmlFor="" >Telephone</label>
                            <input type="text" name="" id="" placeholder="Enter Client's name"/>
                        </div>
                         <div id="client_name">
                            <label htmlFor="" >Date of Incident</label>
                            <input type="text" name="" id="" placeholder="Enter Client's name"/>
                        </div>
                    </div>
                    <div id="row">      
                         <div id="client_name">
                            <label htmlFor="" >Claim Estimate</label>
                            <input type="text" name="" id="" placeholder="Enter Client's name"/>
                        </div>
                    </div>
                    <div id="row">      
                         <div id="client_name">
                            <label htmlFor="" >Details of Incident</label>
                            <textarea type="text" name="" id="" placeholder="Enter Client's name"/>
                        </div>
                    </div>
    
                    <div id="upload">image goes here</div>
                    <div id='submit' ><input type="submit" value="Submit" className='btn btn-primary cta' /></div>
                </form>
            </div>
        </div>
    )
}

export default AddClaims
