import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import OpenModalButton from '../OpenModalButton';
import EditHabitModal from '../EditHabitModal';
import DeleteHabitOrDaily from '../DeleteHabitOrDaily';
import { ThunkNewHabit } from '../../store/habit';

export default function Habits({ user }) {
  const [habit, setHabit] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [clickedEmoti,setClickedEmoti]=useState([])
  const ulRef = useRef();
  const dispatch = useDispatch();
  const user2 = useSelector((state) => state.session.user);
  const userHabits= useSelector((state) => state.session.user.usersHabitsObj);
  const userArray= useSelector((state) => state.session.user.usersHabitsArray);
  const habitz = useSelector((state) => state.session?.habits?.allIds);
  const [openHabit,setOpenHabit]=useState(null)


  // console.log('USER IN HABITS IS',user2)
  // console.log('users habits are',user2.usersHabitsObj)
  // console.log('users habits array is',user2.usersHabitsArray)
  // const userHabits=user2.usersHabitsObj
  // const userArray=user2.usersHabitsArray

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  const handleEllipsisClick=(habitId)=>{
    console.log('INSIDE HANDLE ELLIPSIS CLICK')
    if(openHabit===habitId){
      console.log("openHabitId already set to what we clicked")
      setOpenHabit(null)
    }else {
      setOpenHabit(habitId)
      console.log('OPENHABITID IS NOW',habitId)
    }
  }

  const handleEmotiClick = (habitId) => {
    let newArray=[]
    if (!clickedEmoti.includes(habitId)){
    setClickedEmoti([...clickedEmoti,habitId])}
    else{
      newArray=clickedEmoti.filter((ele)=>ele!==habitId)
      setClickedEmoti(newArray)
    }
    // setIsDone(!isDone);
  };

  const MakeNewHabit = async (e) => {
    e.preventDefault();
    let test = await dispatch(ThunkNewHabit(habit));
    if (test) {
      setHabit('')
      return test;
    }
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef?.current?.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu,habitz]);

  const ulClassName = `ellipsis-dropdown${showMenu ? '' : ' hidden'}`;

  return (
    <div className='habits'>
      <div className='habits-topMenu'>
        <div className='fifteen-percent bigtextcenter'>Habits</div>
        <div className='forty-percent'>
          <form onSubmit={MakeNewHabit}>
            <div className='forgigs'>
              <input
                type="text"
                className='special90'
                value={habit}
                onChange={(e) => setHabit(e.target.value)}
                required
              />
              <button type='submit'>+</button>
            </div>
          </form>
        </div>
        <div className='fifteen-percent menu-text'>all</div>
        <div className='fifteen-percent menu-text'>weak</div>
        <div className='fifteen-percent menu-text' style={{ borderRight: 'none' }}>strong</div>
      </div>
      {userArray?.map((habitId,index)=>(
 <div className='habits-card'>
        <div className='fifteen-percent invisi'></div>
        <div className='habits-card-center'>
          <div className='bad-habit-emoti' onClick={(e)=>{
              e.stopPropagation();
              handleEmotiClick(habitId)}}>
            {user2 && userHabits[habitId] && !userHabits[habitId].alignment? (
            <img
              src={`${process.env.PUBLIC_URL}/icons/face-tired-fa.svg`}
              className={clickedEmoti && clickedEmoti.includes(habitId)? 'sadFace red': 'sadFace'}
            />):(
              <img
              src={`${process.env.PUBLIC_URL}/icons/face-smile-beam-fa.svg`}
              className={clickedEmoti && clickedEmoti.includes(habitId)? 'sadFace green': 'sadFace'}
            />
            )
            }



          </div>
          <div className='main-body-habit-card'>
            <h3>{userHabits[habitId].title}</h3>
            <p>{userHabits[habitId].notes}</p>
          </div>
          <div className='ellipsis'>
            <img
              src={`${process.env.PUBLIC_URL}/icons/three-dots-vertical-bs.svg`}
              className='ellipsis-pic'
              onClick={(e) => {
                e.stopPropagation();
                handleEllipsisClick(habitId);
                openMenu()

              }}
            />
          </div>
        </div>
        {openHabit===habitId && showMenu && (
          <div className='fifteen-percent no-border'>
            <div className='backG'>
              <ul className={ulClassName} ref={ulRef}>
                <li>
                  <OpenModalButton
                    buttonText={
                      <>
                        <span className="menu-icon">
                          <img
                            src={`${process.env.PUBLIC_URL}/icons/pencil-thmfy.svg`}
                            className='ellipsis-pic'
                          />
                        </span> Edit
                      </>
                    }
                    modalComponent={<EditHabitModal />}
                    onClick={() => setShowMenu(false)}
                  />
                </li>
                <li>To Top</li>
                <li>To Bottom</li>
                <li>
                  <OpenModalButton
                    buttonText={
                      <>
                        <span className="menu-icon">
                          <img
                            src={`${process.env.PUBLIC_URL}/icons/pencil-thmfy.svg`}
                            className='ellipsis-pic'
                          />
                        </span> Delete
                      </>
                    }
                    modalComponent={<DeleteHabitOrDaily />}
                    onClick={() => setShowMenu(false)}
                  />
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>))}

    </div>
  );
}
