import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import OpenModalButton from '../OpenModalButton';
import EditHabitModal from '../EditHabitModal';
import DeleteHabitOrDaily from '../DeleteHabitOrDaily';
import { ThunkNewHabit } from '../../store/habit';
import { ThunkGetAllHabits } from '../../store/habit';
import { ThunkEditHealth } from '../../store/session';
import ErrorComponent from '../errorShow';

export default function Habits({ user }) {
  const [habit, setHabit] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [clickedEmoti, setClickedEmoti] = useState([])
  const [errors, setErrors] = useState([]);

  
  const ulRef = useRef();
  const dispatch = useDispatch();
  const user2 = useSelector((state) => state.session.user);
  const userHabits = useSelector((state) => state.habits.byId);
  const userArray = useSelector((state) => state.habits.allIds);
  const [openHabit, setOpenHabit] = useState(null)




  // console.log('USER IN HABITS IS',user2)
  // console.log('users habits are',user2.usersHabitsObj)
  // console.log('users habits array is',user2.usersHabitsArray)
  // const userHabits=user2.usersHabitsObj
  // const userArray=user2.usersHabitsArray

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  const badTranslator = {
    1: -0.2,
    2: -2.5,
    3: -3.9,
    4: -5.4
  }

  const goodTranslator = {
    1: { gold: .09, exp: 1 },
    2: { gold: .84, exp: 5 },
    3: { gold: 1.19, exp: 7 },
    4: { gold: 1.55, exp: 9 }
  }

  const handleEllipsisClick = (habitId) => {
    console.log('INSIDE HANDLE ELLIPSIS CLICK')
    if (openHabit === habitId) {
      console.log("openHabitId already set to what we clicked")
      setOpenHabit(null)
    } else {
      setOpenHabit(habitId)
      console.log('OPENHABITID IS NOW', habitId)
    }
  }

  const handleEmotiClick = (habitId) => {
    let newArray = []
    if (!clickedEmoti.includes(habitId)) {
      setClickedEmoti([...clickedEmoti, habitId])
    }
    else {
      newArray = clickedEmoti.filter((ele) => ele !== habitId)
      setClickedEmoti(newArray)
    }
    // setIsDone(!isDone);
  };

  const MakeNewHabit = async (e) => {
    e.preventDefault();
    let test = await dispatch(ThunkNewHabit(habit));
    if (test?.errors) {

      setErrors(test.errors)
    }
    else if (test.title) {
      setHabit('')
      return test;
    }
  };

  const HandleDislikeOrLike = async (e, goodOrBad, difficulty) => {
    e.preventDefault();

    console.log('THIS IS A DISLIKE WE INSIDE THE FUNCTION')
    console.log('good or bad is ', goodOrBad)
    let change={}
    switch (goodOrBad) {
      case 'bad':
        change.health = badTranslator[difficulty]
        console.log('CHANGE IS***********', change)
        break
      case 'unbad':
        change.health = -(badTranslator[difficulty])
        console.log('unclicked bad change change is', change)
        break
      case 'good':
        change = goodTranslator[difficulty]
        console.log('POSITIVE CHANGE IS***********', change)
        console.log('POSITIVE CHANGE in GOLD IS***********', change.gold)
        console.log('POSITIVE CHANGE IN EXP IS****', change.exp)
        break
      case 'ungood':
        change = goodTranslator[difficulty]
        change.gold = -(change.gold)
        change.exp = -(change.exp)
        console.log('UNDOING POSITIVE CHANGE IS***********', change)
        console.log('UNDOING POSITIVE CHANGE in GOLD IS***********', change.gold)
        console.log('UNDOING POSITIVE CHANGE IN EXP IS****', change.exp)
        break
      default:
        console.log('something went wrong with our switch')

    }

    if (change) {
      const test= await dispatch(ThunkEditHealth(change))

    }





    // if (goodOrBad === 'bad') {
    //   let change = badTranslator[difficulty]
    //   console.log('CHANGE IS***********', change)
    // }
    // if (goodOrBad === 'unbad') {
    //   let change = -(badTranslator[difficulty])
    //   console.log('unclicked bad change change is', change)

    // }
    // if (goodOrBad === 'good') {
    //   let change = goodTranslator[difficulty]
    //   console.log('POSITIVE CHANGE IS***********', change)
    //   console.log('POSITIVE CHANGE in GOLD IS***********', change.gold)
    //   console.log('POSITIVE CHANGE IN EXP IS****', change.exp)
    // }
    // if (goodOrBad === 'ungood') {
    //   let change = goodTranslator[difficulty]

    //   console.log('UNDOING POSITIVE CHANGE IS***********', change)
    //   console.log('UNDOING POSITIVE CHANGE in GOLD IS***********', -(change.gold))
    //   console.log('UNDOING POSITIVE CHANGE IN EXP IS****', -(change.exp))
    // }

  }


  // let test = await dispatch(ThunkNewHabit(habit));






  // useEffect(() => {
  //   if (errors && errors.title) {
  //     alert(`Error: Habit titles must be between 3-30 characters`);
  //   }
  // }, [errors]);


  useEffect(() => {

    const fetchData = async () => {

      await dispatch(ThunkGetAllHabits());

    };
    if (!userArray.length) {
      fetchData()
    }
  }, [userArray]);

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef?.current?.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);



  }, [showMenu, userArray, userHabits]);

  const ulClassName = `ellipsis-dropdown${showMenu ? '' : ' hidden'}`;

  return (
    <>
      {errors.misclick && (<ErrorComponent errorMessage={'Habit titles are required and must be between 3-30 characters'} setErrors={setErrors} setHabit={setHabit} />)}
      {errors.title && (<ErrorComponent errorMessage={'Habit titles are required and must be between 3-30 characters'} setErrors={setErrors} setHabit={setHabit} />)}
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
                // required
                />
                <button type='submit'>+</button>
              </div>
            </form>
          </div>
          <div className='fifteen-percent menu-text'>all</div>
          <div className='fifteen-percent menu-text'>weak</div>
          <div className='fifteen-percent menu-text' style={{ borderRight: 'none' }}>strong</div>
        </div>
        {userArray?.map((habitId, index) => (
          <div className='habits-card'>
            <div className='fifteen-percent invisi'></div>
            <div className='habits-card-center'>
              <div className='bad-habit-emoti' onClick={(e) => {
                e.stopPropagation();
                if (!userHabits[habitId].untouched) {
                  handleEmotiClick(habitId)
                }
                else {
                  console.log('HIT OUR RELSE WE CLICKING NORMAL PC')
                  // <ErrorComponent errorMessage={'You need to edit this habit before it becomes active'} setErrors={setErrors} setHabit={setHabit} />
                }
              }}>
                {user2 && userHabits[habitId] ? (
                  userHabits[habitId].untouched ? (
                    <img
                      src={`${process.env.PUBLIC_URL}/icons/three-dots-bs.svg`}
                      className={clickedEmoti && clickedEmoti.includes(habitId) ? 'sadFace red' : 'sadFace'}
                      style={{ width: '100%', height: '100%', margin: '0' }}
                    />
                  ) : !userHabits[habitId].alignment ? (
                    <img
                      src={`${process.env.PUBLIC_URL}/icons/face-tired-fa.svg`}
                      className={clickedEmoti && clickedEmoti.includes(habitId) ? 'sadFace red' : 'sadFace'}
                      style={{ width: '100%', height: '100%', margin: '0' }}
                      onClick={(e) => {
                        if (clickedEmoti && clickedEmoti.includes(habitId)) {
                          HandleDislikeOrLike(e, 'unbad', userHabits[habitId].difficulty)


                          console.log('*************OK WE GOT CHANGE THIS UNDOES THE NEGATIVE EFFECTS')
                        }
                        else {
                          HandleDislikeOrLike(e, 'bad', userHabits[habitId].difficulty)
                          console.log('**********OK WE GOT CHANGE THIS TAKES AWAY HP')
                        }
                      }}
                    />
                  ) : (
                    <img
                      src={`${process.env.PUBLIC_URL}/icons/face-smile-beam-fa.svg`}
                      className={clickedEmoti && clickedEmoti.includes(habitId) ? 'sadFace green' : 'sadFace'}
                      style={{ width: '100%', height: '100%', margin: '0' }}
                      onClick={(e) => {
                        if (clickedEmoti && clickedEmoti.includes(habitId)) {
                          HandleDislikeOrLike(e, 'ungood', userHabits[habitId].difficulty)


                          console.log('*************OK WE GOT CHANGE THIS UNDOES THE CLICK OF A POSITIVE EFFECT')
                        }
                        else {
                          HandleDislikeOrLike(e, 'good', userHabits[habitId].difficulty)
                          console.log('**********OK WE GOT CHANGE THIS POSITIVVE CHANGE THIS ADDS GOLD AND EXP')
                        }
                      }}
                    />
                  )
                ) : null}



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
            {openHabit === habitId && showMenu && (
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
                        modalComponent={<EditHabitModal habitId={habitId} habit={userHabits[habitId]} />}
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
                        modalComponent={<DeleteHabitOrDaily formType={'habit'} targetId={habitId} title={userHabits[habitId].title} />}
                        onClick={() => setShowMenu(false)}
                      />
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>))}

      </div>
    </>
  );
}
