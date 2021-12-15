import React from 'react'
import { useAuth } from '../contexts/Auth'
import {Link} from 'react-router-dom'
import Menu from '../parts/Menu'


function Dashboard() {
    const {currentUser} = useAuth()
    return (
        <div className='components'>
            <h1 className='title'>Welcome Charles</h1>
        </div>
    )
}

export default Dashboard
