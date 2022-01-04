import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Header from "../parts/header/Header";
import { Table, Alert } from 'react-bootstrap'
import { FaEllipsisV } from "react-icons/fa";

export default function Mtp() {
  useEffect(() => {
    document.title = "Britam - Motor Third Party";
  }, []);

  const [q, setQ] = useState("");
  const [mtps, setMtps] = useState([])

  const columns = [
    "name",
    "contact",
    "amount",
    "paymentMethod",
    "currency",
    "agentName",
    "status",
    "createdAt",
  ];
  const search = (rows) =>
    rows.filter((row) =>
      columns.some(
        (column) =>
          row[column].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
      )
    );

  return (
    <div className="components">
      <Header
        title="Motor Third Party"
        subtitle="MANAGING THIRD PARTY POLICIES"
      />

      <div id="add_client_group">
        <div></div>
        <Link to="/admin/add-mtp">
          <button className="btn btn-primary cta">Add MTP</button>
        </Link>
      </div>

      <div className="table-card componentsData">
        <div id="search">
          <div></div>
          <div></div>
          <Form.Control
            type="text"
            className="mb-3"
            placeholder="Search for policy"
            value={q}
            onChange={({ target }) => setQ(target.value)}
          />
        </div>

        <Table striped hover bordered responsive>
            <thead>
                <tr><th>Client</th><th>Category</th><th>Amount</th><th>Payment Method</th><th>Currency</th><th>Status</th><th>Created At</th><th>Action</th></tr>
            </thead>
            <tbody>
                {mtps.length > 0 ?
                    <>
                        {mtps.map((mtp, index) => (
                        <tr>
                            <td>{mtp.client}</td>
                            <td>{mtp.category}</td>
                            <td>{mtp.amount}</td>
                            <td>{mtp.paymentMethod}</td>
                            <td>{mtp.currency}</td>
                            <td>
                                <Alert
                                style={{
                                    backgroundColor: "#1475cf",
                                    color: "#fff",
                                    padding: "5px",
                                    textAlign: "center",
                                    border: "none",
                                    margin: "0",
                                }}
                                >
                                {mtp.status}
                                </Alert>
                            </td>
                            <td>{mtp.createdAt}</td>
                            <td className="started">
                    <FaEllipsisV
                      className={`actions please${index}`}
                      onClick={() => {
                        document
                          .querySelector(`.please${index}`)
                          .classList.add("hello");
                      }}
                    />
                    <ul id="actionsUl" className="actions-ul">
                      <li>
                        <button>Details</button>
                      </li>
                      <li>
                        <button>Renew</button>
                      </li>
                      <li>
                        <button>Cancel</button>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            document
                              .querySelector(`.please${index}`)
                              .classList.remove("hello");
                            const confirmBox = window.confirm(
                              `Are you sure you want to delete ${mtp}'s claim`
                            );
                            if (confirmBox === true) {
                            }
                          }}
                        >
                          Delete
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            document
                              .querySelector(`.please${index}`)
                              .classList.remove("hello");
                          }}
                        >
                          Edit
                        </button>
                      </li>
                      <hr style={{ color: "black" }}></hr>
                      <li>
                        <button
                          onClick={() => {
                            document
                              .querySelector(`.please${index}`)
                              .classList.remove("hello");
                          }}
                        >
                          close
                        </button>
                      </li>
                    </ul>
                  </td>
                        </tr>
                    ))}
                    </>
                :
                <tr>
                    <td>hello</td>
                    <td>hello</td>
                    <td>hello</td>
                    <td>hello</td>
                    <td>Noway</td>
                    <td>
                    <Alert
                      style={{
                        backgroundColor: "#1475cf",
                        color: "#fff",
                        padding: "5px",
                        textAlign: "center",
                        border: "none",
                        margin: "0",
                      }}
                    >
                      new
                    </Alert>
                  </td>
                  <td>12-09-2019</td>
                  <td className="started">
                    <FaEllipsisV />
                  </td>
                </tr>
                }
            </tbody>
            <tfoot>
            <tr><th>Client</th><th>Category</th><th>Amount</th><th>Payment Method</th><th>Currency</th><th>Status</th><th>Created At</th><th>Action</th></tr>
            </tfoot>
        </Table>
      </div>
    </div>
  );
}
