// import { Link } from 'react-router-dom'
import { useEffect, useState } from "react";
import { MdDownload } from "react-icons/md";
import { CSVLink } from "react-csv";
import SearchBar from "../../components/searchBar/SearchBar";
import Header from "../../components/header/Header";
import { getDocs, collection } from 'firebase/firestore'
import { db } from '../../helpers/firebase'
import { Table, Form } from 'react-bootstrap'
import Pagination from '../../helpers/Pagination'
import { currencyFormatter } from "../../helpers/currency.format";

function Reports() {
  useEffect(() => {
    document.title = "Britam - Reports";
    getPolicies()
  }, []);

  // policies
  const [policies, setPolicies] = useState([])
  const policyCollectionRef = collection(db, "policies");


  const getPolicies = async () => {
    const data = await getDocs(policyCollectionRef);
    setPolicies(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  }

  // TODO: look for a better way to switch between categories
  const [ switchCategory, setSwitchCategory ] = useState("")
  // current month
  const currentMonth = (new Date()).getMonth()
  const monthOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

  const [ selectedMonth, setSelectedMonth ] = useState(null)
  const [ selectedYear, setSelectedYear ] = useState(null)

  let today;
  if((new Date().getMonth() + 1) < 10){
    today = `${new Date().getFullYear()}-0${new Date().getMonth() + 1}-${new Date().getDate()}`
  } else {
    today = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`
  }

  const [ currentDay, setCurrentDay ] = useState(null)

  // search by Name
  const [searchText, setSearchText] = useState('')
  const handleSearch = ({ target }) => setSearchText(target.value);
  const searchByName = (data) => data.filter(row => row.clientDetails).filter(row => row.clientDetails.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1)


  // pagination
  const [ currentPage, setCurrentPage ] = useState(1)
  const [policiesPerPage] = useState(10)

  const indexOfLastPolicy = currentPage * policiesPerPage
  const indexOfFirstPolicy = indexOfLastPolicy - policiesPerPage
  const currentPolicies = searchByName(policies).slice(indexOfFirstPolicy, indexOfLastPolicy)
  const totalPagesNum = Math.ceil(policies.length / policiesPerPage)

  // const [ basicTotal, setBasicTotal ] = useState(0)
  let basicTotal = 0


  return (
    <div className="components">
      <Header title="Reports" subtitle="MANAGING REPORTS" />

      <div className="componentsData  shadow-sm table-card" style={{ "maxWidth": "80vw", margin: "auto" }}>
        <div id="search">
            <SearchBar
              placeholder={"Search for Report"} value={searchText} handleSearch={handleSearch}
            />
            <div></div>
            <CSVLink
              data={policies}
              filename={"Britam-Reports.csv"}
              className="btn btn-primary cta"
              target="_blank"
            >
              Export <MdDownload />
            </CSVLink>
          </div>

          <div style={{display: "flex", alignItems: "center"}}>  
                <Form.Group className="m-3 categories" width="180px">
                    <Form.Label htmlFor='category'>Policy Category</Form.Label>
                    <Form.Select aria-label="User role" id='category' onChange={({target: {value}}) => setSwitchCategory(value)}>
                        <option value={""}>Select a category</option>
                        <option value="mtp">MTP</option>
                        <option value="comprehensive">Comprehensive</option>
                        <option value="windscreen">Windscreen</option>
                        <option value="newImports">New Imports</option>
                        <option value="transit">Transit</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="m-3 categories" width="200px">
                    <Form.Label htmlFor='category'>Status</Form.Label>
                    <Form.Select aria-label="User role" id='category'>
                        <option value={null}>Select a status</option>
                        <option value="new">New</option>
                        <option value="paid">Paid</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="deleted">Deleted</option>
                        <option value="expired">Expired</option>
                    </Form.Select>
                </Form.Group>
          </div>

          <div style={{display: "flex", alignItems: "center"}}>
          <Form.Group controlId="formGridEmail"  className="m-3" style={{"display": "flex", "flex-direction": "column", "align-items": "start"}}>
                    <Form.Label>Today</Form.Label>
                    <Form.Control type="date" defaultValue={currentDay} onChange={({target: {value}}) => setCurrentDay(value)}/>
                </Form.Group>

                <Form.Group className="m-3" width="150px">
                    <Form.Label htmlFor='category'>Select Month</Form.Label>
                    <Form.Select aria-label="User role" id='category' onChange={(event) => setSelectedMonth(event.target.value)}>
                        <option value={""}>Select a month</option>
                        <option value={"01"}>January</option>
                        <option value={"02"}>February</option>
                        <option value={"03"}>March</option>
                        <option value={"04"}>April</option>
                        <option value={"05"}>May</option>
                        <option value={"06"}>June</option>
                        <option value={"07"}>July</option>
                        <option value={"08"}>August</option>
                        <option value={"09"}>september</option>
                        <option value={"10"}>October</option>
                        <option value={"11"}>november</option>
                        <option value={"12"}>December</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="m-3" width="150px">
                    <Form.Label htmlFor='category'>Year</Form.Label>
                    <Form.Select aria-label="User role" id='category' onChange={(event) => setSelectedYear(event.target.value)}>
                        <option value="">Select a year</option>
                        <option value="2022">2022</option>
                        <option value="2021">2021</option>
                        <option value="2020">2020</option>
                        <option value="2019">2019</option>
                        <option value="2018">2018</option>
                        <option value="2017">2017</option>
                    </Form.Select>
                </Form.Group>

                {/* <Form.Group controlId="formGridEmail"  className="m-3" style={{"display": "flex", "flex-direction": "column", "align-items": "start"}}> */}
                    <div style={{diplay: "flex", flexDirection: "row"}}>
                      <Form.Label>Date Range</Form.Label>
                      <div>
                        <span>From</span><input type="date" /><span>To</span><input type="date" />
                      </div>
                    </div>
                {/* </Form.Group> */}
          </div>

          <Table striped hover responsive>
            <thead>

            <tr style={{borderBottom: "1px solid #000"}}>
                    {switchCategory === "" && <th colspan={20} style={{textAlign: "center"}}>{`All Reports`.toUpperCase()}</th>}
                    {switchCategory === "mtp" && <th colspan={20} style={{textAlign: "center"}}>{`MTP Report`.toUpperCase()}</th>}
                    {switchCategory === "comprehensive" && <th colspan={20} style={{textAlign: "center"}}>{`comprehensive Report`.toUpperCase()}</th>}
                    {switchCategory === "windscreen" && <th colspan={20} style={{textAlign: "center"}}>{`windscreen Report`.toUpperCase()}</th>}
                    {switchCategory === "newImports" && <th colspan={20} style={{textAlign: "center"}}>{`new import Report`.toUpperCase()}</th>}
                    {switchCategory === "transit" && <th colspan={20} style={{textAlign: "center"}}>{`transit Report`.toUpperCase()}</th>}
                    
              </tr>

              <tr>
                <th>#</th><th>Polic Holder</th><th>Plate No.</th><th>Car Make</th><th>Seating Capacity</th><th>G. weight</th><th>Sticker No.</th><th>Category</th><th>Cover Type</th><th>Start Date</th><th>End Date</th><th>Validity</th><th>Basic Premium</th><th>Training Levy</th><th>Sticker Fees</th><th>VAT Charge</th><th>Stamp Duty</th><th>Gross Commission</th><th>Issuing Branch</th><th>Issuing Officer</th><th>Currency</th>
              </tr>
            </thead>
            
            <tbody>
              {policies.length > 0
              ?
                <>
                  {switchCategory !== undefined
                  ? 
                    <>
                        {currentPolicies
                            .filter(policy => !switchCategory || policy.category === switchCategory)
                            .filter(policy => !currentDay && policy.policyStartDate !== undefined || policy.policyStartDate === currentDay)
                            .filter(policy => !selectedMonth && policy.policyStartDate !== undefined || policy.policyStartDate.substring(5, 7) === selectedMonth)
                            .filter(policy => !selectedYear || policy.policyStartDate.substring(0, 4) === selectedYear)
                            .map((policy, index) => (
                              <>
                              {basicTotal += +policy.stickersDetails[0].totalPremium}
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
                            {policy.stickersDetails && <td>{currencyFormatter(policy.stickersDetails[0].totalPremium)}</td>}
                            {policy.stickersDetails && <td>{currencyFormatter(policy.stickersDetails[0].totalPremium)}</td>}
                            <td>6,000</td>
                            <td>11,704</td>
                            <td>35,000</td>
                            <td>2,191</td>
                            <td>branch location</td>
                            <td>{policy.agentName}</td>
                            <td>{typeof policy.currency == "string" ? policy.currency : ''}</td>
                          </tr>
                          </>
                        ))}
                    </>
                  : 
                    <>
                      {policies.map((policy, index) => (
                          <tr key={policy.id}>
                            <td>{index+1}</td>
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
                            {policy.stickersDetails && <td>{policy.stickersDetails[0].totalPremium}</td>}
                            {policy.stickersDetails && <td>{policy.stickersDetails[0].totalPremium}</td>}
                            <td>6,000</td>
                            <td>11,704</td>
                            <td>35,000</td>
                            <td>2,191</td>
                            <td>hello</td>
                            <td>{policy.agentName}</td>
                            <td>{typeof policy.currency == "string" ? policy.currency : ''}</td>
                          </tr>
                      ))}
                    </>
                  }
                </>
              : 
                <>
                </>
              }
              
            </tbody>
            <tfoot>
              <tr>
                <th colSpan={12}>Grand Total</th><th>{currencyFormatter(basicTotal)}</th><th>{currencyFormatter(basicTotal)}</th><th>14,000,000</th><th>144,000</th><th>12,000,000</th><th>12,000,000</th><th></th><th></th><th>UGX</th>
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
  );
}

export default Reports;
