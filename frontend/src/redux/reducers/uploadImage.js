import { UPLOAD_IMAGE_REQUEST, UPLOAD_IMAGE_SUCCESS, UPLOAD_IMAGE_ERROR } from "../actions/uploadImage";

const initialState = {
    iloading: false,
    idata: null,
    ierror: null
}

const uploadImage = (state = initialState, action) => {
    switch (action.type) {
        case UPLOAD_IMAGE_REQUEST:
            return {
                ...state,
                iloading: true
            }
        case UPLOAD_IMAGE_SUCCESS:
            return {
                ...state,
                iloading: false,
                idata: action.payload
            }
        case UPLOAD_IMAGE_ERROR:
            return {
                ...state,
                iloading: false,
                ierror: action.payload
            }
        default:
            return state
    }
}

export default uploadImage;