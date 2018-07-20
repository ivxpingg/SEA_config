/**
 * axios组件自己定义封装，增加基础配置、请求前、后拦截器处理。
 * @return axios对象
 * */

import axios from 'axios';
import utils from '../utils';
import Config from './config';
import Cookie from '../helpers/cookies';
import iView from 'iview';

const ajaxUrl = window.location.origin + Config[Config.env].ajaxUrl;

function setContentTypeIfUnset(headers, value) {
    if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
        headers['Content-Type'] = value;
    }
}

axios.defaults.withCredentials=true;

var Ajax = axios.create({
    baseURL: ajaxUrl,
    timeout: 30000,
    transformRequest: [function transformRequest(data, headers) {
        /* 把类似content-type这种改成Content-Type */
        let keys = Object.keys(headers);
        let normalizedName = 'Content-Type';
        keys.forEach(name => {
            if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
                headers[normalizedName] = headers[name];
                delete headers[name];
            }
        });
        if (utils.isFormData(data) ||
            utils.isArrayBuffer(data) ||
            utils.isStream(data) ||
            utils.isFile(data) ||
            utils.isBlob(data)
        ) {
            return data;
        }
        if (utils.isURLSearchParams(data)) {
            setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
            return data.toString();
        }
        /* 这里是重点，其他的其实可以照着axios的源码抄 */
        /* 这里就是用来解决POST提交json数据的时候是直接把整个json放在request payload中提交过去的情况
         * 这里简单处理下，把 {name: 'admin', pwd: 123}这种转换成name=admin&pwd=123就可以通过
         * x-www-form-urlencoded这种方式提交
         * */
        if (utils.isObject(data)) {
            setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
            let keys2 = Object.keys(data);
            /* 这里就是把json变成url形式，并进行encode */
            return encodeURI(keys2.map(name => `${name}=${data[name]}`).join('&'));
        }
        return data;
    }]
});


//ajax请求前拦截器
Ajax.interceptors.request.use(function (config) {

    if (config.iLoading) {
        iView.Spin.show();
    }

    return config;
}, function (error) {
    return Promise.reject(error);
});
//ajax响应后拦截器
Ajax.interceptors.response.use(function (response) {
    if (response.config.iLoading) {
        iView.Spin.hide();
    }

    if (response.data.errCode === 'A0024') {
        iView.Modal.info({
            title: '提示',
            content: '您还未登录请先登陆！',
            okText: '登陆',
            onOk() {
                if (window.location.href.indexOf('/manage') > 0) {
                    window.location.href = 'http://218.5.80.6:8091/OCEANAM/logout';
                }
                else {
                    var url = "http://218.5.80.6:8070/OCEAN/api/login?url=" + window.location.href.replace('#', '\%23');
                    window.location.href = url;
                }
            }
        });
    }


    if (response.data.errCode === 'A0002') {
        var path = Config[Config.env].path;
        Cookie.write('uid', '', Date.now() - (86400000 * 7), path);
        Cookie.write('token', '', Date.now() - (86400000 * 7), path);
        Cookie.write('usertype', '', Date.now() - (86400000 * 7), path);
        Cookie.write('type', '', Date.now() - (86400000 * 7), path);
        Cookie.write('syscode', '', Date.now() - (86400000 * 7), path);

        iView.Modal.info({
            title: '提示',
            content: '会话过期请重新登陆！',
            okText: '登陆',
            onOk() {
                if (window.location.href.indexOf('/manage') > 0) {
                    window.location.href = 'http://218.5.80.6:8091/OCEANAM/logout';
                }
                else {
                    var url = "http://218.5.80.6:8070/OCEAN/api/login?url=" + window.location.href.replace('#', '\%23');
                    window.location.href = url;
                }
            }
        });
    }

    // if(response.data.errCode === "A0002") {
    //
    //     let router = new VueRouter();
    //     Cookie.unset('xmgd');
    //     Cookie.unset('xmgdname');
    //     Cookie.unset('logintime');
    //     router.push('/');
    //
    // }

    return response.data;
}, function (error) {
    if (error.config.iLoading) {
        iView.Spin.hide();
    }
    return Promise.reject(error);
});

export default Ajax;