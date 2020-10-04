<template>
  <div class="top">
      <i  class="fa fa-arrow-left icon" @click="$router.back()"></i>
      <div class="left">
          <slot name="left"></slot>
      </div>
      <div class="center">
          <slot name="center">
              <p>歌单</p>
          </slot>
      </div>
      <div class="right">
          <slot name="right"></slot>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.top{
    display: flex;
    justify-content: space-between;
    // margin: 0 10px;
    .icon{
        font-size: 20px;
    }
}
</style>>
