<template>
    <Modal v-model="isShow"
           title="编辑项目"
           ok-text="保存"
           @on-visible-change="modal_visible">
        <div>
            <Form ref="form_edit"
                  :model="infoEdit"
                  :rules="info_rules"
                  :label-width="80">
                <FormItem label="AppName:" prop="appName">
                    <Input type="text" v-model="infoEdit.appName" disabled />
                </FormItem>
                <FormItem label="项目名称:" prop="title">
                    <Input type="text" v-model="infoEdit.title" />
                </FormItem>
            </Form>
        </div>
        <div slot="footer">
            <Button type="primary" @click="onClick_save">保存</Button>
        </div>
    </Modal>
</template>

<script>
    export default {
        name: "modalEdit_project",
        data() {
            return {
                isShow: false,
                infoEdit: {
                    appName: '',
                    title: '',
                    roleNo: this.$store.state.roleNo
                },
                info_rules: {
                    appName: [
                        { required: true, message: 'AppName不能为空!', trigger: 'blur' }
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
            },
            info: {
                type: Object,
                required: true,
                default() {
                    return {};
                }
            }
        },
        watch: {
            modalValue(val) {
                this.isShow = val;
            },
            info: {
                deep: true,
                immediate: true,
                handler(val) {
                    this.infoEdit.appName = val.appName;
                    this.infoEdit.title = val.title;
                }
            }
        },
        methods: {
            modal_visible(value) {
                this.$emit('modal_visible_change', 'modal_value_edit', value);
            },
            modal_close() {
                this.isShow = false;
                this.$emit('modal_visible_change', 'modal_value_edit', false);
            },

            onClick_save() {
                var that = this;
                this.$refs['form_edit'].validate((valid) => {
                    if(valid) {

                        that.$http({
                            method: 'get',
                            url: '/project/update',
                            params: that.infoEdit
                        }).then(function (response) {
                            if(response.status === 1) {
                                that.$Message.success({
                                    content: '更新成功！'
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
                })
            }
        }
    }
</script>
