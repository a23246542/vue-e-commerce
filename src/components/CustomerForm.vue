<template>
    <div>
        <div class="my-5 row justify-content-center">
            <form class="col-md-6">
            <h1>購物車表單</h1>
                <div class="form-group">
                    <label for="useremail">Email</label>
                    <input type="email" class="form-control" name="email" id="useremail" 
                        placeholder="請輸入 Email" required>
                    <span class="text-danger"></span>
                </div>

                <div class="form-group">
                    <label for="username">收件人姓名</label>
                    <input type="text" class="form-control" name="name" id="username"
                        placeholder="輸入姓名">
                    <span class="text-danger"></span>
                </div>

                <div class="form-group">
                    <label for="usertel">收件人電話</label>
                    <input type="tel" class="form-control" id="usertel" placeholder="請輸入電話">
                </div>

                <div class="form-group">
                    <label for="useraddress">收件人地址</label>
                    <input type="text" class="form-control" name="address" id="useraddress" 
                        placeholder="請輸入地址">
                    <span class="text-danger">地址欄位不得留空</span>
                </div>

                <div class="form-group">
                    <label for="comment">留言</label>
                    <textarea name="" id="comment" class="form-control" cols="30" rows="10"
                        ></textarea>
                </div>
                <div class="text-right">
                    <button class="btn btn-danger"
                    @click="createOrder()"
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
            // form
        }
    },
    methods:{
        createOrder(){
            const vm = this;
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`
            // const 
        }
    }
}
</script>