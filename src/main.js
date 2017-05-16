// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import alert from '@/components/Alert'
import confirm from '@/components/Confirm'
import VeeValidate from 'vee-validate'
import customRules from '@/validators/validators'
import VueTinymce from 'vue-tinymce'
Vue.use(VueTinymce)
Vue.use(VeeValidate)
//导入vuex状态管理
import store from './store'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<div><App></App><alert ref="alert"></alert><confirm ref="confirm"></confirm></div>',
  components: { App, alert,confirm },
  data: {
    eventHub: new Vue()
  }
})

if(customRules){
  for(let rule of customRules){
    app.$validator.attach(rule.name,rule.rule)
  }
}

