import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from '../../store/session';

import './LandingPage.css';


export default function LandingPage() {
    const user = useSelector((state) => state.session.user)
    const history = useHistory()
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [didPicChange, setDidPicChange] = useState('')
    const [newAvatar, setNewAvatar] = useState("")
    const dispatch = useDispatch()

    const handleAvatarChange = (e) => {
        setNewAvatar(e.target.files[0])
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('username', userName);
        formData.append('email', email);
        formData.append('password', password);
        if (newAvatar) {
            formData.append('selected_avatar', newAvatar);
        }

        const success = await dispatch(signUp(formData))



    }



    useEffect(() => {
        if (user) {
            history.push('/main')
        }

    }, [user, history]);

    if (user) return null




    return (
        <div className='main-container'>
            <div className='left-container'>
                <div className='pic-box-container'>
                    <img src='https://i.imgur.com/DafdjXQ.png' className='pic' alt=''></img>
                </div>

                <div className='left-bottom-quote'>
                    Change your life
                </div>
            </div>
            <div className='right-box'>
                <h1>New to Level up Everything?</h1>
                <h2>Sign up for free</h2>
                <form
                    onSubmit={handleSubmit}
                    encType="multipart/form-data"
                    className='signup-form'
                >

                    <input
                        type="text"
                        value={userName}
                        onChange={e => setUserName(e.target.value)}
                        placeHolder='Username'
                        autoComplete="off"

                    />

                    <input
                        type="text"
                        autoComplete="off"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"


                    />

                    <input
                        type="password"
                        autoComplete="off"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"

                    />

                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm Password"
                        autoComplete="off"
                    />

                    <input
                        type="file"
                        id="fileInput"
                        onChange={(e) => {
                            setDidPicChange(true);

                            handleAvatarChange(e);
                        }}
                        accept="image/*"
                        placeholder="Upload avatar (optional)"
                    />

                    <button className="signup-button" type="submit">Sign Up</button>



                </form>


            </div>



        </div>
    )


}
