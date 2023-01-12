import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../helpers/firebase";
import { Table, Form } from "react-bootstrap";
import Pagination from "../../helpers/Pagination";
import Loader from "../../components/Loader";
import { ImFilesEmpty } from "react-icons/im";
import Chat from "../../components/messenger/Chat";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoIosCloseCircle } from "react-icons/io";

function SystemLogs({ parent_container }) {
  useEffect(() => {
    document.title = "System Logs - SWICO";
    getLogs();
    return () => {};
  }, []);

  let today = new Date().toISOString().substring(0, 10);

  const logCollectionRef = collection(db, "logs");
  const [logs, setLogs] = useState([]);
  const getLogs = async () => {
    const data = await getDocs(logCollectionRef);
    const ALL_LOGS = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    ALL_LOGS.length === 0 ? setLogs(null) : setLogs(ALL_LOGS);
  };

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [logsPerPage] = useState(10);
  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;

  const [switchStatus, setSwitchStatus] = useState(null);
  const [logType, setLogType] = useState(null);
  const [date, setDate] = useState(null);

  const convertStringToDate = (stringDate) => {
    return new Date(stringDate);
  };

  const shownLogs =
    !logs ||
    logs
      .sort(
        (a, b) =>
          convertStringToDate(b.timeCreated) -
          convertStringToDate(a.timeCreated)
      )
      .filter((log) => !switchStatus || log.status === switchStatus)
      .filter((log) => !logType || log.type === logType)
      .filter(
        (log) =>
          !date ||
          (typeof log.timeCreated === "string" &&
            log.timeCreated.slice(0, 10) === date)
      );

  const paginatedShownLogs =
    !logs || shownLogs.slice(indexOfFirstLog, indexOfLastLog);
  const totalPagesNum = !logs || Math.ceil(shownLogs.length / logsPerPage);

  const dt2 = new Date("2022-01-31 10:48:29");
  const dt1 = new Date("2022-01-31 9:47:10");
  var diff = (dt1.getTime() - dt2.getTime()) / 1000;
  diff /= 60 * 60;
  /* console.log(Math.abs(Math.round(diff)));
  console.log(3679000/1000/3600)
  console.log(1440/60) */

  return (
    <div className="components">
      <Header title="System Logs" subtitle="MANAGING LOGS" />

      {logs !== null && logs.length > 0 ? (
        <>
          <div className="componentsData  shadow-sm table-card my-5 outline">
            <div
              /*id="search"*/ className="search tw-w-full tw-flex tw-flex-wrap tw-gap-2 md:tw-gap-3 tw-items-center"
            >
              <div className="tw-outline tw-outline-1 tw-bg-transparent tw-rounded tw-outline-[#dee1e4] tw-cursor-pointer tw-appearance-none tw-flex tw-items-center tw-w-40 tw-relative">
                <select
                  className="tw-bg-transparent tw-w-full tw-cursor-pointer tw-appearance-none tw-px-3 tw-py-2"
                  id="status"
                  onChange={({ target: { value } }) => setSwitchStatus(value)}
                >
                  <option value="">Select Log Status</option>
                  <option value="successful">Successful</option>
                  <option value="failed">Failed</option>
                </select>
                {switchStatus ? (
                  <IoIosCloseCircle
                    size={20}
                    className="tw-absolute tw-text-gray-400 tw-right-2"
                    onClick={() => {
                      setSwitchStatus("");
                      document.getElementById("status").value = "";
                    }}
                  />
                ) : (
                  <MdKeyboardArrowDown
                    size={20}
                    className="tw-absolute tw-right-2 tw-pointer-events-none"
                  />
                )}
              </div>
              <div className="tw-outline tw-outline-1 tw-bg-transparent tw-rounded tw-outline-[#dee1e4] tw-cursor-pointer tw-appearance-none tw-flex tw-items-center tw-w-40 tw-relative">
                <select
                  className="tw-bg-transparent tw-w-full tw-cursor-pointer tw-appearance-none tw-px-3 tw-py-2"
                  id="log"
                  onChange={({ target: { value } }) => setLogType(value)}
                >
                  <option value="">Select Log Type</option>
                  <option value="user creation">User Creation</option>
                  <option value="user deletion">User Deletion</option>
                  <option value="sticker creation">Sticker Creation</option>
                  <option value="sticker deletion">Sticker Deletion</option>
                  <option value="claim creation">Claim Creation</option>
                  <option value="claim deletion">Claim Deletion</option>
                </select>
                {logType ? (
                  <IoIosCloseCircle
                    size={20}
                    className="tw-absolute tw-text-gray-400 tw-right-2"
                    onClick={() => {
                      setLogType("");
                      document.getElementById("log").value = "";
                    }}
                  />
                ) : (
                  <MdKeyboardArrowDown
                    size={20}
                    className="tw-absolute tw-right-2 tw-pointer-events-none"
                  />
                )}
              </div>
              <div className="tw-outline tw-outline-1 tw-bg-transparent tw-rounded tw-outline-[#dee1e4] tw-cursor-pointer tw-appearance-none tw-flex tw-items-center tw-w-40 tw-relative">
                <input
                  type="date"
                  id="pickDate"
                  onChange={({ target: { value } }) => setDate(value)}
                  max={today}
                  className="tw-bg-transparent tw-w-full tw-cursor-pointer tw-appearance-none tw-px-3 tw-py-2"
                />
                {date ? (
                  <IoIosCloseCircle
                    size={20}
                    className="tw-absolute tw-text-gray-400 tw-right-2"
                    onClick={() => {
                      setDate("");
                      document.getElementById("pickDate").value = "";
                    }}
                  />
                ) : (
                  <MdKeyboardArrowDown
                    size={20}
                    className="tw-absolute tw-right-2 tw-pointer-events-none"
                  />
                )}
              </div>
              {/* <Form.Group
                className="categories tw-outline tw-outline-1"
                width="180px"
              >
                <Form.Label htmlFor="category">Status</Form.Label>
                <Form.Select
                  id="category"
                  onChange={({ target: { value } }) => setSwitchStatus(value)}
                >
                  <option value="">Select Log Status</option>
                  <option value="successful">Successful</option>
                  <option value="failed">Failed</option>
                </Form.Select>
              </Form.Group> */}
              {/* <Form.Group className="categories">
                <Form.Label htmlFor="date">Date</Form.Label>
                <br />
                <input
                  type="date"
                  id="date"
                  style={{ padding: "10px" }}
                  onChange={({ target: { value } }) => setDate(value)}
                  max={today}
                />
              </Form.Group> */}
              {/* <Form.Group className="categories" width="200px">
                <Form.Label htmlFor="logType">Logs</Form.Label>
                <Form.Select
                  id="logType"
                  onChange={({ target: { value } }) => setLogType(value)}
                >
                  <option value="">Select Log Type</option>
                  <option value="user creation">User Creation</option>
                  <option value="user deletion">User Deletion</option>
                  <option value="sticker creation">Sticker Creation</option>
                  <option value="sticker deletion">Sticker Deletion</option>
                  <option value="claim creation">Claim Creation</option>
                  <option value="claim deletion">Claim Deletion</option>
                </Form.Select>
              </Form.Group> */}
            </div>

            {shownLogs.length > 0 ? (
              <>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Time</th>
                      <th>Type</th>
                      <th>Status</th>
                      <th>Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedShownLogs.map((log, index) => (
                      <tr
                        key={log.id}
                        className={`${
                          index % 2 === 0 ? "tw-bg-neutral-100" : "tw-bg-white"
                        } tw-cursor-pointer hover:tw-bg-neutral-200`}
                      >
                        <td>
                          {typeof log.timeCreated === "string" &&
                            log.timeCreated}
                        </td>
                        <td>{log.type}</td>
                        <td>
                          {log.status === "successful" ? (
                            <div className="tw-bg-[#d4edda] tw-text-[#155724] px-3 py-2 tw-text-xs tw-rounded-lg tw-w-24 tw-text-center">
                              Success
                            </div>
                          ) : (
                            <div className="tw-bg-[#f8d7da] tw-text-[#721c24] px-3 py-2 tw-text-xs tw-rounded-lg tw-w-24 tw-text-center">
                              Failed
                            </div>
                          )}
                        </td>
                        <td>{log.message}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th>Time</th>
                      <th>Type</th>
                      <th>Status</th>
                      <th>Message</th>
                    </tr>
                  </tfoot>
                </Table>

                <Pagination
                  pages={totalPagesNum}
                  setCurrentPage={setCurrentPage}
                  currentClients={paginatedShownLogs}
                  sortedEmployees={shownLogs}
                  entries={"System Logs"}
                />
              </>
            ) : (
              <div className="tw-mt-5 tw-flex tw-flex-col tw-items-center tw-h-full tw-py-5 tw-px-5">
                <ImFilesEmpty size={40} className="tw-mb-3" />
                <h4 className="tw-text-lg md:tw-text-xl">
                  No data for the query
                </h4>
                <p className="tw-text-gray-500">There are no Logs Yet</p>
              </div>
            )}
          </div>
        </>
      ) : logs === null ? (
        <div className="tw-mt-5 tw-flex tw-flex-col tw-items-center tw-h-full tw-py-5 tw-px-5">
          <ImFilesEmpty size={40} className="tw-mb-3" />
          <h4 className="tw-text-lg md:tw-text-xl">No data yet</h4>
          <p className="tw-text-gray-500">There are no Logs Yet</p>
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

export default SystemLogs;
