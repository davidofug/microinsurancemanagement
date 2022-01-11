import logo from '../assets/imgs/britam-logo2.png'
import { Table } from 'react-bootstrap'

function PolicyDetails() {
    return (
        <div style={{margin: "30px"}}>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <div><img src={logo} width={150} height="auto" alt="britam" /></div>
                <div id="policyDetails">
                    <p>Receipt # 12801</p>
                    <p>28/12/2021 10:49:40</p>
                    <p>License No: C04/987</p>
                    <p>Company Code: 5643</p>
                    <p>Motor thirdpart</p>
                </div>
            </div>
            <div style={{display: "flex", gap: "10px", margin: "20px 0", justifyContent: "space-between"}}>
                <div id='from' style={{border: "1px solid black", padding: "20px"}}>
                    <p>Britam Insurance Co. (U) Ltd</p>
                    <p>Plot 24A Akii-Bua Rd.</p>
                    <p>Nakasero P.O.Box 36583 Kampala</p>
                    <p>Uganda</p>
                    <p>C: britamug@britam.com o312305600</p>
                </div>
                <div id="to" style={{border: "1px solid black", padding: "20px"}}>
                    <p>To John Doe</p>
                    <p>Bwaise</p>
                    <p>unknown</p>
                </div>
                <div id="date" style={{border: "1px solid black", padding: "20px"}}>
                    <p>Start Date 28/12/2021</p>
                    <p>End Date 27/12/2022</p>
                </div>
            </div>
            <Table responsive hover striped borderless>
                <thead>
                    <tr>
                        <th>Motor Type</th>
                        <th>Chassis No.</th>
                        <th>Plate No.</th>
                        <th>No. of seats</th>
                        <th>Power(CC)</th>
                        <th>Use</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>Private Mercendez Benz</th>
                        <th>12345</th>
                        <th>UAB 775</th>
                        <th>4</th>
                        <th>1000</th>
                        <th></th>
                        <th>
                            <div>
                                <button className='btn btn-warning'>Print Sticker</button>
                                <button className='btn btn-danger'>Cancel Sticker</button>
                            </div>
                        </th>
                    </tr>
                </tbody>
            </Table>
            <p>Cost of Insurance:</p>
            <p>Total Premium: <span>70,423 UGX</span></p>
            <p>Prepared by AgentName</p>
            <button className='btn btn-success'>$ Proceed with Payments</button>
        </div>
    )
}

export default PolicyDetails
