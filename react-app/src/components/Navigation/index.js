import React from 'react';
import { NavLink,useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	

	return (
		<div className='navbar-container'>

		<div className='logo'>
				<NavLink exact to="/">Lue</NavLink>
				</div>
				{!sessionUser && (
					<div className='fancy-text'>
					Level Up Everything
				</div>
				)}
				{sessionUser && (
					<div className='healthbar'>
					HealthBar goes here
				</div>
				)}

			<div className='dropdown'>
			{isLoaded && (
				<ul>
				<li>
					<ProfileButton user={sessionUser} />
				</li>
				</ul>
			)}
		</div>
		</div>
	);
}

export default Navigation;
