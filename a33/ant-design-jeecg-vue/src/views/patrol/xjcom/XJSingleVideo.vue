<template>
  <!--单个视频-->
  <div>
    <a-upload
      name="avatar"
      list-type="picture-card"
      class="avatar-uploader"
      :show-upload-list="false"
      disabled
      action="">
      <div>
        <a-icon type="plus" />
        <div class="ant-upload-text">
          单个视频
        </div>
      </div>
    </a-upload>
  </div>
</template>

<script>
  export default {
    name: "XJSingleVideo",
    props: {
        'xjdata': Object
    },
    data() {
      return {

      }
    },
    methods: {
    }
  }
</script>

<style scoped>

</style>