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
            <div className='stats'><span>level: {user.level}</span>
            <span>title: {user.levelTitle}</span>
            <span>Health: {user.currentHealth} / {user.health}</span>
            <span>Exp: {user.exp} / {expFinder()} </span>
            <span>Gold: {user.gold}</span>


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
<div className='stats-container'>lets test this</div>
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
