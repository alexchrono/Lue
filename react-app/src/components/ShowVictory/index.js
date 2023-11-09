import { useModal } from "../../context/Modal";
import './showVictory.css'
import {  useDispatch } from 'react-redux';
import { ThunkEditNewUser } from "../../store/session";


export default function ShowVictory({ formType, setVictory, victoryDeets }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    return (
        <>
            {formType === 'levelUp' && (
                <div className="error-popup">
                    <h1>You've gained A level!!!!</h1>
                    <p className='para'>{`${victoryDeets.levelGrowth} & ${victoryDeets.newTitle}`}</p>
                    <p className='para'>{victoryDeets.healthIncrease}</p>
                    <p className='para'>{victoryDeets.nextLevel}</p>
                    <p className='para'>{victoryDeets.endingLine}</p>
                    <button onClick={() => {
                        setVictory(false);
                        closeModal();
                    }}>Ok</button>
                </div>
            )}

            {formType === 'newUser' && (
                <div className='firstTimer'>
                    <h1>Welcome to Level Up Everything!</h1>
                    <p>Getting started on anything can be hard...especially when it comes to changing your life. Luckily for you, we are here to help.</p>
                    <p>We already started you out with two cards you can edit. to edit a card, simply click the menu on the far right that appears on hover.</p>
                    <p>Once a card is setup, the action icon on the far left will change and you can interact with it.</p>
                    <p>FOR GOOD HABITS: a smiley face will appear-left click on it when you perform this good habit, and you will be rewared with gold and experience!</p>
                    <p>FOR BAD HABITS:, left click on the frowney face when you slip up (it's ok...we are all human!). Your health will decrease</p>
                    <p>With enough good habits and exp, you will gain a level! I'll let you discover those perks when you get there. However, if you slip up too many time with bad habits and your health reaches 0 you will lose a level and all your gold and exp. The setback is horrible, but it motivates you to keep improving and moving forward!</p>
                    <p>DAILIES are a bit simpler. Once a daily is setup an hourglass will appear. Left click on the hourglass when you complete a task, and a checkmark will appear! You will also gain gold and exp.</p>
                    <p>Welcome to level up everything- may you enjoy your journey of self improvement. Best of luck!</p>
                    <div className='button'>
                        <button onClick={async() => {
                            setVictory(false);
                            await dispatch(ThunkEditNewUser())
                            closeModal();
                        }}>Ok</button>
                    </div>
                </div>
            )}
        </>
    );
}
