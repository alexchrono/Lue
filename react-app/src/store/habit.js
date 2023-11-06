// constants
const CREATE_HABIT = "habit/CREATE_HABIT";
const EDIT_HABIT = "habit/EDIT_HABIT";
const DELETE_HABIT = "habit/DELETE_HABIT";
const GET_ALL_HABITS = 'habit/GET_ALL_HABITS'



const actionGetAllHabits = (data) => ({
    type: GET_ALL_HABITS,
    payload: data,
});

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
        console.log('**************RESPONSE WAS OK AND WE GOT DATA BVACK',data)
        console.log("🚀 ~ file: habit.js:121 ~ ThunkDeleteHabit ~ data:", data)
        console.log("🚀 ~ file: habit.js:122 ~ ThunkDeleteHabit ~ data.targetDeletion:", data.targetDeletion)
        await dispatch(actionDeleteHabit(data.targetDeletion));
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
        // const newData = normalizeData(data.all_habits, data.new_habit)
        console.log('***************data going to action in create is',data)
        await dispatch(actionCreateHabit(data));
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

export const ThunkGetAllHabits = () => async (dispatch) => {
    const response = await fetch("/api/habits/get-all-users-habits", {
      method: "GET"
    });

    if (response.ok) {
      const data = await response.json();
      const newData = normalizeData(data.all_habits, data.new_habit);
      await dispatch(actionGetAllHabits(newData));
      return data;
    } else if (response.status < 500) {
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
        case GET_ALL_HABITS:
            newState = { byId: { ...action.payload.all_things }, allIds: [...action.payload.all_ids] }
            return newState

        case CREATE_HABIT:
            let copyOfArray=[...state.allIds]
            copyOfArray.push(action.payload.id)
            newState = { byId: { ...state.byId }, allIds: copyOfArray }

            newState.byId[action.payload.id]=action.payload

            
            // newState.allIds.push(action.payload.id)
            // newState.allIds=newState.allIds.map(id=>parseInt(id))

            return newState;


        case EDIT_HABIT:
            newState = {...state}
            newState.byId[action.payload.id]=action.payload
            return newState

        case DELETE_HABIT:
            newState = {...state}
            delete newState.byId[action.payload]
            let copyArray=[...newState.allIds]
            let returnArray=copyArray.filter((ele)=>ele !==action.payload)
            newState.allIds=returnArray
            return newState


        default:
            return state;
    }
}
