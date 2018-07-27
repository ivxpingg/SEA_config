<template>
    <Modal v-model="isShow"
           title="新增配置"
           ok-text="保存"
           @on-visible-change="modal_visible">
        <div>
            <Form ref="form_edit"
                  :model="infoEdit"
                  :rules="info_rules"
                  :label-width="80">
                <FormItem label="key:" prop="key">
                    <Input v-model="infoEdit.key" disabled>
                        <!--<span slot="prepend">{{infoEdit.appName}}</span>-->
                    </Input>
                </FormItem>
                <FormItem label="描述:" prop="title">
                    <Input type="text" v-model="infoEdit.title" />
                </FormItem>
                <FormItem label="VALUE:" prop="value">
                    <Input type="text" v-model="infoEdit.value" />
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
        name: "modalEdit",
        data() {
            return {
                isShow: false,
                infoEdit: {
                    appName: '',
                    key: '',
                    title: '',
                    value: '',
                    roleNo: this.$store.state.roleNo,
                    optUser: this.$store.state.account
                },
                info_rules: {
                    key: [
                        { required: true, message: '配置key不能为空!', trigger: 'blur' },
                        { type: 'string' ,min: 4, max: 100, message: '配置Key长度限制为4~100!', trigger: 'blur' }
                    ],
                    title: [
                        { required: true, message: '描述不能为空!', trigger: 'blur' }
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
                handler(val) {
                    this.infoEdit.appName = val.appName;
                    this.infoEdit.key = val.key;
                    this.infoEdit.title = val.title;
                    this.infoEdit.value = val.value;
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
                            url: '/conf/update',
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
                                    content: response.msg
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
