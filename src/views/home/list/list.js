import Vue from 'vue'
import VueRouter from "vue-router"
import App from './listApp'
import QA from './QA'
import ST from './ST'
import Edit from './Edit'
Vue.use(VueRouter);

const router = new VueRouter({
  // mode: 'history', //加上不好使。出不来
  routes: [
    {
      path: "/",
      redirect: "/QA"
    },
    {
      path: "/QA",
      component: QA
    },
    {
      path: "/ST",
      component: ST
    },
    {
      path: "/Edit",
      component: Edit
    }
  ]
});

new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
