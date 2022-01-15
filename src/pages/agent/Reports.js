import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import data from '../../helpers/mock-data.json'
import { MdDownload } from 'react-icons/md'
import { CSVLink } from "react-csv";
import SearchBar from '../../components/searchBar/SearchBar';
import Header from '../../components/header/Header';
import { Table } from 'react-bootstrap'
import { getDocs, collection } from 'firebase/firestore'
import { db } from '../../helpers/firebase'
import { authentication } from '../../helpers/firebase'

function Reports() {

    useEffect(() => {
        document.title = 'Britam - Reports'
        getPolicies()
    }, [])


    // policies
    const [policies, setPolicies] = useState([])
    const policyCollectionRef = collection(db, "policies");

    const getPolicies = async () => {
    const policyDoc = await getDocs(policyCollectionRef);
    // setPolicies(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    const policyData = policyDoc.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    setPolicies(policyData.filter(policy => policy.added_by_uid === authentication.currentUser.uid))
    }

    return (
        <div className='components'>
            <Header title="Reports" subtitle="AGENT ISSUED STICKER REPORTS" />

                
                <div className="componentsData " style={{"maxWidth": "80vw"}}>
                    <div className="table-card">
                        <div id="search">
                                    {/* <SearchBar placeholder={"Search for organisation"}/> */}
                                        <div></div>
                                      <div></div>
                                      <CSVLink
                                        data={data}
                                        filename={"Issued-Reports.csv"}
                                        className="btn btn-primary cta"
                                        target="_blank"
                                    >
                                        Export <MdDownload />
                                    </CSVLink>
                        
                              </div>

                        <Table responsive hover striped bordered>
                        <thead>
                            <tr>
                                <th>Polic Holder</th><th>Plate No.</th><th>Car Make</th><th>Seating Capacity</th><th>G. weight</th><th>Sticker No.</th><th>Category</th><th>Cover Type</th><th>Start Date</th><th>End Date</th><th>Validity</th><th>Basic Premium</th><th>Training Levy</th><th>Sticker Fees</th><th>VAT Charge(18%)</th><th>Stamp Duty</th><th>Gross Commission</th><th>Total Premium</th><th>Net Commission</th><th>Currency</th>
                            </tr>
                        </thead>

                        <tbody>
                        {policies && policies.map((policy, index) => (
                            <tr key={policy.id}>
                                {policy.clientDetails && <td>{policy.clientDetails.name}</td>}
                                {policy.stickersDetails && <td>{policy.stickersDetails[0].plateNo}</td>}
                                {policy.stickersDetails && <td>{policy.stickersDetails[0].motorMake}</td>}
                                {policy.stickersDetails && <td>{policy.stickersDetails[0].seatingCapacity}</td>}
                                {policy.stickersDetails && <td>{policy.stickersDetails[0].grossWeight}</td>}
                                <td>{index+3}</td>
                                <td>{policy.category}</td>
                                <td>cover</td>
                                <td>{policy.policyStartDate}</td>
                                <td>{policy.policyEndDate}</td>
                                <td>1 YR(s)</td>
                                {policy.stickersDetails && <td>{policy.stickersDetails[0].basicPremium}</td>}
                                {policy.stickersDetails && <td>{policy.stickersDetails[0].totalPremium}</td>}
                                <td>6,000</td>
                                {policy.stickersDetails && <td>{policy.stickersDetails[0].vat}</td>}
                                {policy.stickersDetails && <td>{policy.stickersDetails[0].stampDuty}</td>}
                                <td>2,191</td>
                                {policy.stickersDetails && <td>{policy.stickersDetails[0].totalPremium}</td>}
                                <td></td>
                                <td>{typeof policy.currency == "string" ? policy.currency : ''}</td>
                            </tr>
                        ))
                        }
                        </tbody>

                        <tfoot>
                            <tr>
                                <th>Polic Holder</th><th>Plate No.</th><th>Car Make</th><th>Seating Capacity</th><th>G. weight</th><th>Sticker No.</th><th>Category</th><th>Cover Type</th><th>Start Date</th><th>End Date</th><th>Validity</th><th>Basic Premium</th><th>Training Levy</th><th>Sticker Fees</th><th>VAT Charge(18%)</th><th>Stamp Duty</th><th>Gross Commission</th><th>Total Premium</th><th>Net Commission</th><th>Currency</th>
                            </tr>
                        </tfoot>

                        </Table>

                    </div>
                
                </div>
        </div>
    )
}

export default Reports
