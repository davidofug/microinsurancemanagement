import Header from "../../components/header/Header"
import Badge from "../../components/Badge"
import { useEffect, useState } from 'react'
import { MdDownload } from 'react-icons/md'
import Pagination from '../../helpers/Pagination';
import { CSVLink } from "react-csv";
import SearchBar from '../../components/searchBar/SearchBar';
import { Table, Form } from "react-bootstrap"
import { Link } from "react-router-dom"
import { MdOutlinePedalBike } from 'react-icons/md'
import { FiTruck } from 'react-icons/fi'
import { AiOutlineCar } from 'react-icons/ai'
import { BiBus } from 'react-icons/bi'
import { MdCancel, MdDelete, MdInfo } from 'react-icons/md'
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../../helpers/firebase'
import '../../components/modal/ConfirmBox.css'
import Loader from "../../components/Loader";
import { ImFilesEmpty } from 'react-icons/im'

import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


export default function StickerMgt() {
    useEffect(() => {document.title = 'Britam - Stickers Management'; getStickerRange()}, [])

    const [stickerRange, setStickerRange] = useState([]);
    const rangesCollectionRef = collection(db, "ranges");
    const [ singleDoc, setSingleDoc ] = useState({})
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
        const categorySticker = !stickerRange || stickerRange.filter(range => range.category === category)
        return categorySticker.length || 0
    }

    // delete a policy
    const handleDelete = async () => {
      const rangeDoc = doc(db, "ranges", singleDoc.id);
      try{
        await deleteDoc(rangeDoc);
        toast.success(`Successfully deleted sticker from ${singleDoc.rangeFrom} to ${singleDoc.rangeTo}`, {position: "top-center"});
        getStickerRange()
      }catch(error){
        toast.error(`Failed to deleted: ${error.code}`, {position: "top-center"});
      }
      
    }



    return (
        <div className="components">
            <Header title="Sticker No. Management" subtitle="MANAGING STICKER NUMBERS" />
            <ToastContainer />

            <div className={openToggle ? 'myModal is-active': 'myModal'}>
              <div className="modal__content wack">
                <h1 className='wack'>Confirm</h1>
                <p className='wack'>Are you sure you want to delete stickers from <b>{singleDoc.rangeFrom} - {singleDoc.rangeTo}</b></p>
                <div className="buttonContainer wack" >
                  <button id="yesButton" onClick={() => {
                    setOpenToggle(false)
                    handleDelete(singleDoc)
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

                    <div id="add_client_group" className="mt-3">
                      <div></div>
                      <Link to="/admin/sticker-number">
                        <button className="btn btn-primary cta">Add Sticker Range</button>
                      </Link>
                    </div>

                    {stickerRange !== null && stickerRange.length > 0
                    ?
                      <>
                        <div className="shadow-sm table-card">
                    <div id="search">
                            <SearchBar placeholder={"Search Stickers by Category"} value={searchText} handleSearch={handleSearch}/>
                            <div></div>
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
                            <tr><th>#</th><th>Category</th><th>Sticker Nos</th><th>used/Total No Received</th><th>Actions</th></tr>
                          </thead>
                          <tbody>
                            {currentStickers.map((sticker, index) => (
                              <tr key={sticker.id}>
                                <td>{index + 1}</td>
                                <td>{sticker.category}</td>
                                <td>[<span style={{color: "#c82e29"}}>{`${sticker.rangeFrom} - ${sticker.rangeTo}`}</span>]</td>
                                <td>{sticker.used && sticker.used.length}/{sticker.rangeTo - sticker.rangeFrom}</td>
                                
                                <td className="started">
                                  <button className="sharebtn" onClick={() => {setClickedIndex(index); setShowContext(!showContext); setSingleDoc(sticker)}}>&#8942;</button>

                                  <ul  id="mySharedown" className={(showContext && index === clickedIndex) ? 'mydropdown-menu show': 'mydropdown-menu'} onClick={(event) => event.stopPropagation()}>
                                    <Link to={`/admin/sticker-range-details/${sticker.id}`}>
                                      <div className="actionDiv">
                                        <i><MdInfo /></i> Details
                                      </div>
                                    </Link>
                                    <li onClick={() => {
                                                  setShowContext(false)
                                                }}>
                                      <div className="actionDiv">
                                        <i><MdCancel /></i> Cancel
                                      </div>
                                    </li>
                                    <li 
                                          onClick={() => {
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
                            <tr style={{border: "1px solid white", borderTop: "1px solid #000"}}>
                                <td colSpan={4}>
                                <Pagination 
                                  pages={totalPagesNum}
                                  setCurrentPage={setCurrentPage}
                                  currentClients={currentStickers}
                                  sortedEmployees={stickerRange}
                                  entries={'Sticker Ranges'} />
                                </td>
                              </tr>
                            </tfoot>


                          <tfoot>
                            <tr><th>#</th><th>Category</th><th>Sticker Nos</th><th>used/Total No Received</th><th>Actions</th></tr>
                          </tfoot>
                      </Table>

                                

                      
                    </div>
                      </>
                    :
                      stickerRange === null
                      ?
                        <div className="no-table-data">
                          <i><ImFilesEmpty /></i>
                          <h4>No data yet</h4>
                          <p>You have not added any Stickers Ranges</p>
                        </div>
                      :
                        <Loader />
                    }
                    
            </div>
            
        </div>
    )
}
