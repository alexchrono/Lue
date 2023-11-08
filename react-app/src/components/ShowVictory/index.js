import { useModal } from "../../context/Modal";
import './showVictory.css'

export default function ShowVictory({ setVictory,victoryDeets }) {
    const { closeModal } = useModal();


    console.log("🚀 ~ file: index.js:8 ~ ShowVictory ~ victoryDeets:", victoryDeets)
    return (
        <>
      <div className="error-popup">
        <h1>You've gained A level!!!!</h1>
       <p class='para'>{victoryDeets.levelGrowth} & {victoryDeets.newTitle}</p>
       <p class='para'>{victoryDeets.healthIncrease}</p>
       <p class='para'>{victoryDeets.nextLevel}</p>
       <p class='para'>{victoryDeets.endingLine}</p>
        <button onClick={(e)=>{
            setVictory(false);
            closeModal()}}>Ok</button>
      </div>
      <div>

      </div>

      </>
    );
  }
