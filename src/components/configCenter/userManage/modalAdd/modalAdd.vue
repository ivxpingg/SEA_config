<template>
    <Modal v-model="isShow"
           title="新增用户"
           ok-text="保存"
           @on-visible-change="modal_visible">
        <div>
            <Form ref="form_edit"
                  :model="info"
                  :rules="info_rules"
                  :label-width="80">
                <FormItem label="权限:" prop="permission">
                    <Input v-model="info.permission" />
                </FormItem>
                <FormItem label="用户名:" prop="desc">
                    <Input type="text" v-model="info.username" />
                </FormItem>
                <FormItem label="密码:" prop="value">
                    <Input type="text" v-model="info.pwd" />
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
        name: "modalAdd_user",
        data() {
            return {
                isShow: false,
                info: {
                    permission: '',
                    username: '',
                    pwd: ''
                },
                info_rules: {
                    username: [
                        { required: true, message: '配置key不能为空!', trigger: 'blur' }
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

            onClick_save() {
                this.$refs['form_add'].validate((valid) => {
                    console.log(valid);
                    if(valid) {}
                    else {}
                })
            }
        }

    }
</script>
