import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from "../views/Home";
import Test1 from "../views/Test1";
import Test2 from "../views/Test2";


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
      }, {
          path: '/home',
          name: '导航一',
          component: Home,
          children: [
            {
              path: '/test1',
              name: '选项1',
              component: Test1
            },
            {
              path: '/test2',
              name: '选项2',
              component: Test2
            }
          ]
        }
    ]
})


