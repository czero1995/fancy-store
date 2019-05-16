import axios from "../utils/axios";

export function apiGetQiNiuToken() {
    return axios.post("token/qiniu");
}
