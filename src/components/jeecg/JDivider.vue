<template>

  <div v-if="element.options.type==='placeholder'" :style="style"></div>
  <div v-else :style="style">
    <el-divider
        :direction="element.options.type"
        :content-position="element.options.position"
    ><span>{{ element.options.text }}</span></el-divider>
  </div>

</template>

<script>
  export default {
    name: "JDivider",
    props: ['element'],
    data() {
      return {}
    },
    computed: {
      style() {
        let {heightNumber} = this.element.options
        return {
          margin: `${heightNumber / 2}px 0 ${heightNumber / 2}px 0`
        }
      },
    },
    methods: {}
  }
</script>

<style lang="scss" scoped></style>