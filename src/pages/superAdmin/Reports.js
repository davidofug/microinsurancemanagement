// import { Link } from 'react-router-dom'
import { useEffect, useState } from "react";
import data from "../../helpers/mock-data.json";
import Datatable from "../../helpers/DataTable";
import { MdDownload } from "react-icons/md";
import { CSVLink } from "react-csv";
import SearchBar from "../../components/searchBar/SearchBar";
import Header from "../../components/header/Header";

function Reports() {
  useEffect(() => {
    document.title = "Britam - Reports";
  }, []);

  const [q, setQ] = useState("");

  const columnHeading = [
    "Policy Holder",
    "Reg No.",
    "Car Make",
    "Seating Capacity",
    "G.weight",
    "Sticker No.",
    "Category",
    "Cover Type",
    "Start Date",
    "End Date",
    "Validity",
    "Basic Premium",
    "Training Levy",
    "Sticker Fees",
    "VAT Charge",
    "Stamp Duty",
    "Gross Commission",
    "Issuing Branch",
    "Issuing Officer",
    "Currency",
  ];
  const columns = [
    "name",
    "contact",
    "createdAt",
    "id",
    "amount",
    "amount",
    "status",
    "paymentMethod",
    "createdAt",
    "createdAt",
    "status",
    "amount",
    "amount",
    "amount",
    "amount",
    "amount",
    "name",
    "address",
    "name",
    "currency",
  ];
  const search = (rows) =>
    rows.filter((row) =>
      columns.some(
        (column) =>
          row[column].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
      )
    );

  const handleSearch = ({ target }) => setQ(target.value);

  return (
    <div className="components">
      <Header title="Reports" subtitle="MANAGING REPORTS" />

      <div
        className="componentsData "
        style={{ "max-width": "80vw", margin: "auto" }}
      >
        <div class="table-card">
          <div id="search">
            <SearchBar
              placeholder={"Search for organisation"}
              value={q}
              handleSearch={handleSearch}
            />
            <div></div>
            <CSVLink
              data={data}
              filename={"Britam-Reports.csv"}
              className="btn btn-primary cta"
              target="_blank"
            >
              Export <MdDownload />
            </CSVLink>
          </div>
          <Datatable
            data={search(data)}
            columnHeading={columnHeading}
            columns={columns}
          />
        </div>
      </div>
    </div>
  );
}

export default Reports;
