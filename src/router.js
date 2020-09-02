// 引入路由
import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import Login from './pages/Login'

import {checktoken} from '@/api/apis'

var router = new VueRouter({
    routes: [{
            path: '/',
            name: 'default',
            component: Login
        },
        {
            path: '/main',
            name: 'main',
            component: () => import('./pages/Main'),
            children: [{
                    path: '/main/index',
                    name: 'index',
                    component: () => import('./pages/main/Index'),
                    meta:{breadlist:["首页"]}
                },
                {
                    path: '/main/ordermanagr',
                    name: 'ordermanagr',
                    component: () => import('./pages/main/OrderManage'),
                    meta:{breadlist:["订单管理"]}
                },
                {
                    path: '/main/storemanage',
                    name: 'storemanage',
                    component: () => import('./pages/main/StoreManage'),
                    meta:{breadlist:["店铺管理"]}
                },
                {
                    path: '/main/productlist',
                    name: 'productlist',
                    component: () => import('./pages/main/ProductList'),
                    meta:{breadlist:["商品管理","商品列表"]}
                },
                {
                    path: '/main/addproduct',
                    name: 'addproduct',
                    component: () => import('./pages/main/AddProduct'),
                    meta:{breadlist:["商品管理","添加商品"]}

                },
                {
                    path: '/main/classification',
                    name: 'classification',
                    component: () => import('./pages/main/Classification'),
                    meta:{breadlist:["商品管理","商品分类"]}

                },
                {
                    path: '/main/accountlist',
                    name: 'accountlist',
                    component: () => import('./pages/main/AccountList'),
                    meta:{breadlist:["账号管理","账号列表"]}

                },
                {
                    path: '/main/adduser',
                    name: 'adduser',
                    component: () => import('./pages/main/AddUser'),
                    meta:{breadlist:["账号管理","添加账号"]}

                },
                {
                    path: '/main/personal',
                    name: 'personal',
                    component: () => import('./pages/main/Personal'),
                    meta:{breadlist:["账号管理","个人中心"]}

                },
                {
                    path: '/main/changepassword',
                    name: 'changepassword',
                    component: () => import('./pages/main/ChangePassword'),
                    meta:{breadlist:["账号管理","修改账号"]}

                },
                {
                    path: '/main/productstatistics',
                    name: 'productstatistics',
                    component: () => import('./pages/main/ProductStatistics'),
                    meta:{breadlist:["销售统计","商品添加"]}

                },
                {
                    path: '/main/orderstatistics',
                    name: 'orderstatistics',
                    component: () => import('./pages/main/OrderStatistics'),
                    meta:{breadlist:["销售统计","订单统计"]}
                },
            ]
        },
    ]
})

//路由拦截
router.beforeEach((to,from,next) => {
    console.log(from);
    if (to.path != '/') {
        checktoken(localStorage.token).then((res) => {
            if (res.data.code == 0) next();
            else next('/');
        })
    }else next();
})

//暴露
export default router