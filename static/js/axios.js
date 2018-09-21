import axios from 'axios'

const http = axios.create()
// http request 拦截器
// 每次请求都为http头增加Authorization字段，其内容为Token
http.interceptors.request.use(
    config => {
        // 修改请求头为表单请求
        config.transformRequest = [function (data) {
            // Do whatever you want to transform the data
            let ret = ''
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
        }],
            console.warn('config', config)
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// http response 拦截器
http.interceptors.response.use(response => {
    console.log('response', response)
    return response
}, error => {
    return Promise.reject(error)
})

export default http
