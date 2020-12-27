import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from "../views/Home";
import FriendChat from "../views/chat/FriendChat.vue"
import HrInfo from "../views/HrInfo";


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
        hidden: true,
        meta: {
          roles: ['admin', 'user']
        },
        children:[
            {
              path: '/chat',
              name: '在线聊天',
              component: FriendChat,
              hidden: true
            },
            {
              path: '/hrInfo',
              name: '个人中心',
              component: HrInfo,
              hidden: true
            }
        ]
      },
    ]
})


