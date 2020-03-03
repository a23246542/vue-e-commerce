<template>
    <!-- <div> 開著會如何?? -->
        <div class="message-alert">
            <div class="alert alert-dismissible"
            v-for="(item,i) in messageArray" :key=i
            :class='"alert-"+item.style'
            >
                {{item.message}}
                <button type="button" class="close"
                @click="removeMessage(i)"
                >
                <span>&times;</span>
                <!-- ??這個符號什麼意思 -->
                </button>
            </div>
        </div>
    <!-- </div> -->
</template>

<script>
export default {
    // name:'Navbar'???
    data(){
        return{
            messageArray:[
                // { 
                //     message:'這是一段訊息',
                //     style:'success',
                //     timestamp:12255
                // },
            ]
        }
    },
    created(){
        const vm = this;
        // 自定義方法名稱
        // 由bus自訂事件來幫忙監聽 觸發跨組建的事件
        vm.$bus.$on('message:push',(message,style='warning')=>{
            vm.updateMessage(message,style);
        })
    },
    methods:{
        updateMessage(message,style){
            const timestamp = Math.floor(new Date()/1000);//紀錄點擊當下時間
            this.message.push({
            // this.messageArray.push({
                message,
                style,
                timestamp//不傳ok?
            })
            this.removeMessageWithtime(timestamp);//傳進時間標記
        },
        removeMessage(num){
            this.messageArray.splice(num,1);
        },
        removeMessageWithtime(timeId){
            const vm =this;
            window.setTimeout(()=>{
                vm.forEach(function(item,key){
                    if(item.timestamp === timeId){
                        vm.messageArray.splice(key,1);
                    }
                })
            },5000)
        }
    },
}
</script>

<style scoped>
    .message-alert{
        position: fixed;
        max-width: 50%;
        top: 56px;
        right: 20px;
        z-index: 1100;
    }
</style>

