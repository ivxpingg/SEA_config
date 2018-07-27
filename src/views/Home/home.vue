<template>
    <div class="home-container">
        <vHeader class="p-header"></vHeader>
        <div class="content-box">
            <div class="left-panel">
                <Menu theme="light"
                      :open-names="open_names"
                      :active-name= "active_name"
                      @on-select="onSelect_menu"
                      @on-open-change="onOpenChange_menu"
                      accordion>
                    <Submenu name="1">
                        <template slot="title">
                            <Icon type="gear-b"></Icon>
                            配置管理中心
                        </template>
                        <MenuItem name="1-1">配置管理</MenuItem>
                        <MenuItem name="1-2">项目管理</MenuItem>
                        <!--<MenuItem name="1-3">用户管理</MenuItem>-->
                    </Submenu>
                    <Submenu name="2">
                        <template slot="title">
                            <Icon type="ios-list"></Icon>
                            日志中心
                        </template>
                        <MenuItem name="2-1">用户操作日志</MenuItem>
                        <MenuItem name="2-2">操作运行日志</MenuItem>
                    </Submenu>
                    <MenuItem name="3-1"><Icon type="gear-b"></Icon>微分析配置</MenuItem>
                    <!--<Submenu name="3">-->
                        <!--<template slot="title">-->
                            <!--<Icon type="gear-b"></Icon>-->
                            <!--全景分析管理中心-->
                        <!--</template>-->

                    <!--</Submenu>-->
                </Menu>
            </div>
            <div class="right-panel">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    import vHeader from '../../components/Header/header';
    export default {
        name: "home",
        data() {
            return {
                menu: {
                    '1-1': { name: 'configManage' },
                    '1-2': { name: 'projectManage' },
                    // '1-3': { name: 'userManage' },
                    '2-1': { name: 'userLog' },
                    '2-2': { name: 'systemLog' },
                    '3-1': { name: 'addTheme' },
                },
                open_names: ['1'],
                active_name: '1-1'
            };
        },
        components: {vHeader},
        created() {
            if (this.$route.name === 'person') {
                this.$router.replace({
                    name: 'orderManage'
                });
            }

            for (var key in this.menu) {
                if (this.menu[key].name === this.$route.name) {
                    this.active_name = key;
                    this.open_names = [key.split('-')[0]];
                    break;
                }
            }
        },
        methods: {
            onSelect_menu(name) {
                this.$router.push({
                    name: this.menu[name].name
                });
            },
            onOpenChange_menu(name) {
                // this.$router.push({
                //     name: this.menu[name].name
                // });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .home-container {
        position: relative;
        height: 100%;
        .p-header {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            z-index: 999;
        }
        .content-box {
            display: flex;
            padding-top: 82px;
            height: 100%;
            overflow-x: hidden;
            overflow-y: auto;

            .left-panel {
                width: 241px;
                height: 100%;
                border-right: 1px solid #dddee1;
                background-color: #FFF;

                .menu-title {
                    color: #FFF;
                    font-size: 20px;
                    text-align: center;
                    line-height: 45px;
                    font-weight: 700;
                    border-bottom: 1px solid #363e4f;
                }

                .ivu-menu {
                    &:after {
                        display: none;
                    }
                }
            }
            .right-panel {
                flex: 1;
                padding: 0;
                overflow-x: hidden;
            }
        }
    }
</style>