<template>
  <div class="banner-container">
    <ul
      ref="bannerContent"
      class="banner-img"
      :style="{
          width:100*banner.length+'%',
          marginLeft:-index * 100 +'%'
          }">
      <li v-for="(item,i) in banner" :key="i"
       
      >
        <img :src="item.pic">
      </li>
    </ul>
    <ul class="tab">
      <li v-for="(item,i) in banner" :key="i" :class="{active:index==i}" @click="index=i"></li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    banner: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      index: 0,
      timer:null
    };
  },
  created() {
    this.autoStart();
  },
  destroyed(){
    this.autoStop();
  },
  methods: {
    autoStart() {
      if(this.timer){
        return;
      }
      this.timer = setInterval(() => {
        this.index = (this.index + 1) % this.banner.length;
      }, 5000);
    },
    autoStop() {
      clearInterval(this.timer);
      this.timer=null;
    },
  }
};
</script>



<style lang="less" scoped>
.banner-container {
  position: relative;
  height: 150px;
  overflow: hidden;
  width: 100%;
}
.banner-container .banner-img {
  height: 100%;
  position: relative;
  transition: all 0.5s;
  display: flex;
  li{
    flex: 1;
    img{
      height: 150px;
      width: 100%;
    }
  }
}
.banner-container .tab {
  height: 10px;
  position: absolute;
  right: 30px;
  bottom: 10px;
}

.banner-container .tab li {
  display: inline-block;
  width: 10px;
  height: 10px;
  background-color: #ccc;
  border-radius: 50%;
  margin: 0 3px;
  cursor: pointer;
}
.banner-container .tab li.active {
  background-color: red;
}
</style>