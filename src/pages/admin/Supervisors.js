import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Pagination from "../../helpers/Pagination";
import SearchBar from "../../components/searchBar/SearchBar";
import Header from "../../components/header/Header";
import { functions, authentication, db } from "../../helpers/firebase";
import { httpsCallable } from "firebase/functions";
import { Table, Modal, Form } from "react-bootstrap";
import ClientModal from "../../components/ClientModal";
import { MdEdit, MdDelete, MdStickyNote2 } from "react-icons/md";
import { ImFilesEmpty } from "react-icons/im";
import Loader from "../../components/Loader";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import useDialog from "../../hooks/useDialog";
import { handleAllCheck } from "../../helpers/helpfulUtilities";
import { getUsers } from "../../helpers/helpfulUtilities";
import { toast } from "react-toastify";
import Chat from "../../components/messenger/Chat";
import SupervisorDetails from "../../components/SupervisorDetails";
import useAuth from "contexts/Auth";
import "../../styles/ctas.css";
import { useMemo } from "react";

function Supervisors({ parent_container }) {
  const [supervisors, setSupervisors] = useState([]);
  const [shouldUpdate, setShouldUpdate] = useState(false);

  useEffect(() => {
    // your code here
    setShouldUpdate(true);
  }, []);

  useEffect(() => {
    document.title = "Supervisors - Statewide Insurance";
    getSupervisors();
    console.log("something");
    setShouldUpdate(false);
    return () => {};
  }, [shouldUpdate]);

  const { authClaims } = useAuth();
  // initialising the logs collection.
  const logCollectionRef = collection(db, "logs");

  const getSupervisors = () => {
    getUsers("supervisor", authClaims?.superadmin).then((result) => {
      result.length === 0 ? setSupervisors(null) : setSupervisors(result);
    });
  };

  const [singleDoc, setSingleDoc] = useState({});
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [clickedIndex, setClickedIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [supervisorsPerPage] = useState(10);
  const [openSticker, handleOpenSticker, handleCloseSticker] = useDialog();

  // search by name
  const [searchText, setSearchText] = useState("");
  const handleSearch = ({ target }) => setSearchText(target.value);
  const searchByName = (data) =>
    data ||
    data.filter(
      (row) => row.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1
    );

  const indexOfLastSupervisor = currentPage * supervisorsPerPage;
  const indexOfFirstSupervisor = indexOfLastSupervisor - supervisorsPerPage;
  const currentSupervisors =
    !supervisors ||
    searchByName(
      supervisors.slice(indexOfFirstSupervisor, indexOfLastSupervisor)
    );
  const totalPagesNum =
    !supervisors || Math.ceil(supervisors.length / supervisorsPerPage);

  const handleDelete = async () => {
    const deleteUser = httpsCallable(functions, "deleteUser");
    deleteUser({ uid: singleDoc.uid })
      .then(() =>
        toast.success(`Successfully deleted ${singleDoc.name}`, {
          position: "top-center",
        })
      )
      .then(() => setShouldUpdate(true))
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
          message: `Successfully deleted supervisor - ${singleDoc.name} by ${authentication.currentUser.displayName}`,
        });
      })
      .catch(async () => {
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
          type: "sticker deletion",
          status: "failed",
          message: `Failed to delete supervisor - ${singleDoc.name} by ${authentication.currentUser.displayName}`,
        });
      });

    getSupervisors();
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
          message: `Successfully deleted supervisor - ${arr[1]} by ${authentication.currentUser.displayName}`,
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
          message: `Failed to delete supervisor - ${arr[1]} by ${authentication.currentUser.displayName}`,
        });
      });

    getSupervisors();
  };

  // Confirm Box
  const [openToggle, setOpenToggle] = useState(false);
  window.onclick = (event) => {
    if (openToggle === true) {
      if (!event.target.matches(".wack") && !event.target.matches("#myb")) {
        setOpenToggle(false);
      }
    }
  };

  // delete multiple agents
  const [bulkDelete, setBulkDelete] = useState(null);
  const [deleteArray, setDeleteArray] = useState([]);
  const handleBulkDelete = async () => {
    if (bulkDelete) {
      deleteArray.map((supervisor) => handleMultpleDelete(supervisor));
      getSupervisors();
    }
  };

  // actions context
  const [showContext, setShowContext] = useState(false);
  if (showContext === true) {
    window.onclick = function (event) {
      if (!event.target.matches(".sharebtn")) {
        setShowContext(false);
      }
    };
  }

  return (
    <div className="components">
      <Header title="Supervisors" subtitle="MANAGING SUPERVISORS" />

      <div id="add_client_group">
        <div></div>
        <Link to="/admin/add-supervisor">
          <button className="btn cta m-3">Add supervisor</button>
        </Link>
      </div>

      <div className={openToggle ? "myModal is-active" : "myModal"}>
        <div className="modal__content wack">
          <h5 className="wack">Delete {singleDoc.name}</h5>
          <p className="wack">
            Are you sure you want to delete {singleDoc.name}. This action cannot
            be undone
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

      <Modal show={show} onHide={handleClose}>
        <ClientModal
          singleDoc={singleDoc}
          handleClose={handleClose}
          getUsers={getSupervisors}
          setShouldUpdate={setShouldUpdate}
        />
      </Modal>

      <Modal show={openSticker} onHide={handleCloseSticker}>
        <SupervisorDetails name={singleDoc.name} user_id={singleDoc.uid} />
      </Modal>

      {supervisors !== null && supervisors.length > 0 ? (
        <>
          <div className="shadow-sm table-card componentsData">
            <div id="search">
              <SearchBar
                placeholder={"Search Supervisor by name"}
                value={searchText}
                handleSearch={handleSearch}
              />
            </div>

            {currentSupervisors.length > 0 ? (
              <>
                <Table hover striped responsive className="mt-5">
                  <thead>
                    <tr>
                      <th>
                        <input
                          type="checkbox"
                          id="onlyagent"
                          onChange={() =>
                            handleAllCheck(supervisors, setDeleteArray)
                          }
                        />
                      </th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Gender</th>
                      <th>Contact</th>
                      <th>Address</th>
                      <th>Created At</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentSupervisors.map((supervisor, index) => (
                      <tr key={supervisor.uid}>
                        <td>
                          <input
                            type="checkbox"
                            id="firstAgentCheckbox"
                            className="agentCheckbox"
                            onChange={({ target }) => {
                              document.getElementById(
                                "onlyagent"
                              ).checked = false;
                              return target.checked
                                ? setDeleteArray([
                                    ...deleteArray,
                                    [supervisor.uid, supervisor.name],
                                  ])
                                : setDeleteArray(
                                    deleteArray.filter(
                                      (element) => element[0] !== supervisor.uid
                                    )
                                  );
                            }}
                          />
                        </td>
                        <td>{supervisor.name}</td>
                        <td>{supervisor.email}</td>
                        <td>{supervisor.meta.gender}</td>
                        <td>{supervisor.meta.phone}</td>
                        <td>{supervisor.meta.address}</td>
                        <td>{supervisor.meta.address}</td>

                        <td className="started">
                          <button
                            className="sharebtn"
                            onClick={() => {
                              setClickedIndex(index);
                              setShowContext(!showContext);
                              setSingleDoc(supervisor);
                            }}
                          >
                            &#8942;
                          </button>

                          <ul
                            id="mySharedown"
                            className={
                              showContext && index === clickedIndex
                                ? "mydropdown-menu show"
                                : "mydropdown-menu"
                            }
                            onClick={(event) => event.stopPropagation()}
                          >
                            <li
                              onClick={() => {
                                setShowContext(false);
                                handleOpenSticker();
                              }}
                            >
                              <div className="actionDiv">
                                <i>
                                  <MdStickyNote2 />
                                </i>{" "}
                                Issued Stickers
                              </div>
                            </li>
                            <li
                              onClick={() => {
                                setShowContext(false);
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
                                setShowContext(false);
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
                          currentClients={currentSupervisors}
                          sortedEmployees={supervisors}
                          entries={"Supervisor"}
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
                      <th>Created At</th>
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
                  There is not current match for supervisor's name
                </p>
              </div>
            )}
          </div>
        </>
      ) : supervisors === null ? (
        <div className="no-table-data">
          <i>
            <ImFilesEmpty />
          </i>
          <h4>No data yet</h4>
          <p>You have not created any Organisations Yet</p>
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
          paddingRight: "140px",
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

export default Supervisors;
