import jwt_decode from 'jwt-decode';

export function destorySessions() {
    localStorage.removeItem('token')
}

export function decodeJwtToken(token) {
    let data = jwt_decode(token);
    return data;
}

export function getHeaderWithToken() {
    let token = localStorage.getItem('token');
    let headers = {
        // 'content-type': 'application/json',
        'x-access-token': token
    };
    return headers;
};

export function isLogin() {
    let token = localStorage.getItem('token');
    if (token) {
        return true;
    }
    return false;
}

export function isLoginRole() {
    let token = localStorage.getItem('token');
    if (token) {
        let data = decodeJwtToken(token)
            return data;
        }
        return false;
}

export function isUnauthorized(response) {
    if (response && typeof response.status !== 'undefined' && response.status === 401) {
        return true;
    } else if (typeof response !== 'undefined' && response === 401) {
        return true;
    }
    return false;
}