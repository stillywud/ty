<template>
  <div>
    <label>标题</label>
    <a-input style="margin:10px 0;" v-model="xjpro.group_name"/>
  </div>
</template>

<script>
    export default {
        name: "XJTabPros",
        props: {
          'xjpro': Object
        },
    }
</script>

<style scoped>

</style>