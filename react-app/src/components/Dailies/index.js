import React, { useState, useEffect, useRef } from 'react';
import OpenModalButton from '../OpenModalButton';
import EditDailyModal from '../EditDailyModal';
import DeleteHabitOrDaily from '../DeleteHabitOrDaily';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkNewDaily } from '../../store/daily';
import { ThunkGetAllDailies } from '../../store/daily';
import ErrorComponent from '../errorShow';

export default function Dailies({ user }) {
  const [daily, setDaily] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [clickedDailyCheck, setClickedDailyCheck] = useState([])
  const ulRef = useRef();
  const dispatch = useDispatch();
  const user2 = useSelector((state) => state.session.user);
  const userDailies = useSelector((state) => state.dailies.byId);
  const userArray = useSelector((state) => state.dailies.allIds);
  const [openDaily, setOpenDaily] = useState(null)
  const [errors, setErrors] = useState([]);
  console.log('IN DAILIES USERDAILIES IS', userDailies)
  console.log('in dailies userarray is', userArray)

  const handleCheckmark = (dailyId) => {
    let newArray = []
    if (!clickedDailyCheck.includes(dailyId)) {
      setClickedDailyCheck([...clickedDailyCheck, dailyId])
    }
    else {
      newArray = clickedDailyCheck.filter((ele) => ele !== dailyId)
      setClickedDailyCheck(newArray)
    }
    // setIsDone(!isDone);
  };

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  // const badTranslator = {
  //   1: -0.2,
  //   2: -2.5,
  //   3: -3.9,
  //   4: -5.4
  // }

  const goodTranslator = {
    1: { gold: .12, exp: 1 },
    2: { gold: 1.2, exp: 7 },
    3: { gold: 1.8, exp: 11 },
    4: { gold: 2.4, exp: 14 }
  }

  const HandleDislikeOrLike = async (e, goodOrBad, difficulty) => {
    e.preventDefault();

    console.log('THIS IS A DISLIKE WE INSIDE THE FUNCTION')
    console.log('good or bad is ', goodOrBad)
    let change={}
    switch (goodOrBad) {
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
      // const test= await dispatch(ThunkEditDaily(change))

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

  const handleEllipsisClick = (dailyId) => {
    console.log('INSIDE HANDLE ELLIPSIS CLICK')
    if (openDaily === dailyId) {
      console.log("openDailyId already set to what we clicked")
      setOpenDaily(null)
    } else {
      setOpenDaily(dailyId)
      console.log('OPENHABITID IS NOW', dailyId)
    }
  }


  const MakeNewDaily = async (e) => {
    e.preventDefault();
    let test = await dispatch(ThunkNewDaily(daily));
    if(test?.errors){

      setErrors(test.errors)
    }
    else if (test.title) {
      setDaily('')
      return test;
    }
  };


  useEffect(() => {

    const fetchData = async () => {

      await dispatch(ThunkGetAllDailies());

    };
    if (!userArray.length) {
      fetchData()
    }
  }, [userArray, dispatch]);

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef?.current?.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu, userArray, userDailies]);

  const ulClassName = "ellipsis-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
    {errors.title && (<ErrorComponent errorMessage={'Daily titles are required and must be between 3-30 characters'} setErrors={setErrors} setHabit={setDaily} />)}

    <div className='habits'>
      <div className='habits-topMenu'>
        <div className='fifteen-percent bigtextcenter'>Dailies</div>
        <div className='forty-percent'>
          <form onSubmit={MakeNewDaily}>
            <input
              type="text"
              value={daily}
              onChange={(e) => setDaily(e.target.value)}
              required
            />
          </form>
        </div>
        <div className='fifteen-percent menu-text'>Due Today</div>
        <div className='fifteen-percent menu-text'>Completed</div>
        <div className='fifteen-percent menu-text' style={{ borderRight: 'none' }}>Upcoming</div>
      </div>
      {userArray?.map((dailyId, index) => (
        <div className='habits-card'>
          <div className='fifteen-percent invisi'></div>
          <div className='habits-card-center'>
            <div className='bad-habit-emoti' onClick={(e) => {
              e.stopPropagation();
              handleCheckmark(dailyId)
            }}>
              {userDailies[dailyId].untouched ? (
                <img
                  src={`${process.env.PUBLIC_URL}/icons/three-dots-bs.svg`}
                  className='sadFace'
                  style={{ width: '100%', height: '100%', margin: '0' }}
                />

              ) : clickedDailyCheck && clickedDailyCheck.includes(dailyId) ? (
                <img
                  src={`${process.env.PUBLIC_URL}/icons/checkmark-outline-ion.svg`}
                  className='sadFace'
                  style={{ width: '100%', backgroundColor: 'green', height: '100%', margin: '0' }}
                  onClick={(e) => {
                    if (clickedDailyCheck && clickedDailyCheck.includes(dailyId)) {
                      HandleDislikeOrLike(e, 'good', userDailies[dailyId].difficulty)}
                    else {
                      HandleDislikeOrLike(e, 'ungood', userDailies[dailyId].difficulty)

                    }}}
                />
              ) : (
                <img
                  src={`${process.env.PUBLIC_URL}/icons/hourglass-split-bs.svg`}
                  className='sadFace'
                  style={{ width: '100%', backgroundColor: 'gray', height: '100%', margin: '0' }}
                  
                />
              )}

            </div>
            <div className='main-body-habit-card'>
              <h3>{userDailies[dailyId]?.title}</h3>
              <p>{userDailies[dailyId]?.notes}</p>
            </div>
            <div className='ellipsis'>
              <img
                src={`${process.env.PUBLIC_URL}/icons/three-dots-vertical-bs.svg`}
                className='ellipsis-pic'
                onClick={(e) => {
                  e.stopPropagation();
                  handleEllipsisClick(dailyId);
                  openMenu()

                }}
              />
            </div>
          </div>
          {openDaily === dailyId && showMenu && (
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
                              onClick={() => setShowMenu(false)}
                            />
                          </span>
                          Edit
                        </>
                      }
                      modalComponent={<EditDailyModal dailyId={dailyId} daily={userDailies[dailyId]} />}
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
                              onClick={() => setShowMenu(false)}
                            />
                          </span>
                          Delete
                        </>
                      }
                      modalComponent={<DeleteHabitOrDaily formType={'daily'} targetId={dailyId} title={userDailies[dailyId]?.title} />}
                      onClick={() => setShowMenu(false)}
                    />
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  </>);
}
