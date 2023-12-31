import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { NavLink,useHistory, useLocation } from 'react-router-dom';
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import { login } from "../../store/session";
import SignupFormModal from "../SignupFormModal";
import { ThunkGetAllHabits } from "../../store/habit";
import { ThunkGetAllDailies } from "../../store/daily";



function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history=useHistory()
  const [errors,setErrors]=useState({})
  const location = useLocation();
  const currentPath = location.pathname;
  const [profOrMain,setProfOrMain]=useState('profile')

  const loginDemo = async (e) => {
    e.preventDefault();
    const data = await dispatch(login('demo@aa.io', 'password'));
    if (data && data.errors) {

      setErrors(data.errors);
    } else {

        await dispatch(ThunkGetAllHabits())
        await dispatch(ThunkGetAllDailies())
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

{currentPath === '/' ?  <button className='onOwn' onClick={openMenu}>Log in
            </button>:

      <button onClick={openMenu}>


       <img src={`${process.env.PUBLIC_URL}/icons/forWebsiteYay2.png`} />
      </button>}
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li>{user.username}</li>
            <li>{user.email}</li>
            {profOrMain==='profile'?
            <li><button onClick={(e)=>{
              history.push('/profile');
            setProfOrMain('main')}}>Profile</button></li>: profOrMain==='main'?

<li><button onClick={(e)=>{history.push('/main');
setProfOrMain('profile')}}>Main</button></li> : null
          }
            <li>
              <button onClick={handleLogout}>Log Out</button>
            </li>
          </>
        ) : (
          <>
            <li><OpenModalButton
              buttonText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            </li>
            <li>
            <button className='messButton' onClick={loginDemo}>Log in as Demo
            </button>
            </li>
</>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
