<template>
   <div class='Follow'>
      <Cell
            v-for="(item,index) of $store.state.follow.follow"
            :key="item._id"
            :data="item"
            :index="index"
            api-name="follow"
         />
   </div>
</template>

<script>
import Cell from '../components/Cell'
export default {
   name:'Follow',
   props:[],
    data() {
       return {
         //  follow:[]
       }
   },
   components:{
      Cell
   },
   mounted(){
      //  axios({
      //    url:'/api/goods/follow',
      //    params:{_page:1,_limit:8}
      // }).then(
      //    res=>{
      //       this.follow = res.data.data
      //    }
      // )
      this.$store.dispatch(`follow/${this.$types.FOLLOW}`)
   },
   updated(){},
   methods:{}
      
   }
</script>
<style>
.Follow{margin: 1.2rem .4rem 0;}
</style>