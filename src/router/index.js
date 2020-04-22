import Vue from 'vue'
import VueRouter from 'vue-router'
// ------------------------------
// import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
// import Product from '../components/Product.vue'
Vue.use(VueRouter)

const routes = [
    // {
    //     path:'*',
    //     redirect:'/login'
    // },
    // {
    //     path: '/',
    //     name: 'Home',
    //     component: Home
    // },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import( /* webpackChunkName: "about" */ '../views/About.vue'),
        // meta:{requiresAuth:true},
        meta: { requiresAuth: true },
    },
    {
        path: '/login',
        name: ':Login',
        component: Login
    },
    {
        path: '/logout',
        name: ':Logout',
        component: ()=> import('../views/Logout.vue')
    },
    {
        path:'/admin',
        name:'Dashboard',
        component:() => import('../views/Dashboard.vue'),
        children:[
            {
                path:'product',
                name:'Product',
                component:()=> import('../components/Product.vue'),
                // component:Product
                meta:{requiresAuth:true}
            },
            {
                path:'coupons',
                name:'Coupons',
                component:() => import('../components/Coupons.vue'),
                meta:{requiresAuth:true}
            },
            {
                path:'orders',
                name:'Orders',
                component:() => import('../components/Orders.vue'),
                meta:{requiresAuth:true}
            }
        ] 
    },
    {
        path:'/',//產品列表頁
        // name:'Dashboard',
        component:() => import('../views/Dashboard.vue'),
        children:[
            {
                path:'',//沒寫就是預設(view這頁組件)
                // name:'frontDashBoard',//!!有多個組件 把name拿掉 就不會出現匿名組建了
                // props:{
                //     default:{},
                //     footer:{cart:}
                // },
                components:{
                    default:()=>import('../components/CustomerProduct.vue'),//產品列表
                    footer:()=>import('../components/CustomerOrder.vue')//購物車
                },
                // children:[
                //     {
                //         path:'customer_form',
                //         name:'CustomerForm',
                //         // component:() => import('../components/CustomerForm.vue')//訂購表單
                //         components:{
                //             default:()=>import('../components/Product(front).vue'),
                //             footer:()=>import('../components/CustomerForm.vue')
                //         }

                //     },
                // ]
            },
            {
                path:'customer_form',
                name:'CustomerForm',
                // component:()=>import('../components/CustomerForm.vue'),
                components:{
                    default:()=>import('../components/CustomerProduct.vue'),//產品列表
                    footer:()=>import('../components/CustomerForm.vue')//訂購表單
                },
            },
            {
                path:'customer_checkout/:orderId',//結帳完成頁
                // path:'customer_checkout',//結帳完成頁
                name:'CustomerCheckout',
                // component:()=>import('../components/CustomerCheckout.vue'),
                components:{
                    default:()=>import('../components/CustomerProduct.vue'),//產品列表
                    check:()=>import('../components/CustomerCheckout.vue'),
                    footer:()=>import('../components/test.vue')//結帳
                },
            }
        ] 
    }

]

const router = new VueRouter({
    // mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router