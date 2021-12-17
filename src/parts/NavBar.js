import React from 'react'
import { Link } from 'react-router-dom'

function NavBar() {
    return (
        <header className="header">
            <h1>
                <Link to="/"></Link>
            </h1>
            <nav>
                <ul>
                    {currentUser &&
                        <>
                            <li>
                                <Link to="/">Shop</Link>
                            </li>
                            <li>
                                <Link to="/dashboard">Dashboard</Link>
                            </li>
                            <li>
                                <Link to="/account">My Account</Link>
                            </li>

                        </>
                }
                    <li>
                        <Link to="/help">Help</Link>
                    </li>
                    <li>
                        {currentUser ? <Link to="/logout">Logout</Link> : <Link to="/login">Login</Link>}
                    </li>
                </ul>
            </nav>
    </header>
    )
}

export default NavBar
