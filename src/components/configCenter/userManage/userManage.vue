<template>
    <div class="userManage-container">
        <vMenuTitle name="用户管理"></vMenuTitle>
        <div class="handle-bar">

            <div class="hd">
                <div class="form-item">
                    <label class="label">权限</label>
                    <div class="value">
                        <Select v-model="searchParams.permission"></Select>
                    </div>
                </div>
            </div>

            <div class="hd">
                <div class="form-item">
                    <label class="label">用户名</label>
                    <div class="value">
                        <Input v-model="searchParams.username" placeholder=""></Input>
                    </div>
                </div>
            </div>

            <div class="hd">
                <Button type="primary" @click="onClick_search">查询</Button>
            </div>

            <div class="hd">
                <Button type="primary" @click="onClick_add">新增用户</Button>
            </div>

        </div>

        <div class="table-panel">
            <Table border
                   :height="500"
                   :loading="tableLoading"
                   :columns="tableColumn"
                   :data="tableData"></Table>
        </div>
        <div class="list-page-panel">
            <Page :total="searchParams.count"
                  show-total
                  @on-change="onPageNo_change"></Page>
        </div>

        <vModalAdd :modalValue="modal_value_add"
                   @modal_visible_change="modal_visible_change"></vModalAdd>

        <vModalEdit :modalValue="modal_value_edit"
                    :info="info_edit"
                    @modal_visible_change="modal_visible_change"></vModalEdit>
    </div>
</template>

<script>
    import vMenuTitle from '../../menuTitle/menuTitle';
    import vModalAdd from './modalAdd/modalAdd';
    import vModalEdit from './modalEdit/modalEdit';
    export default {
        name: "userManage",
        data() {
            return {
                searchParams: {
                    start: 1, // 当前页
                    length: 10, // 每页几行
                    count: 0,     // 总页数
                    permission: '', // 权限
                    username: ''
                },
                tableLoading: false,
                tableColumn: [
                    { type: 'index',  title: '序号', width: 80, align: 'center' },
                    { title: '级别', key: 'logLevel', align: 'center' },
                    { title: '时间', key: 'insTime', align: 'center' },
                    { title: '来源', key: 'sysName', align: 'center' },
                    { title: '关键节点', key: 'keyNode', align: 'center' },
                    { title: '错误描述', key: 'errorDescription', align: 'center' },
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
                                        that.modal_value_edit = true;
                                    }
                                }
                            } , '编辑');


                            button3 = h('Button', {
                                props: {
                                    type: 'text'
                                },
                                style: {
                                    textDecoration: 'underline'
                                },
                                on: {
                                    click() {
                                        that.$Modal.info({
                                            title: '提示',
                                            content: '确定要删除？',
                                            onOk() {

                                            }
                                        })
                                    }
                                }
                            } , '删除');

                        }
                    }
                ],
                tableData: [],

                // 新增配置
                modal_value_add: false,
                // 编辑配置
                modal_value_edit: false,
                info_edit: {
                    permission: '',
                    username: '',
                    pwd: ''
                }
            };
        },
        components: {vMenuTitle, vModalAdd, vModalEdit},
        watch: {
            'searchParams.start': {
                handler(val) {
                    this.getTableData();
                }
            }
        },
        mounted() {
            this.getTableData();
        },

        methods: {
            /**
             * 页码切换
             * @param pageNo
             */
            onPageNo_change(pageNo) {
                this.searchParams.start = pageNo;
            },

            getTableData() {
                var that = this;
                this.tableLoading = true;
                this.$http({
                    method: 'post',
                    url: '/xxl-conf-admin/conf/pageList',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    data: JSON.stringify(this.searchParams)
                }).then(function (response) {
                    that.tableLoading = false;
                    if (response.status === 1) {
                        that.tableData = response.result.page.list;
                        that.searchParams.count = response.result.page.count;
                    }
                    else {
                        this.Message.error({
                            content: response.errMsg
                        });
                    }
                }).catch(function (e) {
                    that.tableLoading = false;
                })
            },

            onClick_search() {
                this.getTableData();
            },
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
            }
        }
    }
</script>

<style lang="scss" scoped>
    .userManage-container {
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