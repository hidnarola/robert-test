import { HANDLE_MODAL, RESET_MODAL, HANDLE_PROFILE_MODAL } from "../actions/handleModal";

const initialState = {
    status: 0,
    profileStatus:0,
    data: null
}

const handleModal = (state = initialState, action) => {
    switch (action.type) {
        case HANDLE_MODAL:
            return {
                ...state,
                status: 1,
                profileStatus: 0,
                data: action.payload
            }
        case HANDLE_PROFILE_MODAL:
            return {
                ...state,
                status: 0,
                profileStatus: 1,
                data: action.payload
            }
        case RESET_MODAL:
            return {
                ...state,
                status: 0,
                profileStatus: 0,
                data: null
            }
        default:
            return state
    }
}

export default handleModal;