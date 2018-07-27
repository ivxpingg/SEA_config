<template>
    <div class="modalAdd-container">
        <Modal v-model="isShow"
               title="新增项目"
               ok-text="保存"
               @on-visible-change="modal_visible">
            <div>
                <Form ref="form_add"
                      :model="info"
                      :rules="info_rules"
                      :label-width="80">
                    <FormItem label="AppName:" prop="appName">
                        <Input v-model="info.appName" placeholder="请输入AppName" />
                    </FormItem>
                    <FormItem label="项目名称:" prop="title">
                        <Input type="text" v-model="info.title" placeholder="请输入项目名称" />
                    </FormItem>
                </Form>
            </div>
            <div slot="footer">
                <Button type="primary" @click="onClick_save">保存</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    export default {
        name: "modalAdd_project",
        data() {
            return {
                isShow: false,
                info: {
                    appName: '',
                    title: '',
                    roleNo: this.$store.state.roleNo
                },
                info_rules: {
                    appname: [
                        { required: true, message: 'AppName不能为空!', trigger: 'blur' },
                        { min: 4, max: 100, message: 'AppName长度限制为4~100!', trigger: 'blur' }
                    ],
                    title: [
                        { required: true, message: '项目名称不能为空!', trigger: 'blur' }
                    ]
                }
            };
        },
        props: {
            modalValue: {
                type: Boolean,
                required: true,
                default() {
                    return false;
                }
            }
        },
        watch: {
            modalValue(val) {
                this.isShow = val;
            }
        },
        methods: {
            modal_visible(value) {
                this.$emit('modal_visible_change', 'modal_value_add', value);
            },
            modal_close() {
                this.isShow = false;
                this.$emit('modal_visible_change', 'modal_value_add', false);
            },

            onClick_save() {
                var that = this;

                this.$refs['form_add'].validate((valid) => {
                    if(valid) {
                        that.$http({
                            method: 'get',
                            url: '/project/save',
                            params: that.info
                        }).then(function (response) {
                            if(response.status === 1) {
                                that.$Message.success({
                                    content: '添加成功！'
                                })
                                that.$emit('modal_getData');
                                that.modal_close();
                            }
                            else {
                                that.$Message.error({
                                    content: response.errMsg
                                })
                            }
                        })
                    }
                    else {}
                });

            }
        }
    }
</script>
