<template>
  <div :style="{height:height+'px',zIndex:zIndex}">
    <div :class="className" :style="{top:stickyTop+'px',zIndex:zIndex,position:position,width:width,height:height+'px'}">
      <!-- <slot>
        <div>sticky</div>
      </slot> -->
      <div class="back"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sticky',
  props: {
    stickyTop: {
      type: Number,
      // default: 0
      default: 50
    },
    zIndex: {
      type: Number,
      default: 1
    },
    className: {
      type: String
    }
  },
  data() {
    return {
      active: false,
      position: '',
      currentTop: '',
      width: undefined,
      height: undefined,
      child: null,
      stickyHeight: 0
    }
  },
  mounted() {
    this.height = this.$el.getBoundingClientRect().height // 用于获取某个html元素相对于视窗的位置集合。
    window.addEventListener('scroll', this.handleScroll)
  },
  activated() {
    this.handleScroll()
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    sticky() {
      if (this.active) {
        return
      }
      this.position = 'fixed'
      this.active = true
      this.width = this.width + 'px'
    },
    reset() {
      if (!this.active) {
        return
      }
      this.position = ''
      this.width = 'auto'
      this.active = false
    },
    handleScroll() {
      this.width = this.$el.getBoundingClientRect().width
      const offsetTop = this.$el.getBoundingClientRect().top
      if (offsetTop <= this.stickyTop) {
        this.sticky()
        return
      }
      this.reset()
    }
  }
}
</script>
<style scoped>
  .back{
    background: #645545;
    height: 50px;
    
  }
</style>