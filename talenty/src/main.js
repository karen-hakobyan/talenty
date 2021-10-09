import Vue from 'vue'
import App from './App.vue'
import VSwitch from 'v-switch-case'

Vue.config.productionTip = false
Vue.use(VSwitch)

new Vue({
    render: h => h(App),
}).$mount('#app')
