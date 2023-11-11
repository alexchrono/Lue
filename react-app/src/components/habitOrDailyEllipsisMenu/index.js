import { useModal } from "../../context/Modal";
import OpenModalButton from "../OpenModalButton";
import EditDailyModal from "../EditDailyModal";
import EditHabitModal from "../EditHabitModal";
import DeleteHabitOrDaily from "../DeleteHabitOrDaily";
import './ellipsis.css';

export default function EllipsisMenu({ formType, id, habitOrDaily,setter }) {
    const { closeModal } = useModal();

    return (
        <div className='backGa'>
            <ul className='ellipsa'>
                <li>
                    <OpenModalButton
                        buttonText={<button className="menu-item-button"   >Edit</button>}
                        modalComponent={
                            formType === 'habit'
                                ? <EditHabitModal habitId={id} habit={habitOrDaily} setter={setter} />
                                : <EditDailyModal dailyId={id} daily={habitOrDaily} setter={setter}/>
                        }

                    />
                </li>
                <li>
                    <button className="menu-item-button">To Top</button>
                </li>
                <li>
                    <button className="menu-item-button">To Bottom</button>
                </li>
                <li>
                    <OpenModalButton
                    className='canImess'
                        buttonText={<button className="menu-item-button">Delete</button>}
                        modalComponent={
                            formType === 'habit'
                                ? <DeleteHabitOrDaily formType={'habit'} targetId={id} title={habitOrDaily.title} />
                                : <DeleteHabitOrDaily formType={'daily'} targetId={id} title={habitOrDaily.title} />
                        }
                        onClick={() => {return 7}}
                    />
                </li>
            </ul>
        </div>
    );
}
