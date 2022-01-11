import './searchBar.css'
import React from 'react'
import { MdSearch } from 'react-icons/md'

const SearchBar = ({placeholder, handleSearch, value}) => (
            <div className='searchComponent'>
                <div className="searchContainer">
                <MdSearch className="searchIcon"/>
                <input
                    type="text"
                    placeholder={placeholder}
                    value={value}
                    onChange={handleSearch}
                />
                <select id="searchBy" name="selectBox">
                    <option>name</option>
                    <option>category</option>
                </select>
                </div>
            </div>
    )

export default SearchBar
