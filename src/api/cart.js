import axios from "../utils/axios";

export function apiAddCart(id) {
    return axios.post(`cart/add`, {
        id: id
    });
}

export function apiGetCart() {
    return axios.get(`cart/all`);
}

export function apiDeleteCart(id) {
    return axios.post(`cart/delete`, {
        id: id
    });
}
export function apiUpdateCart(id, state) {
    return axios.post(`cart/update`, {
        id: id,
        add: state
    });
}
