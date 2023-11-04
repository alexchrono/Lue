import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";


export default function EditDailyModal() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [resetRate,setResetRate]= useState("")
  const [errors, setErrors] = useState([]);
  const [alignment,setAlignment] = useState("")
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(title, notes));
    if (data) {
      setErrors(data);
    } else {
      closeModal()
    }
  };

  const handlePicClick = (value) => {
    setAlignment(value);
  };

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
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
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
                  className='sadFace'
                  onClick={() => handlePicClick('bad')}
                  alt="Bad Habit"
                />
                <p className="pic-caption">Bad Habit</p>
              </div>

              <div className="pic-container">
                <img
                  src={`${process.env.PUBLIC_URL}/icons/face-smile-beam-fa.svg`}
                  className='happyFace'
                  onClick={() => handlePicClick('good')}
                  alt="Good Habit"
                />
                <p className="pic-caption">Good Habit</p>
              </div>
            </div>
            <label>

            Difficulty Level:

              <select name='difficulty' id='difficulty' onChange={(e) => setDifficulty(e.target.value)}>
                <option value='1'>No Sweat</option>
                <option value='2'>Bit of Sweat</option>
                <option value='3'>Hard Work</option>
                <option value='4'>Super duper Challenging!</option>
              </select>
              </label>

              <label>

            Reset my count every:

              <select name='reset' id='reset' onChange={(e) => setResetRate(e.target.value)}>
                <option value='daily'>Daily</option>
                <option value='weekly'>Weakly</option>
                <option value='monthly'>Monthly</option>
                <option value='4'>Super duper Challenging!</option>
              </select>

            </label>
          </form>


        </div>

        <div className='fifteen-percent no-border'></div>



      </div>
      </div>

    </>
  );
}
