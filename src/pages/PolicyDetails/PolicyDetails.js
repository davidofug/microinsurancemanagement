import logo from '../../assets/imgs/britam-logo2.png'
import { Table } from 'react-bootstrap'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { getDoc, collection, doc} from 'firebase/firestore'
import { db } from '../../helpers/firebase'
import './PolicyDetails.css'

function PolicyDetails() {
    useEffect(() => {
        document.title = "Britam - Sticker Details";

        console.log(id)
        getMTP(id)
      }, []);

    const { id } = useParams()  

    const [ policy, setPolicy ] = useState({})
    const policyCollectionRef = collection(db, "policies");

    const getMTP = async (id) => {
        const policyRef = doc(db, "policies", id)
        const data = await getDoc(policyRef);
        console.log(data.data())
        setPolicy(data.data())
      }
    
    return (
        <div style={{margin: "30px"}}>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <div>
                    <img src={logo} width={150} height="auto" alt="britam" />
                </div>
                <div id="policyDetails">
                    <p>Receipt # 12801</p>
                    <p>{policy.policyStartDate} 10:49:40 AM</p>
                    <p><b>License No:</b> C04/987</p>
                    <p><b>Company Code:</b> 5643</p>
                    <span>MOTOR THIRDPARTY</span>
                </div>
            </div>

            <div className='fromTo'>
                <div id='from'>
                    <b>Britam Insurance Co. (U) Ltd</b>
                    <p>Plot 24A Akii-Bua Rd.</p>
                    <p>Nakasero P.O.Box 36583 Kampala</p>
                    <p>Uganda</p>
                    <p>C: britamug@britam.com 0312305600</p>
                </div>
                {policy.clientDetails != undefined &&
                    <div id="to">
                        <p>To: <b>{policy.clientDetails.name}</b></p>
                        <p>{policy.clientDetails.address}</p>
                    </div>
                }

                {policy.policyStartDate != undefined && 
                    <div id="date">
                        <p><b>Start Date</b> {policy.policyStartDate}</p>
                        <p><b>End Date</b> {policy.policyEndDate}</p>
                    </div>
                }
            </div>

            {policy.clientDetails != undefined &&
            <>
                <table>
                    <thead>
                        <tr>
                            <th>Motor Type</th>
                            <th>Chassis No.</th>
                            <th>Plate No.</th>
                            <th>No. of seats</th>
                            <th>Power(CC)</th>
                            <th>Use</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody style={{padding: "5px"}}>
                        <tr>
                            <td>{policy.stickersDetails[0].motorMake}</td>
                            <td>{policy.stickersDetails[0].chasisNo}</td>
                            <td>{policy.stickersDetails[0].plateNo}</td>
                            <td>{policy.stickersDetails[0].seatingCapacity}</td>
                            <td>{policy.stickersDetails[0].ccPower}</td>
                            <td>{policy.stickersDetails[0].vehicleUse}</td>
                            <td>
                                <tr>
                                    <button className='btn btn-warning'>Print Sticker</button>
                                </tr>
                                <tr>
                                    <button className='btn btn-danger'>Cancel Sticker</button>
                                </tr>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <b>Cost of Insurance</b>
                <p>Total Premium: <b>{policy.currency} </b><span>{policy.stickersDetails[0].totalPremium}</span></p>
            </>
            }

            <p className='prepared'>Prepared by {policy.agentName}</p>
            <button className='btn btn-success'>$ Proceed with Payments</button>
        </div>
    )
}

export default PolicyDetails
