<template>
    <div>
        <!-- <router-link :to="login">登入</router-link> -->
        <a href="#" @click.prevent="signout()">登出</a>
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    methods:{
        signout(){
            const api =`${process.env.VUE_APP_API}logout`;
            const vm =this;
            vm.$http.post(api).then((response)=>{
                console.log(response.data);
                if(response){
                    vm.$router.push('/login')
                }
            })
        }
    }
}
</script>