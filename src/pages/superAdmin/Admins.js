import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Pagination from "../../helpers/Pagination";
import SearchBar from "../../components/searchBar/SearchBar";
import Header from "../../components/header/Header";
import { functions, authentication, db } from "../../helpers/firebase";
import { httpsCallable } from "firebase/functions";
import { Table, Form, Modal } from "react-bootstrap";
import { MdDelete, MdEdit } from "react-icons/md";
import Loader from "../../components/Loader";
import { ImFilesEmpty } from "react-icons/im";
import useDialog from "../../hooks/useDialog";
import ClientModal from "../../components/ClientModal";
import { collection, addDoc } from "firebase/firestore";
import { handleAllCheck } from "../../helpers/helpfulUtilities";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Chat from "../../components/messenger/Chat";
import "../../styles/ctas.css";

function Admins({ parent_container }) {
  useEffect(() => {
    document.title = "Admins - SWICO";
    getAdmins();
  }, []);

  // get Admins
  const [admins, setAdmins] = useState([]);
  const getAdmins = () => {
    const listUsers = httpsCallable(functions, "listUsers");
    listUsers()
      .then(({ data }) => {
        const myAdmins = data.filter((user) => user.role.admin === true);
        myAdmins.length === 0 ? setAdmins(null) : setAdmins(myAdmins);
      })
      .catch();
  };

  // initialising the logs doc.
  const logCollectionRef = collection(db, "logs");

  // show model
  const [showModal, handleShow, handleClose] = useDialog();

  const [singleDoc, setSingleDoc] = useState({});

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [adminsPerPage] = useState(10);

  // search by name
  const [searchText, setSearchText] = useState("");
  const handleSearch = ({ target }) => setSearchText(target.value);
  const searchByName = (data) =>
    data.filter(
      (row) => row.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1
    );

  const indexOfLastAdmin = currentPage * adminsPerPage;
  const indexOfFirstAdmin = indexOfLastAdmin - adminsPerPage;
  const currentAdmins =
    !admins || searchByName(admins).slice(indexOfFirstAdmin, indexOfLastAdmin);
  const totalPagesNum = !admins || Math.ceil(admins.length / adminsPerPage);

  const handleDelete = () => {
    const deleteUser = httpsCallable(functions, "deleteUser");
    deleteUser({ uid: singleDoc.uid })
      .then(() =>
        toast.success(`Successfully deleted ${singleDoc.name}`, {
          position: "top-center",
        })
      )
      .then(async () => {
        await addDoc(logCollectionRef, {
          timeCreated: `${new Date()
            .toISOString()
            .slice(
              0,
              10
            )} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
          type: "user deletion",
          status: "successful",
          message: `Successfully deleted admin - [ ${singleDoc.name} ] by ${authentication.currentUser.displayName}`,
        });
      })

      .catch(async (error) => {
        toast.error(`Failed to deleted ${singleDoc.name}`, {
          position: "top-center",
        });
        await addDoc(logCollectionRef, {
          timeCreated: `${new Date()
            .toISOString()
            .slice(
              0,
              10
            )} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
          type: "user deletion",
          status: "failed",
          message: `Failed to delete admin [ ${singleDoc.name} ] by ${authentication.currentUser.displayName}`,
        });
      });

    getAdmins();
  };

  const handleMultpleDelete = async (arr) => {
    const deleteUser = httpsCallable(functions, "deleteUser");
    deleteUser({ uid: arr[0] })
      .then(() =>
        toast.success(`Successfully deleted ${arr[1]}`, {
          position: "top-center",
        })
      )
      .then(async () => {
        await addDoc(logCollectionRef, {
          timeCreated: `${new Date()
            .toISOString()
            .slice(
              0,
              10
            )} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
          type: "user deletion",
          status: "successful",
          message: `Successfully deleted ${arr[1]} by ${authentication.currentUser.displayName}`,
        });
      })
      .catch(async () => {
        toast.error(`Failed to deleted ${arr[1]}`, { position: "top-center" });
        await addDoc(logCollectionRef, {
          timeCreated: `${new Date()
            .toISOString()
            .slice(
              0,
              10
            )} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
          type: "sticker deletion",
          status: "failed",
          message: `Failed to delete ${arr[1]} by ${authentication.currentUser.displayName}`,
        });
      });
    getAdmins();
  };

  // delete multiple agents
  const [bulkDelete, setBulkDelete] = useState(null);
  const [deleteArray, setDeleteArray] = useState([]);
  const handleBulkDelete = async () => {
    if (bulkDelete) {
      deleteArray.map((admin) => handleMultpleDelete(admin));
    }

    getAdmins();
  };

  // Confirm Box
  const [show, setShow] = useState(false);
  const [openToggle, setOpenToggle] = useState(false);
  window.onclick = (event) => {
    if (openToggle) {
      if (!event.target.matches(".wack") && !event.target.matches("#myb")) {
        setOpenToggle(false);
      }
    }
    if (!event.target.matches(".sharebtn")) {
      setShow(false);
    }
  };
  const [clickedIndex, setClickedIndex] = useState(null);

  return (
    <div className="components">
      <Header title="Admins" subtitle="MANAGING ADMINS" />

      <ToastContainer />

      <div id="add_client_group">
        <div></div>
        <Link to="/superadmin/add-admin" className="classic">
          <button className="btn cta m-2">Add admin</button>
        </Link>
      </div>

      <div className={openToggle ? "myModal is-active" : "myModal"}>
        <div className="modal__content wack">
          <h1 className="wack">Confirm</h1>
          <p className="wack">
            Are you sure you want to delete <b>{singleDoc.name}</b>
          </p>
          <div className="buttonContainer wack">
            <button
              id="noButton"
              onClick={() => setOpenToggle(false)}
              className="wack"
            >
              No, Cancel
            </button>
            <button
              id="yesButton"
              onClick={() => {
                setOpenToggle(false);
                handleDelete();
              }}
              className="wack"
            >
              Yes, Delete
            </button>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={handleClose}>
        <ClientModal
          singleDoc={singleDoc}
          handleClose={handleClose}
          getUsers={getAdmins}
        />
      </Modal>

      {admins !== null && admins.length > 0 ? (
        <>
          <div className="shadow-sm table-card componentsData">
            <div id="search">
              <SearchBar
                placeholder={"Search for Admins"}
                value={searchText}
                handleSearch={handleSearch}
              />
              <div></div>
              {/* <Form.Group className="m-3 categories" width="200px">
                        <button className='btn btn-primary cta mb-3'>Export <MdDownload /></button>
                      </Form.Group> */}
            </div>

            {currentAdmins.length > 0 ? (
              <>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>
                        <input
                          type="checkbox"
                          id="onlyagent"
                          onChange={() =>
                            handleAllCheck(admins, setDeleteArray)
                          }
                          className="tw-accent-gray-800 tw-cursor-pointer"
                        />
                      </th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Gender</th>
                      <th>Contact</th>
                      <th>Address</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentAdmins.map((admin, index) => (
                      <tr
                        key={admin.uid}
                        className={`${
                          index % 2 === 0 ? "tw-bg-neutral-100" : "tw-bg-white"
                        } tw-cursor-pointer hover:tw-bg-neutral-200`}
                      >
                        <td>
                          <input
                            type="checkbox"
                            id="firstAgentCheckbox"
                            className="agentCheckbox tw-accent-gray-800 tw-cursor-pointer"
                            onChange={({ target }) => {
                              document.getElementById(
                                "onlyagent"
                              ).checked = false;
                              return target.checked
                                ? setDeleteArray([
                                    ...deleteArray,
                                    [admin.uid, admin.name],
                                  ])
                                : setDeleteArray(
                                    deleteArray.filter(
                                      (element) => element[0] !== admin.uid
                                    )
                                  );
                            }}
                          />
                        </td>
                        <td>{admin.name}</td>
                        <td>{admin.email}</td>
                        <td>{admin.meta.gender}</td>
                        <td>{admin.meta.phone}</td>
                        <td>{admin.meta.address}</td>

                        <td className="started">
                          <button
                            className="sharebtn"
                            onClick={() => {
                              setClickedIndex(index);
                              setShow(!show);
                              setSingleDoc(admin);
                            }}
                          >
                            &#8942;
                          </button>

                          <ul
                            id="mySharedown"
                            className={
                              show && index === clickedIndex
                                ? "mydropdown-menu show"
                                : "mydropdown-menu"
                            }
                            onClick={(event) => event.stopPropagation()}
                          >
                            <li
                              onClick={() => {
                                setShow(false);
                                handleShow();
                              }}
                            >
                              <div className="actionDiv">
                                <i>
                                  <MdEdit />
                                </i>{" "}
                                Edit
                              </div>
                            </li>
                            <li
                              onClick={() => {
                                setOpenToggle(true);
                                setShow(false);
                              }}
                            >
                              <div className="actionDiv">
                                <i>
                                  <MdDelete />
                                </i>{" "}
                                Delete
                              </div>
                            </li>
                          </ul>
                        </td>
                      </tr>
                    ))}
                  </tbody>

                  <tfoot>
                    <tr
                      style={{
                        border: "1px solid white",
                        borderTop: "1px solid #000",
                      }}
                    >
                      <td colSpan={3} style={{ paddingLeft: 0 }}>
                        <div style={{ display: "flex" }}>
                          <Form.Select
                            aria-label="User role"
                            id="category"
                            onChange={(event) =>
                              setBulkDelete(event.target.value)
                            }
                          >
                            <option value="">Bulk Action</option>
                            <option value="delete">Delete</option>
                          </Form.Select>
                          <button
                            className="btn cta mx-2"
                            onClick={handleBulkDelete}
                          >
                            Apply
                          </button>
                        </div>
                      </td>
                      <td colSpan={4}>
                        <Pagination
                          pages={totalPagesNum}
                          setCurrentPage={setCurrentPage}
                          currentClients={currentAdmins}
                          sortedEmployees={admins}
                          entries={"Admins"}
                        />
                      </td>
                    </tr>
                  </tfoot>

                  <tfoot>
                    <tr>
                      <th></th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Gender</th>
                      <th>Contact</th>
                      <th>Address</th>
                      <th>Action</th>
                    </tr>
                  </tfoot>
                </Table>
              </>
            ) : (
              <div className="tw-mt-5 tw-flex tw-flex-col tw-items-center tw-h-full tw-py-5 tw-px-5">
                <ImFilesEmpty size={40} className="tw-mb-3" />
                <h4 className="tw-text-lg md:tw-text-xl">No match</h4>
                <p className="tw-text-gray-500">
                  There is not current match for client's name
                </p>
              </div>
            )}
          </div>
        </>
      ) : admins === null ? (
        <div className="no-table-data">
          <i>
            <ImFilesEmpty />
          </i>
          <h4>No data yet</h4>
          <p>You have not created any Motor Third Party Stickers Yet</p>
        </div>
      ) : (
        <Loader />
      )}
      <div
        style={{
          width: "100%",
          position: "fixed",
          bottom: "0px",
          display: "flex",
          justifyContent: "flex-end",
        }}
        className={
          parent_container ? "chat-container" : "expanded-menu-chat-container"
        }
      >
        <Chat />
      </div>
    </div>
  );
}

export default Admins;
