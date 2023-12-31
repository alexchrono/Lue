import React, { useState, useEffect, useRef } from 'react';
import OpenModalButton from '../OpenModalButton';
import EditDailyModal from '../EditDailyModal';
import DeleteHabitOrDaily from '../DeleteHabitOrDaily';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkNewDaily, ThunkGetAllDailies } from '../../store/daily';
import { ThunkEditHealth } from '../../store/session';
import ErrorComponent from '../errorShow';
import ShowVictory from '../ShowVictory';
import EllipsisMenu from '../habitOrDailyEllipsisMenu';

export default function Dailies({ user,setter, playSound }) {
  const [daily, setDaily] = useState('');
  // const [showMenu, setShowMenu] = useState(false);
  const [clickedDailyCheck, setClickedDailyCheck] = useState([]);
  // const ulRef = useRef();
  const dispatch = useDispatch();
  const user2 = useSelector((state) => state.session.user);
  const userDailies = useSelector((state) => state.dailies.byId);
  const userArray = useSelector((state) => state.dailies.allIds);
  const clickedEmoti = useSelector((state) => state.session.user.usersClickedDailies)
  const [localArray, setLocalArray] = useState([])
  const [openDaily, setOpenDaily] = useState(null);
  const [errors, setErrors] = useState([]);
  const [showVictory, setShowVictory] = useState('nothing');
  const [victoryDeets, setVictoryDeets] = useState({})
  const [needsLoading, setNeedsLoading] = useState(true);

  useEffect(() => {
    setLocalArray(clickedEmoti);
  }, []);

  // const handleCheckmark = (e, dailyId) => {
  //   e.stopPropagation();
  //   let newArray;
  //   if (!clickedDailyCheck.includes(dailyId)) {
  //     newArray = [...clickedDailyCheck, dailyId];
  //     HandleGoldOrHurt(e, 'good', userDailies[dailyId].difficulty);
  //   } else {
  //     newArray = clickedDailyCheck.filter((ele) => ele !== dailyId);
  //     HandleGoldOrHurt(e, 'ungood', userDailies[dailyId].difficulty);
  //   }
  //   setClickedDailyCheck(newArray);
  // };

  const goodTranslator = {
    1: { gold: .12, exp: 1 },
    2: { gold: 1.2, exp: 7 },
    3: { gold: 1.8, exp: 11 },
    4: { gold: 2.4, exp: 14 }
  }

  const HandleGoldOrHurt = async (e, goodOrBad, difficulty, dailyId) => {
    e.preventDefault();
    const key = 'daily'
    let copyArray = localArray?.length ? [...localArray] : []

    let change = {}
    switch (goodOrBad) {
      case 'good':
        change = goodTranslator[difficulty];
        setter('victory')


        copyArray.push(dailyId)
        setLocalArray(copyArray)
        break;
      case 'ungood':
        change = goodTranslator[difficulty];
        setter('hurt')
        change.gold = -(change.gold);
        change.exp = -(change.exp);
        copyArray = copyArray.filter((ele) => ele !== dailyId)
        setLocalArray(copyArray)
        break;
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
  }

  const handleEllipsisClick = (dailyId) => {
    if (openDaily === dailyId) {
      setOpenDaily(null);
    } else {
      setOpenDaily(dailyId);
    }
  }

  const MakeNewDaily = async (e) => {
    e.preventDefault();
    let test = await dispatch(ThunkNewDaily(daily));
    setDaily('')
    if (test?.errors) {
      setErrors(test.errors);
    }
    else if (test.title) {

      return test;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(ThunkGetAllDailies());
      setNeedsLoading(false)
    };
    if (user2 && needsLoading) {
      fetchData()
    }
  }, [user2, dispatch, needsLoading]);

  // useEffect(() => {
  //   if (!showMenu) return;
  //   const closeMenu = (e) => {
  //     if (!ulRef?.current?.contains(e.target)) {
  //       setShowMenu(false);
  //     }
  //   };
  //   document.addEventListener("click", closeMenu);
  //   return () => document.removeEventListener("click", closeMenu);
  // }, [showMenu]);

  // const ulClassName = "ellipsis-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      {errors.title && (<ErrorComponent errorMessage={'Daily titles are required and must be between 3-30 characters'} setErrors={setErrors} setHabit={setDaily} />)}
      {showVictory === 'victory' && <ShowVictory formType={'levelUp'} setVictory={setShowVictory} victoryDeets={victoryDeets} />}
      {showVictory === 'death' && <ShowVictory formType={'death'} setVictory={setShowVictory} victoryDeets={victoryDeets} />}
      <div className='habits'>
      <img src={`${process.env.PUBLIC_URL}/icons/curvyLineWIDERFrame-revised2.png`} className='borderFrame left2'
          />
        <div className='habits-topMenu'>
          <div className='fifteen-percent bigtextcenter headerTable'>Dailies</div>
          <div className='forty-percent'>
            <form onSubmit={MakeNewDaily}>
              <div className='forgigs'>
                <input
                  type="text"
                  className='special90'
                  value={daily}
                  onChange={(e) => setDaily(e.target.value)}
                // required
                />
                <div class='tenpercent'>
                  <button type='submit'><img
                    src={`${process.env.PUBLIC_URL}/icons/fi-plus-fndtn.svg`}></img></button>
                </div>
              </div>
            </form>
          </div>
          <div className='fifteen-percent menu-text'>Due Today</div>
          <div className='fifteen-percent menu-text'>Completed</div>
          <div className='fifteen-percent menu-text' style={{ borderRight: 'none' }}>Upcoming</div>
        </div>
        <div className='allHabits'>
          {userArray?.map((dailyId, index) => (
            <div className='habits-card'>
              <div className='fifteen-percent invisi2 '>
                {/* <img
                  src={`${process.env.PUBLIC_URL}/icons/curvyLine42.png`}
                /> */}
              </div>
              <div className='habits-card-center'>
                <div className='bad-habit-emoti'>
                  {userDailies[dailyId]?.untouched ? (
                    <img
                      src={`${process.env.PUBLIC_URL}/icons/three-dots-bs.svg`}
                      className=' sadFace'
                      style={{ width: '100%', backgroundColor: 'gray', height: '100%', margin: '0' }}
                    />
                  ) : localArray?.length && localArray?.includes(dailyId) ? (
                    <img
                      src={`${process.env.PUBLIC_URL}/icons/checkmark-outline-ion.svg`}
                      onClick={(e) => HandleGoldOrHurt(e, 'ungood', userDailies[dailyId].difficulty, dailyId)}
                      className='changeToHand sadFace'
                      style={{ width: '100%', backgroundColor: 'green', height: '100%', margin: '0' }}
                    />
                  ) : (
                    <img
                      src={`${process.env.PUBLIC_URL}/icons/hourglass-split-bs.svg`}
                      onClick={(e) => HandleGoldOrHurt(e, 'good', userDailies[dailyId].difficulty, dailyId)}
                      className='changeToHand sadFace'
                      style={{ width: '100%', backgroundColor: 'gray', height: '100%', margin: '0' }}
                    />
                  )}
                </div>
                <div className='main-body-habit-card'>
                  <h3 className='topOfCard'>{userDailies[dailyId]?.title}</h3>
                  <p className='bottOfCard'>{userDailies[dailyId]?.notes && userDailies[dailyId]?.notes.length > 39
                    ? userDailies[dailyId].notes.substring(0, userDailies[dailyId].notes.lastIndexOf(' ', 39)) + '...'
                    : userDailies[dailyId].notes}</p>
                </div>
                <div className='ellipsis'>
                  <img
                    src={`${process.env.PUBLIC_URL}/icons/three-dots-vertical-bs.svg`}
                    className='ellipsis-pic'
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEllipsisClick(dailyId);
                      // setShowMenu(true);
                    }}
                  />
                </div>
              </div>
              <div className='fifteen-percent invisi2 mobileGone2'>
                {/* <img
                  src={`${process.env.PUBLIC_URL}/icons/curvyLine52.png`}
                /> */}
                {openDaily === dailyId && (
                  <EllipsisMenu formType='daily' id={dailyId} habitOrDaily={userDailies[dailyId]} setter={setOpenDaily} />)}

              </div>
            </div>))}
        </div>
      </div>
    </>
  );
}
