import React, { useEffect, useState } from 'react';
import { NavLink,useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Habits from '../Habits';
import Dailies from '../Dailies';
import { ThunkGetAllHabits } from '../../store/habit';
import { ThunkGetAllDailies } from '../../store/daily';
import ErrorComponent from '../errorShow';
import './main.css';



export default function Main({mode}) {
    const user = useSelector((state) => state.session.user)
    const history= useHistory()
    const userArray= useSelector((state) => state?.habits?.allIds);
    const user2Array =  useSelector((state) => state?.dailies?.allIds);

    const expFinder=()=>{
        let targetExp=user.level * 25
        return targetExp
    }

    function calculateDaysOld(createdDateString) {
        const createdDate = new Date(createdDateString);
        const currentDate = new Date();
        const timeDiff = currentDate - createdDate;
        const daysOld = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
        return daysOld;
    }

    const daysOld = calculateDaysOld(user?.created_at);


    useEffect(() => {

        if (!user) {
            history.push('/')
            }


        // await dispatch(ThunkGetAllHabits())
        // await dispatch(ThunkGetAllDailies())


    }, [user,history]);


    if(!user){
        return null
    }


    return (

        <div className= 'main-main-container'>

        <div className="stats-container">
            <div className='avStats'>
            <div className="avatar">
            <img src={`${user.selectedAvatar}`}></img> </div>
            <div className='stats'>
                
    <table>
        <tbody>
            <tr><td>Level:</td><td>{user.level}</td></tr>
            <tr><td>Title:</td><td>{user.levelTitle}</td></tr>
            <tr><td>Health:</td><td>{user.currentHealth} / {user.health}</td></tr>
            <tr><td>Exp:</td><td>{user.exp} / {expFinder()}</td></tr>
            <tr><td>Gold:</td><td>{user.gold}</td></tr>
        </tbody>
    </table>
</div>
            </div>
            {mode==='main'?
            <div className='inspirational-quote'>

        <img className = 'sword-Divider' src={`${process.env.PUBLIC_URL}/icons/sword-flipped-divider3.png`}></img>
        <div className='fiftyheight'><div className='bad-spot'></div><div className='sweet-spot'><div className='text-finally'>Life is...</div></div></div>
        <div className='fiftyheight'><div className='bad-spot'></div><div className='sweet-spot'><div className='text-finally'>What you make of it</div></div></div>
        {/* <div className="LifeIs">Life is what you make it</div> */}
        </div>



    : mode==='profile'?
<div className='profileContainer'>
<div className='avatarContainer'>
<img src={`${process.env.PUBLIC_URL}${user.gif}`}></img></div>
<div className='profileInfo'>
    <table>
        <tbody>
            <tr><td>Username:</td><td>{user.username}</td></tr>
            <tr><td>Email:</td><td>{user.email}</td></tr>
            <tr><td>Days old:</td><td>{daysOld}</td></tr>
            <tr><td>Total Deaths:</td><td>{user.deaths}</td></tr>
        </tbody>
    </table>
    where this go
</div>
</div>
: null}
        {/* <div className='buffer'></div> */}
        </div>
        <div className='tables'>
            {user?.justGainedLevel && (
                <ErrorComponent errorMessage={`Congrats!  You just gained a level.  You are now level ${user.level}.   Your health has been fully restored, and your stats have increased.`}  />
            )}

            <Habits user={user}/>


        <div className='center-buffer'></div>
        <Dailies user={user}/>


        </div>


        </div>
    )
            }
