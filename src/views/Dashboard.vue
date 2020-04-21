<template>
    <div>
        <Alert></Alert>
        <Navbar></Navbar>
        <div class="container-fluid">
            <div class="row">
                <Sidebar></Sidebar>
                <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
                    <!-- <keep-alive> -->
                        <router-view @cartpush="getCart"></router-view>
                    <!-- </keep-alive> -->
                    <router-view name="check"></router-view>
                    <router-view name="footer" :cartpull="cart"></router-view>
                </main>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Alert from '../components/AlertMessage';

export default {
    components:{
        Navbar,
        Sidebar,
        Alert
    },
    data(){
        return{
            cart:{}
        }
    },
    methods:{
        getCart(cart){
            this.cart = cart;
        }
    }
    
}
</script>