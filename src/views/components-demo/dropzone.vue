<template>
  <div class="components-container">
      <code>将图片上传至七牛 --来源https://github.com/PanJiaChen/vue-element-admin/blob/master/src/views/components-demo/dropzone.vue</code>
      <div class="editor-cotainer">
        <dropzone v-on:dropzone-removedFile="dropzoneR" v-on:dropzone-success="dropzoneS" id="myVueDropzone" url="https://httpbin.org/post"></dropzone>
      </div>
  </div>
</template>

<script>
    import Dropzone from 'components/Dropzone'
    export default {
      name: 'dropzone-demo',
      components: {
        Dropzone
      },
      methods: {
        dropzoneR(file) {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
        },
        dropzoneS(file) {
          this.$message({
            type: 'success',
            message: '上传成功'
          })
        }
      }
    }
</script>