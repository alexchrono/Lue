import React, { useState,useSelector,useEffect,useRef } from 'react';
import OpenModalButton from '../OpenModalButton';
import DeleteHabitOrDaily from '../DeleteHabitOrDaily';
import EditDailyModal from '../EditDailyModal';


export default function Dailies({user}){

const [daily,setDaily]=useState('')
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
</div>
</div>
)
}
