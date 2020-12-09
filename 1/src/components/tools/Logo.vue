<template>
    <div class="logo" style=" width: 200px; text-align: center;">
        <router-link :to="{name:'dashboard'}">

            <!-- update-begin- author:sunjianlei --- date:20190814 --- for: logo颜色根据主题颜色变化 -->
            <!--<img v-if="navTheme === 'dark'" src="~@/assets/logo-white.png" alt="logo">
            <img v-else src="~@/assets/logo.svg" alt="logo">-->
            <!-- update-begin- author:sunjianlei --- date:20190814 --- for: logo颜色根据主题颜色变化 -->
            <div v-if="navTheme === 'dark'&&layoutMode=='topmenu'">
                <h1 v-if="showTitle" style="color: #fff">{{ title }}</h1>
            </div>
            <div v-else-if="navTheme === 'dark'&&layoutMode=='sidemenu'">
                <h1 v-if="showTitle" style="color: #333">{{ title }}</h1>
            </div>
            <div v-else-if="navTheme === 'light'&&layoutMode=='topmenu'">
                <h1 v-if="showTitle" style="color: #333">{{ title }}</h1>
            </div>
            <div v-else>
                <h1 v-if="showTitle" style="color: #fff">{{ title }}</h1>
            </div>

        </router-link>
    </div>
</template>

<script>
    import {mixin} from '@/utils/mixin.js'

    export default {
        name: 'Logo',
        mixins: [mixin],
        props: {
            title: {
                type: String,
                default: '天远开发平台',
                required: false
            },
            showTitle: {
                type: Boolean,
                default: true,
                required: false
            }
        },
        mounted() {
        },
    }
</script>
<style lang="less" scoped>
    /*缩小首页布 局顶部的高度*/
    @height: 59px;

    .sider {
        box-shadow: none !important;
        .logo {
            height: @height !important;
            line-height: @height !important;
            box-shadow: none !important;
            transition: background 300ms;

            a {
                width: 200px !important;
                height: 59px !important;
                overflow: hidden;
                color: white;
                h1 {
                    color: #fff;
                }
                &:hover {
                    color: rgba(255, 255, 255, 0.8);
                }
            }
        }

        &.light .logo {
            background-color: @primary-color;
        }
    }
</style>
