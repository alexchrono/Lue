import React, { useState, useEffect } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import OpenModalButton from "../OpenModalButton";
import DeleteHabitOrDaily from "../DeleteHabitOrDaily";
import { ThunkEditDaily } from "../../store/daily";


export default function EditDailyModal({ dailyId, daily, setter }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [repeatTimeFrame, setRepeatTimeFrame] = useState("")
  const [repeatRateNumbers, setRepeatRateNumbers] = useState('')
  const [errors, setErrors] = useState([]);
  const [errorsFe,setErrorsFe] = useState([])
  const [alignment, setAlignment] = useState("")
  const [startDate, setStartDate] = useState('')
  const { closeModal } = useModal();
  const userDailies = useSelector((state) => state.session.user.usersDailiesObj);


  function custError(err,field,message){
    if (!err.errors) {
        err.errors={}}
    err.errors[field]=message
    return err

  }

  useEffect(()=>{
    setter(null)
  },[setter])
  useEffect(() => {
    if (daily) {
      setTitle(daily?.title)
      const starDate = new Date(daily?.startDate)
      const formattedStartDate = starDate?.toISOString().split('T')[0];
      setStartDate(formattedStartDate)
      if (daily.untouched) {
        console.log('THIS DAILY IS UNTOUCHED')
        setDifficulty('')
        setRepeatTimeFrame('')
        setRepeatRateNumbers(1)

      } else {
        setNotes(daily?.notes)
        setDifficulty(daily?.difficulty.toString())
        setRepeatTimeFrame(daily?.repeatTimeFrame)

        setRepeatRateNumbers(parseInt(daily?.repeatQuantity))

      }
    }
  }, [userDailies,dailyId, daily]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (notes === 'optional') {
      setNotes('')
    }
    let err={}
    if (!title || title.length < 3 || title.length > 30) {
      custError(err, 'title', 'Title is required and must be between 3 and 30 characters');
    }
    if (!["1", "2","3", "4"].includes(difficulty)) {
      custError(err, 'difficulty', 'Difficulty field is required. Please enter valid selection from dropdown');
    }
    if (repeatTimeFrame === '' || !['daily', 'weekly', 'monthly'].includes(repeatTimeFrame)) {
      custError(err, 'repeatTimeFrame', 'Please choose how often this should occur');
    }
    if (!startDate) {
      custError(err, 'startDate', 'startDate is required');
    }
    if (repeatRateNumbers === null || repeatRateNumbers <= 0 || repeatRateNumbers >= 21) {
      custError(err, 'repeatQuantity', 'Repeat quantity must be a number from 1 to 20.');
    }
    if(err.errors){
      setErrorsFe(err.errors)
      return
    }
    else {
    const updatedDaily = { dailyId, title, notes, difficulty, startDate, repeatTimeFrame, repeatRateNumbers }
    const data = await dispatch(ThunkEditDaily(updatedDaily));
    if (data?.errors) {
      console.log('WE GOT SOME ERRORS N OUR FORMS,data is******', data)
      console.log('DATA . ERRORS IS', data?.errors)
      setErrors(data.errors);
      console.log('WE CURRENTLY SET ERRORS WITH JUST DATA OR ', data)
    }
    else if (data?.title) {
      closeModal()

    };
  }
  }










  console.log("🚀 ~ file: index.js:107 ~ EditDailyModal ~ dailyId:", dailyId)

  return (
    <>
      <div className='overallSizeEditModal'>
        <div className='topEditContainer'>
          <div className='editHabit'>
            <h1>Edit Daily</h1>
          </div>
          <div className='buttonsEditHabit'>

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
              {errors.title ? <p className="errors">{errors.title}</p> : errorsFe.title ? <p className="feErrors">{errorsFe.title}</p> : null}
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

               {!daily.untouched && ('Difficulty Level:')}

                <select name='difficulty' id='difficulty' value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                  <option value='' disabled>Difficulty Level</option>
                  <option value='1'>No Sweat</option>
                  <option value='2'>Bit of Sweat</option>
                  <option value='3'>Hard Work</option>
                  <option value='4'>Super duper Challenging!</option>
                </select>
              </label>
              {errors.difficulty ? <p className="errors">{errors.difficulty}</p> : errorsFe.difficulty ? <p className="feErrors">{errorsFe.difficulty}</p> : null}
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
                {errors.startDate ? <p className="errors">{errors.startDate}</p> : errorsFe.startDate ? <p className="feErrors">{errorsFe.startDate}</p> : null}



                Repeats:

                <select name='reset' id='reset' value={repeatTimeFrame} onChange={(e) => setRepeatTimeFrame(e.target.value)}>
                  <option value='' disabled>Reset Time Frame</option>
                  <option value='daily'>Daily</option>
                  <option value='weekly'>Weekly</option>
                  <option value='monthly'>Monthly</option>
                  <option value='yearly'>Yearly</option>
                </select>

              </label>
              {errors.repeatTimeFrame ? <p className="errors">{errors.repeatTimeFrame}</p> : errorsFe.repeatTimeFrame ? <p className="feErrors">{errorsFe.repeatTimeFrame}</p> : null}

              <label>
                Repeat every
                <input
                  type="number"
                  value={repeatRateNumbers}
                  onChange={(e) => setRepeatRateNumbers(parseInt(e.target.value))}
                  min="0"
                  max="20"
                  step="1"
                // required
                />
              </label>
              {errors.repeatQuantity ? <p className="errors">{errors.repeatQuantity}</p> : errorsFe.repeatQuantity ? <p className="feErrors">{errorsFe.repeatQuantity}</p> : null}


            </form>


          </div>

          <div className='fifteen-percent no-border'></div>



        </div>
        <div className='allButtons'>
        <div className='editButtons'>
        <button className='cancel' type='button' onClick={closeModal}>
              Cancel
            </button>
            <button className='save' type='button' onClick={handleSubmit}>
              Save
            </button>
          </div>
          <div className='deleteButton'>
        <OpenModalButton
          buttonText={
            <>
              <span className="menu-icon">

              </span>{" "}
              Delete
            </>
          }
          modalComponent={<DeleteHabitOrDaily formType={'daily'} targetId={dailyId} title={userDailies[dailyId]?.title} />}
        // onClick={() => setShowMenu(false)}
        />
        </div>
      </div>
      </div>
    </>
  );
}
