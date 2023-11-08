import { useModal } from "../../context/Modal";
import './showVictory.css'

export default function ShowVictory({ setVictory,victoryDeets }) {
    const { closeModal } = useModal();
    if (!errorMessage) return null;

    return (
        <>
      <div className="error-popup">
        <h1>Error</h1>
       <p class='para'>{errorMessage}</p>
        <button onClick={(e)=>{
            setHabit('');
            setErrors([])
            closeModal()}}>Ok</button>
      </div>
      <div>

      </div>

      </>
    );
  }
