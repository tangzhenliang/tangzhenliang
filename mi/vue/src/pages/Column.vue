<template>
    <div class="Column">
   <Cell
     v-for="(item,index) of $store.state.column.column"
            :key="item._id"
            :data="item"
            :index="index"
            api-name="column"
   />
  </div>
</template>

<script>
import Cell from '../components/Cell'
export default {
   name:'Column',
   props:[],
   data() {
       return {
         //  column:[]
       }
   },
   components:{
      Cell
   },
   mounted(){
      // axios({
      //    url:'/api/goods/column',
      //    params:{_page:1,_limit:8}
      // }).then(
      //    res=>{
      //       this.column = res.data.data
      //    }
      // )
      this.$store.dispatch(`column/${this.$types.COLUMN}`)
   },
   updated(){},
   methods:{}

   }
</script>
<style>
.Column{margin: 1.2rem .4rem 0;}
</style>