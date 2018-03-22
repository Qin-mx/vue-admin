<template>
  <div class="dndList">
    <h3>list</h3>
    <draggable v-model="tags" :move="getdata" @update="datadragEnd">
        <transition-group>
            <div v-for="element in tags" :key="element.order" class="dadList-list">
                {{element.name}}
            </div>
        </transition-group>
    </draggable>
 </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  name: 'DndList',
  components: { draggable },
  props: {
    tags: {
      type: Array,
      default() {
        return []
      }
    },
    width: {
      type: String,
      default: '48%'
    }
  },
  mounted() {
    console.log(this.tags)
  },
  methods: {
    getdata(evt) {
      console.log(evt.draggedContext.element.id)
    },
    datadragEnd(evt) {
      console.log('拖动前的索引 :' + evt.oldIndex)
      console.log('拖动后的索引 :' + evt.newIndex)
      console.log(this.tags)
    }
  }
}
</script>
<style scoped>
.dadList-list{
    padding:10px;
    margin-bottom:10px;
    border:1px solid #ccc;
}
</style>
