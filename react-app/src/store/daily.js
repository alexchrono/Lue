// constants
const CREATE_DAILY = "daily/CREATE_DAILY";
const EDIT_DAILY = "daily/EDIT_DAILY";
const DELETE_DAILY = "daily/DELETE_DAILY";
const GET_ALL_DAILIES = 'daily/GET_ALL_DAILIES'



const actionGetAllDailies = (data) => ({
    type: GET_ALL_DAILIES,
    payload: data,
});

const actionCreateDaily = (data) => ({
    type: CREATE_DAILY,
    payload: data,
});
const actionEditDaily = (data) => ({
    type: EDIT_DAILY,
    payload: data,
});

const actionDeleteDaily = (data) => ({
    type: DELETE_DAILY,
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


export const ThunkDeleteDaily = (targetId) => async (dispatch) => {
    console.log('at least i hit the THUNKDELETEHABIT thunk')
    console.log("🚀 ~ file: habit.js:89 ~ targetIDintheThunk", targetId)
    const response = await fetch("/api/dailies/delete-daily", {
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
        await dispatch(actionDeleteDaily(data.targetDeletion));
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
export const ThunkEditDaily = (updatedDaily) => async (dispatch) => {
    console.log('at least i hit the THUNKEDITHABIT thunk')
    console.log("🚀 ~ file: habit.js:89 ~ ThunkEditHabit ~ updatedHabit:", updatedDaily)
    const response = await fetch("/api/dailies/edit-daily", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },

        body: JSON.stringify(updatedDaily),
    });

    if (response.ok) {
        console.log('RESPONSE IS OK SO WE BACK IN THUNK')
        const data = await response.json();
        console.log('DATA BACK IN OUR THUNK IS',data)
        await dispatch(actionEditDaily(data));
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

export const ThunkNewDaily = (daily) => async (dispatch) => {
    console.log('at least i hit the thunk for new ddailies')

    const response = await fetch("/api/dailies/new-daily", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },

        body: JSON.stringify({ daily: daily }),
    });

    if (response.ok) {
        const data = await response.json();
        // const newData = normalizeData(data.all_habits, data.new_habit)
        console.log('***************data going to action in create is',data)
        await dispatch(actionCreateDaily(data));
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

export const ThunkGetAllDailies = () => async (dispatch) => {
    const response = await fetch("/api/dailies/get-all-users-dailies", {
      method: "GET"
    });

    if (response.ok) {
      const data = await response.json();
      const newData = normalizeData(data.all_dailies);
      await dispatch(actionGetAllDailies(newData));
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
        case GET_ALL_DAILIES:
            newState = { byId: { ...action.payload.all_things }, allIds: [...action.payload.all_ids] }
            return newState

        case CREATE_DAILY:
            let copyOfArray=[...state.allIds]
            copyOfArray.push(action.payload.id)
            newState = { byId: { ...state.byId }, allIds: copyOfArray }

            newState.byId[action.payload.id]=action.payload

            // newState.allIds.push(action.payload.id)
            // newState.allIds=newState.allIds.map(id=>parseInt(id))

            return newState;


        case EDIT_DAILY:
            newState = {...state}
            newState.byId[action.payload.id]=action.payload
            let copy1Array=[...newState.allIds]
            newState.allIds=copy1Array
            return newState

        case DELETE_DAILY:
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
