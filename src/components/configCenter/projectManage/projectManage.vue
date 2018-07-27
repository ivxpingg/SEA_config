<template>
    <div class="projectManage-container">
        <vMenuTitle name="项目管理"></vMenuTitle>
        <div class="handle-bar">
            <div class="hd">
                <Button type="primary" @click="onClick_add">新增项目</Button>
            </div>

        </div>

        <div class="table-panel">
            <Table border
                   :height="500"
                   :loading="tableLoading"
                   :columns="tableColumn"
                   :data="tableData"></Table>
        </div>

        <vModalAdd :modalValue="modal_value_add"
                   @modal_getData="getData"
                   @modal_visible_change="modal_visible_change"></vModalAdd>

        <vModalEdit :modalValue="modal_value_edit"
                    :info="info_edit"
                    @modal_getData="getData"
                    @modal_visible_change="modal_visible_change"></vModalEdit>
    </div>
</template>

<script>
    import vMenuTitle from '../../menuTitle/menuTitle';
    import vModalAdd from './modalAdd/modalAdd';
    import vModalEdit from './modalEdit/modalEdit';
    export default {
        name: "projectManage",
        data() {
            var that = this;
            return {
                roleNo: this.$store.state.roleNo,

                tableLoading: false,
                tableColumn: [
                    { type: 'index',  title: '序号', width: 80, align: 'center' },
                    { title: 'AppName', key: 'appName', align: 'center' },
                    { title: '项目名称', key: 'title', align: 'center' },
                    {
                        title: '操作',
                        align: 'center',
                        render(h, params) {
                            var button1, button2, button3, btn_list = [];

                            button1 = h('Button', {
                                props: {
                                    type: 'text'
                                },
                                style: {
                                    textDecoration: 'underline'
                                },
                                on: {
                                    click() {
                                        that.info_edit.appName = params.row.appName;
                                        that.info_edit.title = params.row.title;
                                        that.modal_value_edit = true;
                                    }
                                }
                            } , '编辑');


                            button2 = h('Button', {
                                props: {
                                    type: 'text'
                                },
                                style: {
                                    textDecoration: 'underline'
                                },
                                on: {
                                    click() {
                                        that.$Modal.confirm({
                                            title: '提示',
                                            content: '确定要删除<'+ params.row.title +'>项目？',
                                            onOk() {
                                                that.$http({
                                                    method: 'get',
                                                    url: '/project/remove',
                                                    params: {
                                                        appName: params.row.appName
                                                    }
                                                }).then(function (response) {
                                                    if(response.status === 1) {
                                                        that.$Message.success({
                                                            content: '删除成功！'
                                                        })
                                                        that.getData();
                                                    }
                                                    else {
                                                        that.$Message.error({
                                                            content: response.errMsg
                                                        })
                                                    }
                                                })
                                            }
                                        })
                                    }
                                }
                            } , '删除');

                            btn_list.push(...[button1, button2]);

                            return h('div', btn_list);
                        }
                    }
                ],
                tableData: [],

                // 新增项目
                modal_value_add: false,

                // 编辑项目
                modal_value_edit: false,
                info_edit: {
                    appName: '',
                    title: ''
                }
            };
        },
        components: {vMenuTitle, vModalAdd, vModalEdit},
        watch: {
            roleNo: {
                immediate: true,
                handler(val) {
                    if (val !== '') {
                        this.getData();
                    }
                }
            }
        },
        created(){},
        mounted() {},
        methods: {
            onClick_add() {
                this.modal_value_add = true;
            },

            /**
             * 对话框状态变化修改时间
             * @param name [String]  对话框属性名
             * @param value [Boolean]
             */
            modal_visible_change(name, value) {
                this[name] = value;
            },

            // 获取表格数据
            getData() {

                var that = this;
                that.$http({
                    method: 'get',
                    url: '/project/list',
                    params: {
                        roleNo: that.roleNo
                    }
                }).then(function (response) {
                    if(response.status === 1) {
                        that.tableData = response.result.list;
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .projectManage-container {
        .handle-bar {
            padding: 17px 11px 20px 11px;
            border: {
                width: 0 0 1px 0;
                style: solid;
                color: #e1e1e1;
            };
            overflow: hidden;

            .hd {
                margin-right: 12px;
                float: left;

                .form-item {

                    .label {
                        text-align: right;
                        vertical-align: middle;
                        float: left;
                        font-size: 12px;
                        color: #495060;
                        line-height: 1;
                        padding: 10px 12px 10px 0;
                        box-sizing: border-box;
                    }
                    .value {
                        float: right;
                    }
                }
            }
        }

        .table-panel {
            margin: 13px ;
        }

        .list-page-panel {
            text-align: center;
        }
    }
</style>