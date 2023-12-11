import React from "react";
import './selectAvatar.css'

export default function SelectAvatar({setGif,setter}) {
    return (
        <div className='selectAv'>
            <h1>Select your Avatar</h1>
            <div className='row'>
                <img src={`${process.env.PUBLIC_URL}/icons/avgifs/ryu/ryu-none-none.gif`} alt='Ryu' onClick={
                    (e)=>{setGif('ryu');
                    setter(false)}}></img>
                <img src={`${process.env.PUBLIC_URL}/icons/avgifs/chunli/chunli-none-none.gif`} alt='chun-li' onClick={
                    (e)=>{setGif('chunli');
                    setter(false)}}></img>
            </div>
        </div>
    );
}
