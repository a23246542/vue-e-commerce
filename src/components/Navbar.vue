<template>
    <div>
        <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
            <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Company name</a>
            <input class="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search">
            <ul class="navbar-nav px-3">
                <li class="nav-item text-nowrap">
                    <a class="nav-link" href="#"
                    v-if="!isLoading"
                    @click="signin()"
                    >管理員登入</a>
                    <a class="nav-link" href="#"
                    v-else
                    @click="signout()"
                    >管理員登出</a>
                </li>
            </ul>
        </nav>
    </div>
</template>
<script>
export default {
    data(){
        return{
            isLoading: false,
        }
    },
    created(){
        const vm = this;
        const api = `${process.env.VUE_APP_API}api/user/check`;
        this.$http.post(api).then((response)=>{
            console.log("Navbar檢查是否登入ing");
            if(response.data.success){
                // this.isLoading = true;//粗心 用this會報錯!!!
                this.isLoading = true;
                console.log("已登入");
                
            }
        })

        // vm.$bus.$on('signin',()=>{//!!最後發現不用加這個 login到回來這邊 navbar組件是重新載入的 所以上面會執行
        //     vm.isLoading = true;
        //     console.log('觸發Navbar登入事件');
            
        // })

    },
    methods:{
        signout(){
            const api =`${process.env.VUE_APP_API}logout`;
            const vm =this;
            vm.$http.post(api).then((response)=>{
                console.log(response.data);
                if(response.data.success){
                    console.log("已登出");
                    this.isLoading = false;
                    // vm.$router.push('/login')
                }
            })
        },
        signin(){
            // const api =`${process.env.VUE_APP_API}signin`;
            // const vm =this;
            // vm.$http.post(api).then((response)=>{
            //     console.log(response.data);
            //     if(response.data.success){
            //         vm.$router.push('/login')
            //     }
            // })
            this.$router.push('/login');
        }
    }
}
</script>