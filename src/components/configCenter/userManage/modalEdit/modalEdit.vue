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
                    <Input v-model="infoEdit.key">
                        <span slot="prepend">{{infoEdit.appname}}</span>
                    </Input>
                </FormItem>
                <FormItem label="描述:" prop="desc">
                    <Input type="text" v-model="infoEdit.desc" />
                </FormItem>
                <FormItem label="VALUE:" prop="value">
                    <Input type="textarea" v-model="infoEdit.value" />
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
        name: "modalEdit_user",
        data() {
            return {
                isShow: false,
                infoEdit: {
                    appname: '',
                    key: '',
                    desc: '',
                    value: ''
                },
                info_rules: {
                    key: [
                        { required: true, message: '配置key不能为空!', trigger: 'blur' },
                        { type: 'string' ,min: 4, max: 100, message: '配置Key长度限制为4~100!', trigger: 'blur' }
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
                    this.infoEdit.appname = val.appname;
                    this.infoEdit.key = val.key;
                    this.infoEdit.desc = val.desc;
                    this.infoEdit.value = val.value;
                }
            }
        },
        methods: {
            modal_visible(value) {
                this.$emit('modal_visible_change', 'modal_value_edit', value);
            },

            onClick_save() {
                this.$refs['form_edit'].validate((valid) => {
                    console.log(valid);
                    if(valid) {}
                    else {}
                })
            }
        }
    }
</script>
