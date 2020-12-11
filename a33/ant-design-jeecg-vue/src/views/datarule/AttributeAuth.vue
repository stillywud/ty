<template>
  <a-row type="flex" :gutter="12">
    <a-col :md="8" :sm="24">
      <role-user-list-left @selectItem="selectItem"/>
    </a-col>
    <a-col :md="24-8" :sm="24">
      <attribute-list-right :row="selectedRow"/>
    </a-col>
  </a-row>
</template>

<script>
  import AttributeListRight from './modules/AttributeListRight'
  import RoleUserListLeft from './modules/RoleUserListLeft'

  export default {
    name: 'AttributeAuth',
    components: { AttributeListRight, RoleUserListLeft },
    data() {
      return {
        description: '对象属性授权',
        currentOrgCode: '',
        selectedRow: null
      }
    },
    methods: {
      selectItem(selected) {
        this.selectedRow = selected
      }
    }
  }
</script>

<style scoped>
  @import '~@assets/less/common.less';
</style>