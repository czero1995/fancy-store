import axios from "../utils/axios";

export function apiLogin(user, pwd) {
    return axios.post(`/user/login`, { user, pwd });
}

export function apiRegister(user, pwd) {
    return axios.post(`/user/register`, { user, pwd });
}

export function apiGetUser() {
    return axios.get(`/user/info`);
}

export function apiEditUser(params) {
    return axios.post(`user/update`, {
        params: params
    });
}

export function apiLogOut() {
    return axios.post(`user/logout`);
}
