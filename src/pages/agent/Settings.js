import React, { useEffect, useState } from 'react'
import '../../styles/Settings.css'
import profile from '../../assets/imgs/image 2.png'
import Header from '../../parts/header/Header'

function Settings() {

    const [ selectedTab, setSelectedTab ] = useState(1)

    useEffect(() => document.title = 'Britam - User Profile', [])

    const toggleTab = (index) => setSelectedTab(index);

    return (
        <div className='components'>
            <Header title="My Profile" subtitle="MANAGE YOUR ACCOUNT" />

                <div id='settings_columns'>
                    <div id="options">
                        <ul>
                            <li><button onClick={() => toggleTab(1)} className={selectedTab === 1 ? "tabs active-tabs" : "tabs"}>Edit Profile</button></li>
                            <li><button onClick={() => toggleTab(2)} className={selectedTab === 2 ? "tabs active-tabs" : "tabs"}>Notifications</button></li>
                            <li><button onClick={() => toggleTab(3)} className={selectedTab === 3 ? "tabs active-tabs" : "tabs"}>Password & security</button></li>
                        </ul>
                    </div>
            <form action="">
                    <div className="tabs-content">
                        <div className={selectedTab === 1 ? "content  active-content" : "content"}>
                            <div id="edit_profile">
                                <h2>Edit Profile</h2>
                                <hr />
                                <img src={profile} alt="profile" />
                                <div className="first_last">
                                    <div className="names">
                                        <label htmlFor="">First Name</label>
                                        <input type="text" name="" id="" value="Charles" />
                                    </div >
                                    <div className="names">
                                        <label htmlFor="">Last Name</label>
                                        <input type="text" name="" id="" value="Kasasira" />
                                    </div>
                                </div>
                                <div className="first_last">
                                    <div className="names">
                                        <label htmlFor="">phone Number</label>
                                        <input type="tel" name="" id="" value="0770123456" />
                                    </div>
                                    <div className="names">
                                        <label htmlFor="gender">Gender</label>
                                        <div className='first_last'>
                                            <div>
                                                <input type="radio" name="gender" id="" checked  />
                                                <label htmlFor="">Male</label>
                                            </div>
                                            <div>
                                                <input type="radio" name="gender" id=""  />
                                                <label htmlFor="">Female</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="names">
                                    <label htmlFor="">email</label>
                                    <input type="email" name="" id="" value="charleskasasira01@gmail.com" />
                                </div>
                                <div className="names">
                                    <label htmlFor="">Address</label>
                                    <input type="text" name="" id="" value="Namuwongo" />
                                </div>
                                <div className="names">
                                    <label htmlFor="">Branch Name</label>
                                    <input type="text" name="" id="" value="Kampala" />
                                </div>
                                <div className="names">
                                    <label htmlFor="">Enter password to confirm</label>
                                    <input type="password" name="" id="" />
                                </div>
                                <input type="submit" value="Update Profile" className="btn btn-primary cta" />
                            </div>
                        </div>

                        <div className={selectedTab === 2 ? "content  active-content" : "content"}>
                            <h2>Notifications</h2>
                            <hr />
                            <p>
                                You don't have any notifications yets
                            </p>
                        </div>

                        <div className={selectedTab === 3 ? "content  active-content" : "content"}
                            >
                            <h2>Password and Security</h2>
                            <hr />
                            <form action="">                            
                                    <div className="names">
                                        <label htmlFor="">Enter old password</label>
                                        <input type="password" name="" id="" placeholder='Old Password' />
                                    </div>
                                    <div className="names">
                                        <label htmlFor="">Enter new password</label>
                                        <input type="password" name="" id="" placeholder='New Password' />
                                    </div>
                                    <div className="names">
                                        <label htmlFor="">Confirm Password</label>
                                        <input type="password" name="" id="" placeholder='Match Password' />
                                    </div>
                                    <input type="submit" value="Update Password" className="btn btn-primary cta" />                              
                            </form>
                        </div>

                    </div>
            </form>
                </div>
        </div>
    )
}

export default Settings
