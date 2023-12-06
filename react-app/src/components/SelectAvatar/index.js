import React, { useState, useEffect } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import OpenModalButton from "../OpenModalButton";
import DeleteHabitOrDaily from "../DeleteHabitOrDaily";
import { ThunkEditDaily } from "../../store/daily";


export default function SelectAvatar() {



  return (
    <>
    <h1>Select your Avatar</h1>
    <img src={`${process.env.PUBLIC_URL}/icons/SNES - Super Street Fighter II The New Challengers - RyuAnimated.gif`}></img>
    <img src={`${process.env.PUBLIC_URL}/icons/SNES - Super Street Fighter II The New Challengers - GuileAnim.gif`}></img>
    <img src={`${process.env.PUBLIC_URL}/icons/sailorJupiterSprites1.gif`}></img>
    <img src={`${process.env.PUBLIC_URL}/icons/SNES - Sailor Moon - Sailor Mars.gif`}></img>


    </>)

}
