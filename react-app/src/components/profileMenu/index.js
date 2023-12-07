import { useModal } from "../../context/Modal";
import OpenModalButton from "../OpenModalButton";
import EditDailyModal from "../EditDailyModal";
import EditHabitModal from "../EditHabitModal";
import DeleteHabitOrDaily from "../DeleteHabitOrDaily";
import { useDispatch, useSelector } from "react-redux";
import { ThunkMoveHabit } from "../../store/habit";
import { ThunkMoveDaily } from "../../store/daily";
// import './ellipsis.css';

export default function ProfileMenu({ }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch()


    return (
        <div className='backGa9'>
            <ul className='ellipsu'>
                <li>
                    <OpenModalButton
                        buttonText={<button className="menu-item-button9"   >Edit Profile</button>}
                        // modalComponent={
                        //     formType === 'habit'
                        //         ? <EditHabitModal habitId={id} habit={habitOrDaily} setter={setter} />
                        //         : <EditDailyModal dailyId={id} daily={habitOrDaily} setter={setter} />
                        // }

                    />
                </li>
                <li>
                    <OpenModalButton
                        buttonText={<button className="menu-item-button9"   >Shop</button>}
                        // modalComponent={
                        //     formType === 'habit'
                        //         ? <EditHabitModal habitId={id} habit={habitOrDaily} setter={setter} />
                        //         : <EditDailyModal dailyId={id} daily={habitOrDaily} setter={setter} />
                        // }

                    />
                </li>
                <li>
                    <OpenModalButton
                        buttonText={<button className="menu-item-button9"   >Inventory</button>}
                        // modalComponent={
                        //     formType === 'habit'
                        //         ? <EditHabitModal habitId={id} habit={habitOrDaily} setter={setter} />
                        //         : <EditDailyModal dailyId={id} daily={habitOrDaily} setter={setter} />
                        // }

                    />
                </li>


            </ul>
        </div>
    );
}
