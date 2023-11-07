import React, { useState, useEffect } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import OpenModalButton from "../OpenModalButton";
import DeleteHabitOrDaily from "../DeleteHabitOrDaily";
import { ThunkEditHabit } from "../../store/habit";


export default function EditHabitModal({ habitId, habit }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [resetRate, setResetRate] = useState("")
  const [errors, setErrors] = useState([]);
  const [picPass, setPicPass] = useState(false)
  const [alignment, setAlignment] = useState(true)
  const { closeModal } = useModal();
  const userHabits = useSelector((state) => state.session.user.usersHabitsObj);

  useEffect(() => {
    if (habit) {
      setTitle(habit?.title)
      if (habit.untouched) {
        setNotes('optional')
        setAlignment('')
        setDifficulty('')
        setPicPass(true)
        setResetRate('')

      }
      else {

        setNotes(habit?.notes)
        setAlignment(habit?.alignment)
        setDifficulty(habit?.difficulty)
        setResetRate(habit?.resetRate)
      }
    }
  }, [userHabits, habitId, habit]);


  console.log('inside edithabitmodal my userhabits are', userHabits)
  console.log('userhabits at habitid is', userHabits[habitId])
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (notes === 'optional') {
      setNotes('')
    }

    const updatedHabit = { habitId, title, notes, difficulty, resetRate, alignment }
    const data = await dispatch(ThunkEditHabit(updatedHabit));
    if (data?.errors){
      console.log('WE GOT SOME ERRORS N OUR FORMS,data is******',data)
      console.log('DATA . ERRORS IS',data?.errors)
      setErrors(data.errors);
      console.log('WE CURRENTLY SET ERRORS WITH JUST DATA OR ',data)
    }
      else if (data?.title) {
        closeModal()

    };

  };

  const handlePicClick = (value) => {
    console.log('inside handlePicClick*****')
    console.log("setAlignmentTO", value)
    setPicPass(false)
    setAlignment(value);
  };

  console.log('INSIDE EDITHABITMODAL HABITID IS', habitId)

  return (
    <>
      <div className='overallSizeEditModal'>
        <div className='topEditContainer'>
          <div className='editHabit'>
            <h1>Edit Habit</h1>
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
                  onChange={(e) => setNotes(e.target.value)}
                // required
                >
                </textarea>
              </label>

              <div className="alignment-choice">

                <div className="pic-container">
                  <img
                    src={`${process.env.PUBLIC_URL}/icons/face-tired-fa.svg`}
                    onClick={() => handlePicClick(false)}

                    className={!alignment && !picPass ? 'sadFace blueborder' : 'sadFace'}
                    alt="Bad Habit"
                  />
                  <p className="pic-caption">Bad Habit</p>
                </div>

                <div className="pic-container" >
                  <img
                    src={`${process.env.PUBLIC_URL}/icons/face-smile-beam-fa.svg`}
                    onClick={() => handlePicClick(true)}
                    className={alignment && !picPass ? 'happyFace blueborder' : 'happyFace'}
                    alt="Good Habit"
                  />
                  <p className="pic-caption">Good Habit</p>
                </div>
              </div>
              {errors.alignment && <p className="errors">{errors.alignment}</p>}
              <label>

                {!habit.untouched && ('Difficulty Level:')}

                <select name='difficulty' id='difficulty' value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                  <option value='' disabled>Difficulty Level</option>
                  <option value="1">No Sweat</option>
                  <option value='2'>Bit of Sweat</option>
                  <option value='3'>Hard Work</option>
                  <option value='4'>Super duper Challenging!</option>
                </select>
              </label>
              {errors.difficulty && <p className="errors">{errors.difficulty}</p>}
              <label>

              {!habit.untouched && ('Reset my count:')}

                <select name='reset' id='reset' value={resetRate} onChange={(e) => setResetRate(e.target.value)}>
                  <option value='' disabled>Reset Time Frame</option>
                  <option value='daily'>Daily</option>
                  <option value='weekly'>Weekly</option>
                  <option value='monthly'>Monthly</option>
                </select>

              </label>
              {errors.resetRate && <p className="errors">{errors.resetRate}</p>}
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
