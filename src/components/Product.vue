<template>
    <div>
        <!-- <p>123456</p> -->
        <!-- <Loading :active.sync="false"></Loading> -->
        <loading :active.sync="isLoading"></loading>
        <div class="mt-4 text-right">
            <!-- <button class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">新增產品</button> -->
            <button class="btn btn-primary" data-target="#productModal" @click="productModal(true)">新增產品</button>
        </div>
        <table class="table mt-4">
            <thead>
                <tr>
                    <th width="120">分類</th>
                    <th width="120">產品名稱</th>
                    <th width="80">原價</th>
                    <th width="80">售價</th>
                    <th width="100">是否啟用</th>
                    <th width="80">編輯</th>
                    <th width="80">刪除</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item) in products" :key=item.id>
                    <td>{{item.category}}</td>
                    <td>{{item.title}}</td>
                    <td class="text-right">
                        {{item.origin_price}}
                    </td>
                    <td class="text-right">
                        {{item.price}}
                    </td>
                    <td>
                        <span v-if="item.is_enabled">啟用</span>
                        <span v-else>未啟用</span>
                        <!-- {{item.isEnable=1}} -->
                    </td>
                    <td>
                        <button class="btn btn-outline-primary btn-sm" @click="productModal(false,item)">編輯</button>
                    </td>
                    <td>
                        <button class="btn btn-outline-primary btn-sm" @click="delProductModal(item.id)">刪除</button>
                    </td>
                </tr>
            </tbody>

        </table>

        <!-- Modal -->
        <div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content border-0">
                    <div class="modal-header bg-dark text-white">
                        <h5 class="modal-title" id="exampleModalLabel">
                            <span>新增產品</span>
                        </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-sm-4">
                                <div class="form-group">
                                    <label for="image">輸入圖片網址</label>
                                    <input type="text" class="form-control" id="image" v-model="tempProduct.imageUrl"
                                        placeholder="請輸入圖片連結">
                                </div>
                                <div class="form-group">
                                    <label for="customFile">或 上傳圖片
                                        <!-- <i class="fas fa-spinner fa-spin"></i> -->
                                        <i class="fas fa-sync fa-spin" v-if="status.fileUploading"></i>
                                    </label>
                                    <input type="file" id="customFile" class="form-control" @change="upfileload()"
                                        ref="imgfiles">
                                </div>
                                <img img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
                                    class="img-fluid" :src="tempProduct.imageUrl" alt="">
                            </div>
                            <div class="col-sm-8">
                                <div class="form-group">
                                    <label for="title">標題</label>
                                    <input v-model="tempProduct.title" type="text" class="form-control" id="title"
                                        placeholder="請輸入標題">
                                </div>

                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="category">分類</label>
                                        <input v-model="tempProduct.category" type="text" class="form-control"
                                            id="category" placeholder="請輸入分類">
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="unit">單位</label>
                                        <input v-model="tempProduct.unit" type="unit" class="form-control" id="unit"
                                            placeholder="請輸入單位">
                                    </div>
                                </div>

                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="origin_price">原價</label>
                                        <input v-model="tempProduct.origin_price" type="number" class="form-control"
                                            id="origin_price" placeholder="請輸入原價">
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="price">售價</label>
                                        <input v-model="tempProduct.price" type="number" class="form-control" id="price"
                                            placeholder="請輸入售價">
                                    </div>
                                </div>
                                <hr>

                                <div class="form-group">
                                    <label for="description">產品描述</label>
                                    <textarea v-model="tempProduct.description" type="text" class="form-control"
                                        id="description" placeholder="請輸入產品描述"></textarea>
                                </div>
                                <div class="form-group">
                                    <label for="content">說明內容</label>
                                    <textarea type="text" class="form-control" id="content"
                                        v-model="tempProduct.content" placeholder="請輸入產品說明內容"></textarea>
                                </div>
                                <div class="form-group">
                                    <div class="form-check">
                                        <input v-model="tempProduct.is_enabled" :true-value="1" :false-value="0"
                                            class="form-check-input" type="checkbox" id="is_enabled">
                                        <label class="form-check-label" for="is_enabled">
                                            是否啟用
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                        <button @click="updateProduct()" type="button" class="btn btn-primary">確認</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="delProductModal" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content border-0">
                    <div class="modal-header bg-danger text-white">
                        <h5 class="modal-title" id="exampleModalLabel">
                            <span>刪除產品</span>
                        </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        是否刪除 <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-danger" @click="delProduct()">確認刪除</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- -------分頁 -->
        <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li class="page-item"
                :class="{'disabled':!pagination.has_pre}"
                >
                    <a class="page-link" href="#" aria-label="Previous"
                    @click.prevent="getProduct(pagination.current_page-1)"
                    >
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                <!-- --------------------------------------------------------- -->
                <li class="page-item"
                v-for="page in pagination.total_pages" 
                :key = page
                :class="{'active':page===pagination.current_page}"
                >
                    <a class="page-link" href="#"
                    

                    
                    @click.prevent="getProduct(page)">
                    {{page}}
                    </a>
                </li>
                <!-- -------------------------------------------- -->
                <li class="page-item"
                :class="{'disabled':!pagination.has_next}"
                >
                    <a class="page-link" href="#" aria-label="Next"
                    @click.prevent="getProduct(pagination.current_page+1)"
                    >
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>


    </div>
</template>

<script>
    import $ from 'jquery'; //!!
    // -----
    // import Loading from 'vue-loading-overlay';
    // import 'vue-loading-overlay/dist/vue-loading.css';

    // Vue.component('Loading',Loading);

    export default {
        data() {
            return {
                products: [],
                pagination: {},
                tempProduct: {},
                isNew: false,
                isLoading: false,
                status: {
                    fileUploading: false,
                }
            }
        },
        created() {
            // const vm  = this;
            this.getProduct();
            // this.$bus.$emit('messagepush','這是另一段訊息','danger');
            //  this.$bus.$emit('messsage:push', response.data.message, 'danger');

        },
        methods: {
            getProduct(page = 1) {
                // const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_CUSTOMAPI}/admin/products`;
                const api =
                `${process.env.VUE_APP_API}api/${process.env.VUE_APP_CUSTOMAPI}/admin/products?page=${page}`;
                const vm = this; //影片http之後才需要把const打開
                vm.isLoading = true;
                this.$http.get(api).then((response) => {
                    console.log(response.data);
                    if (response.data.success) {
                        vm.isLoading = false;
                        vm.products = response.data.products;
                        vm.pagination = response.data.pagination;

                    }
                })
            },
            productModal(isNew, item) {
                if (isNew) {
                    this.tempProduct = {};
                    this.isNew = isNew;
                } else {
                    this.tempProduct = Object.assign({}, item);
                    this.isNew = isNew;
                }
                $('#productModal').modal('show');
            },
            updateProduct() {
                // const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_CUSTOMAPI}/admin/product`;
                let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_CUSTOMAPI}/admin/product`;
                let apiMethod = "post";
                const vm = this;
                // this.$http.post(api,`{${vm.tempProduct}}`).then((response)=>{
                // ----------------------------------------

                if (!vm.isNew) { //false就執行
                    api =
                        `${process.env.VUE_APP_API}api/${process.env.VUE_APP_CUSTOMAPI}/admin/product/${vm.tempProduct.id}`;
                    apiMethod = "put"
                }

                // ------------------------------------------
                // this.$http.post(api,{data:vm.tempProduct}).then((response)=>{
                this.$http[apiMethod](api, {
                    data: vm.tempProduct
                }).then((response) => {
                    console.log(response);
                    if (response.data.success) {
                        $('#productModal').modal('hide');
                        vm.getProduct();
                        console.log("新增編輯成功"); //debug放後面
                    } else {
                        $('#productModal').modal('hide');
                        vm.getProduct();
                        console.log("新增編輯失敗");

                    }
                })
            },
            delProductModal(item_id) {
                $('#delProductModal').modal('show');
                // this.tempProduct=item_id;
                this.tempProduct.id = item_id;
            },
            delProduct() {
                const api =
                    `${process.env.VUE_APP_API}api/${process.env.VUE_APP_CUSTOMAPI}/admin/product/${this.tempProduct.id}`;
                const apiMethod = "delete";
                const vm = this;
                this.$http[apiMethod](api).then((response) => {
                    $('#delProductModal').modal('hide');
                    vm.getProduct();
                    console.log(response.data.message);
                    // if(response.data.success){                       
                    // }else{
                    //     console.log(response.data.message);                       
                    // }  
                })
            },
            upfileload() {
                console.log(this);
                // 這個this依然是vue元件
                this.status.fileUploading = true;
                const imgdata = this.$refs.imgfiles.files[0]; //!!refsssssss
                const formData = new FormData();
                formData.append("file-to-upload", imgdata);
                // 如何怎麼呼叫vm api
                // const api =`{process.env.VUE_APP_API}api/${process.env.VUE_APP_CUSTOMAPI}/admin/upload`;
                const vm = this;
                const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_CUSTOMAPI}/admin/upload`;
                this.$http.post(api, formData, {
                    header: {
                        // content_type:"multipart/form-data" 
                        'Content_Type': "multipart/form-data"
                    }
                }).then((response) => {
                    if (response.data.success) {

                        vm.status.fileUploading = false;

                        //  this.tempProduct.imageUrl = response.data.imageUrl
                        // console.log(this.tempProduct);
                        // console.log(vm.tempProduct);

                        // this.$set(this.tempProduct,"imageUrl",response.data.imageUrl);
                        vm.$set(this.tempProduct, "imageUrl", response.data.imageUrl);
                    } else {
                        console.log(response.data.message);
                        console.log(this);
                        this.$bus.$emit('message:push', response.data.message, 'danger');
                    }
                })
            }
        }
    }
</script>