import React, { useState,useEffect } from "react";
import { login } from "../../store/session";
import { useDispatch,useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import OpenModalButton from "../OpenModalButton";
import DeleteHabitOrDaily from "../DeleteHabitOrDaily";
import { ThunkEditDaily } from "../../store/daily";


export default function EditDailyModal({dailyId,daily}) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [repeatTimeFrame,setRepeatTimeFrame]= useState("")
  const [repeatRateNumbers,setRepeatRateNumbers]=useState("")
  const [errors, setErrors] = useState([]);
  const [alignment,setAlignment] = useState("")
  const [startDate,setStartDate] = useState('')
  const { closeModal } = useModal();
  const userDailies= useSelector((state) => state.session.user.usersDailiesObj);
  const userArray =  useSelector((state) => state.dailies.allIds);
  console.log('INSIDE DAILIES EDIT USERDAILIES IS',userDailies)

  useEffect(() => {
    if (daily) {
      // const test=userDailies[dailyId]
      // console.log('IN USE EFFECT TEST IS',test)
      setTitle(daily?.title)
      setNotes(daily?.notes)
      setDifficulty(daily?.difficulty)
      if (daily?.startDate){
      const starDate= new Date(daily?.startDate)
      const formattedStartDate = starDate?.toISOString().split('T')[0];
      setStartDate(formattedStartDate)}
      setRepeatTimeFrame(daily?.repeatTimeFrame)
      console.log('IN USE EFFECT REPEAT TIME FRAME IS',repeatTimeFrame)
      setRepeatRateNumbers(parseInt(daily?.repeatQuantity))

    }
  }, [userDailies,userArray,dailyId,repeatTimeFrame]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedDaily={dailyId,title,notes,difficulty,startDate,repeatTimeFrame,repeatRateNumbers}
    const data= await dispatch(ThunkEditDaily(updatedDaily));
    if (data?.errors){
    console.log('WE GOT SOME ERRORS N OUR FORMS,data is******',data)
    console.log('DATA . ERRORS IS',data?.errors)
    setErrors(data.errors);
    console.log('WE CURRENTLY SET ERRORS WITH JUST DATA OR ',data)
  }
    else if (data?.title) {
      closeModal()

    // } else if (data?.errors){
    //   console.log('WE GOT SOME ERRORS N OUR FORMS,data is******',data)
    //   console.log('DATA . ERRORS IS',data?.errors)
    //   setErrors(data);
    //   console.log('WE CURRENTLY SET ERRORS WITH JUST DATA OR ',data)

    // }
  };
  }

  return (
    <>
    <div className='overallSizeEditModal'>
      <div className='topEditContainer'>
        <div className='editHabit'>
          <h1>Edit Daily</h1>
        </div>
        <div className='buttonsEditHabit'>
          <button className='cancel' type='button' onClick={closeModal}>
            Cancel
          </button>
          <button className='save' type='button' onClick={handleSubmit}>
            Save
          </button>
        </div>
      </div>
      <div className='mainBodyEditHabit'>
        <div className='fifteen-percent no-border'></div>
        <div className='habits-card-center'>
          <form onSubmit={handleSubmit} className='editHabitsForm'>
            <ul>
              {/* {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))} */}
            </ul>
            <label>
              Title
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                // required
              />

            </label>
            {errors.title && <p className="errors">{errors.title}</p>}
            <label>
              Notes
              <textarea
                value={notes}
                placeholder="Optional"
                onChange={(e) => setNotes(e.target.value)}
                // required
              >
            </textarea>
            </label>


            <label>

            Difficulty Level:

              <select name='difficulty' id='difficulty' value={difficulty}onChange={(e) => setDifficulty(e.target.value)}>
                <option value='1'>No Sweat</option>
                <option value='2'>Bit of Sweat</option>
                <option value='3'>Hard Work</option>
                <option value='4'>Super duper Challenging!</option>
              </select>
              </label>

              <label>

              <label>
              Start Date
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                // required
              />
            </label>



            Repeats:

              <select name='reset' id='reset' value={repeatTimeFrame}onChange={(e) => setRepeatTimeFrame(e.target.value)}>
                <option value='daily'>Daily</option>
                <option value='weekly'>Weakly</option>
                <option value='monthly'>Monthly</option>
                <option value='yearly'>Yearly</option>
              </select>

            </label>

            <label>
              Repeat every
              <input
                type="number"
                value={repeatRateNumbers}
                onChange={(e) => setRepeatRateNumbers(e.target.value)}
                min="0"
                max="20"
                step="1"
                // required
              />
            </label>


          </form>


        </div>

        <div className='fifteen-percent no-border'></div>



      </div>

      <OpenModalButton
              buttonText={
                <>
                  <span className="menu-icon">

                  </span>{" "}
                  Delete
                </>
              }
              modalComponent={<DeleteHabitOrDaily
                //  playlistId={playlistId}
                 />}
              // onClick={() => setShowMenu(false)}
            />
      </div>

    </>
  );
}
