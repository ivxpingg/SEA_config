import Vue from 'vue'
import Ajax from './libs/ajax/ajax';
import App from './App.vue'
import iView from 'iview';
import '@/style/app.scss';
import 'iview/dist/styles/iview.css';
import './libs/iconfont/iconfont.css';
import {router} from './router/index';
import store from './store/store';
import Cookie from './libs/helpers/cookies';

Vue.config.productionTip = false;
Vue.prototype.$http = Ajax;
Vue.use(iView);

new Vue({
    router: router,
    store: store,
    render: h => h(App),
    created() {

    },
    beforeMount() {
        this.$store.commit('setToken', Cookie.read('token'));
        this.$store.commit('setUid', Cookie.read('uid'));
        this.$store.commit('setType', Cookie.read('type'));
        this.$store.commit('setSyscode', Cookie.read('syscode'));

        this.$store.commit('setRoleNo',  Cookie.read('roleNo'));
        this.$store.commit('setAccount',  Cookie.read('account'));
    },
    methods: {

    }
}).$mount('#app')
