import { GET_ALL_USER_REQUEST, GET_ALL_USER_SUCCESS, GET_ALL_USER_ERROR } from "../actions/getAllUsers";

const initialState = {
    loading: false,
    data: null,
    error: null
}

const getLogin = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_USER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_ALL_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload
            }
        case GET_ALL_USER_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export default getLogin;