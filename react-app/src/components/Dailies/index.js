

import React, { useState,useSelector } from 'react';



export default function Dailies({user}){

const [daily,setDaily]=useState('')



return (



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
)
}
