import { useEffect, useState } from 'react'
import { MdDownload } from 'react-icons/md'
import { CSVLink } from "react-csv";
import SearchBar from '../../components/searchBar/SearchBar';
import Header from '../../components/header/Header';
import { Table } from 'react-bootstrap'
import { getDocs, collection } from 'firebase/firestore'
import { db } from '../../helpers/firebase'
import { authentication } from '../../helpers/firebase'
import Pagination from '../../helpers/Pagination';
import Loader from '../../components/Loader';
import { ImFilesEmpty } from 'react-icons/im'
import { currencyFormatter } from "../../helpers/currency.format";
import { generateReport } from '../../helpers/generateReport';

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

    if((policyData.filter(policy => policy.added_by_uid === authentication.currentUser.uid)).length === 0){
        setPolicies(null)
    } else{
        setPolicies(policyData.filter(policy => policy.added_by_uid === authentication.currentUser.uid))
    }
    }

    // search by Name
    const [searchText, setSearchText] = useState('')
    const handleSearch = ({ target }) => setSearchText(target.value);
    const searchByName = (data) => data.filter(row => row.clientDetails).filter(row => row.clientDetails.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1)

    // pagination
    const [ currentPage, setCurrentPage ] = useState(1)
    const [policiesPerPage] = useState(10)

    const indexOfLastPolicy = currentPage * policiesPerPage
    const indexOfFirstPolicy = indexOfLastPolicy - policiesPerPage
    const currentPolicies = !policies || searchByName(policies).slice(indexOfFirstPolicy, indexOfLastPolicy)
    const totalPagesNum = !policies || Math.ceil(policies.length / policiesPerPage)

    /* let basicTotal = 0
    let trainingLevyTotal = 0
    let totalPremiumTotal = 0 */

    let basicTotal = 0
    let vatTotal = 0
    let stumpDutyTotal = 0
    let stickerFeeTotal = 0
    let commissionTotal = 0
    let trainingLevy = 0
    
    let basicCurrentTotal = 0
    let vatCurrentTotal = 0
    let stumpDutyCurrentTotal = 0
    let stickerFeeCurrentTotal = 0
    let commissionCurrentTotal = 0

    !policies || policies.map(policy => !policy.stickersDetails || (basicTotal += +policy.stickersDetails[0].totalPremium)) // grand total for all policies
    !policies || policies.map(policy => !policy.stickersDetails || (vatTotal += 1080)) // grand total for all policies
    !policies || policies.map(policy => !policy.stickersDetails || (stumpDutyTotal += 35000)) // grand total for all policies
    !policies || policies.map(policy => !policy.stickersDetails || (stickerFeeTotal += 6000)) // grand total for all policies
    !policies || policies.map(policy => !policy.stickersDetails || (commissionTotal += 2191)) // grand total for all policies

    console.log(policies)

    return (
        <div className='components'>
            <Header title="Reports" subtitle="AGENT ISSUED STICKER REPORTS" />

                
                

                        {policies !== null && policies.length > 0 
                        ?
                            <>
                            <div className="componentsData " style={{"maxWidth": "80vw"}}>
                    <div className="table-card">
                                <div id="search">
                            <SearchBar placeholder={"Search Reports by Policy Holder"} value={searchText} handleSearch={handleSearch}/>
                            <div style={{display: "flex", justifyContent: "flex-end"}}>
                                <button onClick={() => generateReport("myTable")} className="btn btn-primary cta">Export <MdDownload /></button> 
                            </div>
                            </div>

                        <Table responsive hover striped bordered id='myTable'>
                        <thead>
                            <tr>
                                <th>#</th><th>Policy Holder</th><th>Plate No.</th><th>Car Make</th><th>Seating Capacity</th><th>G. weight</th><th>Sticker No.</th><th>Category</th><th>Cover Type</th><th>Start Date</th><th>End Date</th><th>Validity</th><th>Basic Premium</th><th>Training Levy</th><th>Sticker Fees</th><th>VAT Charge(18%)</th><th>Stamp Duty</th><th>Gross Commission</th><th>Total Premium</th><th>Net Commission</th><th>Currency</th>
                            </tr>
                        </thead>

                        <tbody>
                        {policies && currentPolicies.map((policy, index) => {
                            /* {basicTotal += +policy.stickersDetails[0].basicPremium}
                            {trainingLevyTotal += +policy.stickersDetails[0].trainingLevy}
                            {totalPremiumTotal += +policy.stickersDetails[0].totalPremium} */

                            {basicCurrentTotal += +policy.stickersDetails[0].totalPremium} // total for currentPolicies
                                {vatCurrentTotal += 11704} // total for  currentPolicies
                                {stumpDutyCurrentTotal += 35000} // total for currentPolicies
                                {stickerFeeCurrentTotal += 6000} // total for currentPolicies
                                {commissionCurrentTotal += 2191} // total for currentPolicies
                                {trainingLevy += +policy.stickersDetails[0].trainingLevy}

                            return (
                            <tr key={policy.id}>
                                <td>{indexOfFirstPolicy + index + 1}</td>
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
                                {policy.stickersDetails && <td>{currencyFormatter(policy.stickersDetails[0].basicPremium)}</td>}
                                {policy.stickersDetails && <td>{currencyFormatter(policy.stickersDetails[0].trainingLevy)}</td>}
                                <td>6,000</td>
                                {policy.stickersDetails && <td>{currencyFormatter(policy.stickersDetails[0].vat)}</td>}
                                {policy.stickersDetails && <td>{currencyFormatter(policy.stickersDetails[0].stampDuty)}</td>}
                                <td>2,191</td>
                                {policy.stickersDetails && <td>{currencyFormatter(policy.stickersDetails[0].totalPremium)}</td>}
                                {policy.stickersDetails && <td>{currencyFormatter(0.1 * policy.stickersDetails[0].basicPremium)}</td>}
                                <td>{typeof policy.currency == "string" ? policy.currency : ''}</td>
                            </tr>
                        )})
                        }
                        </tbody>

                        <tfoot>
                            <tr>
                            <th>Grand Total</th>
                            <th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th>
                            <th>{currencyFormatter(basicTotal)}</th><th>{currencyFormatter(trainingLevy)}</th><th>{currencyFormatter(stickerFeeTotal)}</th><th>{currencyFormatter(vatTotal)}</th><th>{currencyFormatter(stumpDutyTotal)}</th><th>{currencyFormatter(commissionTotal)}</th><th></th><th></th><th>UGX</th>
                            </tr>
                        </tfoot>

                       
                        

                        </Table>

                        <Pagination 
                                pages={totalPagesNum}
                                setCurrentPage={setCurrentPage}
                                currentClients={currentPolicies}
                                sortedEmployees={policies}
                                entries={'Reports'} />
                        
                            </div>
                
                </div>
                            </>
                        :   
                            policies === null
                            ?
                            <div className="no-table-data">
                                <i><ImFilesEmpty /></i>
                                <h4>No data yet</h4>
                                <p>You have not created any Motor Third Party Stickers Yet</p>
                            </div>
                            :
                            <Loader />
                        }

                        

                    
        </div>
    )
}

export default Reports
