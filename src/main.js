import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import 'amfe-flexible/index'

import './assets/css/public.css'
import './assets/css/czsty.css' //重置选框组件默认样式
import './assets/css/project.css' //重置project中vant默认样式
import './assets/css/question.css' //重置question中vant默认样式
import './assets/css/ability.css' //重置ability中vant默认样式
import './assets/css/phone.css' //重置phone中vant的默认样式
import './assets/css/font.css'//icon图标支持文件
import api from './assets/common/api';
import func from './assets/common/function';
import Topphoto from './views/signup/Topphoto.vue'
import {
  Toast, Field, Button, Popup, Area, DatetimePicker, Radio, RadioGroup, Checkbox, CheckboxGroup,Icon 
} from 'vant';

Vue.use(func);
Vue.use(Topphoto);
Vue.use(Toast)
    .use(Field)
    .use(Button)
    .use(Popup)
    .use(Area)
    .use(DatetimePicker)
    .use(Radio)
    .use(RadioGroup)
    .use(Checkbox)
    .use(CheckboxGroup)
	.use(Icon);
Vue.prototype.api = api;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
