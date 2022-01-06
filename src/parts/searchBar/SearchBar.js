import './searchBar.css'
import React from 'react'
import { MdSearch } from 'react-icons/md'

const SearchBar = ({placeholder, handleSearch, value}) => (
            <div className='searchComponent'>
                <div className="searchContainer">
                <input
                    type="text"
                    placeholder={placeholder}
                    value={value}
                    onChange={handleSearch}
                />
                <MdSearch className="searchIcon"/>
                </div>
            </div>
    )

export default SearchBar
