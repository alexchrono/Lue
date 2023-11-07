import { useModal } from "../../context/Modal";
import './errorShow.css'

export default function ErrorComponent({ errorMessage,setErrors,setHabit }) {
    const { closeModal } = useModal();
    if (!errorMessage) return null;

    return (
        <>
      <div className="error-popup">
        Error: {errorMessage}
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
