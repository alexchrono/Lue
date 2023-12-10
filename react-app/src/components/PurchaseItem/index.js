import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { ThunkPurchase } from "../../store/session";

export default function PurchaseItem({ purchasePrice, setBuyItem, selectedItem }) {
    const [display, setDisplay] = useState(true);
    const dispatch = useDispatch();
    let displayName = "";
    let displayPic = "";

    switch (selectedItem) {
        case 'machete':
            displayName = 'The Machete';
            displayPic = `${process.env.PUBLIC_URL}/icons/backgroundItemsMachete.png`;
            break;
        case 'buckler':
            displayName = 'The Buckler';
            displayPic = `${process.env.PUBLIC_URL}/icons/backgroundItemsBucklerDone.png`;
            break;
        case 'hylian':
            displayName = 'The Hylian Shield';
            displayPic = `${process.env.PUBLIC_URL}/icons/backgroundItemsHylianShield.png`;
            break;
        case 'katana':
            displayName = 'Masamune Katana';
            displayPic = `${process.env.PUBLIC_URL}/icons/backgroundItemsKATANADONE.png`;
            break;
        default:
            displayName = 'Unknown Item';
            displayPic = '';
    }

    return (
        <div className='purchase'>
            {display ? (
                <>
                    <h1>Are you sure you wish to purchase</h1> <h1>{displayName}</h1>
                    <img src={displayPic} className='centerBig' alt="Item"></img>
                    <h2>for {purchasePrice} gold?</h2>
                    <div className='editButtons'>
                        <button className='letsMakePretty' type='button' onClick={() => {

                            setBuyItem(false)
                        }}>
                            &nbsp;Cancel&nbsp;
                        </button>
                        <button className='letsMakePretty' type='button' onClick={async() => {
                            await dispatch(ThunkPurchase(selectedItem,purchasePrice));

                            setDisplay(false) }}>
                            Purchase
                        </button>
                    </div>
                </>
            ) : (
                <>
                <h2>You have successfully purchased your item.</h2>
                <h3>Remember to equip it in your inventory</h3>
                <div className='editButtons'>
                        <button className='letsMakePretty' type='button' onClick={() => {
                            setBuyItem(false)
                        }}>
                            &nbsp;Ok&nbsp;
                        </button>
                        </div>
                </>
            )}
        </div>
    );
}
