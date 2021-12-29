import './searchBar.css'
import React from 'react'
import { MdSearch } from 'react-icons/md'

export default function SearchBar({placeholder, value, handleSearch}) {
    return (
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
}
