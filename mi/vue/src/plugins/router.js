import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Home from '../pages/Home.vue'
import Login from '../pages/Login.vue'
import Reg from '../pages/Reg.vue'
import User from '../pages/User.vue'
import Follow from '../pages/Follow.vue'
import Column from '../pages/Column.vue'
import Detail from '../pages/Detail.vue'
import ShopCart from '../pages/ShopCart.vue'
import News from '../pages/News.vue'
import Class from '../pages/Class.vue'
import NoPage from '../pages/NoPage.vue'
let routes = [
    { path: '/home', component: Home },
    { path: '/login', component: Login },
    { path: '/reg', component: Reg },
    { path: '/user', component: User },
    { path: '/detail/:_id', component: Detail ,name:'detail'},
    { path: '/follow', component: Follow },
    { path: '/column', component: Column },
    { path: '/shopcart', component: ShopCart },
    { path: '/news', component: News},
    { path: '/class', component: Class},
    { path: '/', redirect: '/home'},
    { path: '*', component: NoPage },

    

]

let router = new VueRouter({
    mode:'history',
    routes
})

export default router