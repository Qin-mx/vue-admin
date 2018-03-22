<template>
  <div class="scroll-container" ref="scrollContainer" @wheel.prevent="handleScroll" >
    <div class="scroll-wrapper" ref="scrollWrapper" :style="{top: top + 'px'}">
      <slot></slot>
    </div>
  </div>
</template>

<script>
const delta = 15

export default {
  name: 'scrollBar',
  data() {
    return {
      top: 0
    }
  },
  methods: {
    // 处理滚动时距离
    handleScroll(e) {
      const eventDelta = e.wheelDelta || -e.deltaY * 3
      const $container = this.$refs.scrollContainer
      const $containerHeight = $container.offsetHeight // 浏览器高度
      const $wrapper = this.$refs.scrollWrapper
      const $wrapperHeight = $wrapper.offsetHeight // 内容高度

      if (eventDelta > 0) { // 如果大于0，则恢复到0
        this.top = Math.min(0, this.top + eventDelta)
      } else {
        if ($containerHeight - delta < $wrapperHeight) { // 如何浏览器高度-设置的高度 小于 内容高度
          if (this.top < -($wrapperHeight - $containerHeight + delta)) { // 内容高度-浏览器高度+设置的高度最后 为负
            this.top = this.top
          } else { // 内容高度-浏览器高度+设置的高度最后 为正
            this.top = Math.max(this.top + eventDelta, $containerHeight - $wrapperHeight - delta)
          }
        } else {
          this.top = 0
        }
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '../../styles/variables.scss';

.scroll-container {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: $menuBg;
  .scroll-wrapper {
    position: absolute;
     width: 100%!important;
  }
}
</style>
