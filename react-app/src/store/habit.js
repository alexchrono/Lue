// constants
const CREATE_HABIT = "habit/CREATE_HABIT";


const actionCreateHabit = (data) => ({
    type: CREATE_HABIT,
    payload: data,
});

// const removeUser = () => ({
// 	type: REMOVE_USER,
// });

const initialState = {byId:{},allIds:[]};

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
        console.log("🚀 ~ file: habit.js:85 ~ ThunkNewHabit ~ data:", data)
        data.upd_habit_list=[...Object.keys(data.all_habits),data.new_habit.id.toString()]
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

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_HABIT:
            let newState = { byId: {...action.payload.all_habits},allIds:[...action.payload.upd_habit_list]}
            newState.byId[action.payload.new_habit.id]=action.payload.new_habit

            return newState;
        // case REMOVE_USER:
        // 	return { user: null };
        default:
            return state;
    }
}
