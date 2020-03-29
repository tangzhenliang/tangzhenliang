<template>
  <div class="Class">
    <el-container>
      <el-aside width="100px">
          <ul class="ul">
              <li v-for="(item,index) of title" :key='item.index' :class="{active:currentindex===index}" @click='change(index)'>{{item}} </li>
          </ul>
      </el-aside>
      <el-main>
          <Cell
          v-for="(item) of $store.state.home.home"
            :key="item._id"
            :data="item"
            api-name="home"
          />
          <Cell
            v-for="(item) of $store.state.column.column"
            :key="item._id + 8 * item._id"
            :data="item"
            api-name="column"
          />
      </el-main>
    </el-container>

  </div>
</template>

<script>
import Cell from '../components/Cell'
export default {
  name: "Class",
  props: [],
  data() {
    return {
        title:['新品','众筹','小爱智能','小米手机','Redmi','黑鲨','电视','大家电',
        '电脑办公','小爱智能','路由器','生活电器','厨房电器','智能穿戴','智能家居','车载出行',
        '个护健康','数码配件','日用百货','有品精选','全部商品','服务','米粉卡','零售店'],
        currentindex:0
    };
  },
  components: {Cell},
  mounted() {
       this.$store.dispatch(`home/${this.$types.HOME}`)
       this.$store.dispatch(`column/${this.$types.COLUMN}`)
  },
  updated() {},
  methods: {
      change(index){
          this.currentindex=index
      }
  }
};
</script>
<style scoped>
.Class {
  padding: 1.2rem 0 0.8rem 0;
}
.Class .ul li{line-height: 50px;font-size: 0.22rem;}
.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 50px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}

.active{border-left: 0.04rem solid orange; color: orange;}


</style>