import React, { useState,useSelector,useEffect,useRef } from 'react';
import OpenModalButton from '../OpenModalButton';
import EditHabitModal from '../EditHabitModal'

export default function Habits({user}){

const [habit,setHabit]=useState('')
const [dropDown, setDropDown] = useState(false);
const [showMenu, setShowMenu] = useState(false);
const ulRef = useRef();



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
            src={`${process.env.PUBLIC_URL}/icons/face-tired-fa.svg`} className='sadFace'/></div>
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
              modalComponent={<EditHabitModal
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
                  Deletebutrightnowgoestoedit
                </>
              }
              modalComponent={<EditHabitModal
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
