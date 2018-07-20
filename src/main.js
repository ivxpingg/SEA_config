import Vue from 'vue'
import Ajax from './libs/ajax/ajax';
import App from './App.vue'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import {router} from './router/index';
import store from './store/store';

Vue.config.productionTip = false;
Vue.prototype.$http = Ajax;
Vue.use(iView);


new Vue({
    router: router,
    store: store,
    render: h => h(App)
}).$mount('#app')
