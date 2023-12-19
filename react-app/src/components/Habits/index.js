import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import OpenModalButton from '../OpenModalButton';
import EditHabitModal from '../EditHabitModal';
import DeleteHabitOrDaily from '../DeleteHabitOrDaily';
import { ThunkNewHabit } from '../../store/habit';
import { ThunkGetAllHabits } from '../../store/habit';
import { ThunkEditHealth } from '../../store/session';
import ErrorComponent from '../errorShow';
import EllipsisMenu from '../habitOrDailyEllipsisMenu';
import ShowVictory from '../ShowVictory';


export default function Habits({ user,setter, playSound }) {
  const [habit, setHabit] = useState('');
  // const [showMenu, setShowMenu] = useState(false);
  // const [clickedEmoti, setClickedEmoti] = useState([])
  const [errors, setErrors] = useState([]);
  const [hideModal, setHideModal] = useState(false)


  

  const ulRef = useRef();
  const dispatch = useDispatch();
  const user2 = useSelector((state) => state.session.user);
  const userHabits = useSelector((state) => state.habits.byId);
  const userArray = useSelector((state) => state.habits.allIds);
  const clickedEmoti = useSelector((state) => state.session.user.usersClickedHabits)
  const [localArray, setLocalArray] = useState([])
  const [openHabit, setOpenHabit] = useState(null)
  const [showVictory, setShowVictory] = useState('nothing');
  const [victoryDeets, setVictoryDeets] = useState({})
  const [needsLoading, setNeedsLoading] = useState(true);

  useEffect(() => {
    setLocalArray(clickedEmoti);
  }, []);



  // console.log('USER IN HABITS IS',user2)
  // console.log('users habits are',user2.usersHabitsObj)
  // console.log('users habits array is',user2.usersHabitsArray)
  // const userHabits=user2.usersHabitsObj
  // const userArray=user2.usersHabitsArray

  // const openMenu = () => {
  //   if (showMenu) return;
  //   setShowMenu(true);
  // };

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

    if (openHabit === habitId) {

      setOpenHabit(null)
    } else {
      setOpenHabit(habitId)

    }
  }

  // const handleEmotiClick = (habitId) => {
  //   let newArray = []
  //   if (!clickedEmoti.includes(habitId)) {
  //     setClickedEmoti([...clickedEmoti, habitId])
  //   }
  //   else {
  //     newArray = clickedEmoti.filter((ele) => ele !== habitId)
  //     setClickedEmoti(newArray)
  //   }
  //   // setIsDone(!isDone);
  // };

  const MakeNewHabit = async (e) => {
    e.preventDefault();
    let test = await dispatch(ThunkNewHabit(habit));
    setHabit('')
    if (test?.errors) {

      setErrors(test.errors)
    }
    else if (test.title) {
      return test;
    }
  };

  const HandleDislikeOrLike = async (e, goodOrBad, difficulty, habitId) => {
    e.preventDefault();
    const key = 'habit'


    let change = {}
    let copyArray = localArray?.length ? [...localArray] : []

    switch (goodOrBad) {
      case 'bad':
        change.health = badTranslator[difficulty]
        setter('hurt')
        copyArray.push(habitId)
        setLocalArray(copyArray)

        break

      case 'unbad':
        change.health = -(badTranslator[difficulty])
        setter('victory')
        copyArray = copyArray.filter((ele) => ele !== habitId)
        setLocalArray(copyArray)
        //     setClickedEmoti(newArray)

        break
      case 'good':
        change = goodTranslator[difficulty]
        setter('victory')
        copyArray.push(habitId)
        setLocalArray(copyArray)

        break
      case 'ungood':
        change = goodTranslator[difficulty]
        setter('hurt')
        change.gold = -(change.gold)
        change.exp = -(change.exp)
        copyArray = copyArray.filter((ele) => ele !== habitId)
        setLocalArray(copyArray)

        break
      default:
        console.log('something went wrong with our switch')

    }


    if (change) {
      const test = await dispatch(ThunkEditHealth(change, copyArray, key))



      if (test.victory === 'victory') {
        setShowVictory('victory');
        setVictoryDeets(test.victoryDeets)
        playSound('levelUp')

      }

      else if (test.victory === 'death') {
        setShowVictory('death')
        setVictoryDeets(test.victoryDeets)
      }

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
      setNeedsLoading(false)

    };
    if (user2 && needsLoading) {
      fetchData()
    }
  }, [user2, dispatch, needsLoading]);

  useEffect(() => {

  }, [userArray])

  // useEffect(() => {
  //   if (!showMenu) return;

  //   // // const closeMenu = (e) => {
  //   // //   if (ulRef.current && !ulRef?.current?.contains(e.target)) {
  //   // //     setShowMenu(false);
  //   // //   }
  //   // // };

  //   // document.addEventListener('click', closeMenu);

  //   // return () => document.removeEventListener('click', closeMenu);



  // }, [showMenu, userArray, userHabits]);

  // const ulClassName = `ellipsis-dropdown${showMenu ? '' : ' hidden'}`;


  return (
    <>
      {user2?.newUser && (<ShowVictory formType='newUser' setVictory={setShowVictory} victoryDeets={victoryDeets} />)}
      {/* {errors?.misclick && (<ErrorComponent errorMessage={'Habit titles are required and must be between 3-30 characters'} setErrors={setErrors} setHabit={setHabit} />)} */}
      {errors?.title && (<ErrorComponent errorMessage={'Habit titles are required and must be between 3-30 characters'} setErrors={setErrors} setHabit={setHabit} />)}
      {showVictory === 'victory' && <ShowVictory formType={'levelUp'} setVictory={setShowVictory} victoryDeets={victoryDeets} />}
      {showVictory === 'death' && <ShowVictory formType={'death'} setVictory={setShowVictory} victoryDeets={victoryDeets} />}
      <div className='habits'>
      <img src={`${process.env.PUBLIC_URL}/icons/curvyLineWIDERFrame-revised2.png`} className='borderFrame'
          />
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
                <div class='tenpercent'>
                  <button type='submit'><img
                    src={`${process.env.PUBLIC_URL}/icons/fi-plus-fndtn.svg`}></img></button>
                </div>
              </div>
            </form>
          </div>
          <div className='fifteen-percent menu-text'>all</div>
          <div className='fifteen-percent menu-text'>weak</div>
          <div className='fifteen-percent menu-text' style={{ borderRight: 'none' }}>strong</div>
        </div>
        <div className='allHabits'>





          {userArray?.map((habitId, index) => (
            <div className='habits-card'>
              <div className='fifteen-percent invisi2'>
                {/* <img
                        src={`${process.env.PUBLIC_URL}/icons/curvyLineWIDER3.png`}
              /> */}
              </div>
              <div className='habits-card-center'>
                <div className='bad-habit-emoti'>
                  {user2 && userHabits[habitId] ? (
                    userHabits[habitId].untouched ? (
                      <img
                        src={`${process.env.PUBLIC_URL}/icons/three-dots-bs.svg`}
                        className={localArray && localArray?.includes(habitId) ? 'sadFace red' : 'sadFace'}
                        style={{ width: '100%', height: '100%', margin: '0' }}
                      />
                    ) : !userHabits[habitId].alignment ? (
                      <img
                        src={`${process.env.PUBLIC_URL}/icons/face-tired-fa.svg`}
                        className={`changeToHand ${localArray && localArray.includes(habitId) ? 'sadFace red' : 'sadFace'}`}
                        style={{ width: '100%', height: '100%', margin: '0' }}
                        onClick={(e) => {
                          if (localArray?.length && localArray.includes(habitId)) {
                            HandleDislikeOrLike(e, 'unbad', userHabits[habitId].difficulty, habitId)



                          }
                          else {
                            HandleDislikeOrLike(e, 'bad', userHabits[habitId].difficulty, habitId)

                          }
                        }}
                      />
                    ) : (
                      <img
                        src={`${process.env.PUBLIC_URL}/icons/face-smile-beam-fa.svg`}
                        className={`changeToHand ${localArray?.length && localArray?.includes(habitId) ? 'sadFace green' : 'sadFace'}`}
                        style={{ width: '100%', height: '100%', margin: '0' }}

                        onClick={(e) => {
                          if (localArray?.length && localArray.includes(habitId)) {
                            HandleDislikeOrLike(e, 'ungood', userHabits[habitId].difficulty, habitId)



                          }
                          else {
                            HandleDislikeOrLike(e, 'good', userHabits[habitId].difficulty, habitId)

                          }
                        }}
                      />
                    )
                  ) : null}



                </div>
                <div className='main-body-habit-card'>
                  <h3 className='topOfCard'>{userHabits[habitId]?.title}</h3>
                  <p className='bottOfCard'>{
                    userHabits[habitId]?.notes && userHabits[habitId]?.notes.length > 39
                      ? userHabits[habitId]?.notes.substring(0, userHabits[habitId]?.notes.lastIndexOf(' ', 39)) + '...'
                      : userHabits[habitId]?.notes
                  }</p>
                </div>
                <div className='ellipsis'>
                  <img
                    src={`${process.env.PUBLIC_URL}/icons/three-dots-vertical-bs.svg`}
                    className='ellipsis-pic'
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEllipsisClick(habitId);
                      // openMenu()
                    }}
                  />
                </div>
              </div>
              <div className='fifteen-percent invisi2'>
                {/* <img
                        src={`${process.env.PUBLIC_URL}/icons/curvyLine52.png`}
              /> */}
                {openHabit === habitId && (
                  <EllipsisMenu formType='habit' id={habitId} habitOrDaily={userHabits[habitId]} setter={setOpenHabit} />)}

              </div>
            </div>))}
        </div>
        {/* <div className='bottomPic'>
        <img
                        src={`${process.env.PUBLIC_URL}/icons/curvyLineBottom.png`}
              />
        </div> */}
      </div>
    </>
  );
}
