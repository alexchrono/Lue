// constants
const CREATE_DAILY = "daily/CREATE_DAILY";
const EDIT_DAILY = "daily/EDIT_DAILY";
const DELETE_DAILY = "daily/DELETE_DAILY";
const GET_ALL_DAILIES = 'daily/GET_ALL_DAILIES'
const MOVE_DAILY = 'daily/MOVE_DAILY'



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

const actionMoveDaily = (data) => ({
    type: MOVE_DAILY,
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


function normalizeData(allDailies, newItem) {
    const normalized = {};
    let normalizedArray = []

    allDailies.all_dailies.forEach((ele) => {
        normalized[ele.id] = ele;
        // normalizedArray.push(parseInt(ele.id))
    });

    if (newItem) {
        normalized[newItem.id] = newItem
        // normalizedArray.push(parseInt(newItem.id))

    }
    return { 'all_things': normalized, 'all_ids': allDailies.arrayDailies }
}


export const ThunkMoveDaily = (daily) => async (dispatch) => {
    console.log('inside thunkMoveHabitBottom')



    const response = await fetch(`/api/dailies/move-daily`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },

        body: JSON.stringify(daily),
    });

    if (response.ok) {
        const data = await response.json();
        await dispatch(actionMoveDaily(data));
        return data;
    } else if (response.status < 500) {
        const data = await response.json();
        return data
    } else {
        return ["An error occurred. Please try again."];
    }
};
export const ThunkDeleteDaily = (targetId) => async (dispatch) => {

    targetId=parseInt(targetId)
    const response = await fetch(`/api/dailies/delete-daily/${targetId}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (response.ok) {
        const data = await response.json();
        await dispatch(actionDeleteDaily(data));
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
export const ThunkEditDaily = (updatedDaily) => async (dispatch) => {
    const response = await fetch("/api/dailies/edit-daily", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },

        body: JSON.stringify(updatedDaily),
    });

    if (response.ok) {
        const data = await response.json();
        await dispatch(actionEditDaily(data));
        return data;
    } else if (response.status < 500) {
        const data = await response.json();
        return data
        // if (data.errors) {
        //     return data.errors;
        // }
    } else {
        return ["An error occurred. Please try again."];
    }
};

export const ThunkNewDaily = (daily) => async (dispatch) => {

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
        await dispatch(actionCreateDaily(data));
        return data;
    } else if (response.status < 500) {
        const data = await response.json();
        return data
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
        const newData = normalizeData(data);
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
            let copyOfArray = [...action.payload.newArray]
            newState = { byId: { ...action.payload.dailiesObj }, allIds: copyOfArray }

            // newState.allIds.push(action.payload.id)
            // newState.allIds=newState.allIds.map(id=>parseInt(id))

            return newState;

        case MOVE_DAILY:
            let copyOfArray2 = [...action.payload.newArray]
            newState = { byId: { ...action.payload.dailiesObj }, allIds: copyOfArray2 }

            return newState;


        case EDIT_DAILY:
            newState = { ...state }
            newState.byId[action.payload.id] = action.payload
            let copy1Array = [...newState.allIds]
            newState.allIds = copy1Array
            return newState

        case DELETE_DAILY:
            newState = { ...state }
            let copyArray = [...action.payload.newArray]

            newState = { byId: { ...action.payload.dailiesObj }, allIds: copyArray }

            return newState


        default:
            return state;
    }
}
