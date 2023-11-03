import React, { useState,useSelector } from 'react';



export default function Habits({user}){

const [habit,setHabit]=useState('')



return (
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
<div className='habits-card-center'>
    <div className='bad-habit-emoti'><img
            src={`${process.env.PUBLIC_URL}/></div>
    <div className='main-body-habit-card'></div>
    {/* <div className='good-habit-emoti'></div> */}
</div>
</div>

</div>)

}
