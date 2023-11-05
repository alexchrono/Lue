// constants
const CREATE_HABIT = "habit/CREATE_HABIT";
const EDIT_HABIT = "habit/EDIT_HABIT";
const DELETE_HABIT = "habit/DELETE_HABIT";


const actionCreateHabit = (data) => ({
    type: CREATE_HABIT,
    payload: data,
});
const actionEditHabit = (data) => ({
    type: EDIT_HABIT,
    payload: data,
});

const actionDeleteHabit = (data) => ({
    type: DELETE_HABIT,
    payload: data,
});

// const removeUser = () => ({
// 	type: REMOVE_USER,
// });

const initialState = { byId: {}, allIds: [] };

// export const authenticate = () => async (dispatch) => {
// 	const response = await fetch("/api/auth/", {
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 	});
// 	if (response.ok) {
// 		const data = await response.json();
// 		if (data.errors) {
// 			return;
// 		}

// 		dispatch(setUser(data));
// 	}
// };

// export const login = (email, password) => async (dispatch) => {
// 	const response = await fetch("/api/auth/login", {
// 		method: "POST",
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 		body: JSON.stringify({
// 			email,
// 			password,
// 		}),
// 	});

// 	if (response.ok) {
// 		const data = await response.json();
// 		dispatch(setUser(data));
// 		return null;
// 	} else if (response.status < 500) {
// 		const data = await response.json();
// 		if (data.errors) {
// 			return data.errors;
// 		}
// 	} else {
// 		return ["An error occurred. Please try again."];
// 	}
// };

// export const logout = () => async (dispatch) => {
// 	const response = await fetch("/api/auth/logout", {
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 	});

// 	if (response.ok) {
// 		dispatch(removeUser());
// 	}
// };
function normalizeData(listDict, newItem) {
    const normalized = {};
    let normalizedArray = []

    listDict.forEach((ele) => {
        normalized[ele.id] = ele;
        normalizedArray.push(parseInt(ele.id))
    });

    if (newItem) {
        normalized[newItem.id] = newItem
        normalizedArray.push(parseInt(newItem.id))

    }
    return { 'all_things': normalized, 'all_ids': normalizedArray }
}


export const ThunkDeleteHabit = (targetId) => async (dispatch) => {
    console.log('at least i hit the THUNKDELETEHABIT thunk')
    console.log("🚀 ~ file: habit.js:89 ~ targetIDintheThunk", targetId)
    const response = await fetch("/api/habits/delete-habit", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },

        body: JSON.stringify({targetId:targetId}),
    });

    if (response.ok) {
        const data = await response.json();
        await dispatch(actionDeleteHabit(data));
        return data;
    } else if (response.status < 500) {
        console.log('WE HIT OUR ELSE')
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ["An error occurred. Please try again."];
    }
};
export const ThunkEditHabit = (updatedHabit) => async (dispatch) => {
    console.log('at least i hit the THUNKEDITHABIT thunk')
    console.log("🚀 ~ file: habit.js:89 ~ ThunkEditHabit ~ updatedHabit:", updatedHabit)
    const response = await fetch("/api/habits/edit-habit", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },

        body: JSON.stringify(updatedHabit),
    });

    if (response.ok) {
        const data = await response.json();
        await dispatch(actionEditHabit(data));
        return data;
    } else if (response.status < 500) {
        console.log('WE HIT OUR ELSE')
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ["An error occurred. Please try again."];
    }
};

export const ThunkNewHabit = (habit) => async (dispatch) => {
    console.log('at least i hit the thunk')
    console.log("🚀 ~ file: habit.js:72 ~ ThunkNewHabitINSIDETHUNK ~ habit:", habit)
    const response = await fetch("/api/habits/new-habit", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },

        body: JSON.stringify({ habit: habit }),
    });

    if (response.ok) {
        const data = await response.json();
        const newData = normalizeData(data.all_habits, data.new_habit)
        await dispatch(actionCreateHabit(newData));
        return data;
    } else if (response.status < 500) {
        console.log('WE HIT OUR ELSE')
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ["An error occurred. Please try again."];
    }
};

export default function reducer(state = initialState, action) {
    let newState
    switch (action.type) {
        case CREATE_HABIT:
            newState = { byId: { ...action.payload.all_things }, allIds: [...action.payload.all_ids] }


            return newState;

        case EDIT_HABIT:
            newState = {...state}
            newState.byId[action.payload.id]=action.payload
            return newState

        default:
            return state;
    }
}
