import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
        closeModal()
    }
  };

  return (

    <div className='overallSizeEditModal2'>
  <h1 className='login'>Log In</h1>
  <div className='flexLogin'>
    <form onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <p className='Label'>Email</p>

        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

      <p className='Label'>Password</p>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

      <div className='loginButtonContainer'>
        <button className='letsMakePretty' onClick={(e)=>{
          e.stopPropagation();
          closeModal()
        }}>Cancel</button><button className='letsMakePretty' type="submit">Log In</button>
      </div>
    </form>
  </div>
</div>

  );
}

export default LoginFormModal;
