<template>
  <div class="nav">
   <div class='search'>
       <div class="icon">
         <i class="el-icon-location-outline"></i>
         <span>北京</span>
        </div>
       <div>
         <input type="text" placeholder="小米10 Pro">
         <i class="el-icon-search"></i>
       </div>
       <div class="icon">
         <i class="el-icon-chat-line-round"></i>
         <router-link to="/news" tag="span">消息</router-link>
       </div>
   </div>
    <ul>
      <router-link
        to="/home"
        exact-active-class="active"
        tag="li"
      >
        <a href="javascript:;" >首页</a>
      </router-link>

      <router-link
       to="/follow"
       exact-active-class="active"
       tag="li"
      ><a href="javascript:;" >关注</a></router-link>

      <router-link
       to="/column"
       exact-active-class="active"
       tag="li"
      ><a href="javascript:;" >栏目</a></router-link>
    </ul>
    
  </div>
</template>

<script>
import { Icon } from '../plugins/element-ui';
  export default {
    name:'Header',
    props:{},
    data(){
      return {
        
      }
    },
    components:{},
    mounted(){},
    updated(){},
    methods:{}
  }
</script>

<style scoped>
  .nav .search{display: flex;width:100%;height: 0.6rem;justify-content: space-around;align-items: center;}
  .nav .search .icon span{color: #fff;font-size: 0.2rem;margin-left: 0.04rem;}
  .nav .search .icon i{font-size: 0.3rem;font-weight: bold;color: #fff;}
  .nav .search input{width: 3.3rem;height: 0.2rem; padding:0.12rem;border-radius: 0.2rem ;background: #fff;font-size: 0.2rem;color: #666;}
  .nav .search .el-icon-search{font-size: 0.2rem;margin-left: -0.4rem;color:#ccc ;}

  .nav{width:100%; position:fixed; top:0;left:0; z-index:2; background: #ccc;}
  .nav ul{width:4.38rem;height:0.6rem; margin:0 auto;}
  .nav ul li{width:1.46rem;height:0.6rem; float:left;}
  .nav ul li a{ display:block;width:1.46rem;height:0.6rem; line-height:0.6rem; text-align:center; font-size:0.3rem; color:#9e9a95;}
  .nav ul li.active a{height:0.5rem; border-bottom:0.02rem solid #5477b2; color:#5477b2;}
</style>
