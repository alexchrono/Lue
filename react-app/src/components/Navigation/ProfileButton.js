import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { NavLink,useHistory } from 'react-router-dom';
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import { login } from "../../store/session";
import SignupFormModal from "../SignupFormModal";
import { ThunkGetAllHabits } from "../../store/habit";



function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history=useHistory()
  const [errors,setErrors]=useState({})

  const loginDemo = async (e) => {
    e.preventDefault();
    const data = await dispatch(login('demo@aa.io', 'password'));
    if (data && data.errors) {

      setErrors(data.errors);
    } else {

      console.log('AM I HITTIN GTHE ELSE?!!?!?!')
      console.log('what is data here',data)
        await dispatch(ThunkGetAllHabits())
         history.push('/main')
    }
  };

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);



  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());

  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <button onClick={openMenu}>
        <img src='https://lue-cs.s3.amazonaws.com/3b92de1d2dd3453bbb012a4345b4c0ca.png'></img>
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li>{user.username}</li>
            <li>{user.email}</li>
            <li>
              <button onClick={handleLogout}>Log Out</button>
            </li>
          </>
        ) : (
          <>
            <OpenModalButton
              buttonText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />

            <button onClick={loginDemo}>
              Log in as Demo
            </button>


            {/* <OpenModalButton
              buttonText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            /> */}
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
