import React from 'react'
import { useAuth } from '../contexts/Auth'
import {Link} from 'react-router-dom'
import Menu from '../parts/Menu'


function Dashboard() {
    const {currentUser} = useAuth()
    return (
        <div >
            <div>
                <Link to="/account">Account</Link>
                <h1>Welcome to the Dashboard</h1>
            </div>
        </div>
    )
}

export default Dashboard
