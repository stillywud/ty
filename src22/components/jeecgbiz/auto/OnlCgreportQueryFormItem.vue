<template>
  <el-form-item class="j-query-form-item" :class="{'is-mobile':isMobile}" :label="item.label" style="width: 100%;">
    <!-- 日期、日期时间 -->
    <template v-if="item.view === 'date' || item.view === 'datetime'">
      <div class="j-single-box" v-if="single_mode === item.mode">
        <el-date-picker v-model="queryParam[item.field]" v-bind="bindDataProps()"/>
      </div>
      <div class="j-group-box" v-else>
        <el-date-picker v-model="queryParam[item.field+'_begin']" v-bind="bindDataProps('开始')"/>
        <span class="j-group-divide">~</span>
        <el-date-picker v-model="queryParam[item.field+'_end']" v-bind="bindDataProps('结束')"/>
      </div>
    </template>
    <!-- select、radio、checkbox均展示为下拉框 -->
    <div class="j-single-box" v-else-if="item.view === 'list' || item.view === 'radio' || item.view === 'checkbox'">
      <el-select v-model="queryParam[item.field]" v-bind="bindSelectProps()">
        <el-option
            v-for="(op,opIndex) in dictOptions[item.field]"
            :key="opIndex"
            :label="op.text || item.label"
            :value="op.value"
        >
        </el-option>
      </el-select>
    </div>
    <!-- 普通输入框 -->
    <template v-else>
      <div class="j-group-box" v-if="group_mode === item.mode">
        <el-input class="j-form-item" v-model="queryParam[item.field+'_begin']" :placeholder="'请输入开始'+item.label"/>
        <span class="j-group-divide">~</span>
        <el-input class="j-form-item" v-model="queryParam[item.field + '_end']" :placeholder="'请输入结束'+item.label"/>
      </div>
      <div class="j-single-box" v-else>
        <el-input v-model="queryParam[item.field]" :placeholder="'请输入'+item.label"/>
      </div>
    </template>
  </el-form-item>
</template>

<script>

  export default {
    name: 'OnlineQueryFormItem',
    props: {
      item: {
        type: Object,
        default: () => {
        },
        required: true
      },
      dictOptions: {
        type: Object,
        default: () => {
        },
        required: true
      },
      queryParam: {
        type: Object,
        default: () => {
        },
        required: true
      },
      isMobile: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        single_mode: 'single',
        group_mode: 'group'
      }
    },
    methods: {
      bindDataProps(placeholder = '') {
        let { item } = this
        let props = {
          class: ['j-form-item'],
          placeholder: `请选择${placeholder}${item.label}`
        }
        if (item.view === 'datetime') {
          props['showTime'] = true
          props['dateFormat'] = 'YYYY-MM-DD HH:mm:ss'
        }
        return props
      },

      bindSelectProps() {
        let { item } = this
        let props = {
          class: ['j-form-item'],
          placeholder: `请选择${item.label}`
        }
        if (item.view === 'checkbox') {
          props['mode'] = 'multiple'
        }
        return props
      },

    },
  }
</script>

<style lang="scss" scoped>
  .j-query-form-item {
    margin-right: 0;

    /deep/ {
      .el-form-item__content {
        width: calc(100% - 100px);
      }
    }

    .j-single-box {
      width: 240px;

      .j-form-item {
        width: 100%;
      }
    }

    .j-group-box {
      width: 500px;

      .j-form-item {
        width: calc(50% - 15px);
      }

      .j-group-divide {
        width: 30px;
        text-align: center;
        display: inline-block;
      }
    }

    &.is-mobile {
      .j-single-box, .j-group-box, .j-form-item {
        width: 100% !important;
      }

      .j-group-box .j-form-item {
        margin-bottom: 8px;
      }

      .j-group-divide {
        display: none !important;
      }

      /deep/ {
        .el-form-item__content {
          width: 100%;
        }
      }
    }
  }
</style>
