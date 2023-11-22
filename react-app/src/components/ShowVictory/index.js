import React, { useState } from 'react';
import { useModal } from "../../context/Modal";
import './showVictory.css';
import { useDispatch } from 'react-redux';
import { ThunkEditNewUser } from "../../store/session";

export default function ShowVictory({ formType, setVictory, victoryDeets }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const [form1, setForm1] = useState(true);
    const [form2, setForm2] = useState(false);
    const [form3,setForm3] =useState(false)

    return (
        <>
            {formType === 'levelUp' && (
                <div className="victory-popup">
                    <h1 className='welcomeCongrats'>You gained A level!</h1>
                    <div className='victory-celebrate'>
                        <img
                            src={`${process.env.PUBLIC_URL}/icons/2010873_zorropa_black-mage-supreme-victory.gif`}
                            alt="Level Up"></img>
                    </div>

                    <p className='para'>{`${victoryDeets.levelGrowth} & ${victoryDeets.newTitle}`}</p>
                    <p className='para'>{victoryDeets.healthIncrease}</p>
                    <p className='para'>{victoryDeets.nextLevel}</p>
                    <p className='para'>{victoryDeets.endingLine}</p>
                    <button className='letsMakePretty'onClick={() => {
                        setVictory(false);
                        closeModal();
                    }}>Ok</button>
                </div>
            )}

            {formType === 'newUser' && form1 && (
                <div className='victory-popup2'>
                    <h1 className='welcomeCongrats'>Welcome to Level Up Everything!</h1>
                    <div className='victory-welcome'>
                        <img
                            src={`${process.env.PUBLIC_URL}/icons/finalCutDangerousGoAlone.gif`}
                            alt="Welcome"></img>
                    </div>
                    <p className='para2'>Getting started on anything can be hard...especially when it comes to changing your life. Luckily for you we are here to help.</p>
                    <p className='para2'>We already started you out with two cards you can edit.  When you are ready to begin your adventure, click "Next".</p>
                    <div className='button'>
                        <button className='letsMakePretty' onClick={() => {
                            setForm1(false);
                            setForm2(true);
                        }}>Next</button>
                    </div>
                </div>
            )}

            {formType === 'newUser' && form2 && (
                <div className='victory-popup2'>
                    <p className='welcomeCongrats'>ADD/EDIT A CARD: </p>
                    <div className='victory-welcome2'>
                        <img
                            src={`https://lue-cs.s3.amazonaws.com/34b70359a396434a8b371653b97b9bac.gif`}
                            alt="Welcome"></img>
                    </div>

                    {/* <p className='para'> hover over the card, and click the <img src={`${process.env.PUBLIC_URL}/icons/three-dots-vertical-bs.svg`} alt="Edit Icon" />
                        that appear.</p>
                    <p className='para'>Once a card is setup, the action icon on the far left will change and you can interact with it.</p>
                    <p className='para'>FOR GOOD HABITS: a smiley face will appear-left click on it when you perform this good habit, and you will be rewared with gold and experience!</p>
                    <p className='para'>FOR BAD HABITS: left click on the frowney face when you slip up (it's ok...we are all human!). Your health will decrease</p> */}
                    {/* <p className='para'>With enough good habits and exp, you will gain a level! I'll let you discover those perks when you get there. However, if you slip up too many time with bad habits and your health reaches 0 you will lose a level and all your gold and exp. The setback is horrible, but it motivates you to keep improving and moving forward!</p>
                    <p className='para'>DAILIES are a bit simpler. Once a daily is setup an hourglass will appear. Left click on the hourglass when you complete a task, and a checkmark will appear! You will also gain gold and exp.</p>
                    <p className='para'>Welcome to level up everything- may you enjoy your journey of self improvement. Best of luck!</p> */}

<div className='button'>
                        <button className='letsMakePretty' onClick={() => {
                            setForm2(false);
                            setForm3(true);
                        }}>Next</button>
                    </div>

                </div>
            )}
            {formType === 'newUser' && form3 && (
                <>
                <div className='victory-popup2'>
                 <p className='welcomeCongrats'>Leveling up: </p>
                 <hr className='hrBreaks'></hr>
                <p className='para2'>Complete good habits or dailies and your gold and exp will increase.  Complete enough and you gain a level!  When you gain a level your health is fully restored.</p>

                <p className='welcomeCongrats'>Dying/ losing a level: </p>
                <hr className='hrBreaks'></hr>
                <p className='para2'>However, bad habits will decrease your hp.  Mess up too many times and you will die.  You will revert to the previous level and lose all gold and experience</p>
                <p></p>
                <p className='para2 white'>Once Again, welcome to Level Up Everything.  You are now free to start your journey.</p>
                <div className='button'>
<button className='letsMakePretty' onClick={async () => {
    setForm3(false)
    setVictory(false);
    await dispatch(ThunkEditNewUser());
    closeModal();
}}>Exit Tutorial</button>
</div>
</div>
                </>
            )}

        </>
    );
}
