<template>
  <div id="userLayout" :class="['user-layout-wrapper', device]">
    <div class="container" :style="backgroundUrl">
      <div class="login-module" :class="loginPosition">
        <div class="top">
          <div class="header">
            <a href="/">
              <!--<img src="~@/assets/logo.svg" class="logo" alt="logo">-->
              <span class="title">{{sysName}}</span>
            </a>
          </div>
          <div class="desc">
            <!--Jeecg Boot 是中国最具影响力的 企业级 快速开发平台-->
          </div>
        </div>

        <route-view></route-view>
      </div>

<!--      <div class="footer">-->
<!--        <div class="links">-->
<!--          <a href="http://doc.jeecg.com" target="_blank">帮助</a>-->
<!--          <a href="https://github.com/zhangdaiscott/jeecg-boot" target="_blank">隐私</a>-->
<!--          <a href="https://github.com/zhangdaiscott/jeecg-boot/blob/master/LICENSE" target="_blank">条款</a>-->
<!--        </div>-->
<!--        <div class="copyright">-->
<!--          Copyright &copy; 2019 <a href="http://www.jeecg.com" target="_blank">JEECG开源社区</a> 出品-->
<!--        </div>-->
<!--      </div>-->
    </div>
    <div class="bottom-layer" v-html="icpInfo"></div>
    <sys-page-config style="display: none" @getPageConfig="changePageConfig"></sys-page-config>
  </div>
</template>

<script>
  import RouteView from "@/components/layouts/RouteView"
  import { mixinDevice } from '@/utils/mixin.js'
  import SysPageConfig from "../../views/system/SysPageConfig";

  export default {
    name: "UserLayout",
    components:
      { RouteView,
        SysPageConfig
      },
    mixins: [mixinDevice],
    props: {
      title: {
        type: String,
        default: "天远开发平台",
        required: false
      },
      showTitle: {
        type: Boolean,
        default: true,
        required: false
      }
    },
    data () {
      return {
        sysName: '天远开发平台',
        icpInfo: '',
        loginPosition: 'grid-position-5',
        backgroundUrl: ''
      }
    },
    mounted () {
      document.body.classList.add('userLayout')
    },
    beforeDestroy () {
      document.body.classList.remove('userLayout')
    },
    methods: {
      changePageConfig (sysPageConfig) {
        this.sysName = sysPageConfig.title;
        this.icpInfo = sysPageConfig.icp;
        this.loginPosition = 'grid-position-' + sysPageConfig.loginPosition;
        if (sysPageConfig.backgroundPicture){
          this.backgroundUrl = "backgroundImage:url(" + window._CONFIG['staticDomainURL'] + "/" + sysPageConfig.backgroundPicture.replace(/\\/g, '/') + ")";
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  #userLayout.user-layout-wrapper {
    height: 100%;

    &.mobile {
      .container {
        .main {
          max-width: 368px;
          width: 98%;
        }
      }
    }

    .container {
      width: 100%;
      min-height: 100%;
      background: #f0f2f5 url(~@/assets/background.svg) no-repeat 50%;
      background-size: 100%;
      position: relative;

      .login-module {
        width: 368px;
        position: absolute;
      }
      a {
        text-decoration: none;
      }

      .top {
        text-align: center;

        .header {
          height: 44px;
          line-height: 44px;

          .badge {
            position: absolute;
            display: inline-block;
            line-height: 1;
            vertical-align: middle;
            margin-left: -12px;
            margin-top: -10px;
            opacity: 0.8;
          }

          .logo {
            height: 44px;
            vertical-align: top;
            margin-right: 16px;
            border-style: none;
          }

          .title {
            font-size: 33px;
            color: rgba(0, 0, 0, .85);
            font-family: "Chinese Quote", -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
            font-weight: 600;
            position: relative;
            top: 2px;
          }
        }
        .desc {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.45);
          margin-top: 12px;
          margin-bottom: 40px;
        }
      }

      .main {
        min-width: 260px;
        width: 368px;
      }

      .footer {
        position: absolute;
        width: 100%;
        bottom: 0;
        padding: 0 16px;
        margin: 48px 0 24px;
        text-align: center;

        .links {
          margin-bottom: 8px;
          font-size: 14px;
          a {
            color: rgba(0, 0, 0, 0.45);
            transition: all 0.3s;
            &:not(:last-child) {
              margin-right: 40px;
            }
          }
        }
        .copyright {
          color: rgba(0, 0, 0, 0.45);
          font-size: 14px;
        }
      }
    }
    .bottom-layer {
      width: 100%;
      min-height: 40px;
      line-height: 40px;
      position: fixed;
      bottom: 0;
      background-color: #fbfbfb;
      margin: 0;
    }
    .grid-position-1 {
      top: 2%;
      left: 5%;
    }
    .grid-position-2 {
      top: 2%;
      left: 40%;
    }
    .grid-position-3 {
      top: 2%;
      right: 5%;
    }
    .grid-position-4 {
      top: 25%;
      left: 5%;
    }
    .grid-position-5 {
      top: 25%;
      left: 40%;
    }
    .grid-position-6 {
      top: 25%;
      right: 5%;
    }
    .grid-position-7 {
      bottom: 4%;
      left: 5%;
    }
    .grid-position-8 {
      bottom: 4%;
      left: 40%;
    }
    .grid-position-9 {
      bottom: 4%;
      right: 5%;
    }
  }
</style>
