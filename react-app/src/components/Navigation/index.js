import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div className='navbar-container'>


				<NavLink exact to="/">Lue</NavLink>
			
			{isLoaded && (
				<ul>
				<li>
					<ProfileButton user={sessionUser} />
				</li>
				</ul>
			)}

		</div>
	);
}

export default Navigation;
