<template>
  <div id="app">
    <Header v-if="$root.bNav"/>
    <loading v-if="$root.bLoading"/>

    <transition
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <keep-alive 
      :max=2
      :exclude="['Home']"
      >
        <router-view></router-view>
      </keep-alive>
    </transition>
  
    <Footer v-show="$root.bFoot"/>
  </div>
</template>

<script>
import Header from './Header'
import Footer from './Footer'
import Home from '../pages/Home'
import Follow from '../pages/Follow'
import Column from '../pages/Column'
import User from '../pages/User'
import Login from '../pages/Login'
import Reg from '../pages/Reg'
import Detail from '../pages/Detail'
import ShopCart from '../pages/ShopCart'
import loading from '../components/loading'
import News from '../pages/News'
import Class from '../pages/Class'
export default {
  name: 'App',
  components: {
    Header,Footer,Home,Follow,Column,User,Login,Reg,Detail,ShopCart,loading,News,Class
  },
  watch: {
    $route:{
      handler(nextValue,PrevValue){
        // console.log('路由发生变化',nextValue)
        let path = nextValue.path

        if(/home|follow|column|/.test(path)){
          this.$root.bNav=this.$root.bFoot=true

        }
        if(/detail|login|reg|news/.test(path)){
          this.$root.bNav=this.$root.bFoot=false
        }
        // if(path.includes('/user')){
        if(/user|shopcart/.test(path)){
          this.$root.bNav=false
          this.$root.bFoot=true
        }
      },
      immediate:true
    }
  }
}
</script>

<style>

</style>
