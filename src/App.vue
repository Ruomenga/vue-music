<template>
  <div id="app">
    <nav-bar :titles = "tabs" class="navBar" />
    <keep-alive>
     <router-view   />
    </keep-alive>
     <player />
  </div>
</template>

<script>
import NavBar from "@/components/NavBar"
import Player from '@/components/common/player/Player'
export default {
  components:{
    NavBar,
    Player
  },
  data(){
    return {
      tabs:[
        {title:'我的',path:'/profile'},
        {title:'发现',path:'/'},
        {title:'排行榜',path:'/rank'},
        {title:'搜索',path:"/search"}
      ]
    }
  },
}
</script>
<style>
*{
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
}
.navBar{
  position: sticky;
  top: 0;
  background-color: #fff;
  z-index: 100;
}

</style>
