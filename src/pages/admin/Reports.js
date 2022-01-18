// import { Link } from 'react-router-dom'
import { useEffect, useState } from "react";
import { MdDownload } from "react-icons/md";
import { CSVLink } from "react-csv";
import SearchBar from "../../components/searchBar/SearchBar";
import Header from "../../components/header/Header";
import { getDocs, collection } from 'firebase/firestore'
import { db } from '../../helpers/firebase'
import { Table, Form, DropdownButton, Dropdown } from 'react-bootstrap'

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
  const [ selectedMonth, setSelectedMonth ] = useState(currentMonth)

  console.log(policies)

  return (
    <div className="components">
      <Header title="Reports" subtitle="MANAGING REPORTS" />

      <div className="componentsData  shadow-sm table-card" style={{ "maxWidth": "80vw", margin: "auto" }}>
        <div id="search">
            <SearchBar
              placeholder={"Search for Report"}
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
                <Form.Group className="m-3" width="150px">
                    <Form.Label htmlFor='category'>Category</Form.Label>
                    <Form.Select aria-label="User role" id='category' onChange={({target: {value}}) => setSwitchCategory(value)}>
                        <option value="">-- Select Category --</option>
                        <option value="mtp">MTP</option>
                        <option value="comprehensive">Comprehensive</option>
                        <option value="windscreen">Windscreen</option>
                        <option value="newImports">New Imports</option>
                        <option value="transit">Transit</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="m-3" width="150px">
                    <Form.Label htmlFor='category'>Status</Form.Label>
                    <Form.Select aria-label="User role" id='category'>
                        <option value="new">-- select status --</option>
                        <option value="new">New</option>
                        <option value="paid">Paid</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="deleted">Deleted</option>
                        <option value="expired">Expired</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group controlId="formGridEmail" style={{"display": "flex", "flex-direction": "column", "align-items": "start"}}>
                    <Form.Label>Today</Form.Label>
                    <Form.Control type="date" />
                </Form.Group>

                <Form.Group className="m-3" width="150px">
                    <Form.Label htmlFor='category'>Select Month</Form.Label>
                    <Form.Select aria-label="User role" id='category' defaultValue={currentMonth} onChange={(event) => setSelectedMonth(event.target.value)}>
                        <option value={0}>January</option>
                        <option value={1}>February</option>
                        <option value={2}>March</option>
                        <option value={3}>April</option>
                        <option value={4}>May</option>
                        <option value={5}>June</option>
                        <option value={6}>July</option>
                        <option value={7}>August</option>
                        <option value={8}>september</option>
                        <option value={9}>October</option>
                        <option value={10}>november</option>
                        <option value={11}>December</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="m-3" width="150px">
                    <Form.Label htmlFor='category'>Year</Form.Label>
                    <Form.Select aria-label="User role" id='category' defaultValue={currentMonth} onChange={(event) => setSelectedMonth(event.target.value)}>
                        <option value={0}>2022</option>
                        <option value={1}>2021</option>
                        <option value={1}>2020</option>
                        <option value={1}>2019</option>
                        <option value={1}>2018</option>
                        <option value={1}>2017</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group controlId="formGridEmail" style={{"display": "flex", "flex-direction": "column", "align-items": "start"}}>
                    <Form.Label>Date</Form.Label>
                    <Form.Control type="date" />
                </Form.Group>

                
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
                <th>Polic Holder</th><th>Plate No.</th><th>Car Make</th><th>Seating Capacity</th><th>G. weight</th><th>Sticker No.</th><th>Category</th><th>Cover Type</th><th>Start Date</th><th>End Date</th><th>Validity</th><th>Basic Premium</th><th>Training Levy</th><th>Sticker Fees</th><th>VAT Charge</th><th>Stamp Duty</th><th>Gross Commission</th><th>Issuing Branch</th><th>Issuing Officer</th><th>Currency</th>
              </tr>
            </thead>
            
            <tbody>
              {policies.length > 0
              ?
                <>
                  {switchCategory !== ""
                  ? 
                    <>
                        {policies.filter(policy => policy.category === switchCategory).map((policy, index) => (
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
                            {policy.stickersDetails && <td>{policy.stickersDetails[0].totalPremium}</td>}
                            {policy.stickersDetails && <td>{policy.stickersDetails[0].totalPremium}</td>}
                            <td>6,000</td>
                            <td>11,704</td>
                            <td>35,000</td>
                            <td>2,191</td>
                            {policy.stickersDetails && <td>{policy.stickersDetails[0].totalPremium}</td>}
                            <td>{policy.agentName}</td>
                            <td>{typeof policy.currency == "string" ? policy.currency : ''}</td>
                          </tr>
                        ))}
                    </>
                  : 
                    <>
                      {policies.map((policy, index) => (
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
                            {policy.stickersDetails && <td>{policy.stickersDetails[0].totalPremium}</td>}
                            {policy.stickersDetails && <td>{policy.stickersDetails[0].totalPremium}</td>}
                            <td>6,000</td>
                            <td>11,704</td>
                            <td>35,000</td>
                            <td>2,191</td>
                            {policy.stickersDetails && <td>{policy.stickersDetails[0].totalPremium}</td>}
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
                <th>Polic Holder</th><th>Plate No.</th><th>Car Make</th><th>Seating Capacity</th><th>G. weight</th><th>Sticker No.</th><th>Category</th><th>Cover Type</th><th>Start Date</th><th>End Date</th><th>Validity</th><th>Basic Premium</th><th>Training Levy</th><th>Sticker Fees</th><th>VAT Charge</th><th>Stamp Duty</th><th>Gross Commission</th><th>Issuing Branch</th><th>Issuing Officer</th><th>Currency</th>
              </tr>
            </tfoot>
          </Table>
      
    </div>
    </div>
  );
}

export default Reports;
