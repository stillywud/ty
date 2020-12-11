<!--选择零件公共组件-->
<template>
  <div>
    <div style="display: flex; margin-bottom: 5px; align-items: center;">
      <div style="margin-right: 16px;">{{title}}</div>
      <a-button type="primary" @click="showSelect">{{buttonText}}</a-button>
    </div>
    <a-modal v-model="openSelectModal"
             :title="placeholder"
             :width="1080"
             ok-text="确认"
             cancel-text="取消"
             :destroyOnClose="true"
             :maskClosable="false"
             @cancel="closeModal(false)"
             @ok="closeModal(true)">
      <div :loading="loading">
        <a-form layout="inline" class="ant-advanced-search-form" :form="form">
          <!-- 发货仓库-->
          <a-row :gutter="24">
            <a-col :span="8">
              <a-form-item label="发货仓库">
                <j-dict-select-tag v-model="formData.storehouse" title="发货仓库" dictCode="storehouse"
                                   placeholder="请选择发货仓库"/>
              </a-form-item>
            </a-col>
            <!-- 机种-->
            <a-col :span="8">
              <a-form-item label="机种">
                <j-dict-select-tag v-model="formData.category" title="机种" dictCode="mach_type" placeholder="请选择机种"/>
              </a-form-item>
            </a-col>
            <!-- 机型-->
            <a-col :span="8">
              <a-form-item label="机型">
                <j-dict-select-tag v-model="formData.modal" title="机型" dictCode="model" placeholder="请选择机型"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <!-- 大类-->
            <a-col :span="8">
              <a-form-item label="大类">
                <a-select v-model="formData.systemOne" placeholder="请选择大类" allowClear @change="systemOneChanged"
                          @select="systemOneSelected" :loading='oneLoading'>
                  <a-select-option v-for="(item,index) in systemOneArray" :value="item.system">
                    {{item.system}}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <!-- 小类-->
            <a-col :span="8">
              <a-form-item label="小类">
                <a-select v-model="formData.systemTwo" placeholder="请选择小类" allowClear @change="systemTwoChanged"
                          @select="systemTwoSelected" :loading='twoLoading'>
                  <a-select-option v-for="(item,index) in systemTwoArray" :value="item.systemtwo">
                    {{item.systemtwo}}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <!-- 零件名/件号-->
            <a-col :span="8">
              <a-form-item label="关键字">
                <a-input-search v-model="formData.keyword" placeholder="零件名/件号" enter-button="搜索" @search="onSearch"/>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
        <a-table ref="tableInfo"
                 class="table-with-sum"
                 bordered
                 style="margin-top: 10px;"
                 :data-source="dataSource"
                 :columns="columns"
                 :scroll="{ x: 1000, y: tableHeight}"
                 :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
                 :rowKey="record => record.partNo"
                 :loading="loading"
                 v-bind:style="{'min-height': (tableHeight + 170) + 'px'}">
          <template
            v-for="col in ['quantity']"
            :slot="col"
            slot-scope="text, record, index">
            <div :key="col">
              <a-input-number v-if="selectedRowKeys.indexOf(record.partNo) >= 0"
                              style="margin: -5px 0; width: 100%;"
                              :disabled="record.storagenum <= 0"
                              :placeholder="record.storagenum > 0 ? '请输入出库数量' : '当前库存数量为0'"
                              :min="1"
                              :max="record.storagenum"
                              @change="e => handleChange(e, record.partNo, col)"/>
              <template v-else>
                <!--{{ text }}-->
                <span style="color: #ccc; font-size: 13px;">选中行后可编辑</span>
              </template>
            </div>
          </template>
          <!--          <template slot="footer">-->
          <!--            <a-table size="small"-->
          <!--                     :data-source="sumSource"-->
          <!--                     :scroll="{ x: 1500}"-->
          <!--                     :columns="columnsSum"-->
          <!--                     :showHeader="false"-->
          <!--                     :pagination="false"-->
          <!--                     :bordered="false">-->
          <!--            </a-table>-->
          <!--          </template>-->
        </a-table>
        <!-- 测试倒计时-->
        <!--        <div>-->
        <!--          <table>-->
        <!--            <tr v-for="(item, index) in timeList">-->
        <!--              <td>{{item.title}}</td>-->
        <!--              <td>{{item.count}}</td>-->
        <!--              <td>{{item.time}}</td>-->
        <!--            </tr>-->
        <!--          </table>-->
        <!--        </div>-->
      </div>
    </a-modal>
  </div>

</template>

<script>
  // function InitTime(endTime) {
  //   let dd, hh, mm, ss = null
  //   let time = parseInt(endTime) - new Date().getTime()
  //   if (time <= 0) {
  //     return '结束'
  //   } else {
  //     dd = Math.floor(time / 60 / 60 / 24)
  //     hh = Math.floor((time / 60 / 60) % 24)
  //     mm = Math.floor((time / 60) % 60)
  //     ss = Math.floor(time % 60)
  //     let str = dd + '天' + hh + '小时' + mm + '分' + ss + '秒'
  //     return str
  //   }
  // }
  import {
    queryBrands,
    queryCategory,
    queryModals,
    queryTons,
    querySystemOne,
    querySystemTwo,
    queryPartInfoBySys
  } from '@/api/api'

  export default {
    name: 'SelectComponentWidget',
    props: {
      title: { type: String, default: '零件/物料清单' },
      buttonText: { type: String, default: '添加零件' },
      placeholder: { type: String, default: '请选择' },
      rows: { type: Array, default: () => [] },
      disabled: { type: Boolean, default: false }
    },
    data() {
      return {
        loading: false,
        openSelectModal: false,
        tableHeight: 420,
        form: this.$form.createForm(this),
        selectedRows: [],
        selectedRowKeys: [],
        dataSource: [],
        formData: {
          modal: 'PC200-7',
          keyword: ''
        },
        count: 2,
        columns: [
          { id: 1, title: '零件编号', dataIndex: 'partNo', key: 'no', width: 120 },
          { id: 2, title: '标准件数', dataIndex: 'qty', key: 'qty', width: 120 },
          { id: 3, title: '单位', dataIndex: 'unit', key: 'unit', width: 60 },
          { id: 4, title: '零件单价', dataIndex: 'price', key: 'price', width: 80 },
          { id: 5, title: '备货仓库', dataIndex: 'warehouse', key: 'warehouse', width: 120 },
          { id: 6, title: '当前库存', dataIndex: 'storagenum', key: 'inventory', width: 120 },
          {
            id: 7,
            title: '实际出库',
            dataIndex: 'quantity',
            key: 'outStock',
            width: 150,
            scopedSlots: { customRender: 'quantity' }
          }
        ],
        loading: false,
        oneLoading: false,
        systemOneArray: [],
        twoLoading: false,
        systemTwoArray: [],
        sumSource: [],
        timeList: [],
        interval: null
        // columnsSum: [
        //   { id: 1, title: '选择', dataIndex: 'select', key: 'select', width: 60 },
        //   { id: 1, title: '零件编号', dataIndex: 'no', key: 'no', width: 120 },
        //   { id: 2, title: '标准件数', dataIndex: 'quantity', key: 'quantity', width: 120 },
        //   { id: 3, title: '单位', dataIndex: 'unit', key: 'unit', width: 100 },
        //   { id: 4, title: '零件单价', dataIndex: 'price', key: 'price', width: 100 },
        //   { id: 5, title: '备货仓库', dataIndex: 'warehouse', key: 'warehouse', width: 150 },
        //   { id: 6, title: '当前库存', dataIndex: 'inventory', key: 'inventory', width: 150 },
        //   { id: 7, title: '实际出库', dataIndex: 'outStock', key: 'outStock', width: 150 }
        // ],
      }
    },
    watch: {
      openSelectModal(val) {
        if (val) {
          // this.$nextTick(() => {
          //   let dom = this.$refs.tableInfo.$el.querySelectorAll('.ant-table-body')[0]
          //   dom.addEventListener('scroll', () => {
          //     this.$refs.tableInfo.$el.querySelectorAll('.ant-table-body')[1].scrollLeft = dom.scrollLeft
          //   }, true)
          // })
          // 获取大类
          this.getSystemOne(this.formData.modal)
        }
      }
    },
    created() {
      // let list = [
      //   { 'title': '小心愿，大梦想', 'count': '34', 'time': '1525293470350' },
      //   { 'title': '杭州国际时装周童模招募', 'count': '36', 'time': '1525293470350' },
      //   { 'title': '怪兽bobo全线代言火爆杭城的联名秀招募童模啦！', 'count': '74', 'time': '1529253270350' },
      //   { 'title': '汉风唐韵 、别', 'count': '266', 'time': '1525753270350' },
      //   { 'title': '听说你们想和明星超模同台“PK”？', 'count': '97', 'time': '1525253270450' }
      // ]
      // list.map((obj, index) => {
      //   this.$set(
      //     obj, 'djs', InitTime(obj.time)
      //   )
      // })
      // this.timeList = list
      // console.log('test', this.timeList)
    },
    mounted() {
      this.tableHeight = window.innerHeight - 590
      window.onresize = () => {
        return (() => {
          this.tableHeight = window.innerHeight - 590
        })()
      }

      // // 测试数据
      // for (let i = 0; i < 200; i++) {
      //   let index = i
      //   let item = {
      //     no: index,
      //     key: index,
      //     quantity: 30,
      //     unit: '件',
      //     price: '12.32',
      //     warehouse: '仓库1234',
      //     inventory: '1000',
      //     outStock: '仓库1234'
      //   }
      //   if (this.sumSource.length === 0) {
      //     this.sumSource.push(item)
      //   }
      //   this.dataSource.push(item)
      // }
      // this.interval = setInterval(() => {
      //   for (let key in this.timeList) {
      //     let now = new Date().getTime()
      //     let dd = Math.floor(now / 1000 / 60 / 60 / 24)
      //     let hh = Math.floor((now / 1000 / 60 / 60) % 24)
      //     let mm = Math.floor((now / 1000 / 60) % 60)
      //     let ss = Math.floor((now / 1000) % 60)
      //     this.timeList[key]['time'] = dd + '天' + hh + '小时' + mm + '分' + ss + '秒'
      //   }
      // }, 1000)
    },
    methods: {
      handleChange(value, partNo, column) {
        const newData = [...this.dataSource]
        const target = newData.filter(item => partNo === item.partNo)[0]
        if (target) {
          target[column] = value
          this.dataSource = newData
        }
      },
      onSelectChange(selectedRowKeys, selectedRows) {
        this.selectedRows = selectedRows
        this.selectedRowKeys = selectedRowKeys
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
      },
      // 显示选择框
      showSelect() {
        this.openSelectModal = true
      },
      // 关闭选择框
      closeModal(confirm) {
        this.form.resetFields()
        this.formData = {}
        if (confirm) {
          this.$emit('confirm', this.selectedRows)
        } else {
          this.$emit('cancel')
        }
        this.openSelectModal = false
        this.selectedRowKeys = []
        this.dataSource = []
      },
      // 搜索
      onSearch() {
        this.getComponents()
      },
      // 大类选择回调
      systemOneChanged(value) {
        console.log('ssss', value)
        if (value == undefined) {
          this.systemTwoArray = []
          delete this.formData.systemTwo
        } else {
          this.getSystemTwo(this.formData.modal, value)
        }

      },
      systemTwoChanged(value) {
        console.log('dddd', value)
        this.getComponents()
      },
      systemOneSelected(value, option) {
        console.log('value', value)
        console.log('option', option)
      },
      systemTwoSelected(value, option) {
        console.log('value', value)
        console.log('option', option)
      },
      // 获取大类
      getSystemOne(modal) {
        let postData = { 'vclModel': modal }
        this.oneLoading = true
        querySystemOne(postData).then((res) => {
          if (res.success) {
            let array = []
            for (let i in res.result) {
              let item = res.result[i]
              if (item.systemID && item.systemID != '') {
                array.push(item)
              }
            }
            this.systemOneArray = array
          } else {
            this.$message.warn('获取大类失败：' + res.message)
            console.error('获取大类失败:', res)
          }
        }).finally(() => {
          this.oneLoading = false
        })
      },
      // 获取小类
      getSystemTwo(model, systemOne) {
        this.twoLoading = true
        let postData = { 'systemOne': systemOne, 'vclModel': model }
        querySystemTwo(postData).then((res) => {
          if (res.success) {
            let array = []
            for (let i in res.result) {
              let item = res.result[i]
              if (item.systemtwo && item.systemtwo != '') {
                array.push(item)
              }
            }
            this.systemTwoArray = array
          } else {
            this.$message.warn('获取大类失败：' + res.message)
            console.error('获取大类失败:', res)
          }
        }).finally(() => {
          this.twoLoading = false
        })
      },
      // 获取零件
      getComponents() {
        this.loading = true
        let postData = {
          systemoneid: 'sP0AAAAak4lZ2Ojw',
          systemtwoid: 'sP0AAAAaoI9Z2PzW',
          vclModel: this.formData.modal,
          storagename: 'XS石家庄小松零件仓库',
          keyword: this.formData.keyword
        }
        queryPartInfoBySys(postData).then((res) => {
          if (res.success) {
            this.dataSource = res.result.dataList
          } else {
            this.$message.warn('获取零件失败：' + res.message)
            console.error('获取零件失败:', res)
          }
        }).finally(() => {
          this.loading = false
        })
      }
    },
    destroyed() {
      // 切记页面销毁需要销毁
      clearInterval(this.interval)
    }
  }
</script>

<style>
  .ant-table td {
    white-space: nowrap;
  }

  .ant-advanced-search-form .ant-form-item {
    display: flex;
  }

  .ant-advanced-search-form .ant-form-item-control-wrapper {
    flex: 1;
  }

  .ant-advanced-search-form .ant-form-item-control {
    width: 200px;
  }

  .ant-advanced-search-form .ant-form-item-label {
    width: 80px;
  }


  .table-with-sum .ant-table-footer {
    padding: 0px;
  }

  .table-with-sum .ant-table-footer .ant-table-body {
    overflow: hidden !important;
  }

  .table-with-sum .ant-empty-normal {
    /*margin: 180px 0 !important;*/
  }

</style>