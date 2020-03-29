<template>
   <div class="Button">
    <input 
      type="button" 
      :value="text" 
      class="login-btn" 
      :style="{background:bgColor}"
      @click="$emit('click')"
    />
  </div>
</template>

<script>
export default {
   name:'Button',
   props:{
      text:{
        type:String,
        default:'按 钮'
      },
      bgColor:{
        type:String,
        default:'#4c4f50'
      }
   },
   data() {
    return {

   }
   },






   components:{},
   mounted(){},
   updated(){},
   methods:{}

   }
</script>
<style>
/* .Button{} */
  .login-btn{width:4.65rem;height:0.65rem; background:#4c4f50; color:#fff; text-align:center; 
  line-height:0.65rem; border-radius:8px; display:block; margin-top:0.62rem; font-size:0.28rem;}
</style>