import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from "../views/Home";


Vue.use(VueRouter)
export default new VueRouter({
    routes: [
      {
        path: '/',
        name: 'Login',
        component: Login,
        hidden: true
      },
      {
        path: '/home',
        name: 'Home',
        component: Home,
        hidden: true
      }
    ]
})


