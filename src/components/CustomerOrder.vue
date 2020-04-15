<template>
    <div>
        <table class="table">
            <thead>
                <th></th>
                <th>品名</th>
                <th>數量</th>
                <th class="text-right">單價</th>
                <th class="text-right">總價</th><!--自己家的 不知道為什麼-->
            </thead>
            <tbody>
                <!-- <tr v-for="item in cart.carts"> -->
                <tr v-for="item in cartdata.carts" :key="item.id">
                    <td class="align-middle">
                        <button type="button" class="btn btn-outline-danger btn-sm"
                          @click="delCart(item.id)"
                        >
                            <i class="far fa-trash-alt"></i>
                        </button>
                    </td>
                    <td class="align-middle">
                        <!-- {{"產品標題" }} -->
                        <!-- {{產品標題 }}!!會錯 -->
                        {{item.product.title}}
                        <div class="text-success" v-if="item.coupon">
                        已套用優惠券
                        </div>
                    </td>
                    <td class="align-middle">{{item.qty}}/{{item.product.unit}}</td>
                    <td class="align-middle text-right"
                    v-if="item.product.price"
                    >{{item.product.price}}</td>
                    <td class="align-middle text-right"
                    v-else
                    >{{item.product.origin_price}}</td>
                    <td class="align-align-middle text-right">
                        {{item.total}}
                    </td>

                </tr>
                <!-- v-else="item.product.origin_price"忘記v-else不用指定抱錯  -->
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="4" class="text-right">總計</td>
                    <td class="text-right">{{ cartpull.total}}</td>
                </tr>
                <tr v-if="cartpull.final_total!=cartpull.total">
                    <td colspan="4" class="text-right text-success">折扣價</td>
                    <td class="text-right text-success">{{ cartpull.final_total}}</td>
                </tr>
            </tfoot>
        </table>
        <div class="input-group mb-3 pb-6 input-group-sm">
            <input type="text" class="form-control" placeholder="請輸入優惠碼">
            <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button">
                    套用優惠碼
                </button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['cartpull'],//其實可以直接用cartpull就好 但購物者刪除的畫 資料不能寫回去
    data(){
        return {
            // cartData:cartpull,
            cartdata:this.cartpull,//!!!!子組件已經生成來不及獲取 難怪空的 data只會生成依次
        }
    },
    watch:{
        cartpull:function(newVal,oldVal){
            this.cartdata = newVal;
        }
    },
    methods: {
        delCart(id){
            console.log("delete");
            const vm = this;
            const url =`${process.env.VUE_APP_API}api/${process.env.VUE_APP_CUSTOMAPI}/cart/${id}`;
            this.$http.delete(url).then((response)=>{
                if (response.data.success) {
                    console.log(response.data.message);
                    // vm.getCart();//!!發現購物車組件沒有getCart方法 只好重寫一遍
                }
            })
        },
        // getCart(){
        //     const vm = this;
        //     const url =`${process.env.VUE_APP_API}api/${process.env.VUE_APP_CUSTOMAPI}/cart`;
        //     this.$http.get(url).then((response)=>{
        //         // console.log(response.data);
        //         if(response.data.success){
        //             vm.cartData = response.data.data.carts;
        //             // console.log(response.data.carts,vm.cart);
        //             console.log(response.data.carts);
                    
        //         }
        //     })
        // },
    }
}
</script>