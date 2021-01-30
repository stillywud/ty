<template>
  <a-card :loading="cardLoading" :bordered="false" style="height: 100%;">
    <a-spin :spinning="loading">
      <a-input-search @search="handleSearch" style="width:100%;margin-top: 10px; margin-bottom: 10px"
                      placeholder="输入角色进行查询..."/>
      <span>角色列表</span>
      <div style="overflow:auto; margin-top: 5px" v-bind:style="{'max-height': maxHeight}">
        <a-table
          ref="table"
          bordered
          rowKey="id"
          :columns="columns"
          :dataSource="dataSource"
          :pagination="true"
          :expandedRowKeys="expandedRowKeys"
          :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange, type:'radio'}"
          @expand="handleExpand">
<!--          <a-table-->
<!--            slot="expandedRowRender"-->
<!--            slot-scope="text"-->
<!--            :columns="innerColumns"-->
<!--            :dataSource="innerData"-->
<!--            size="middle"-->
<!--            bordered-->
<!--            rowKey="id"-->
<!--            :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange, type:'radio'}"-->
<!--            :pagination="true"-->
<!--            :loading="loading">-->
<!--          </a-table>-->
        </a-table>
      </div>
    </a-spin>
  </a-card>
</template>

<script>
  import { queryall, getUserWithRole } from '@/api/api'

  export default {
    name: 'RoleUserListLeft',
    props: ['value'],
    data() {
      return {
        cardLoading: true,
        loading: false,
        maxHeight: '0px',
        selectedRowKeys: [],
        // 列表表头
        columns: [
          {
            title: '角色',
            align: 'center',
            width: 120,
            dataIndex: 'roleName'
          },
          {
            title: '角色编码',
            align: 'left',
            dataIndex: 'roleCode'
          }
        ],
        roleList: [],
        userList: [],
        originalArray: [],
        dataSource: [],
        // 子表表头
        innerColumns: [
          {
            title: '姓名',
            align: 'center',
            width: 120,
            dataIndex: 'realname',
            key: 'name'
          },
          {
            title: '工号',
            dataIndex: 'workNo',
            align: 'left'
          }
        ],
        innerData: [],
        expandedRowKeys: []
      }
    },
    mounted() {
      // 监听浏览器窗体大小
      this.maxHeight = window.innerHeight - 240 + 'px'
      // 添加屏幕大小监听
      window.addEventListener('resize', this.windowResize, false)

      this.queryData()
    },
    methods: {
      windowResize() {
        setTimeout(() => {
          this.maxHeight = window.innerHeight - 240 + 'px'
        }, 300)
      },

      queryData() {
        this.loading = true
        this.cardLoading = true
        // 1.读取role列表 赋值给roleList
        queryall().then((resR) => {
          if (resR.success) {
            this.roleList = resR.result
            this.createTableData()
            // // 2.读取user列表 赋值给userList
            // getUserWithRole().then((resU) => {
            //   if (resU.success) {
            //     this.userList = resU.result
            //     this.createTableData()
            //   } else {
            //     this.$message.warn('用户查询失败：' + resU.message)
            //     console.error('用户查询失败:', resU)
            //   }
            // }).finally(() => {
            //   this.loading = false
            //   this.cardLoading = false
            // })
          } else {
            this.$message.warn('角色查询失败：' + resR.message)
            console.error('角色查询失败:', resR)
          }
        }).finally(() => {
          this.loading = false
          this.cardLoading = false
        })
      },
      createTableData() {
        this.dataSource = []
        for (let i in this.roleList) {
          let role = this.roleList[i]
          // for (let j in this.userList) {
          //   let user = this.userList[j]
          //   if (user.roleIds.indexOf(role.id) >= 0) {
          //     if (!role['users']) {
          //       role['users'] = []
          //     }
          //     user['roleName'] = role.roleName
          //     role['users'].push(user)
          //   }
          // }
          this.originalArray.push(role)
          this.dataSource = this.originalArray
        }
      },
      handleSearch(value) {
        this.selectedRowKeys = []
        this.$emit('selectItem', null)
        this.expandedRowKeys = []
        if (value) {
          let val = value.trim()
          let newArray = JSON.parse(JSON.stringify(this.originalArray))
          for (let i = newArray.length - 1; i >= 0; i--) {
            let role = newArray[i]
            // for (let j = role.users.length - 1; j >= 0; j--) {
            //   let user = role.users[j]
            //   if (user.realname.indexOf(val) === -1) {
            //     role.users.splice(j, 1)
            //   }
            // }
            // if (role.users.length === 0) {
            //   if (role.roleName.indexOf(val) === -1) {
            //     newArray.splice(i, 1)
            //   }
            // }
            if (role.roleName.indexOf(val) === -1) {
              newArray.splice(i, 1)
            }
          }
          this.dataSource = newArray
        } else {
          this.dataSource = this.originalArray
        }
      },

      emitInput(orgCode) {
        this.$emit('input', orgCode)
      },

      handleExpand(expanded, record) {
        this.expandedRowKeys = []
        this.innerData = []
        if (expanded === true) {
          // this.loading = true
          this.expandedRowKeys.push(record.id)
          this.innerData = record.users
        }
      },

      onSelectChange(selectedRowKeys, selectedRows) {
        this.selectedRowKeys = selectedRowKeys
        this.$emit('selectItem', selectedRows[0])
      }
    },
    destroyed() {
      // 取消屏幕大小监听
      window.removeEventListener('resize', this.windowResize)
    }
  }
</script>

<style scoped>

</style>