import { EDITPROFILE } from "../../api";
import axios from 'axios';
import { getHeaderWithToken, isUnauthorized, destorySessions } from "../../helpers/func";
import { toast } from "react-toastify";
import history from "../../config/history";
import { routeCodes } from "../../constants/routes";

export const EDIT_PROFILE_REQUEST = 'EDIT_PROFILE_REQUEST';
export const EDIT_PROFILE_SUCCESS = 'EDIT_PROFILE_SUCCESS,';
export const EDIT_PROFILE_ERROR = 'EDIT_PROFILE_ERROR,';

export const editProfile = (data) => {
    return dispatch => {
        dispatch({
            type: EDIT_PROFILE_REQUEST
        })
        let headers = getHeaderWithToken();
        axios({
            method: 'POST',
            url: EDITPROFILE,
            headers: headers,
            data: data
        })
            .then(function (response) {
                dispatch({
                    type: EDIT_PROFILE_SUCCESS,
                    payload: response.data
                })
            })
            .catch(function (error) {
                console.log('error.response.data => ', error.response.data);
                let isUnauth = isUnauthorized(error.response);
                if (isUnauth) {
                    destorySessions();
                    toast.error('Session expired. Please login again');
                    history.push(routeCodes.HOME);
                } else {
                    dispatch({
                        type: EDIT_PROFILE_ERROR,
                        payload: error && error.response && error.response.data ? error.response.data.error : ['Something went wrong']
                    })
                }
            })
    }
}