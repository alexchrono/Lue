import React, { useState, useEffect } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import OpenModalButton from "../OpenModalButton";
import DeleteHabitOrDaily from "../DeleteHabitOrDaily";
import { ThunkEditDaily } from "../../store/daily";
import './selectAvatar.css'

export default function SelectAvatar({setGif,setter}) {
    return (
        <div className='selectAv'>
            <h1>Select your Avatar</h1>
            <div className='row1'>
                <img src={`${process.env.PUBLIC_URL}/icons/RyuAnimated.gif`} alt='Ryu' onClick={
                    (e)=>{setGif('Ryu');
                    setter(false)}}></img>
                <img src={`${process.env.PUBLIC_URL}/icons/GuileAnim.gif`} alt='Guile' onClick={
                    (e)=>{setGif('Guile');
                    setter(false)}}></img>
            </div>
            <div className='row2'>
                <img src={`${process.env.PUBLIC_URL}/icons/sailorJupiterAnim.gif`} alt='Sailor Jupiter' onClick={
                    (e)=>{setGif('Jupiter');
                    setter(false)}}></img>
                <img src={`${process.env.PUBLIC_URL}/icons/SailorMarsAnim.gif`} alt='Sailor Mars'onClick={
                    (e)=>{setGif('Mars');
                    setter(false)}}></img>
            </div>
        </div>
    );
}
