import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import routers from './router';
import Config from '../libs/ajax/config';
import Cookie from '../libs/helpers/cookies';

import Ajax from '../libs/ajax/ajax';

Vue.use(VueRouter);

const Title = function(title) {
    title = title ? title + '' : '';
    window.document.title = title;
};

// 路由配置
const RouterConfig = {
    // mode: 'history',
    routes: routers
};

export const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    Title(to.meta.title, router.app);

    if (to.query.token !== undefined) {
        // 登陆有效期2个小时
        var addTimes = 2 * 60 * 60 * 1000;
        var path = Config[Config.env].path;
        Cookie.write('token', to.query.token, new Date().getTime() + addTimes, path);       // 前台&后台

        if(to.query.uid !== undefined) {
            Cookie.write('uid', to.query.uid, new Date().getTime() + addTimes, path);           // 前台&后台
        }
        else {
            Cookie.remove('uid');
        }

        if(to.query.usertype !== undefined) {
            Cookie.write('type', '', new Date().getTime() - addTimes, path);
            Cookie.write('usertype', to.query.usertype, new Date().getTime() + addTimes, path); // 前台
        }
        else {
            Cookie.remove('usertype');
        }

        if(to.query.type !== undefined) {
            Cookie.write('usertype', '', new Date().getTime() - addTimes, path);
            Cookie.write('type', to.query.type, new Date().getTime() + addTimes, path);      // 后台
        }
        else {
            Cookie.remove('type');
        }

        if(to.query.syscode !== undefined) {
            Cookie.write('syscode', to.query.syscode, new Date().getTime() + addTimes, path);// 后台
        }
        else {
            Cookie.remove('syscode');
        }


        // 获取用户信息
        new Promise((resolve => {
            Ajax({
                method: 'get',
                url: '/auth/getUserInfoById',
                params: {
                    type: to.query.type,
                    uid: to.query.uid,
                    token: to.query.token
                }
            }).then(function(response) {
                if(response.status === 1) {
                    Cookie.write('roleNo', response.result.roleNo, new Date().getTime() + addTimes, path);
                    Cookie.write('account', response.result.account, new Date().getTime() + addTimes, path);
                }
                resolve(1);

            }).catch(function (e) {

            })
        })).then(function () {

            next({
                path: to.path
            });
        }).catch(function () {
            
        })


    }
    else if (to.meta.requireAuth && Cookie.read('token') == null) {

        window.location.href = 'http://218.5.80.6:8091/OCEANAM/logout';

    }
    else {
        next();
    }
});

router.afterEach(() => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});

