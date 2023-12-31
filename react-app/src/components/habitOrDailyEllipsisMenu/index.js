import { useModal } from "../../context/Modal";
import OpenModalButton from "../OpenModalButton";
import EditDailyModal from "../EditDailyModal";
import EditHabitModal from "../EditHabitModal";
import DeleteHabitOrDaily from "../DeleteHabitOrDaily";
import { useDispatch, useSelector } from "react-redux";
import { ThunkMoveHabit } from "../../store/habit";
import { ThunkMoveDaily } from "../../store/daily";
import './ellipsis.css';

export default function EllipsisMenu({ formType, id, habitOrDaily, setter, array }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch()
    

    return (
        <div className='backGa'>
            <ul className='ellipsa'>
                <li>
                    <OpenModalButton
                        buttonText={<button className="menu-item-button"   >Edit</button>}
                        modalComponent={
                            formType === 'habit'
                                ? <EditHabitModal habitId={id} habit={habitOrDaily} setter={setter} />
                                : <EditDailyModal dailyId={id} daily={habitOrDaily} setter={setter} />
                        }

                    />
                </li>
                <li>
                    <button className="menu-item-button" onClick={async (e) => {
                        if (formType === 'habit') {
                            await dispatch(ThunkMoveHabit({ 'position': 'top', 'habit': habitOrDaily, 'array': array }))
                            setter(null)
                        }
                        if (formType === 'daily') {
                            await dispatch(ThunkMoveDaily({ 'position': 'top', 'daily': habitOrDaily, 'array': array }))
                            setter(null)
                        }

                        // : await dispatch(ThunkMoveDailyBottom(habitOrDaily))
                    }}>To Top</button>
                </li>
                <li>
                    <button className="menu-item-button" onClick={async (e) => {
                        if (formType === 'habit') {
                            await dispatch(ThunkMoveHabit({ 'position': 'bottom', 'habit': habitOrDaily, 'array': array }))
                            setter(null)
                        }
                        if (formType === 'daily') {
                            await dispatch(ThunkMoveDaily({ 'position': 'bottom', 'daily': habitOrDaily, 'array': array }))
                            setter(null)
                        }
                    }
                        // : await dispatch(ThunkMoveDailyBottom(habitOrDaily))
                    }>To Bottom</button>
                </li>
                <li>
                    <OpenModalButton
                        className='canImess'
                        buttonText={<button className="menu-item-button">Delete</button>}
                        modalComponent={
                            formType === 'habit'
                                ? <DeleteHabitOrDaily formType={'habit'} targetId={id} title={habitOrDaily.title} setter={setter} />
                                : <DeleteHabitOrDaily formType={'daily'} targetId={id} title={habitOrDaily.title} setter={setter} />
                        }
                        onClick={() => { return 7 }}
                    />
                </li>
            </ul>
        </div>
    );
}
