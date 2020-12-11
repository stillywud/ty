<template>
  <div>
    <label>标题</label>
    <a-input style="margin:10px 0;" v-model="xjpro.component_name"/>
  </div>
</template>

<script>
    export default {
        name: "XJCardPros",
        props: {
          'xjpro': Object
        },
    }
</script>

<style scoped>

</style>