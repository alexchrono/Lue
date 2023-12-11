import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import Habits from '../Habits';
import Dailies from '../Dailies';
import ErrorComponent from '../errorShow';
import EllipsisMenu from '../habitOrDailyEllipsisMenu';
import ProfileMenu from '../profileMenu';
import PurchaseItem from '../PurchaseItem'
import { ThunkEquip } from '../../store/session';
import './main.css';

export default function Main({ mode }) {
    const dispatch= useDispatch()
    const user = useSelector((state) => state.session.user);
    const history = useHistory();
    const [menuSelect, setMenuSelect] = useState('stats');
    const [selectedItem, setSelectedItem] = useState(null);
    const [buyItem, setBuyItem] = useState(false)
    const [purchasePrice, setPurchasePrice] = useState('')
    const [equipItem,setEquipItem] = useState('')
    const [selectedArmor, setSelectedArmor] = useState(null);
    const [selectedWeapon, setSelectedWeapon] = useState(null);

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

    function getItemImage(item) {
        switch (item) {
            case 'buckler':
                return `${process.env.PUBLIC_URL}/icons/backgroundItemsBucklerDone.png`;
            case 'hyrule':
                return `${process.env.PUBLIC_URL}/icons/backgroundItemsHylianShield.png`;
            case 'machete':
                return `${process.env.PUBLIC_URL}/icons/backgroundItemsMachete.png`;
            case 'katana':
                return `${process.env.PUBLIC_URL}/icons/backgroundItemsKATANADONE.png`;
            default:
                return '';
        }
    }

    function getItemName(item) {
        const itemNames = {
            buckler: 'The Buckler',
            hyrule: 'The Hylian Shield',
            machete: 'The Machete',
            katana: 'Masamune Katana',
        };

        return itemNames[item] || 'Unknown Item';
    }

    // useEffect(() => {
    //     if (!user) {
    //         history.push('/');
    //     }
    // }, [user, history]);
    useEffect(() => {
        if (!user) {
            history.push('/');
        } else {

            setSelectedArmor(user.armor !== 'none' ? user.armor : null);
            setSelectedWeapon(user.weapon !== 'none' ? user.weapon : null);
        }
    }, [user, history]);

    if (!user) {
        return null;
    }
    console.log("🚀 ~ file: index.js:40 ~ Main ~ user.gif:", user.gif)
    console.log('user gif is', user.gif)

    console.log("🚀 ~ file: index.js:72 ~ Main ~ user:", user)
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
                {buyItem && (
                    <PurchaseItem purchasePrice={purchasePrice} setBuyItem={setBuyItem} selectedItem={selectedItem} />
                )}
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
                                {/* <p>{`/icons/avgifs/${user.gif}/${user.gif}-${user.armor}-${user.weapon}.gif`}</p> */}
                                {menuSelect === 'shop' && selectedItem === 'default' ? <img src={`${process.env.PUBLIC_URL}/icons/avgifs/${user.gif}/${user.gif}-${user.armor}-${user.weapon}.gif`} alt="User Gif" /> :
                                    menuSelect === 'shop' && selectedItem === 'buckler' ? <img src={`${process.env.PUBLIC_URL}/icons/avgifs/${user.gif}/${user.gif}-buckler-${user.weapon}.gif`} alt="User Gif" /> :
                                    menuSelect === 'shop' && selectedItem === 'hyrule' ? <img src={`${process.env.PUBLIC_URL}/icons/avgifs/${user.gif}/${user.gif}-hyrule-${user.weapon}.gif`} alt="User Gif" /> :
                                    menuSelect === 'shop' && selectedItem === 'machete' ? <img src={`${process.env.PUBLIC_URL}/icons/avgifs/${user.gif}/${user.gif}-${user.armor}-machete.gif`} alt="User Gif" /> :
                                    menuSelect === 'shop' && selectedItem === 'katana' ? <img src={`${process.env.PUBLIC_URL}/icons/avgifs/${user.gif}/${user.gif}-${user.armor}-katana.gif`} alt="User Gif" /> :

                                    menuSelect==='inventory' && !selectedArmor && !selectedWeapon  ?  <img src={`${process.env.PUBLIC_URL}/icons/avgifs/${user.gif}/${user.gif}-${user.armor}-${user.weapon}.gif`} alt="User Gif" />:



                                    menuSelect==='inventory' && selectedArmor && !selectedWeapon  ?  <img src={`${process.env.PUBLIC_URL}/icons/avgifs/${user.gif}/${user.gif}-${selectedArmor}-${user.weapon}.gif`} alt="User Gif" /> :
                                    menuSelect==='inventory' && !selectedArmor && selectedWeapon  ?  <img src={`${process.env.PUBLIC_URL}/icons/avgifs/${user.gif}/${user.gif}-${user.armor}-${selectedWeapon}.gif`} alt="User Gif" />:
                                    menuSelect==='inventory' && selectedArmor && selectedWeapon  ?  <img src={`${process.env.PUBLIC_URL}/icons/avgifs/${user.gif}/${user.gif}-${selectedArmor}-${selectedWeapon}.gif`} alt="User Gif" />:




                                                <img src={`${process.env.PUBLIC_URL}/icons/avgifs/${user.gif}/${user.gif}-${user.armor}-${user.weapon}.gif`} alt="User Gif" />}
                            </div>
                            {(menuSelect === 'stats' || menuSelect === 'editProfile') && (
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

                            {menuSelect === 'shop' && (
                                <div className='profileInfo'>
                                    <div className='topCenter'>
                                        <table className='purrfect'>
                                            <tbody>
                                                <tr><td>Gold:</td><td>{user.gold}</td></tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className='purchaseText'>
                                        <p>{selectedItem === 'default' ? 'Items Available' :
                                            selectedItem === 'buckler' ? 'Buckler: 5 gold' :
                                                selectedItem === 'hyrule' ? 'Hylian Shield: 25 gold' :
                                                    selectedItem === 'machete' ? 'Machete: 5 gold' :
                                                        selectedItem === 'katana' ? 'Katana: 25 gold' : null}</p>
                                    </div>
                                    <div className='centerDisplay'>


                                    </div>
                                    <div className='bottomSelection'>
                                        <div className='bottomLeft'>
                                            <div className={selectedItem==='default'? 'onehundro': 'bottomLeftPic'}>
                                                {selectedItem === 'buckler' ? <img src={`${process.env.PUBLIC_URL}/icons/backgroundItemsBucklerDone.png`} alt="Buckler" ></img> :
                                                    selectedItem === 'hyrule' ? <img src={`${process.env.PUBLIC_URL}/icons/backgroundItemsHylianShield.png`} alt="Hylian Shield"></img> :
                                                        selectedItem === 'machete' ? <img src={`${process.env.PUBLIC_URL}/icons/backgroundItemsMachete.png`} alt="Machete"></img> :
                                                            selectedItem === 'katana' ? <img src={`${process.env.PUBLIC_URL}/icons/backgroundItemsKATANADONE.png`} alt="Katana"></img> :
                                                                <img src={`${process.env.PUBLIC_URL}/icons/SelectAnItem2.png`} alt="SelectItem" className='bottomLeftPic3'></img>

                                                }
                                            </div>
                                            {selectedItem !== 'default' && (
                                                <div className='bottomLeftButton'>
                                                    <button
                                                        type='button'
                                                        className='menu-item-button9'
                                                        onClick={() => {
                                                            if (
                                                                (selectedItem === 'buckler' || selectedItem === 'machete') &&
                                                                user.gold >= 5
                                                            ) {
                                                                setPurchasePrice(5)
                                                                setBuyItem(true)

                                                            } else if (
                                                                (selectedItem === 'katana' || selectedItem === 'hyrule') &&
                                                                user.gold >= 25
                                                            ) {
                                                                // Add code to open the modal here
                                                                console.log('Open modal for katana or hylian purchase');
                                                            }
                                                        }}
                                                    >
                                                        {selectedItem === 'buckler' || selectedItem === 'machete'
                                                            ? user.gold >= 5
                                                                ? 'Purchase'
                                                                : 'Not enough gold'
                                                            : selectedItem === 'katana' || selectedItem === 'hyrule'
                                                                ? user.gold >= 25
                                                                    ? 'Purchase'
                                                                    : 'Not enough gold'
                                                                : ''}
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                        <div className='bottomRight'>
                                            <div className='right1'>
                                                <div className={`one ${selectedItem === 'buckler' ? 'solid-border' : ''}`} onClick={() =>{
                                                    if (!user.armorInventory.includes('buckler')) {setSelectedItem('buckler')}}}>
                                                    <img src={`${process.env.PUBLIC_URL}/icons/backgroundItemsBucklerDone.png`} alt="Buckler" className={user.armorInventory.includes('buckler')?'blackOut':''}></img>
                                                </div>
                                                <div className={`two ${selectedItem === 'hyrule' ? 'solid-border' : ''}`} onClick={() => {
                                                    if (!user.armorInventory.includes('hyrule')) {
                                                    setSelectedItem('hyrule')}}}>
                                                    <img src={`${process.env.PUBLIC_URL}/icons/backgroundItemsHylianShield.png`} alt="Hylian Shield" className={user.armorInventory.includes('hyrule')?'blackOut':''}></img>
                                                </div>
                                            </div>
                                            <div className='right2'>
                                                <div className={`three ${selectedItem === 'machete' ? 'solid-border' : ''}`} onClick={() => {
                                                    if (!user.weaponInventory.includes('machete')) {

                                                    setSelectedItem('machete')}}}>
                                                    <img src={`${process.env.PUBLIC_URL}/icons/backgroundItemsMachete.png`} alt="Machete" className={user.weaponInventory.includes('machete')?'blackOut':''}></img>
                                                </div>
                                                <div className={`four ${selectedItem === 'katana' ? 'solid-border' : ''}`} onClick={() => {
                                                    if (!user.weaponInventory.includes('katana')) {setSelectedItem('katana')}}}>
                                                    <img src={`${process.env.PUBLIC_URL}/icons/backgroundItemsKATANADONE.png`} alt="Katana" className={user.weaponInventory.includes('katana')?'blackOut':''}></img>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {menuSelect === 'inventory' && (
    <div className='profileInfo inventory'>
          <div className='topcenter'>
    <h3>Armor</h3></div>
<div className='inventory-grid'>

  {Array.from({ length: 3 }, (_, index) => (
    <div key={index} className={selectedArmor===user.armorInventory[index]? 'inventory-item redBordz' : 'inventory-item'}>
      {user.armorInventory[index] ? (
        <>
          <img src={getItemImage(user.armorInventory[index])} alt={user.armorInventory[index]} onClick={() =>

            setSelectedArmor(user.armorInventory[index])} />
          {/* <span>{getItemName(user.inventory[index])}</span> */}
        </>
      ) : (
        <>
          <img src={`${process.env.PUBLIC_URL}/icons/SelectAnItemEmpty.png`} alt={`Placeholder ${index}`} />
          {/* <span>{getItemName(user.inventory[index])}</span> */}
        </>
      )}
    </div>
  ))}
</div>
<div className='topcenter'>
    <h3>Weapons</h3></div>
<div className='inventory-grid'>

  {Array.from({ length: 3 }, (_, index) => (
    <div key={index} className={selectedWeapon===user.weaponInventory[index]? 'inventory-item redBordz' : 'inventory-item'}>
      {user.weaponInventory[index] ? (
        <>
          <img src={getItemImage(user.weaponInventory[index])} alt={user.weaponInventory[index]} onClick={() => setSelectedWeapon(user.weaponInventory[index])}/>
          {/* <span>{getItemName(user.inventory[index])}</span> */}
        </>
      ) : (
        <>
          <img src={`${process.env.PUBLIC_URL}/icons/SelectAnItemEmpty.png`} alt={`Placeholder ${index}`} />
          {/* <span>{getItemName(user.inventory[index])}</span> */}
        </>
      )}
    </div>
  ))}
</div>
<div className='centerButtonz'>
    <button className='menu-item-button9 newHeight' onClick={async()=>{
        await dispatch(ThunkEquip('none','none'))
        setSelectedArmor(null)
        setSelectedWeapon(null)
    }}>Unequip all</button>
 <button className='menu-item-button9 newHeight' onClick={async() => {
    setSelectedArmor(user.armor);
    setSelectedWeapon(user.weapon);
    await dispatch(ThunkEquip(selectedArmor === null ? 'none' : selectedArmor, selectedWeapon === null ? 'none' : selectedWeapon));

}}>Equip Selected</button>

     </div>
    </div>
)}


                                <ProfileMenu menuSelect={menuSelect} setMenuSelect={setMenuSelect} setSelectedItem={setSelectedItem} />
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
