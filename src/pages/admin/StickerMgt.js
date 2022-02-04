import Header from "../../components/header/Header"
import Badge from "../../components/Badge"
import { useEffect, useState } from 'react'
import Pagination from '../../helpers/Pagination';
import SearchBar from '../../components/searchBar/SearchBar';
import { Table, Modal, Form } from "react-bootstrap"
import { Link } from "react-router-dom"
import { MdOutlinePedalBike } from 'react-icons/md'
import { FiTruck } from 'react-icons/fi'
import { AiOutlineCar } from 'react-icons/ai'
import { BiBus } from 'react-icons/bi'
import { MdCancel, MdDelete, MdInfo } from 'react-icons/md'
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { db } from '../../helpers/firebase'
import '../../components/modal/ConfirmBox.css'
import Loader from "../../components/Loader";
import { ImFilesEmpty } from 'react-icons/im'
import useDialog from "../../hooks/useDialog";

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

    const [ show, handleShow, handleClose ] = useDialog()


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
        let totalNumber = 0
        !stickerRange || stickerRange.filter(range => range.category === category).map(range => totalNumber += (range.rangeTo - range.rangeFrom))
        return totalNumber || 0
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

    console.log(singleDoc)

    const returnedSticker = async (event) => {
      event.preventDefault()

      const docRef = doc(db, "ranges", singleDoc.id);
      await updateDoc(docRef, {
        returned: [ ...singleDoc.returned, event.target.returned.value ]
      })
      .then(() => {
        toast.success(`Successfully added #${event.target.returned.value} to returned sticker numbers`, {position: "top-center"}); 
        getStickerRange()
      })
      .catch(error => console.log(error))
      handleClose()

    }

    return (
        <div /* className="components" */>
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

            {singleDoc !== undefined &&
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Sticker Range Details</Modal.Title></Modal.Header>
                  <Modal.Body>
                  <div className="m-5">
                      <div style={{display: "flex", justifyContent: "space-between"}}>
                          <div><p>Range from: </p></div>
                          <div><p><b>{singleDoc.rangeFrom} -  {singleDoc.rangeTo}</b></p></div>
                      </div>
                      <div style={{display: "flex", justifyContent: "space-between"}}>
                          <div><p>Assigned to: </p></div>
                          <div><p><b>{singleDoc.assignedTo} </b> (supervisor)</p></div>
                      </div>
                      <div style={{display: "flex", justifyContent: "space-between"}}>
                          <div><p>Used Sticker Numbers: </p></div>
                          <div><p><b>{singleDoc.used && singleDoc.used.length}</b></p></div>
                      </div>
                      <div style={{display: "flex", justifyContent: "space-between"}}>
                          <div><p>Returned Sticker Numbers: </p></div>
                          <div><p><b>{singleDoc.returned ? singleDoc.returned.length : 0}</b></p></div>
                      </div>
                      <div style={{display: "flex", justifyContent: "space-between"}}>
                          <div><p>Total Number of stickers: </p></div>
                          <div><p><b>{singleDoc.rangeTo - singleDoc.rangeFrom}</b></p></div>
                      </div>
                      <div style={{display: "flex", justifyContent: "space-between"}} className="mt-3">
                          <div><p>Used Stickers: </p></div>
                          <div><p><b>[{singleDoc.used && singleDoc.used.length > 0 && singleDoc.used.map(number => <> {number}, </>)}]</b></p></div>
                      </div>
                      <div style={{display: "flex", justifyContent: "space-between"}} className="mt-3">
                          <div><p>Returned Stickers: </p></div>
                          <div><p><b>[{singleDoc.returned && singleDoc.returned.length > 0 && singleDoc.returned.map(number => <> {number}, </>)}]</b></p></div>
                      </div>
                  </div>
                      <hr></hr>
                      <form onSubmit={returnedSticker}>
                        <Form.Group className="mb-3" >
                            <Form.Label htmlFor='returned'>Add Returned Stickers:</Form.Label>
                            <Form.Control type="text" placeholder="Enter sticker Number" id="returned"/>
                        </Form.Group>
                        <input type="submit" className='btn btn-primary cta' value="Submit" />
                      </form>
                      
                  
                  </Modal.Body>
              </Modal>
            }

            <div className="componentsData">
                    <div className="sticker-mgt">
                            <Badge color={"#5CB85C"} number={numberOfCategory('Motor Bike')} title={"Motor Bikes"} icon={<MdOutlinePedalBike />} />
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
                      </div>

                      <Table responsive hover bordered striped>
                          <thead>
                            <tr><th className="text-center">#</th><th>Category</th><th>Sticker Nos</th><th>used/Total No Received</th><th>Created At</th><th className="text-center">Actions</th></tr>
                          </thead>
                          <tbody>
                            {currentStickers.map((sticker, index) => (
                              <tr key={sticker.id}>
                                <td className="text-center" style={{width: "9rem"}}>{index + 1}</td>
                                <td>{sticker.category}</td>
                                <td>[<span style={{color: "#c82e29"}}>{`${sticker.rangeFrom} - ${sticker.rangeTo}`}</span>]</td>
                                <td>{sticker.used && sticker.used.length}/{sticker.rangeTo - sticker.rangeFrom}</td>
                                <td>{sticker.timeCreated && sticker.timeCreated}</td>
                                
                                <td className="started text-center">
                                  <button className="sharebtn" onClick={() => {setClickedIndex(index); setShowContext(!showContext); setSingleDoc(sticker)}}>&#8942;</button>

                                  <ul  id="mySharedown" className={(showContext && index === clickedIndex) ? 'mydropdown-menu show': 'mydropdown-menu'} onClick={(event) => event.stopPropagation()}>
                                    <li onClick={() => {handleShow(); setShowContext(false)}}>
                                      <div className="actionDiv">
                                        <i><MdInfo /></i> Details
                                      </div>
                                    </li>
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
                            <tr><th className="text-center">#</th><th>Category</th><th>Sticker Nos</th><th>used/Total No Received</th><th>Created At</th><th className="text-center">Actions</th></tr>
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
