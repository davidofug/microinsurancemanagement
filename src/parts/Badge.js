import React from 'react'

function Badge({color, number, title}) {
    return (
        <div className="cards" style={{"background-color": color}}>
            <div className="statistics">{number}</div>
            <div className="card-text">{title}</div>
        </div>
    )
}

export default Badge
