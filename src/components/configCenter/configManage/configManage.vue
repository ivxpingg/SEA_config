<template>
    <div class="configManage-container">
        <vMenuTitle name="配置管理"></vMenuTitle>
        <div class="handle-bar">

            <div class="hd">
                <div class="form-item">
                    <label class="label">项目</label>
                    <div class="value">
                        <Select v-model="searchParams.appName"
                                @on-change="getTableData"
                                style="width: 250px">
                            <Option v-for="item in projectList"
                                    :value="item.appName"
                                    :label="item.title"></Option>
                        </Select>
                    </div>
                </div>
            </div>

            <div class="hd">
                <div class="form-item">
                    <label class="label">关键字</label>
                    <div class="value">
                        <Input v-model="searchParams.key" placeholder=""></Input>
                    </div>
                </div>
            </div>

            <div class="hd">
                <Button type="primary" @click="onClick_search">查询</Button>
            </div>

            <div class="hd">
                <Button type="primary" @click="onClick_add">新增配置</Button>
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
                   :appName="searchParams.appName"
                   @modal_getData="getTableData"
                   @modal_visible_change="modal_visible_change"></vModalAdd>

        <vModalEdit :modalValue="modal_value_edit"
                    :info="info_edit"
                    @modal_getData="getTableData"
                    @modal_visible_change="modal_visible_change"></vModalEdit>

        <Modal v-model="modal_data_look"
               title="查看"
               :width="350">
            <Form :label-width="40">
                <FormItem label="DB:">
                    <Input v-model="data_info_look.value" disabled />
                </FormItem>
                <FormItem label="ZK:">
                    <Input v-model="data_info_look.zkValue" disabled />
                </FormItem>
            </Form>
        </Modal>

        <Modal v-model="modal_data_history"
               title="变更历史"
               :width="450">
            <Table border
                   :height="300"
                   :data="tableData_history"
                   :columns="tableColumn_history"></Table>
        </Modal>


    </div>
</template>

<script>
    import MOMENT from 'moment';
    import vMenuTitle from '../../menuTitle/menuTitle';
    import vModalAdd from './modalAdd/modalAdd';
    import vModalEdit from './modalEdit/modalEdit';
    export default {
        name: "configManage_config",
        data() {
            var that = this;
            return {
                searchParams: {
                    pageNo: 1, // 当前页
                    pageSize: 10, // 每页几行
                    count: 0,     // 总页数
                    beginDate: '',
                    endDate: '',
                    appName: '',
                    key: '',
                    roleNo: this.$store.state.roleNo
                },
                tableLoading: true,
                tableColumn: [
                    { title: 'KEY', key: 'key', align: 'center' },
                    {
                        title: 'VALUE',
                        align: 'center',
                        render(h, params) {
                            if (params.value !== params.zkValue) {
                                return h('div',[
                                    h('span', {
                                        style: {
                                            color: 'red'
                                        }
                                    }, '数据位同步:'),
                                    h('Button', {
                                        props: {
                                            type: 'text'
                                        },
                                        style: {
                                            textDecoration: 'underline'
                                        },
                                        on: {
                                            click() {
                                                that.data_info_look.value = params.row.value;
                                                that.data_info_look.zkValue = params.row.zkValue;
                                                that.modal_data_look = true;
                                            }
                                        }
                                    } , '查看')
                                ])
                            }
                            else {
                                return h('div', params.row.value);
                            }
                        }
                    },
                    { title: '描述', key: 'title', align: 'center' },
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
                                        that.info_edit.key = params.row.key;
                                        that.info_edit.title = params.row.title;
                                        that.info_edit.value = params.row.value;
                                        that.modal_value_edit = true;
                                    }
                                }
                            } , '编辑');

                            btn_list.push(button1);

                            if (params.row.logList && params.row.logList.length > 0) {

                                button2 = h('Button', {
                                    props: {
                                        type: 'text'
                                    },
                                    style: {
                                        textDecoration: 'underline'
                                    },
                                    on: {
                                        click() {
                                            that.tableData_history = params.row.logList;
                                            that.modal_data_history = true;
                                        }
                                    }
                                }, '变更历史');

                                btn_list.push(button2);
                            }


                            button3 = h('Button', {
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
                                            content: '确定要删除<'+ params.row.title +'>配置？',
                                            onOk() {
                                                that.$http({
                                                    method: 'get',
                                                    url: '/conf/delete',
                                                    params: {
                                                        key: params.row.key
                                                    }
                                                }).then(function (response) {
                                                    if(response.status === 1) {
                                                        that.$Message.success({
                                                            content: '删除成功！'
                                                        })
                                                        that.getTableData();
                                                    }
                                                    else {
                                                        that.$Message.error({
                                                            content: response.msg
                                                        })
                                                    }
                                                })
                                            }
                                        })
                                    }
                                }
                            } , '删除');

                            btn_list.push(button3);

                            return h('div',btn_list);

                        }
                    }
                ],
                tableData: [],

                // 项目列表
                projectList: [],

                // 新增配置
                modal_value_add: false,
                // 编辑配置
                modal_value_edit: false,
                info_edit: {
                    appname: '',
                    key: '',
                    title: '',
                    value: ''
                },

                // 数据未同步查看
                modal_data_look: false,
                data_info_look: {
                    value: '',
                    zkValue: ''
                },

                // 查看历史记录
                modal_data_history: false,
                tableColumn_history: [
                    {
                        title: '操作时间',
                        // key: 'time',
                        width: 180,
                        align: 'center',
                        render(h, params) {
                            return h('div', MOMENT(params.row.addTime).format('YYYY-MM-DD HH:mm:ss'));
                        }
                    },
                    {
                        title: '配置value',
                        key: 'value',
                        align: 'center'
                    },
                    {
                        title: '操作人',
                        key: 'optUser',
                        align: 'center'
                    }
                ],
                tableData_history: []
            };
        },
        components: {vMenuTitle, vModalAdd, vModalEdit},
        watch: {
            'searchParams.pageNo': {
                handler(val) {
                    this.getTableData();
                }
            },
            'searchParams.appName': {
                handler(val) {
                    this.info_edit.appName = val;
                }
            },
            'searchParams.roleNo': {
                immediate: true,
                handler(val) {

                    if(val !== '') {
                        this.getProjectList();
                    }
                }
            }
        },
        mounted() {
        },

        methods: {
            /**
             * 页码切换
             * @param pageNo
             */
            onPageNo_change(pageNo) {
                this.searchParams.pageNo = pageNo;
            },

            // 获取项目列表
            getProjectList() {
                var that = this;
                that.$http({
                    method: 'get',
                    url: '/conf/list',
                    params: {
                        roleNo: that.searchParams.roleNo
                    }
                }).then(function (response) {
                    if (response.status === 1) {
                        that.projectList = response.result.ProjectList || [];
                        that.searchParams.appName = that.projectList.length === 0 ? '' : response.result.project.appName;
                    }
                    that.getTableData();
                })
            },

            getTableData() {
                var that = this;
                this.tableLoading = true;
                this.$http({
                    method: 'post',
                    url: '/conf/pageList',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    data: JSON.stringify(this.searchParams)
                }).then(function (response) {
                    that.tableLoading = false;
                    if (response.status === 1) {
                        that.tableData = response.result.list;
                        that.searchParams.count = response.result.count;
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
    .configManage-container {
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