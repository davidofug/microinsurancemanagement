import React from 'react'
import './badge.css'

const Badge = ({color, number, title, icon}) => (
        <div className="cards" style={{"backgroundColor": color}}>
            <i className='badge-icon'>{icon}</i>
            <div className="statistics">{number}</div>
            <div className="card-text">{title}</div>
        </div>
) 

export default Badge
