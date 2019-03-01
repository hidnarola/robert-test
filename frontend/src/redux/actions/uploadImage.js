import { UPLOADIMAGE } from "../../api";
import axios from 'axios';
import { getHeaderWithToken, isUnauthorized, destorySessions } from "../../helpers/func";
import { toast } from "react-toastify";
import history from "../../config/history";
import { routeCodes } from "../../constants/routes";

export const UPLOAD_IMAGE_REQUEST = 'UPLOAD_IMAGE_REQUEST';
export const UPLOAD_IMAGE_SUCCESS = 'UPLOAD_IMAGE_SUCCESS,';
export const UPLOAD_IMAGE_ERROR = 'UPLOAD_IMAGE_ERROR,';

export const uploadImage = (data) => {
    return dispatch => {
        const promise = new Promise((resolve, reject) => {
            dispatch({
                type: UPLOAD_IMAGE_REQUEST
            })
            let headers = getHeaderWithToken();
            axios({
                method: 'POST',
                url: UPLOADIMAGE,
                headers: headers,
                data: data
            })
                .then(function (response) {
                    console.log('response.data => ', response.data);
                    dispatch({
                        type: UPLOAD_IMAGE_SUCCESS,
                        payload: response.data
                    })
                    resolve(response);
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
                            type: UPLOAD_IMAGE_ERROR,
                            payload: error && error.response ? error.response.data : ['Something went wrong']
                        })
                        reject(error);
                    }
                })
        });
        return promise;
    }
}