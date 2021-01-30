<template>
  <div v-bind:style="{height: screenHeight + 'px'}" style="overflow:auto;">
    <router-view/>
  </div>
</template>

<script>

  export default {
    name: 'FullScreenLayout',
    data() {
      return {
        screenHeight: 0
      }
    },
    mounted() {
      this.screenHeight = window.innerHeight
      window.onresize = () => {
        return (() => {
          this.screenHeight = document.body.clientHeight
        })()
      }
    }
  }
</script>

<style scoped>

</style>
