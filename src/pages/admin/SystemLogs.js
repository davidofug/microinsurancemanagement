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
import Loader from '../../components/Loader'
import { ImFilesEmpty } from 'react-icons/im'

function SystemLogs() {
  useEffect(() => {
    document.title = "Britam - Reports";
    getPolicies()
  }, []);

  // policies
  const [policies, setPolicies] = useState([])
  const policyCollectionRef = collection(db, "policies");


  const getPolicies = async () => {
    const data = await getDocs(policyCollectionRef);
    if((data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))).length === 0){
      setPolicies(null)
    } else{
      setPolicies(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
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


  

  let basicTotal = 0
  let vatTotal = 0
  let stumpDutyTotal = 0
  let stickerFeeTotal = 0
  let commissionTotal = 0
  
  let basicCurrentTotal = 0
  let vatCurrentTotal = 0
  let stumpDutyCurrentTotal = 0
  let stickerFeeCurrentTotal = 0
  let commissionCurrentTotal = 0

  !policies || policies.map(policy => !policy.stickersDetails || (basicTotal += +policy.stickersDetails[0].totalPremium)) // grand total for all policies
  !policies || policies.map(policy => !policy.stickersDetails || (vatTotal += 11704)) // grand total for all policies
  !policies || policies.map(policy => !policy.stickersDetails || (stumpDutyTotal += 35000)) // grand total for all policies
  !policies || policies.map(policy => !policy.stickersDetails || (stickerFeeTotal += 6000)) // grand total for all policies
  !policies || policies.map(policy => !policy.stickersDetails || (commissionTotal += 2191)) // grand total for all policies

  // {policy.stickersDetails && <td>{currencyFormatter(policy.stickersDetails[0].totalPremium)}</td>}


  // filter by range
  const [ dateFrom, setDateFrom ] = useState(null)
  const [ dateTo, setDateTo ] = useState(null)



  // pagination
  const [ currentPage, setCurrentPage ] = useState(1)
  const [policiesPerPage] = useState(10)
  const indexOfLastPolicy = currentPage * policiesPerPage
  const indexOfFirstPolicy = indexOfLastPolicy - policiesPerPage
  const currentPolicies = !policies || searchByName(policies)

  const shownPolicies = (currentPolicies
                        .filter(policy => !switchCategory || policy.category === switchCategory)
                        .filter(policy => !currentDay && policy.policyStartDate !== undefined || policy.policyStartDate === currentDay)
                        .filter(policy => !selectedMonth && policy.policyStartDate !== undefined || policy.policyStartDate.substring(5, 7) === selectedMonth)
                        .filter(policy => !selectedYear || policy.policyStartDate.substring(0, 4) === selectedYear)
                        .filter(policy => !dateFrom || policy.policyStartDate >= dateFrom)
                        .filter(policy => !dateTo || policy.policyStartDate <= dateTo))
  
  const paginatedShownPolicies = shownPolicies.slice(indexOfFirstPolicy, indexOfLastPolicy)

  

  
  const totalPagesNum = !policies || Math.ceil(shownPolicies.length / policiesPerPage)


  console.log(policies)


  return (
    <div className="components">
      <Header title="System Logs" subtitle="MANAGING LOGS" />

        <div className="componentsData  shadow-sm table-card" style={{ "maxWidth": "80vw", margin: "auto" }}>
            
            <div id="search">
              <SearchBar
                placeholder={"Search for Report"} value={searchText} handleSearch={handleSearch}
              />
              <div></div>
              <div></div>
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
        </div>
    </div>
  );
}

export default SystemLogs;
