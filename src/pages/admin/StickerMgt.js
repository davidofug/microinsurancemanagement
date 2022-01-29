import Header from "../../components/header/Header"
import Badge from "../../components/Badge"
import { useEffect, useState } from 'react'
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
import { MdCancel, MdDelete } from 'react-icons/md'
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../../helpers/firebase'


export default function StickerMgt() {
    useEffect(() => {document.title = 'Britam - Stickers Management'; getStickerRange()}, [])

    const [stickerRange, setStickerRange] = useState([]);
    const rangesCollectionRef = collection(db, "ranges");

    const [ searchText, setSearchText ] = useState('')


    const getStickerRange = async () => {
      const data = await getDocs(rangesCollectionRef)
      const rangeArray = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      rangeArray.length === 0 ? setStickerRange(null) : setStickerRange(rangeArray)
      
    }


    // Confirm Box
    const [ openToggle, setOpenToggle ] = useState(false)
    window.onclick = (event) => {
      if(openToggle === true) {
        if (!event.target.matches('.wack') && !event.target.matches('#myb')) { 
          setOpenToggle(false)
      }
      }
    }

    console.log(stickerRange)


    // actions context
    const [showContext, setShowContext] = useState(false)
    if(showContext === true){
      window.onclick = function(event) {
          if (!event.target.matches('.sharebtn')) {
              setShowContext(false)
          }
      }
    }
    const [clickedIndex, setClickedIndex] = useState(null)

    const handleSearch = ({ target }) => setSearchText(target.value);
    const searchByName = (data) => !data || data.filter(row => !row.category || row.category.toLowerCase().indexOf(searchText.toLowerCase()) > -1)

    // pagination
    const [ currentPage, setCurrentPage ] = useState(1)
    const [rangesPerPage] = useState(10)

    const indexOfLastRange = currentPage * rangesPerPage
    const indexOfFirstRange = indexOfLastRange - rangesPerPage
    const currentStickers = !stickerRange || searchByName(stickerRange).slice(indexOfFirstRange, indexOfLastRange)
    const totalPagesNum = !stickerRange || Math.ceil(stickerRange.length / rangesPerPage)


    const numberOfCategory = (category) => {
        const categorySticker = stickerRange.filter(range => range.category === category)
        return categorySticker.length
    }

    console.log(numberOfCategory())



    return (
        <div className="components">
            <Header title="Sticker No. Management" subtitle="MANAGING STICKER NUMBERS" />

            <div className={openToggle ? 'myModal is-active': 'myModal'}>
              <div className="modal__content wack">
                <h1 className='wack'>Confirm</h1>
                <p className='wack'>Are you sure you want to delete this sticker range</p>
                <div className="buttonContainer wack" >
                  <button id="yesButton" onClick={() => {
                    setOpenToggle(false)
                    }} className='wack'>Yes</button>
                  <button id="noButton" onClick={() => setOpenToggle(false)} className='wack'>No</button>
                </div>
              </div>
            </div>

            <div className="componentsData">
                    <div className="sticker-mgt">
                            <Badge color={"#5CB85C"} number={numberOfCategory('bike')} title={"Motor Bikes"} icon={<MdOutlinePedalBike />} />
                            <Badge color={"#46B8DA"} number={numberOfCategory('Motor Transit')} title={"Motor Transit"} icon={<FiTruck />}/>
                            <Badge color={"#D43F3A"} number={numberOfCategory('Motor Private')} title={"Motor Private"} icon={<AiOutlineCar />}/>
                            <Badge color={"#FFB848"} number={numberOfCategory('Motor Commercial')} title={"Motor Commercial"} icon={<BiBus />}/>
                    </div>
                    <div className="shadow-sm table-card">
                    <div id="search">
                            <SearchBar placeholder={"Search Stickers by Category"} value={searchText} handleSearch={handleSearch}/>
                            <div>
                              <Link to="/admin/sticker-number">
                                <button className="btn btn-primary cta">Add Sticker Nos.</button>
                              </Link>
                            </div>
                            <CSVLink
                                data={stickerRange}
                                filename={"Sticker-Ranges.csv"}
                                className="btn btn-primary cta"
                                target="_blank"
                              >
                                Export <MdDownload />
                            </CSVLink>
                      </div>

                      <Table responsive hover bordered striped>
                          <thead>
                            <tr><th>#</th><th>Category</th><th>Sticker Nos</th><th>used/Total No Received</th><td>Actions</td></tr>
                          </thead>
                          <tbody>
                            {currentStickers.map((sticker, index) => (
                              <tr key={sticker.id}>
                                <td>{index + 1}</td>
                                <td>{sticker.category}</td>
                                <td>[<span style={{color: "#c82e29"}}>{`${sticker.rangeFrom} - ${sticker.rangeTo}`}</span>]</td>
                                <td>0/{sticker.rangeTo - sticker.rangeFrom}</td>
                                
                                <td className="started">
                            <button className="sharebtn" onClick={() => {setClickedIndex(index); setShowContext(!showContext)}}>&#8942;</button>

                            <ul  id="mySharedown" className={(showContext && index === clickedIndex) ? 'mydropdown-menu show': 'mydropdown-menu'} onClick={(event) => event.stopPropagation()}>
                              <li>
                                <div className="actionDiv">
                                  <i><MdCancel /></i> Cancel
                                </div>
                              </li>
                              <li onClick={() => {
                                            setOpenToggle(true)
                                            setShowContext(false)
                                          }}
                                  >
                                    <div className="actionDiv">
                                      <i><MdDelete/></i> Delete
                                    </div>
                              </li>
                            </ul>
                            </td>

                              </tr>
                            ))}
                          </tbody>
                          <tfoot>
                            <tr><th>#</th><th>Category</th><th>Sticker Nos</th><th>used/Total No Received</th><th>Actions</th></tr>
                          </tfoot>
                      </Table>

                                

                      <Pagination 
                          pages={totalPagesNum}
                          setCurrentPage={setCurrentPage}
                          currentClients={currentStickers}
                          sortedEmployees={stickerRange}
                          entries={'Sticker Ranges'} />
                    </div>
            </div>
            
        </div>
    )
}
