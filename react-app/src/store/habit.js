// constants
const CREATE_HABIT = "habit/CREATE_HABIT";


const actionCreateHabit = (data) => ({
    type: CREATE_HABIT,
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
    switch (action.type) {
        case CREATE_HABIT:
            let newState = { byId: { ...action.payload.all_things }, allIds: [...action.payload.all_ids] }


            return newState;

        default:
            return state;
    }
}
