import axios from "../utils/axios";

export function apiActionCart(uid, action) {
    return axios.post(`cart/action`, { productId: uid, action });
}
export function apiAddCart(uid) {
    return axios.post(`cart/add`, { productId: uid });
}
export function apiCutCart(uid) {
    return axios.post(`cart/cut`, { productId: uid });
}
export function apiDeleteCart(uid) {
    return axios.post(`cart/delete`, { productId: uid });
}

export function apiGetCart() {
    return axios.get(`cart/all`);
}
