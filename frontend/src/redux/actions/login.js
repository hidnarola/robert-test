import { LOGIN } from "../../api";
import axios from 'axios';

export const GET_LOGIN_REQUEST = 'GET_LOGIN_REQUEST';
export const GET_LOGIN_SUCCESS = 'GET_LOGIN_SUCCESS,';
export const GET_LOGIN_ERROR = 'GET_LOGIN_ERROR,';

export const getLogin = (data) => {
    return dispatch => {
        dispatch({
            type: GET_LOGIN_REQUEST
        })
        axios({
            method: 'POST',
            url: LOGIN,
            data: data
        })
            .then(function (response) {
                localStorage.setItem('token',response.data.data.data.token);
                dispatch({
                    type: GET_LOGIN_SUCCESS,
                    payload: response.data
                })
            })
            .catch(function (error) {
                dispatch({
                    type: GET_LOGIN_ERROR,
                    payload: error && error.response ? error.response.data : ['Something went wrong']
                })
            })
    }
}