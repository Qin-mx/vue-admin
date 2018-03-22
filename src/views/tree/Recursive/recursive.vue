<template>
  <div>
      <li>
        <div @click='toggle'>
          {{mode.data.menuName}}
        </div>
        <ul v-show="open" v-if="isFolder">
          <items v-for="(cel, index ) in mode.childTreeNode" :mode="cel" :key="index"></items>
        </ul>
      </li>
  </div>
</template>
<script>
    export default {
      name: 'items', // name是重点
      props: {
        mode: {
          type: Object
        }
      },
      data() {
        return {
          open: true
        }
      },
      computed: {
        isFolder() {
          return this.mode.childTreeNode && this.mode.childTreeNode.length // 判断是否有子元素 有为true否则为false
        }
      },
      methods: {
        toggle() {
          if (this.isFolder) {
            this.open = !this.open
          }
        }
      }
    }
</script>