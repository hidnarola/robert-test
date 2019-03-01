export const HANDLE_MODAL = 'HANDLE_MODAL';
export const HANDLE_PROFILE_MODAL = 'HANDLE_PROFILE_MODAL';
export const RESET_MODAL = 'RESET_MODAL';

export const getModal = (data) => {
    return dispatch => {
        dispatch({
            type: HANDLE_MODAL,
            payload: data
        })
    }
}
export const getProfileModal = (data) => {
    return dispatch => {
        dispatch({
            type: HANDLE_PROFILE_MODAL,
            payload: data
        })
    }
}
export const resetModal = () => {
    return dispatch => {
        dispatch({
            type: RESET_MODAL
        })
    }
}