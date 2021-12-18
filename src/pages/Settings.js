import React, { useEffect } from 'react'
import '../styles/Settings.css'
import profile from '../assets/imgs/image 2.png'
import { Link } from 'react-router-dom'

function Settings() {

    useEffect(() => {
        document.title = 'Britam - User Profile'
    }, [])

    return (
        <div className='components'>
            <h1 className='title'>My Profile</h1>
            <p className='subtitle'>MANAGE YOUR ACCOUNT</p>

            <form action="">
                <div id='settings_columns'>
                    <div id="options">
                        <ul>
                            <li><button>Edit Profile</button></li>
                            <li><button>Notifications</button></li>
                            <li><button>Password & security</button></li>
                        </ul>
                    </div>
                    <div id="edit_profile">
                        <img src={profile} alt="profile image" />
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
                        <input type="submit" value="Update Profile" className="btn btn-primary cta" />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Settings
