import axios from "axios";
import { Toast } from "vant";
import store from "../store";
const http = axios.create({
    baseURL: process.env.NODE_ENV == "development" ? "" : "https://www.fancystore.cn/api/",
    timeout: 20000 // request timeout
});
// http request 拦截器
http.interceptors.request.use(
    config => {
        config.headers["sessionId"] = localStorage.getItem("sessionId");
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// http response 拦截器
http.interceptors.response.use(
    response => {
        const status = response.status;
        let msg = "";
        if (status < 200 || status >= 300) {
            // 处理http错误，抛到业务代码
            msg = showStatus(status);
            if (typeof response.data === "string") {
                response.data = { msg };
            } else {
                response.data.msg = msg;
            }
        }
        if (response.data.code == -1) {
            store.commit("SET_RESET");
            Toast({
                message: response.data.msg,
                position: "bottom"
            });
        }
        return response;
    },
    error => {
        Toast({
            message: `${error.response.status}:${error.response.data}`,
            position: "bottom"
        });
        error.data = {};
        error.data.msg = "请求超时或服务器异常，请检查网络或联系管理员！";
        return Promise.reject(error);
    }
);

export default http;

// 根据不同的状态码，生成不同的提示信息
const showStatus = status => {
    let message = "";
    // 这一坨代码可以使用策略模式进行优化
    switch (status) {
        case 400:
            message = "请求错误(400)";
            break;
        case 401:
            message = "未授权，请重新登录(401)";
            break;
        case 403:
            message = "拒绝访问(403)";
            break;
        case 404:
            message = "请求出错(404)";
            break;
        case 408:
            message = "请求超时(408)";
            break;
        case 500:
            message = "服务器错误(500)";
            break;
        case 501:
            message = "服务未实现(501)";
            break;
        case 502:
            message = "网络错误(502)";
            break;
        case 503:
            message = "服务不可用(503)";
            break;
        case 504:
            message = "网络超时(504)";
            break;
        case 505:
            message = "HTTP版本不受支持(505)";
            break;
        default:
            message = `连接出错(${status})!`;
    }
    return `${message}，请检查网络或联系管理员！`;
};
