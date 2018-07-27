import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        token: null,     // 前台和后台共用
        uid: null,       // 前台和后台共用
        type: null,      // 后台参数
        syscode: null,   // 后台参数
        roleNo: '',      // 用户角色编号
        account: ''           // 账号名称
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
        },
        setUid(state, uid) {
            state.uid = uid;
        },
        setType(state, type) {
            state.type = type;
        },
        setSyscode(state, syscode) {
            state.syscode = syscode;
        },
        setRoleNo(state, roleNo) {
            state.roleNo = roleNo;
        },
        setAccount(state, account) {
            state.account = account;
        }
    },
    actions: {

    },
    modules: {
    }
});

export default store;