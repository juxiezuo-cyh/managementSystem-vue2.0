import Vue from 'vue'
import VueRouter from "vue-router"
import App from './indexApp'
import signUp from './signUp'
import logIn from './logIn'

Vue.use(VueRouter);

const router = new VueRouter({
  // mode: 'history', //加上不好使。出不来
  routes: [
    {
      path: "/",
      redirect: "/signUp"
    },
    {
      path: "/signUp",
      component: signUp
    },
    {
      path: "/logIn",
      component: logIn
    }
  ]
});

new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
