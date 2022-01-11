import Header from "../../components/header/Header"
import Badge from "../../components/Badge"
import { useEffect, useState } from 'react'
import data from '../../helpers/mock-data.json'
import { MdDownload } from 'react-icons/md'
import Pagination from '../../helpers/Pagination';
import { CSVLink } from "react-csv";
import SearchBar from '../../components/searchBar/SearchBar';
import { Table } from "react-bootstrap"
import { Link } from "react-router-dom"
import { MdOutlinePedalBike } from 'react-icons/md'
import { FiTruck } from 'react-icons/fi'
import { AiOutlineCar } from 'react-icons/ai'
import { BiBus } from 'react-icons/bi'
import { FaEllipsisV } from "react-icons/fa";
import ClickOut from "../ClickOut"


export default function StickerMgt() {
    useEffect(() => document.title = 'Britam - Stickers Management')

    

    const [q, setQ] = useState('');
    const [ currentPage, setCurrentPage ] = useState(1)
    const [employeesPerPage] = useState(10)

    const indexOfLastEmployee = currentPage * employeesPerPage
    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage
    const currentOrganisations = data.slice(indexOfFirstEmployee, indexOfLastEmployee)
    const totalPagesNum = Math.ceil(data.length / employeesPerPage)



    return (
        <div className="components">
            <Header title="Sticker No. Management" subtitle="MANAGING STICKER NUMBERS" />

            <div className="componentsData">
                    <div className="sticker-mgt">
                            <Badge color={"#5CB85C"} number={104} title={"Motor Bikes"} icon={<MdOutlinePedalBike />} />
                            <Badge color={"#46B8DA"} number={25} title={"Motor Transit"} icon={<FiTruck />}/>
                            <Badge color={"#D43F3A"} number={77} title={"Motor Private"} icon={<AiOutlineCar />}/>
                            <Badge color={"#FFB848"} number={10} title={"Motor Commercial"} icon={<BiBus />}/>
                    </div>
                    <div className="shadow-sm table-card">
                    <div id="search">
                            <SearchBar placeholder={"Search"}/>
                            <div>
                              <Link to="/admin/sticker-number">
                                <button className="btn btn-primary cta">Add Sticker Nos.</button>
                              </Link>
                            </div>
                            <CSVLink
                                data={data}
                                filename={"Sticker-Ranges.csv"}
                                className="btn btn-primary cta"
                                target="_blank"
                              >
                                Export <MdDownload />
                            </CSVLink>
                      </div>

                      <Table responsive hover bordered striped>
                          <thead>
                            <tr><th>#</th><th>Category</th><th>Sticker Nos</th><th>Total No Received</th><th>Status</th><td>Actions</td></tr>
                          </thead>
                          <tbody>
                            {data.map((sticker, index) => (
                              <tr>
                                <td>{index+1}</td>
                                <td>{sticker.category}</td>
                                <td>{`[00${index+1} - 10${index+2}]`}</td>
                                <td>{index+2}</td>
                                <td>{sticker.status}</td>
                                <td>
                                {/* <div className="dropdown">
                                    <FaEllipsisV data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={() => {
                                    document.getElementById(`mydropdownMenuButton${index}`).setAttribute("class", "showmydropdown-menu")
                                  }}/>
                                  <div className="mydropdown-menu" aria-labelledby="dropdownMenuButton" id={`mydropdownMenuButton${index}`}>
                                    <li className="dropdown-item" href="#">Edit</li>
                                    <li className="dropdown-item" href="#">Delete</li>
                                    <hr />
                                    <li className="dropdown-item" href="#">Close</li>
                                  </div>
                                </div> */}
                                <ClickOut />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                          <tfoot>
                            <tr><th>#</th><th>Category</th><th>Sticker Nos</th><th>Total No Received</th><th>Status</th><th>Actions</th></tr>
                          </tfoot>
                      </Table>

                                

                      <Pagination 
                          pages={totalPagesNum}
                          setCurrentPage={setCurrentPage}
                          currentClients={currentOrganisations}
                          sortedEmployees={data}
                          entries={'Sticker Ranges'} />
                    </div>
            </div>
            
        </div>
    )
}
