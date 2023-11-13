import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signUp, login } from '../../store/session';


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
    const [errors, setErrors] = useState({})
    const [errorsFe, setErrorsFe] = useState([])

    const handleAvatarChange = (e) => {
        console.log('INSIDE OF H ANDLDE AVATAR CHANGE')
        console.log("🚀 ~ file: index.js:26 ~ handleAvatarChange ~ e.target.files[0]:", e.target.files[0])
        setNewAvatar(e.target.files[0])
    }
    function custError(err, field, message) {
        if (!err.errors) {
            err.errors = {}
        }
        err.errors[field] = message
        return err

    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors({});
        setErrorsFe([]);
        let err = {}

        if (!userName || userName.length < 3 || userName.length > 15) {
            custError(err, 'userName', 'userName is required and must be between 3 and 15 characters');
        }
        if (!email || email.length < 8 || email.length > 30 || !emailRegex.test(email)) {
            custError(err, 'email', 'email is required and must be between 8-30 characters and in the correct format');
        }
        if (!password || password.length < 8 || password.length > 30) {
            custError(err, 'password', 'password is required and must be between 8 and 30 characters')
        }

        if (confirmPassword !== password) {
            custError(err, 'passwordConfirmation', 'password confirmation does not match password')
        }

        if (err.errors) {
            setErrorsFe(err.errors)
            return
        }
        else {



            const formData = new FormData()
            formData.append('username', userName);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('confirm_password', confirmPassword)
            if (newAvatar) {
                formData.append('selected_avatar', newAvatar);
            }

            const success = await dispatch(signUp(formData))

            if (success?.errors) {
                setErrors(success.errors)
            }


        }
    }

    const loginDemo = async (e) => {
        e.preventDefault();
        const data = await dispatch(login('demo@aa.io', 'password'));
        console.log('DATA WE GETTING BAKC IS')
        if (data && data.errors) {

            setErrors(data.errors);
        } else {
            history.push('/main')
        }
    };



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
                    <img src={`${process.env.PUBLIC_URL}/icons/cloud-spinning.gif`}></img>
                    {/* <img src='https://i.imgur.com/DafdjXQ.png' className='pic' alt=''></img> */}
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
                    {errors.userName ? (<p className="errors">{errors.userName}</p>) : errorsFe.userName ? <p className="feErrors">{errorsFe.userName}</p> : null}

                    <input
                        type="text"
                        autoComplete="off"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"


                    />
                    {errors.email ? <p className="errors">{errors.email}</p> : errorsFe.email ? <p className="feErrors">{errorsFe.email}</p> : null}

                    <input
                        type="password"
                        autoComplete="off"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"

                    />
                    {errors.password ? <p className="errors">{errors.password}</p> : errorsFe.password ? <p className="feErrors">{errorsFe.password}</p> : null}


                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm Password"
                        autoComplete="off"
                    />

                    {errors.passwordConfirmation ? <p className="errors">{errors.passwordConfirmation}</p> : errorsFe.passwordConfirmation ? <p className="feErrors">{errorsFe.passwordConfirmation}</p> : null}

                    <input
                        type="file"
                        id="fileInput"
                        onChange={(e) => {
                            console.log('CHANGE DDETECTED IN OUR IMAGE')
                            setDidPicChange(true);
                            handleAvatarChange(e);
                        }}
                        style={{ display: 'none' }}
                        accept="image/*"
                    />

                    <button
                    type='button'
                        className="letsMakePretty"
                        onClick={() => document.getElementById('fileInput').click()}
                    >
                        Upload Avatar (optional)
                    </button>

                    <button className="letsMakePretty" type="submit">Sign Up</button>
                    <button className="letsMakePretty" onClick={loginDemo}>
                        Log in as Demo
                    </button>



                </form>


            </div>



        </div>
    )


}
