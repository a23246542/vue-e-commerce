<template>
    <div>
        <div class="my-5 row justify-content-center">
            <form class="col-md-6">
            <h1>購物車表單</h1>
                <div class="form-group">
                    <label for="useremail">Email</label>
                    <input type="email" class="form-control" name="email" id="useremail" 
                        placeholder="請輸入 Email" required
                    v-model="form.user.email"    
                    >
                    <span class="text-danger"></span>
                </div>

                <div class="form-group">
                    <label for="username">收件人姓名</label>
                    <input type="text" class="form-control" name="name" id="username"
                        placeholder="輸入姓名"
                    v-model="form.user.name"
                    >
                    <span class="text-danger"></span>
                </div>

                <div class="form-group">
                    <label for="usertel">收件人電話</label>
                    <input type="tel" class="form-control" id="usertel" placeholder="請輸入電話"
                    v-model="form.user.tel"
                    >
                </div>

                <div class="form-group">
                    <label for="useraddress">收件人地址</label>
                    <input type="text" class="form-control" name="address" id="useraddress" 
                        placeholder="請輸入地址"
                    v-model="form.user.address"
                    >
                    <span class="text-danger">地址欄位不得留空</span>
                </div>

                <div class="form-group">
                    <label for="comment">留言</label>
                    <textarea name="" id="comment" class="form-control" cols="30" rows="10"
                    v-model="form.message"
                    ></textarea>
                </div>
                <div class="text-right">
                    <button class="btn btn-danger"
                    @click.prevent="createOrder()"
                    >送出訂單</button>
                </div>
             <router-link :to="{path:'/customer_checkout'}" class="btn btn-info ml-auto">下一步</router-link>
            </form>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            isLoading: false,
            form:{
                user:{
                    name:'',
                    email:'',
                    tel:'',
                    address:'',
                },
                message:'',
            }
        }
    },
    created() {
        this.getCart();
    },
    methods:{
        getCart(){//測試一下遠端購物車到底有沒有東西
            const vm = this;
            const url =`${process.env.VUE_APP_API}api/${process.env.VUE_APP_CUSTOMAPI}/cart`;
            this.$http.get(url).then((response)=>{
                
                if(response.data.success){
                    
                    console.log("購物車資料",response.data.data);
                }
            })
        },
        createOrder(){
            const vm = this;
            const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_CUSTOMAPI}/order`;
            const order = vm.form;
            // vm.isLoading = true;
            console.log("觸發送出訂單");
            
            this.$http.post(url,{data:order}).then((response)=>{
                console.log("API回應");
                // console.log(response.data);
                
                if(response.data.success){
                    console.log('訂單已建立',response.data);
                    // vm.order = order//把資料帶去下一頁 這邊不用存
                    vm.$router.push(`/customer_checkout/${response.data.orderId}`);
                    // vm.isLoading = false;
                }
            })
            // const 
        }
    }
}
</script>