import React from 'react'

function Header({title, subtitle}) {
    return (
            <header className='heading'>
                <h1 className='title'>{title}</h1>
                <p className="subtitle">{subtitle}</p>
            </header>
    )
}

export default Header
