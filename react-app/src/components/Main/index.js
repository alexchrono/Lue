import React, { useEffect, useState } from 'react';
import { NavLink,useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './main.css';


export default function Main() {
    const user = useSelector((state) => state.session.user)
    const history= useHistory()
    const [habit,setHabit]=useState('')
    const [daily,setDaily]=useState('')

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
        <div className='buffer'></div>

        <div className='tables'>
        <div className='habits'>

        <div className='habits-topMenu'><div className='fifteen-percent bigtextcenter'>Habits</div>
        <div className='forty-percent'><form
          onSubmit={()=>{return 7}}
        >
            <input
              type="text"
              value={habit}
              onChange={(e) => setHabit(e.target.value)}
              required
              //   placeholder="Title"
            />
            </form>
            </div><div className='fifteen-percent menu-text'>all</div>
            <div className='fifteen-percent menu-text'>weak</div>
            <div className='fifteen-percent menu-text' style={{borderRight: 'none'}}>strong</div></div>
        <div className='habits-card'> <div className='fifteen-percent invisi'></div>
        <div className='habits-card-center'></div>
        </div>

        </div>
        <div className='center-buffer'></div>
        <div className='dailies'>
        <div className='habits-topMenu'><div className='fifteen-percent bigtextcenter'>Dailies</div>
        <div className='forty-percent'><form
          onSubmit={()=>{return 7}}
        >
            <input
              type="text"
              value={daily}
              onChange={(e) => setDaily(e.target.value)}
              required
              //   placeholder="Title"
            />
            </form>
            </div><div className='fifteen-percent menu-text'>due Today</div>
            <div className='fifteen-percent menu-text'>completed</div>
            <div className='fifteen-percent menu-text' style={{borderRight: 'none'}}>upcoming</div></div>
            <div className='habits-card'> <div className='fifteen-percent invisi'></div>
        <div className='habits-card-center'></div>
        </div>
        </div>

        </div>

        </div>
    )


}
