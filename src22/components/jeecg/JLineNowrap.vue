<template>
  <div class="j-line-nowrap">
    <slot>{{text}}</slot>
  </div>
</template>

<script>
  export default {
    name: 'JLineNowrap',
    props: ['text']
  }
</script>

<style scoped>
  .j-line-nowrap {
    width: 100%;
    overflow: hidden;
    -ms-text-overflow: ellipsis;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>