<template>
  <div class="app-container">
    <div style='margin:0 0 5px 20px'>固定标签</div>
    <fixed-table></fixed-table>

    <div style='margin:30px 0 5px 20px'>不固定标签</div>
    <unfixed-table></unfixed-table>
  </div>
</template>

<script>
import fixedTable from './fixedTable'
import unfixedTable from './unfixedTable'
export default {
  name: 'dynamicTable',
  components: { fixedTable, unfixedTable }
}
</script>