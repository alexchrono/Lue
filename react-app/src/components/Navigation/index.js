import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);
	console.log(sessionUser)
	const healthPercentage = (sessionUser?.currentHealth/sessionUser?.health ) * 100;
	const healthColor = healthPercentage > 65 ? 'green' : healthPercentage >= 40 ? 'yellow' : 'red';

	return (
		<div className='navbar-container'>

			<div className='logo'>
				<NavLink exact to="/"><img src='https://lue-cs.s3.amazonaws.com/5851de8541214012adc2e14963f49746.png'></img></NavLink>
			</div>
			{!sessionUser && (
				<div className='fancy-text'>
					Level Up Everything
				</div>
			)}
			{sessionUser && (
				<div className='healthbar'>
					<div className='currentHealth' style={{
						width: `${healthPercentage}%`,
						backgroundColor: healthColor
					}}></div>

				</div>
			)}

			<div className='dropdown'>
				{isLoaded && (
					<ul>
						{/* <li> */}
							<ProfileButton  user={sessionUser} />
						{/* </li> */}
					</ul>
				)}
			</div>
		</div>
	);
}

export default Navigation;
