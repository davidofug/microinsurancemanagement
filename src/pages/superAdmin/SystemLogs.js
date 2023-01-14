import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../helpers/firebase";
import { Table } from "react-bootstrap";
import Pagination from "../../helpers/Pagination";
import Loader from "../../components/Loader";
import { ImFilesEmpty } from "react-icons/im";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoIosCloseCircle } from "react-icons/io";

function SystemLogs() {
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
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);

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
      )
      .filter(
        (log) =>
          !(dateFrom && dateTo) ||
          (log.timeCreated >= dateFrom && log.timeCreated <= dateTo)
      );

  const paginatedShownLogs =
    !logs || shownLogs.slice(indexOfFirstLog, indexOfLastLog);
  const totalPagesNum = !logs || Math.ceil(shownLogs.length / logsPerPage);

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
              <div className="tw-outline tw-outline-1 tw-outline-[#dee1e4] tw-bg-transparent tw-rounded tw-flex tw-items-center tw-px-2">
                <p>From:</p>
                <div className="tw-cursor-pointer tw-appearance-none tw-flex tw-items-center tw-w-40 tw-relative">
                  <input
                    type="date"
                    id="pickDate1"
                    onChange={({ target: { value } }) => setDateFrom(value)}
                    max={today}
                    className="tw-bg-transparent tw-w-full tw-cursor-pointer tw-appearance-none tw-px-3 tw-py-2"
                  />
                  {dateFrom ? (
                    <IoIosCloseCircle
                      size={20}
                      className="tw-absolute tw-text-gray-400 tw-right-2"
                      onClick={() => {
                        setDateFrom("");
                        document.getElementById("pickDate1").value = "";
                      }}
                    />
                  ) : (
                    <MdKeyboardArrowDown
                      size={20}
                      className="tw-absolute tw-right-2 tw-pointer-events-none"
                    />
                  )}
                </div>
                <div className="tw-outline-1 tw-bg-transparent tw-cursor-pointer tw-appearance-none tw-flex tw-items-center tw-w-40 tw-relative">
                  <p>To:</p>
                  <input
                    type="date"
                    id="pickDate2"
                    onChange={({ target: { value } }) => setDateTo(value)}
                    max={today}
                    className="tw-bg-transparent tw-w-full tw-cursor-pointer tw-appearance-none tw-px-3 tw-py-2"
                  />
                  {dateTo ? (
                    <IoIosCloseCircle
                      size={20}
                      className="tw-absolute tw-text-gray-400 tw-right-2"
                      onClick={() => {
                        setDateTo("");
                        document.getElementById("pickDate2").value = "";
                      }}
                    />
                  ) : (
                    <MdKeyboardArrowDown
                      size={20}
                      className="tw-absolute tw-right-2 tw-pointer-events-none"
                    />
                  )}
                </div>
              </div>
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
    </div>
  );
}

export default SystemLogs;
