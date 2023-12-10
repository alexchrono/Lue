// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const SET_HEALTH_OR_EXP = 'session/SET_HEALTH_OR_EXP'
const EDIT_NEW_USER = 'session/EDIT_NEW_USER'
const PURCHASE_ITEM = 'session/PURCHASE_ITEM'

const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

const removeUser = () => ({
	type: REMOVE_USER,
});

const actionPurchase = (data) => ({
	type: PURCHASE_ITEM,
	payload: data,
});

const actionEditHealthOrExp = (data) => ({
	type: SET_HEALTH_OR_EXP,
	payload: data,
});
const actionEditNewUser = (data) => ({
	type: EDIT_NEW_USER,
	payload: data,
});



const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUser(data));
	}
};

export const login = (email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const logout = () => async (dispatch) => {
	const response = await fetch("/api/auth/logout", {
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		dispatch(removeUser());
	}
};

export const ThunkEditNewUser = () => async (dispatch) => {


    const response = await fetch("/api/auth/edit-new-user", {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
        },


    });

    if (response.ok) {
        const data = await response.json();
        await dispatch(actionEditNewUser(data));
        return data;
    } else if (response.status < 500) {
        const data = await response.json();
        return data
    } else {
        return ["An error occurred. Please try again."];
    }
};

export const ThunkPurchase = (selectedItem,purchasePrice) => async (dispatch) => {
    const response = await fetch("/api/auth/purchaseItem", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },

        body: JSON.stringify({item:selectedItem,price:purchasePrice}),
    });

    if (response.ok) {
        const data = await response.json();

        await dispatch(actionPurchase(data.current_user));
        return data;
    } else if (response.status < 500) {
        const data = await response.json();
        return data
    } else {
        return ["An error occurred. Please try again."];
    }
};


export const ThunkEditHealth = (healthOrExp,clickedStuff,key) => async (dispatch) => {
    const response = await fetch("/api/auth/edit-health-or-exp", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },

        body: JSON.stringify({healthOrExp:healthOrExp,clickedStuff:clickedStuff,key:key}),
    });

    if (response.ok) {
        const data = await response.json();

        await dispatch(actionEditHealthOrExp(data.current_user));
        return data;
    } else if (response.status < 500) {
        const data = await response.json();
        return data
    } else {
        return ["An error occurred. Please try again."];
    }
};

export const signUp = (formData) => async (dispatch) => {
	const response = await fetch("/api/auth/signup", {
		method: "POST",

		body: formData,
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {

		const data = await response.json();
		return data
	} else {
		return ["An error occurred. Please try again."];
	}
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_USER:
			return { user: action.payload };
		case SET_HEALTH_OR_EXP:
			return {user: action.payload}
		case EDIT_NEW_USER:
			return {user: action.payload}
		case PURCHASE_ITEM:
			return {user: action.payload}

		case REMOVE_USER:
			return { user: null };
		default:
			return state;
	}
}
