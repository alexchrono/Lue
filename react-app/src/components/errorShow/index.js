import { useModal } from "../../context/Modal";
import './errorShow.css'

export default function ErrorComponent({ errorMessage,setErrors,setHabit }) {
    const { closeModal } = useModal();
    if (!errorMessage) return null;

    return (
        <>
      <div className="error-popup">
      <div class='victory-celebrate'>
                    <img
                  src={`${process.env.PUBLIC_URL}/icons/duckhuntDog.gif`}></img>
                  </div>
        <h1 className='errorPara'>Error</h1>
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
