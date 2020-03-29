<template>
   <div class='Home'>
      <Banner
        :data="$store.state.banner.banner"
         apiName="banner"
      />
      <div class="home-l-r">
         <Cell
            v-for="(item,index) of $store.state.home.home"
            :key="item._id"
            :data="item"
            :index="index"
            api-name="home"
         />
      </div>
   </div>
</template>

<script>
import Banner from '../components/Banner'
import Cell from '../components/Cell'
import axios from 'axios'

export default {
   name:'Home',
   props:[],
   data() {
       return {
         // list:[],
         // home:[]
       }
   },
   components:{
      Banner,Cell
   },
   mounted(){
      // axios({
      //   url:'/api/goods/banner',
      //   params:{_page:1,_limit:5},
      // //   headers:{
      // //     token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNoZW5naGFvIiwiX2lkIjoiNWUwOTVkNDQwNjE3YTczMzM4MjhjMGMzIiwiaWF0IjoxNTgzNzM2MjQ3LCJleHAiOjE1ODM4MjI2NDd9.XdAacwQ6qtkQoN_Jp-AK6HGMts9gY8OzP8sEA25BmIU'
      // //   }
      // }).then(
      //   res=>this.list = res.data.data
      // )
      this.$store.dispatch(`banner/${this.$types.BANNER}`)
      this.$store.dispatch(`home/${this.$types.HOME}`)
      //  axios({
      //   url:'/api/goods/home',
      //   params:{_page:1,_limit:8},
      // //   headers:{
      // //     token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNoZW5naGFvIiwiX2lkIjoiNWUwOTVkNDQwNjE3YTczMzM4MjhjMGMzIiwiaWF0IjoxNTgzNzM2MjQ3LCJleHAiOjE1ODM4MjI2NDd9.XdAacwQ6qtkQoN_Jp-AK6HGMts9gY8OzP8sEA25BmIU'
      // //   }
      // }).then(
      //   res=>this.home = res.data.data
      // )
   },
   updated(){},
   methods:{}

   }
</script>
<style>
.home-l-r{
   margin: 0 .4rem ;
   padding-bottom: 0.8rem;
}
</style>