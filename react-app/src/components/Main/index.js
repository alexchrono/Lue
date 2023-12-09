import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Habits from '../Habits';
import Dailies from '../Dailies';
import ErrorComponent from '../errorShow';
import EllipsisMenu from '../habitOrDailyEllipsisMenu';
import ProfileMenu from '../profileMenu';
import './main.css';

export default function Main({ mode }) {
    const user = useSelector((state) => state.session.user);
    const history = useHistory();
    const [menuSelect,setMenuSelect]=useState('stats')

    const expFinder = () => {
        return user.level * 25;
    };

    function calculateDaysOld(createdDateString) {
        const createdDate = new Date(createdDateString);
        const currentDate = new Date();
        const timeDiff = currentDate - createdDate;
        return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    }

    const daysOld = calculateDaysOld(user?.created_at);

    useEffect(() => {
        if (!user) {
            history.push('/');
        }
    }, [user, history]);

    if (!user) {
        return null;
    }

    return (
        <div className='main-main-container'>
            <div className="stats-container">
                <div className='avStats'>
                    <div className="avatar">
                        <img src={`${user.selectedAvatar}`} alt="Avatar" />
                    </div>
                    <div className='stats'>
                        <table>
                            <tbody>
                                <tr><td>Level:</td><td>{user.level}</td></tr>
                                <tr><td>Title:</td><td>{user.levelTitle}</td></tr>
                                <tr><td>Health:</td><td>{user.currentHealth} / {user.health}</td></tr>
                                <tr><td>Exp:</td><td>{user.exp} / {expFinder()}</td></tr>
                                <tr><td>Gold:</td><td>{user.gold}</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                {mode === 'main' ?
                    <div className='inspirational-quote'>
                        <img className='sword-Divider' src={`${process.env.PUBLIC_URL}/icons/sword-flipped-divider3.png`} alt="Sword Divider" />
                        <div className='fiftyheight'>
                            <div className='bad-spot'></div>
                            <div className='sweet-spot'><div className='text-finally'>Life is...</div></div>
                        </div>
                        <div className='fiftyheight'>
                            <div className='bad-spot'></div>
                            <div className='sweet-spot'><div className='text-finally'>What you make of it</div></div>
                        </div>
                    </div>
                    : mode === 'profile' ?
                        <div className='profileContainer'>
                            <div className='avatarContainer'>
                                <img src={`${process.env.PUBLIC_URL}${user.gif}`} alt="User Gif" />
                            </div>
                            {(menuSelect === 'stats' || menuSelect ==='editProfile') && (
                            <div className='profileInfo'>
                                <table>
                                    <tbody>
                                        <tr><td>Username:</td><td>{user.username}</td></tr>
                                        <tr><td>Email:</td><td>{user.email}</td></tr>
                                        <tr><td>Days old:</td><td>{daysOld}</td></tr>
                                        <tr><td>Total Deaths:</td><td>{user.deaths}</td></tr>
                                    </tbody>
                                </table>
                            </div>)}

                            {menuSelect ==='shop' && (
                                <div className='profileInfo'>
                                    <div className='topCenter'>
                                    <table className='purrfect'>
                                    <tbody>
                                        <tr><td>Gold:</td><td>{user.gold}</td></tr>
                                        </tbody>
                                </table>
                                </div>
                                <div className='purchaseText'>
                                    <p>Items Available:</p>
                                </div>
                                <div className='centerDisplay'></div>
                                <div className='bottomSelection'>
                                    <div className='bottomLeft'></div>
                                    <div className='bottomRight'>
                                        <div className='right1'>
                                            <div className='one'>
                                            <img src={`${process.env.PUBLIC_URL}/icons/backgroundItemsBucklerDone.png`}></img>
                                            </div>
                                            <div className='two'>
                                            <img src={`${process.env.PUBLIC_URL}/icons/backgroundItemsHylianShield.png`}></img>
                                            </div>


                                        </div>
                                        <div className='right2'>
                                        <div className='three'>
                                        <img src={`${process.env.PUBLIC_URL}/icons/backgroundItemsMachete.png`}></img>
                                        </div>
                                            <div className='four'>
                                            <img src={`${process.env.PUBLIC_URL}/icons/backgroundItemsKATANADONE.png`}></img>
                                            </div>



                                        </div>
                                    </div>

                                </div>
                                    </div>
                            )}

                  <ProfileMenu menuSelect={menuSelect} setMenuSelect={setMenuSelect} />
                        </div>
                        : null}
            </div>
            <div className='tables'>
                {user?.justGainedLevel && (
                    <ErrorComponent errorMessage={`Congrats!  You just gained a level.  You are now level ${user.level}.   Your health has been fully restored, and your stats have increased.`} />
                )}
                <Habits user={user} />
                <div className='center-buffer'></div>
                <Dailies user={user} />
            </div>
        </div>
    );
}
