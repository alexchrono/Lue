import React, { useState,useEffect } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { ThunkDeleteHabit } from "../../store/habit";
import { ThunkDeleteDaily } from "../../store/daily";

export default function DeleteHabitOrDaily({formType,targetId,title,setter}) {
  const dispatch = useDispatch();

  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  useEffect(()=>{
    setter(null)
  },[setter])

  const handleDelete = async (e) => {
    e.preventDefault();
    if (formType==='habit'){
    const data = await dispatch(ThunkDeleteHabit(targetId))
    if (data){
      closeModal()
    }


  }
  else {
    console.log('WE HIT OUR ELSE BRO')
    const data = await dispatch(ThunkDeleteDaily(targetId))
    if (data){
      closeModal()
    }



  }
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
