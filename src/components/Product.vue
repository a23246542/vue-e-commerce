<template>
    <div>
        <p>123456</p>

    </div>
</template>

<script>
export default {
    data(){
        return{
            products:[]
        }
    },
    created(){
        this.getProduct();
    },
    methods:{
        getProduct(){
             const api =`${process.env.VUE_APP_API}api/${process.env.VUE_APP_CUSTOMAPI}/admin/products`;
             const vm =this;
             this.$http.get(api).then((response)=>{
             console.log(response.data);
                if(response.data.success){
                    vm.products = response.data.products;
                }
            })
        }
    }
}
</script>