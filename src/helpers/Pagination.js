import { useState } from "react";
import '../assets/styles/pagination.css'

export default function Pagination({pages, currentClients, setCurrentPage, sortedEmployees, entries}){
    const [ currentButton, setCurrentButton ] = useState(1)
    const numOfPages = []
    for(let i = 1; i <= pages; i++) numOfPages.push(i)
    
    return (
        <div className="clearfix">
            <div className="hint-text"></div>
            <ul className="pagination">
                <li>{currentClients.length} of {sortedEmployees.length}  {entries}</li>

                <li className={`${currentButton === 1 ? 'page-item disabled' : 'page-item'}`}>
                    <button onClick = {() => {
                            setCurrentButton(1)
                            setCurrentPage(1)
                        }}>
                        {'<<'}
                    </button>
                </li>

                <li className={`${currentButton === 1 ? 'page-item disabled' : 'page-item'}`}>
                    <button onClick = {() => {
                            setCurrentButton( prev => prev === 1 ? prev : prev-1 )
                            setCurrentPage(prev => prev === 1 ? prev : prev - 1)
                        }}>
                        {'<'}
                    </button>
                </li>


                <div><b>{currentButton} </b> of <b> {numOfPages.length}</b></div>
                <li className={`${currentButton === numOfPages.length ? 'page-item disabled' : 'page-item'}`}>
                    <button onClick={() => {
                        setCurrentButton(next => next === numOfPages.length ? next : next + 1)
                        setCurrentPage(next => next === numOfPages.length ? next : next + 1)
                    }}>
                        {'>'}
                    </button>
                </li>

                <li className={`${currentButton === numOfPages.length ? 'page-item disabled' : 'page-item'}`}>
                    <button onClick={() => {
                        setCurrentButton(numOfPages.length)
                        setCurrentPage(numOfPages.length)
                        }}>
                            {'>>'}
                    </button>
                </li>
            </ul>
        </div>
    )
}