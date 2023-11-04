import React, { useState,useSelector,useEffect,useRef } from 'react';
import OpenModalButton from '../OpenModalButton';

import EditDailyModal from '../EditDailyModal';
import DeleteHabitOrDaily from '../DeleteHabitOrDaily';
import { useDispatch } from 'react-redux';

export default function Dailies({user}){

const [habit,setHabit]=useState('')
const [dropDown, setDropDown] = useState(false);
const [showMenu, setShowMenu] = useState(false);
const [isDone,setIsDone]=useState(false)
const ulRef = useRef();
const dispatch=useDispatch()


const handleCheckmark = () => {


  setIsDone(!isDone);
  console.log('handleCheckMark is set up')

  // dispatch(mythunkwhenImakeit);
};
const openMenu = () => {
  if (showMenu) return;
  setShowMenu(true);
};

useEffect(() => {
  if (!showMenu) return;

  const closeMenu = (e) => {
    if (!ulRef.current.contains(e.target)) {
      setShowMenu(false);
    }
  };

  document.addEventListener("click", closeMenu);

  return () => document.removeEventListener("click", closeMenu);
}, [showMenu]);


const ulClassName = "ellipsis-dropdown" + (showMenu ? "" : " hidden");

const closeMenu = () => setShowMenu(false);

return (
<div className='habits'>

<div className='habits-topMenu'><div className='fifteen-percent bigtextcenter'>Dailies</div>
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
    </div><div className='fifteen-percent menu-text'>Due Today</div>
    <div className='fifteen-percent menu-text'>Completed</div>
    <div className='fifteen-percent menu-text' style={{borderRight: 'none'}}>Upcoming</div></div>
<div className='habits-card'> <div className='fifteen-percent invisi'></div>
<div className='habits-card-center'>
    <div className='bad-habit-emoti' onClick={handleCheckmark}>
      {isDone? (<img
            src={`${process.env.PUBLIC_URL}/icons/checkmark-outline-ion.svg`} className='sadFace' style={{
              width: `100%`,
              backgroundColor: 'green',
              height: '100%',
              margin: '0'
            }}/>):(<img
              src={`${process.env.PUBLIC_URL}/icons/hourglass-split-bs.svg`} className='sadFace' style={{
                width: `100%`,
                backgroundColor: 'gray',
                height: '100%',
                margin: '0'
              }}/>)}
            </div>

    <div className='main-body-habit-card'> </div><div className='ellipsis'><img
            src={`${process.env.PUBLIC_URL}/icons/three-dots-vertical-bs.svg`} className='ellipsis-pic' onClick={openMenu}/></div></div>
            {showMenu && (
              <div className='fifteen-percent no-border'>
            <div className='backG'>
            <ul className={ulClassName} ref={ulRef}>

              <>

               <li><OpenModalButton
              buttonText={
                <>
                  <span className="menu-icon">
                    <img
            src={`${process.env.PUBLIC_URL}/icons/pencil-thmfy.svg`} className='ellipsis-pic' onClick={()=>setShowMenu(false)}/>
                  </span>{" "}
                  Edit
                </>
              }
              modalComponent={<EditDailyModal
                //  playlistId={playlistId}
                 />}
              onClick={() => setShowMenu(false)}
            /></li>
               <li>To Top</li>
               <li>To Bottom</li>
               <li><OpenModalButton
              buttonText={
                <>
                  <span className="menu-icon">
                    <img
            src={`${process.env.PUBLIC_URL}/icons/pencil-thmfy.svg`} className='ellipsis-pic' onClick={()=>setShowMenu(false)}/>
                  </span>{" "}
                  Delete
                </>
              }
              modalComponent={<DeleteHabitOrDaily
                //  playlistId={playlistId}
                 />}
              onClick={() => setShowMenu(false)}
            /></li>
               </>


               </ul>
            </div>
            </div>
            )}






    {/* <div className='good-habit-emoti'></div> */}

</div>

</div>)

}
