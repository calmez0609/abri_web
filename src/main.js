import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { date,currency } from './methods/filters';
import $httpMessageState from '@/methods/pushMessageState.js';
import VeeValidate from 'vee-validate';
import { required, alpha } from 'vee-validate'


    const app = createApp(App)
    app.config.globalProperties.$filters = {
    date,currency
    };
    app.config.globalProperties.$httpMessageState = $httpMessageState;

    app.use(VueAxios,axios)
    app.use(router)
    app.use(VeeValidate);
   // app.component('Loading',Loading)
    app.mount('#app')