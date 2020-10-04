<template>
  <div class="progress-bar" ref="progressBar" @click="progressClick" >
      <div class="bar-inner">
          <div class="progress" ref="progress"></div>
          <!-- 移动端touch事件 -->
          <div class="progress-btn-wrapper" ref="progressBtn">
              <div class="progress-btn"
                @touchstart.prevent = "progressTouchStart"
                @touchmove.prevent = "progressTouchMove"
                @touchend = "progressTouchEnd"
              ></div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    props:{
        precent: {
            type:Number,
            default:0
        }
    },
    watch:{
        precent(newPrecent){
            if(newPrecent >= 0 && !this.touch.initiated){
                const barWidth = this.$refs.progressBar.clientWidth;
                const offsetWidth = newPrecent * barWidth;
                this._offset(offsetWidth)
            }
        }
    },
    created(){
        // 用于存储一些共享数据
        this.touch = {}
    },
    methods:{
        // 当手指触摸屏幕时候触发
        progressTouchStart(e){
            // 初始化touch事件 true表示已经触发
            this.touch.initiated = true;
            // 记录按下时X的坐标  touches[0]表示手指
            this.touch.startX = e.touches[0].pageX
            // 按下时在进度条上拖动的距离
            this.touch.left = this.$refs.progress.clientWidth
        },
        // 当手指在屏幕上滑动的时候连续地触发
        progressTouchMove(e){
            // 如果没有触发touch事件，直接返回
            if(!this.touch.initiated){
                return
            }
            // 偏移的距离
            const deltaX = e.touches[0].pageX - this.touch.startX;
            // 限制拖动距离
            const offsetWidth = Math.min(this.$refs.progressBar.clientWidth,Math.max(0,this.touch.left + deltaX));
            // 设置小球和进度条的变化
            this._offset(offsetWidth);

        },
        // 当手指从屏幕上离开的时候触发
        progressTouchEnd(){
            // 关闭touch事件
            this.touch.initiated = false;
            // 获取当前进度的百分比
            this._triggerPrecent()
        },
        // 点击进度条
        progressClick(e){
            // 当点击按钮式，使用e.offsetX不对
            // this._offset(e.offsetX)
            const rect = this.$refs.progressBar.getBoundingClientRect();
            const offsetX = e.pageX - rect.left;
            this._offset(offsetX);
            this._triggerPrecent();
        },
        // 获取拖动之后歌曲播放的百分比
        _triggerPrecent(){
            // 进度条的长度
            const barWidth = this.$refs.progressBar.clientWidth;
            // 拖动之后的百分比
            const precent =  this.$refs.progress.clientWidth / barWidth;
            // 子传父告诉父组件拖动之后的百分比
            this.$emit("precentChange",precent)
        },
        // 设置小球和进度条的显示
        _offset(offsetWidth){
            // 进度条的偏移
            this.$refs.progress.style.width = `${offsetWidth}px`;
            // 小球的偏移
            this.$refs.progressBtn.style.transform = `translate3d(${offsetWidth}px,0,0)`;
        }
    }
}
</script>

<style lang="less" scoped >
    .progress-bar{
        height: 29.999px;
        width: 65.278vw;
        .bar-inner{
            position: relative;
            top: 13px;
            height: 4px;
            background: rgba(0, 0, 0, .3);
            .progress{
                position: absolute;
                height: 100%;
                background: #ffcd32;
            }
            .progress-btn-wrapper{
                position: absolute;
                left: -7.999px;
                top: -13px;
                height: 29.999px;
                width: 29.999px;
                .progress-btn{
                    position: relative;
                    top: 6.998px;
                    left: 6.998px;
                    box-sizing: border-box;
                    width: 15.998px;
                    height: 15.998px;
                    border: 2.999px solid #fff;
                    border-radius: 50%;
                    background: #ffcd32;
                }
            }
        }
    }
</style>