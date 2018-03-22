<template>
  <div class="components-container">
      <code>列表拖拽，<a href="https://github.com/SortableJS/Vue.Draggable" target="_blank">Vue.Draggable</a></code>
      <div class="editor-container">
        <dnd-list :tags="list1"></dnd-list>
      </div>
  </div>
</template>

<script>
    import DndList from 'components/Draggable'
    export default {
      name: 'dndList-draggable',
      components: { DndList },
      data() {
        return {
          list1: [
            {
              name: 'vueasdfdg',
              order: '1'
            },
            {
              name: 'vueasdsh',
              order: '2'
            },
            {
              name: 'vueasdsh',
              order: '3'
            },
            {
              name: 'sdfg ',
              order: '4'
            },
            {
              name: 'sdfhg',
              order: '5'
            }
          ]
        }
      },
      methods: {
      }
    }
</script>