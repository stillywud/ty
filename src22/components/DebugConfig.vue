<template>
  <div class="debug-config-container">
    <el-form label-position="top" size="small">

      <el-form-item label="">
        <p class="j-p-tip">注：调试配置仅用于本次调试，不会影响实际使用</p>
      </el-form-item>

      <el-form-item label="设备类型">
        <el-radio-group v-model="deviceType" @change="v=>toggleDebugDevice(v)">
          <el-radio-button label="auto">自适应</el-radio-button>
          <el-radio-button label="desktop">桌面端</el-radio-button>
          <el-radio-button label="mobile">移动端</el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-form-item v-if="deviceType === $DEVICE_TYPE.mobile" label="移动端表单宽度">
        <el-radio-group v-model="mobileWidth" @change="v=>toggleMobileWidth(v)">
          <el-radio-button label="320px">320px</el-radio-button>
          <el-radio-button label="375px">375px</el-radio-button>
          <el-radio-button label="414px">414px</el-radio-button>
          <el-radio-button label="768px">768px</el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="更改主题颜色">
        <el-row :gutter="8">
          <el-col :span="10">
            <el-input v-model="primaryColor" readonly/>
          </el-col>
          <el-row :span="6">
            <el-color-picker v-model="primaryColor" :predefine="predefineColor" @change="v=>changeTheme(v)"/>
          </el-row>
        </el-row>
        <p class="j-p-tip">若要永久更改主题颜色，请到后台配置中更改</p>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>

  import { mapMutations } from 'vuex'
  import { DEVICE_TYPE, TOGGLE_DEBUG_DEVICE, TOGGLE_MOBILE_WIDTH } from '@/store/mutation-types'
  import { changeTheme } from '@/util/theme'

  export default {
    props: ['data'],
    data() {
      return {
        deviceType: 'auto',
        mobileWidth: '375px',
        // 主题颜色
        primaryColor: '#1890FF',
        // 主题预设颜色
        predefineColor: [
          '#F5222D',
          '#FA541C',
          '#FAAD14',
          '#13C2C2',
          '#52C41A',
          '#1890FF',
          '#2F54EB',
          '#722ED1'
        ],
      }
    },
    computed: {
      $DEVICE_TYPE: () => DEVICE_TYPE,
    },
    watch: {},
    created() {
    },
    methods: {
      ...mapMutations({
        toggleDebugDevice: TOGGLE_DEBUG_DEVICE,
        toggleMobileWidth: TOGGLE_MOBILE_WIDTH
      }),
      changeTheme(primaryColor) {
        if (primaryColor) {
          changeTheme(primaryColor)
          window['THEME_COLOR'] = primaryColor
        }
      },
    }
  }
</script>
