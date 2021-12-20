import generatedData from '../../helpers/generatedClients';
import '../../assets/styles/addClients.css'
import { useEffect } from 'react'

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
                    <div className="client_name">
                        <label htmlFor="" >Name <span className='required'>*</span></label>
                        <input type="text"name="" id="" placeholder="Enter organisation's name"/>
                    </div>
                    <div className="client_name">
                        <label htmlFor="">Contact email</label>
                        <input type="text"name="" id="" placeholder='Enter Email' />
                    </div>
                    <div className="client_name">
                        <label htmlFor="">Contact telephone Number <span className='required'>*</span></label>
                        <input type="tel"name="" id="" placeholder='Enter Telephone Number' />
                    </div>
                    <div className='client_name' id="address">
                        <label htmlFor="">Address</label>
                        <textarea name="" id="" cols="30" rows="10" placeholder='Enter Address'></textarea>
                    </div >
                    <div id='submit' ><input type="submit" value="Submit" className='btn btn-primary cta' /></div>
                </form>
            </div>
            {/* </div> */}
        </div>
    )
}

export default AddOrganisation
