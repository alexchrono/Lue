import React, { useEffect, useState } from 'react';
import { NavLink,useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './main.css';


export default function Main() {
    const user = useSelector((state) => state.session.user)
    const history= useHistory()

    useEffect(() => {
        if (!user) {
            history.push('/')
            }

    }, [user,history]);


    console.log("🚀 ~ file: index.js:20 ~ Main ~ user:", user)
    if(!user){
        return null
    }

    return (
        <div className= 'main-main-container'>
        <div className="stats-container">
            <div className="avatar">
            <img src={`${user.selectedAvatar}`}></img> </div>
            <div className='stats'><span>level: {user.level}</span>
            <span>Exp: {user.exp}</span>
            <span>Gold: {user.gold}</span>


            </div>
            <div className='inspirational-quote'>Life is what you make it</div>





        </div>

        <div className='tables'>
        <div className='habits'></div>
        <div className='dailies'></div>
        </div>
        </div>
    )


}
