<template>
    <div class="header-container">
        <div class="header-inner">
            <h2 class="logo-title"></h2>

            <div class="user-menu-panel">
                <ul class="user-ul">
                    <!--<li>-->
                    <!--<i class="icon iconfont icon-bianji"></i>-->
                    <!--<div class="name">修改密码</div>-->
                    <!--</li>-->
                    <li @click="onClick_logout">
                        <i class="icon iconfont icon-tuichu"></i>
                        <div class="name">退出系统</div>
                    </li>
                </ul>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "config-header",
        data() {
            return {};
        },
        methods: {
            onClick_logout() {
               // var path = Config[Config.env].path;
                // Cookie.write('uid', '', Date.now() - (86400000 * 7), path);
                // Cookie.write('token', '', Date.now() - (86400000 * 7), path);
                // Cookie.write('type', '', Date.now() - (86400000 * 7), path);
                // Cookie.write('syscode', '', Date.now() - (86400000 * 7), path);

                window.location.href = 'http://218.5.80.6:8091/OCEANAM/logout';
            }
        }
    }
</script>

<style lang="scss" scoped>
    .header-container {
        position: relative;
        height: 82px;
        transition: all 1s;
        background: url('./images/header-bg.png') no-repeat center center;
        background-size: 100% auto;
        border-bottom: 0px solid #bbc1ce;

        .header-inner {
            margin: 0 20px;
            /*width: 1200px;*/
            height: 100%;

            .logo-title {
                display: inline-block;
                float: left;
                padding-left: 68px;
                width: 820px;
                height: 100%;
                color: #FFF;
                background: url('./images/logo-title.png') no-repeat left center;
                cursor: pointer;
            }

            .user-menu-panel {
                float: right;
                margin-right: 20px;
                height: 100%;
                overflow: hidden;

                li {
                    float: left;
                    margin-top: 15px;
                    padding: 0 20px;
                    list-style: none;
                    color: rgba(255,255,255,0.8);
                    text-align: center;
                    cursor: pointer;
                    .icon {
                        font-size: 30px;
                        line-height: 30px;
                    }
                    .name {
                        font-size: 14px;
                    }

                    &:hover {
                        color: rgba(255,255,255,1);
                    }
                }
            }
        }
    }
</style>