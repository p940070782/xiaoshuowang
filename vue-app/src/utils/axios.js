import axios from "axios";
let AUTH_TOKEN = "";

// axios.defaults.baseURL = "http://localhost:1906/"; // 基路径   
axios.defaults.headers.common['token'] = AUTH_TOKEN; // token 
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
import {
    Toast
} from "vant";

function fail(msg) {
    Toast.clear();
    Toast({
        message: msg,
        icon: 'cross',
        duration: 800
    });
}


import router from "@/router"

// 拦截器配置    Interceptors 
// 发送请求之前 添加拦截器  
axios.interceptors.request.use(function (config) {
    // 发送之前做的事情 

    if (sessionStorage.userInfo) {
        AUTH_TOKEN = JSON.parse(sessionStorage.userInfo).token;
    }
    config.headers['token'] = AUTH_TOKEN;
    console.log(config);
    Toast.loading({
        message: '加载中...',
        duration: 10000
    });

    return config;
}, function (error) {
    // 发送失败 做的失败 
    fail('请求-未知错误');
    return Promise.reject(error);
});

// 响应数据 的拦截器 
axios.interceptors.response.use(function (response) {
    // 成功接收到数据 
    console.log(response);
    setTimeout(() => {
        Toast.clear();
        Toast.success({
            message: response.data.msg,
            duration: 400
        });
        if (response.data.code == "500") {
            router.push({
                name: "login",
                query: {
                    active: 1
                }
            })
        }
    }, 800)
    return response;
}, function (error) {
    fail('响应-未知错误')
    // 无法接收到数据  
    return Promise.reject(error);
});



export default axios;