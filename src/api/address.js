import axios from "../utils/axios";

export function apiAddAddress(paramsInfo) {
    return axios.post(`address/add`, { ...paramsInfo });
}

export function apiUpdateAddress(addressInfo, uid) {
    return axios.post(`address/update`, { params: { ...addressInfo }, uid });
}

export function apiGetAddress() {
    return axios.get(`address/all`);
}

export function apiDeleteAddress(uid) {
    return axios.post(`address/delete`, { uid });
}
