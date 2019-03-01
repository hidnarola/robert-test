import { GETALLUSERS } from "../../api";
import axios from 'axios';
import { getHeaderWithToken, isUnauthorized, destorySessions } from "../../helpers/func";
import { toast } from "react-toastify";
import history from "../../config/history";
import { routeCodes } from "../../constants/routes";

export const GET_ALL_USER_REQUEST = 'GET_ALL_USER_REQUEST';
export const GET_ALL_USER_SUCCESS = 'GET_ALL_USER_SUCCESS,';
export const GET_ALL_USER_ERROR = 'GET_ALL_USER_ERROR,';

export const getAllUsers = (data) => {
    return dispatch => {
        dispatch({
            type: GET_ALL_USER_REQUEST
        })
        let headers = getHeaderWithToken();
        axios({
            method: 'GET',
            url: GETALLUSERS,
            headers: headers
        })
            .then(function (response) {
                dispatch({
                    type: GET_ALL_USER_SUCCESS,
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
                        type: GET_ALL_USER_ERROR,
                        payload: error && error.response ? error.response.data : ['Something went wrong']
                    })
                }
            })
    }
}