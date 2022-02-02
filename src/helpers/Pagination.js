import { useEffect, useState } from "react";
import '../assets/styles/pagination.css'

const Pagination = ({pages, setCurrentPage, currentClients, sortedEmployees, entries}) => {
    useEffect(() => setCurrentPage(currentButton))

    const numOfPages = []
    for(let i = 1; i <= pages; i++) numOfPages.push(i)

    // numOfPage = [1, 2, 3, 4]
    
    const [ currentButton, setCurrentButton ] = useState(1)

    return (
        <div className="clearfix">
            {/* <div className="hint-text">Showing <b>{currentClients.length}</b> out of <b>{sortedEmployees.length}</b> {entries}</div> */}
            <div className="hint-text"></div>
            <ul className="pagination">
                <li>{currentClients.length} of {sortedEmployees.length}  {entries}</li>
                {/* previouse */}
                <li className={`${currentButton === 1 ? 'page-item disabled' : 'page-item'}`}>
                    <button onClick = {() => setCurrentButton(1)}>{'<<'}</button></li>
                <li className={`${currentButton === 1 ? 'page-item disabled' : 'page-item'}`}>
                    <button onClick = {() => setCurrentButton( prev => prev === 1 ? prev : prev-1 )}>{'<'}</button></li>

                    <div><b>{currentButton} </b> of <b> {numOfPages.length}</b></div>

                    {/* next */}
<li className={`${currentButton === numOfPages.length ? 'page-item disabled' : 'page-item'}`}><button onClick={() => setCurrentButton(next => next === numOfPages.length ? next : next + 1)}>{'>'}</button></li>
<li className={`${currentButton === numOfPages.length ? 'page-item disabled' : 'page-item'}`}><button onClick={() => setCurrentButton(numOfPages.length)}>{'>>'}</button></li>
        </ul>
    </div>
    )
}

export default Pagination