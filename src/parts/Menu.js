import React from 'react'

function Menu() {
    return (
        <div>
            <nav>
                <img src="" alt="Britam" />
                <hr />
                <ul>
                    <li>Dashboard</li>
                    <li>Clients</li>
                    <li>Sticker No management</li>
                    <li>User Management</li>
                    <li>Claims</li>
                    <li>Policies</li>
                    <li>Reports</li>
                    <li>Settings</li>
                </ul>
                <div id="account">
                    <img src="" alt="image" />
                    <p>Charles Kasasira</p>
                    <div id="eclipse">
                        <div className='circle'></div>
                        <div className='circle'></div>
                        <div className='circle'></div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Menu
