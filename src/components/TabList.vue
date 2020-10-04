<template>
  <div class="tabList">
    <ul>
      <li>
        <router-link to="/">
          <div class="imgBox" @click="log" >
            <i class="fa fa-calendar-plus-o fa-2x icon" aria-hidden="true"></i>
          </div>
          <span>每日推荐</span>
        </router-link>
      </li>
      <li>
        <router-link to="/">
          <div class="imgBox"  @click="log" >
            <i class="fa fa-heartbeat fa-2x icon" aria-hidden="true"></i>
          </div>
          <span>私人FM</span>
        </router-link>
      </li>
      <li>
        <router-link to="/songs">
          <div class="imgBox">
            <i class="fa fa-list-ul fa-2x icon" aria-hidden="true"></i>
          </div>
          <span>歌单</span>
        </router-link>
      </li>
      <li>
        <router-link to="/rank">
          <div class="imgBox">
            <i class="fa fa-line-chart fa-2x icon" aria-hidden="true"></i>
          </div>
          <span>排行榜</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  methods:{
    log(){
      alert('待开发')
    }
  }
};
</script>

<style lang="less" scoped>
.tabList {
  ul {
    display: flex;
    justify-content: space-around;
    li {
      text-align: center;
      .imgBox {
        margin: 5px 0;
        width: 50px;
        height: 50px;
        background-color: #f30;
        border-radius: 50%;
        .icon {
          color: #f7f7f7;
          line-height: 50px;
        }
      }
      span{
          color: #000;
      }
    }
  }
}
</style>>

