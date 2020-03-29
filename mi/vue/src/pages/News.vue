<template>
   <div class='News'>
       <uc-nav></uc-nav>
       <h3>{{news}}</h3>

   </div>
</template>

<script>
import UcNav from '../components/uc-nav/uc-nav'
export default {
    
   name:'News',
   props:[],
   data() {
       return {
           news:'hello!!!'
       }
   },
   components:{UcNav},
   mounted(){},
   updated(){},
   methods:{}

   }
</script>
<style>
.News{
    padding: 4rem 2rem 0rem 2rem;
}
</style>