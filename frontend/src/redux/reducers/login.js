import { GET_LOGIN_REQUEST, GET_LOGIN_SUCCESS, GET_LOGIN_ERROR } from "../actions/login";

const initialState = {
    loading: false,
    data: null,
    error: null
}

const getLogin = (state = initialState, action) => {
    switch (action.type) {
        case GET_LOGIN_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload
            }
        case GET_LOGIN_ERROR:
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