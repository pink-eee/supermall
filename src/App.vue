<template>
  <div id="app">
    <keep-alive exclude="Detail,cart">
      <router-view></router-view>
    </keep-alive>   
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
// import MainTabBar from '../../../vue-cli2/tabbar/src/components/maintabbar/MainTabBar.vue'
import MainTabBar from './components/content/maintabbar/MainTabBar.vue'

export default {
  name: 'app',
  components: {
    MainTabBar
    
  }
}
</script>

<style>
@import "./assets/css/base.css"
</style>
