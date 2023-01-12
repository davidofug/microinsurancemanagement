import "./searchBar.css";
import React from "react";
import { MdSearch } from "react-icons/md";

const SearchBar = ({ placeholder, handleSearch, value }) => (
  <div className="tw-outline tw-outline-1 tw-outline-[#ced4da] tw-flex tw-min-w-[400px] tw-rounded">
    <MdSearch className="searchIcon" />
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      className="tw-px-3 tw-py-2 tw-w-full"
      onChange={handleSearch}
    />
  </div>
);

export default SearchBar;
