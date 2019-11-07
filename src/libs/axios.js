import axios from 'axios'
import {
    Toast
} from 'vant';
import Vue from 'vue'



axios.defaults.timeout = 300000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// const token = localStorage.getItem('token');
// axios.defaults.headers.post['Authorization'] = 'Bearer '+ token;


// baseURL
export function getLocalbaseURL() {
    if (window.location.host === 'localhost:8080') {
        return 'http://java.ihcenter.turboradio.cn'
    } else if (window.location.host === 'wx.turboradio.cn') {
        return 'http://java.ihcenter.turboradio.cn'
    } else if (window.location.host === 'wx.uniondrug.net') {
        return 'http://java.ihcenter.turboradio.cn'
    } else if (window.location.host === 'wx.uniondrug.cn') {
        return 'http://java.ihcenter.turboradio.cn'
    }

}


//http 相应 拦截器
axios.interceptors.response.use(response => {
    console.log('response',response)
        Vue.$loading.hide();
        if (response.data.errno ==='0') {
            return response;
        } else if (response.data.errno === '401' || response.data.errno === '403') {
            Toast('重新登录');

            // return response;
        }else {
            if (/[a-zA-Z]/.test(response.data.error)) {
                Toast('网络问题，请稍后再试');
            } else {
                Toast(response.data.error);
            }
            // Toast(response.data.error);
            // return response;
        }

    },
    error => {
        return Promise.reject(error)
    }
)

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get(url, params = {}) {
    axios.defaults.baseURL = getLocalbaseURL();
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        })
            .then(response => {
                resolve(response.data.data);
            })
            .catch(err => {
                reject(err)
            })
    })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data) {
    Vue.$loading.show();
    const token = sessionStorage.getItem('token');
    axios.defaults.headers.post['Authorization'] = 'Bearer '+ token;

    axios.defaults.baseURL = getLocalbaseURL();
    return new Promise((resolve, reject) => {
        axios.post(url, data)
            .then(response => {
                resolve(response.data.data);
            }, err => {
                reject(err)
            })
    })
}
/**
 * 封装upload上传文件请求
 * @param url
 * @param files
 * @returns {Promise}
 */
export function upload(url,files) {
    Vue.$loading.show();
    let params = new FormData(); //创建form对象
    params.append("file", files.file); //通过append向form对象添加数据//第一个参数字符串可以填任意命名，第二个根据对象属性来找到file
    let config = {
        headers: { 'Content-Type': 'multipart/form-data' }
    };  //添加请求头
    return new Promise((resolve, reject) => {
        axios.post(getLocalbaseURL() + url, params, config)
            .then(res => {
                resolve(res.data.data)
            },err => {
            reject(err)
        })
    })

}


