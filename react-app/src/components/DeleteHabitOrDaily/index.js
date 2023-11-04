import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";


export default function DeleteHabitOrDaily({formType}) {
  const dispatch = useDispatch();

  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleDelete = async (e) => {
    e.preventDefault();
    console.log(7)
    closeModal()
    return 7
    // const data = await dispatch(login(email, password));
    // if (data) {
    //   setErrors(data);
    // } else {
    //     closeModal()
    // }
  };
const ourDisplay= formType==='habit'? "Habit" : "Daily"
const ourName= 'jujuFornow'

  return (
    <>
      <h1>Are you sure you want to delete the {ourDisplay}: {ourName} ? </h1>
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
