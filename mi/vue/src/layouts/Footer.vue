<template>
  <div class='foot-btn'>
    <ul>
      <router-link
       class="home"
       exact-active-class="active"
       to="/home"
       tag="li"
      >
      <i class="el-icon-s-home"></i>
      首页
      <!-- <a href="javascript:;"></a> -->
      </router-link>

        <router-link
        class="write"
        exact-active-class="active"
        to="/class"
        tag="li"
      >
      <i class="el-icon-s-order"></i>
      分类
        <!-- <a href="javascript:;"></a> -->
      </router-link>

      <router-link
        class="write"
        exact-active-class="active"
        to="/shopcart"
        tag="li"
      >
      <i class="el-icon-s-goods"></i>
      购物车
        <!-- <a href="javascript:;"></a> -->
      </router-link>

      <router-link
        class="my"
        exact-active-class="active"
        to="/user"
        tag="li"
      >
      <i class="el-icon-s-custom"></i>
      我的
        <!-- <a href="javascript:;"></a> -->
      </router-link>
    </ul>
  </div>
</template>

<script>
import { Icon } from '../plugins/element-ui';
export default {
  name:'Footer',
  props:[],
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
<style scoped>
  .foot-btn{width:100%;height:0.8rem; background:#fff; position:fixed; left:0; bottom:0; border-top:1px solid #9e9a95;}
  .foot-btn ul{ margin:0 auto;height: 100%; display: flex; justify-content: space-around;align-items: center;color: #555;}
   .foot-btn ul li i{ display:block; width:100%;height:100%;font-size: 0.4rem;}
  /* .foot-btn ul li{ float:left;}
  .foot-btn ul li a{ display:block; width:100%;height:100%;}
  .foot-btn ul .home{width:0.44rem;height:0.59rem; background:url(../assets/img/home.png) no-repeat 0 0; background-size:100%; margin-top:0.1rem;}
  .foot-btn ul .write{width:0.82rem;height:0.81rem; background:url(../assets/img/write.png) no-repeat 0 0; background-size:100%; margin-left:1.18rem;}
  .foot-btn ul .my{width:0.39rem;height:0.63rem; background:url(../assets/img/my.png) no-repeat 0 0;background-size:100%; margin-left:1.18rem; margin-top:0.07rem;} */

  /* .foot-btn ul .home_active{width:0.44rem;height:0.59rem; background:url(../assets/img/home.png) no-repeat 0 0; background-size:100%; margin-top:0.1rem;}
  .foot-btn ul .write_active{width:0.82rem;height:0.81rem; background:url(../assets/img/write.png) no-repeat 0 0; background-size:100%; margin-left:1.18rem;}
  .foot-btn ul .my_active{width:0.39rem;height:0.63rem; background:url(../assets/img/my1.png) no-repeat 0 0;background-size:100%; margin-left:1.18rem; margin-top:0.07rem;} */
  .foot-btn ul .active{color: #333;}

</style>