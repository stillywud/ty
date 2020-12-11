<template>
  <!--单张图片-->
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
          单张图片
        </div>
      </div>
    </a-upload>
  </div>
</template>

<script>
  export default {
    name: "XJSingleImage",
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