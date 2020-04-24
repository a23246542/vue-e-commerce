<template>
    <div>
        <loading :active.sync="isLoading"></loading>
        <div class="row mt-4">
            <div class="col-md-4 mb-4" v-for="item in products" :key="item.id">
                <div class="card border-0 shadow-sm">
                    <div
                        style="height:300px;background:url('https://picsum.photos/350/300') no-repeat;background-size:cover;background-position: center">
                    </div>
                    <div class="card-body">
                        <span class="badge badge-secondary float-right ml-2">{{item.category}}</span>
                        <h5 class="card-title">
                            <a href="#" class="text-dark">{{item.title}}</a>
                        </h5>
                        <p class="card-text">{{item.content}}</p>
                        <div class="d-flex justify-content-between align-items-baseline">
                            <div class="h5" v-if="!item.price">{{item.origin_price}}</div>
                            <div class="h6" v-if="item.price">{{item.origin_price}}</div>
                            <div class="h5" v-if="item.price">{{item.price}}</div>
                        </div>
                    </div>
                    <div class="card-footer d-flex">
                        <button type="button" class="btn btn-outline-secondary btn-sm"
                        @click="getProduct(item.id)"
                        >
                            <i class="fas fa-spinner fa-spin"
                            v-if="item.id === status.loadingItem"
                            ></i>
                            查看更多
                        </button>
                        <button type="button" class="btn btn-outline-danger btn-sm ml-auto"
                        @click="addtoCart(item.id)"
                        >
                            <i class="fas fa-spinner fa-spin"
                            v-if="item.id === status.loadingItem"
                            ></i>
                            加到購物車
                        </button>
                        <!-- @click="addtoCart(item.id,1)" 連1都不用寫-->
                        <!-- 粗心@click不要加錯位置 -->
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">{{ product.title }}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <!-- <img :src="product.image" class="img-fluid" alt=""> -->
                        <img src="https://picsum.photos/350/300" alt="" class="img-fluid">
                        <blockquote class="blockquote mt-3">
                            <p class="mb-0">{{ product.content }}</p>
                            <footer class="blockquote-footer text-right">{{ product.description }}</footer>
                        </blockquote>
                        <div class="d-flex justify-content-between align-items-baseline">
                            <div class="h4" v-if="!product.price">{{ product.origin_price }} 元</div>
                            <del class="h6" v-if="product.price">原價 {{ product.origin_price }} 元</del>
                            <div class="h4" v-if="product.price">現在只要 {{ product.price }} 元</div>
                        </div>
                        <select name="" class="form-control mt-3" v-model="product.num">
                            <option v-bind:value="num" v-for="num in 10" :key="num">
                                選購 {{num}} {{product.unit}}
                            </option>
                        </select>
                    </div>
                    <div class="modal-footer">
                        <div class="text-muted text-nowrap mr-3">
                            小計 <strong>{{ product.num * product.price }}</strong> 元
                        </div>
                        <button type="button" class="btn btn-primary" 
                        @click="addtoCart(product.id, product.num)"
                        >
                            <i class="fas fa-spinner fa-spin"
                            v-if="product.id===status.loadingItem"
                            ></i>
                            加到購物車
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery';

    export default {
        data() {
            return {
                products: [],
                isLoading: false,
                product:{
                    // num:1,
                },
                status:{
                    // loadingItem,
                    loadingItem:"",
                },
                cart:[]

            }
        },
        created() {
            this.getProducts();
            this.getCart();//getCart會先比較快出來
            console.log(this);
            
        },
        methods: {
            getProducts() {
                const vm = this;
                const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_CUSTOMAPI}/products`;
                vm.isLoading = true; //!放這邊才有效果
                this.$http.get(url).then((response) => {
                    // vm.isLoading=true;
                    if (response.data.success) {
                        console.log(response);
                        vm.products = response.data.products;
                        vm.isLoading = false;
                    }
                })
            },
            getProduct(id){
                const vm = this;
                const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_CUSTOMAPI}/product/${id}`;
                // vm.isLoading = true; //!放這邊才有效果
                vm.status.loadingItem = id;

                this.$http.get(url).then((response) => {
                    // vm.isLoading=true;
                    if (response.data.success) {
                        // console.log("getProduct.response111",response);
                        vm.product = response.data.product;
                        // vm.isLoading = false;
                        vm.status.loadingItem ='';
                        // $('#productModal').show();寫這個沒用
                        // vm.product.num=1;//!這邊設定預設值 ///!!!!原本沒有的資料結構不能直接
                        // vm.$set(vm.data.product,'num',1);
                        vm.$set(vm.product,'num',1);
                        $('#productModal').modal('show');
                    }
                })
            },
            addtoCart(id,qty=1){
                const vm =this;
                const url =`${process.env.VUE_APP_API}api/${process.env.VUE_APP_CUSTOMAPI}/cart`;
                vm.status.loadingItem =id;
                // const cart ={
                //     data:{

                //     }
                // }
                const cart = {
                    // id,
                    // qty
                    product_id:id,
                    qty
                }
                this.$http.post(url,{data:cart}).then((response)=>{//!
                    if(response.data.success){
                        console.log( response.data.message,response.data.data);//!
                        vm.status.loadingItem ="";
                        $('#productModal').modal('hide');
                        vm.getCart();
                    }
                })
            },
            getCart(){
                const vm = this;
                const url =`${process.env.VUE_APP_API}api/${process.env.VUE_APP_CUSTOMAPI}/cart`;
                this.$http.get(url).then((response)=>{
                    // console.log(response.data);
                    if(response.data.success){

                        // vm.cart = response.data.data.carts;//!!少加s 跟data
                        vm.cart = response.data.data;//!!少加s 跟data
                        // console.log("vm.cart:"+vm.cart);//會變成字串!!
                        console.log("vm.cart:",vm.cart);
                        this.$emit("cartpush",vm.cart);
                        
                    }
                })
            },


        },
    }
</script>