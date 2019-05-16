import axios from "../utils/axios";

export function apiLogin(user, pwd) {
    return axios.post(`/user/login`, {
        user: user,
        pwd: pwd
    });
}
export function apiRegister(user, pwd) {
    return axios.post(`/user/register`, {
        user: user,
        pwd: pwd
    });
}
export function apiGetUser() {
    return axios.get(`/user/info`);
}

export function apiEditUser(sex, avatar) {
    return axios.post(`user/update`, {
        sex: sex,
        avatar: avatar
    });
}
export function apiLogOut() {
    return axios.post(`user/logout`);
}
