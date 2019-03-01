import { EDIT_PROFILE_REQUEST, EDIT_PROFILE_SUCCESS, EDIT_PROFILE_ERROR } from "../actions/updateProfile";

const initialState = {
    ploading: false,
    pdata: null,
    perror: null
}

const editProfile = (state = initialState, action) => {
    switch (action.type) {
        case EDIT_PROFILE_REQUEST:
            return {
                ...state,
                ploading: true
            }
        case EDIT_PROFILE_SUCCESS:
            return {
                ...state,
                ploading: false,
                pdata: action.payload
            }
        case EDIT_PROFILE_ERROR:
            return {
                ...state,
                ploading: false,
                perror: action.payload
            }
        default:
            return state
    }
}

export default editProfile;