<template>
    <div class="userLog-container">
        <vMenuTitle name="用户操作日志"></vMenuTitle>
        <div class="handle-bar">

            <div class="hd">
                <div class="form-item">
                    <label class="label">关键字</label>
                    <div class="value">
                        <Input v-model="searchParams_user.keyword" placeholder=""></Input>
                    </div>
                </div>
            </div>

            <div class="hd">
                <div class="form-item">
                    <label class="label">时间</label>
                    <div class="value">
                        <DatePicker :value="datePicker_default_user"
                                    :clearable="true"
                                    transfer
                                    format="yyyy-MM-dd"
                                    type="daterange"
                                    placeholder="日期选择"
                                    @on-change="datePicker_onChange_user"
                                    style="width: 220px"></DatePicker>
                    </div>
                </div>
            </div>

            <div class="hd">
                <Button type="primary" @click="onClick_search_user">查询</Button>
            </div>

        </div>
        <div class="table-panel">
            <Table border
                   :height="500"
                   :loading="tableLoading_user"
                   :columns="tableColumn_user"
                   :data="tableData_user"></Table>
        </div>
        <div class="list-page-panel">
            <Page :total="searchParams_user.count"
                  show-total
                  @on-change="onPageNo_change_user"></Page>
        </div>
    </div>
</template>

<script>
    import vMenuTitle from '../../menuTitle/menuTitle';
    export default {
        name: "userLog",
        data() {
            return {
                datePicker_default_user: [],
                searchParams_user: {
                    pageNo: 1, // 当前页
                    pageSize: 10, // 每页几行
                    count: 0,     // 总页数
                    keyword: '',
                    beginDate: '',
                    endDate: '',
                },
                tableLoading_user: false,
                tableColumn_user: [
                    { type: 'index', title: '序号', width: 80, align: 'center' },
                    { title: '时间', key: 'insTime', align: 'center' },
                    { title: '账号', key: 'operateAccount', align: 'center' },
                    { title: 'IP', key: 'ip', align: 'center' },
                    { title: '系统名称', key: 'sysName', align: 'center' },
                    { title: '操作类型', key: 'operateType', align: 'center' },
                    { title: '操作结果', key: 'operateResult', align: 'center' },
                    { title: '描述', key: 'description', align: 'center' }
                ],
                tableData_user: [],
            };
        },
        components: {vMenuTitle},
        watch: {
            'searchParams_user.pageNo': {
                handler(val) {
                    this.getTableData_user();
                }
            }
        },
        mounted() {
            this.getTableData_user();
        },
        methods: {
            datePicker_onChange_user(val) {
                this.searchParams_user.beginDate = val[0];
                this.searchParams_user.endDate = val[1];
            },
            /**
             * 页码切换
             * @param pageNo
             */
            onPageNo_change_user(pageNo) {
                this.searchParams_user.pageNo = pageNo;
            },

            getTableData_user() {
                var that = this;
                this.tableLoading_user = true;
                this.$http({
                    method: 'post',
                    url: '/log/userOperateLog/list',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    data: JSON.stringify(this.searchParams_user)
                }).then(function (response) {
                    that.tableLoading_user = false;
                    if (response.status === 1) {
                        that.tableData_user = response.result.page.list;
                        that.searchParams_user.count = response.result.page.count;
                    }
                    else {
                        this.Message.error({
                            content: response.errMsg
                        });
                    }
                }).catch(function (e) {
                    that.tableLoading_user = false;
                })
            },

            onClick_search_user() {
                this.getTableData_user();
            },
        }
    }
</script>

<style lang="scss" scoped>
    .userLog-container {

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