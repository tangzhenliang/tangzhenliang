<template>
  <div class="banner">
      <ul class="clearfix">
        <router-link
          v-for="item of data"
          :key="item._id"
          :to="{name:'detail',params:{_id:item._id},query:{apiName:apiName}}"
          tag="li"
        >
          <img :src="$baseUrl + item.banner" alt />
          <div class="text-box">
            <h2>{{item.title}}</h2>
            <p>{{item.sub_title}}</p>
          </div>
        </router-link>
      </ul>
  </div>
</template>

<script>
import Swipe from "../assets/js/swipe.js"; //可以引入  也可以 npm i jquery@1.7.2 -S  进行引入
// import $ from'../assets/js/jquery-1.7.2'
import $ from "jquery";
export default {
  name: "Banner",
  props: ["data", "apiName"],
  data() {
    return {};
  },
  components: {},
  mounted() {
    //banner图js  自执行脚本，要跟着控制元素走
  },
  updated() {
    var mySwipe = new Swipe($(".banner")[0], {
      auto: 2000,
      continuous: true,
      stopPropation: true,
      callback: function(index, element) {
        $(".banner ol li").removeClass("active");
        $(".banner ol li")
          .eq(index)
          .addClass("active");
      },
    });
  },
  methods: {}
};
</script>
<style>
/* .content{max-width:6.4rem; margin:0 auto; margin-bottom:0.8rem;} */
.banner {
  margin-top: 1.2rem;
  position: relative;
  overflow: hidden;
  z-index: 1;
}
.banner ul li {
  width: 6.4rem;
  float: left;
  position: relative;
}
.banner ul li img {
  width: 100%;
  height: 3.4rem;
  display: block;
}
.banner ul li .text-box {
  width: 5.8rem;
  padding: 0 0.3rem;
  height: 1.24rem;
  position: absolute;
  left: 0;
  bottom: 0;
  color: #fff;
  background: rgba(0, 0, 0, 0.5);
}
.text-box h2 {
  font-size: 0.3rem;
  font-weight: normal;
  margin-top: 0.22rem;
  line-height: 100%;
  margin-bottom: 0.22rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.text-box p {
  line-height: 100%;
}

.banner ol {
  position: absolute;
  right: 0.2rem;
  bottom: 0.2rem;
}
.banner ol li {
  width: 0.15rem;
  height: 0.15rem;
  background: #5477b2;
  float: left;
  border-radius: 50%;
  margin-right: 0.08rem;
}
.banner ol li.active {
  background: #fff;
}
</style>