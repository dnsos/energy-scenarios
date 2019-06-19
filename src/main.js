import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// Vue.mixin for using functions in all components without specific import
Vue.mixin({
  methods: {
    atWalkthroughStep: function (steps) {
      const vm = this
      if (!vm.mode.isWalkthrough) {
        return true // return true if in exploration mode
      } else if (steps.includes(vm.walkthrough.activeStep)) {
        return true // return true if visible at current step
      } else {
        return false // not visible at current step
      }
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
