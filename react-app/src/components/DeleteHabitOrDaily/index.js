import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { ThunkDeleteHabit } from "../../store/habit";

export default function DeleteHabitOrDaily({formType,targetId,title}) {
  const dispatch = useDispatch();

  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleDelete = async (e) => {
    e.preventDefault();
    const data = await dispatch(ThunkDeleteHabit(targetId))

    return 7
    // const data = await dispatch(login(email, password));
    // if (data) {
    //   setErrors(data);
    // } else {
    //     closeModal()
    // }
  };
const ourDisplay= formType==='habit'? "Habit" : "Daily"
const ourName='steve'

console.log("🚀 ~ file: index.js:27 ~ DeleteHabitOrDaily ~ formType:", formType)

console.log("🚀 ~ file: index.js:29 ~ DeleteHabitOrDaily ~ targetId:", targetId)

console.log("🚀 ~ file: index.js:31 ~ DeleteHabitOrDaily ~ title:", title)

  return (
    <>
      <h1>Are you sure you want to delete the {ourDisplay}</h1>
      <h3>{title} ? </h3>
      <div className="alignment-choice">

<div className="pic-container">
    <img
      src={`${process.env.PUBLIC_URL}/icons/x-circle-bs.svg`}
      className='sadFace'
      onClick={closeModal}
      alt="Do not Delete"
    />
    <p className="pic-caption">No- Do not Delete</p>
  </div>

  <div className="pic-container">
    <img
      src={`${process.env.PUBLIC_URL}/icons/trash-can-fa.svg`}
      className='happyFace'
      onClick={handleDelete}
      alt="Yes- delete"
    />
    <p className="pic-caption">Yes I'm Sure- delete</p>
  </div>
</div>
    </>
  );
}
