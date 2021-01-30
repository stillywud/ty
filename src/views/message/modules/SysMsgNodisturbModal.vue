<template>
    <j-modal
            :title="title"
            :width="width"
            :visible="visible"
            :confirmLoading="confirmLoading"
            switchFullscreen
            @ok="handleOk"
            @cancel="handleCancel"
            cancelText="关闭">
        <a-spin :spinning="confirmLoading">

            <a-form :form="form">
                <a-row>
                    <a-col :span="24">
                        <a-form-item label="消息类别" :labelCol="labelCol" :wrapperCol="wrapperCol">
                            <j-dict-select-tag type="list" v-decorator="['notifyType', validatorRules.notifyType]"
                                               dictCode="sys_msg_config,name,id,deleted=0 and no_disturb=1"
                                               :trigger-change="true" placeholder="请选择消息类别"/>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="11">
                        <a-form-item
                                :labelCol="{span: 11}"
                                :wrapperCol="{sm:10}"
                                label="免打扰时间段">
                            <template>
                                <a-time-picker format="HH:mm" v-decorator="['startTime', validatorRules.startTime]"
                                               v-bind="timePickerProps"/>
                                ~
                            </template>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">

                        <a-form-item style="margin-left: -11%"
                                     :labelCol="{span: 5}"
                                     :wrapperCol="wrapperCol" label="">
                            <template>
                                <a-time-picker format="HH:mm" v-decorator="['endTime', validatorRules.endTime]"
                                               v-bind="timePickerProps"/>
                            </template>
                        </a-form-item>
                    </a-col>
                </a-row>
                <!--<a-row>
                    <a-col :span="24">
                        <a-form-item label="用户" :labelCol="labelCol" :wrapperCol="wrapperCol">
                            <a-input v-decorator="['userId', validatorRules.userId]" placeholder="请输入用户" :disabled="disabled"></a-input>
                        </a-form-item>
                    </a-col>
                </a-row>-->
                <a-row>
                    <a-col :span="24">

                        <a-form-item label="备注" :labelCol="labelCol" :wrapperCol="wrapperCol">
                            <a-textarea v-decorator="['remark']" rows="4" placeholder="请输入备注"/>
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-form>
        </a-spin>
    </j-modal>
</template>

<script>

    import {httpAction} from '@/api/manage'
    import pick from 'lodash.pick'
    import moment from 'moment';
    import JDictSelectTag from "@/components/dict/JDictSelectTag"

    export default {
        name: "SysMsgNodisturbModal",
        components: {
            JDictSelectTag,
        },
        data() {
            return {
                form: this.$form.createForm(this),
                disabled:false,
                title: "操作",
                width: 800,
                visible: false,
                model: {},
                timePickerProps: {
                    format: 'HH:mm',
                    getPopupContainer: (node) => node.parentNode
                },
                labelCol: {
                    xs: {span: 24},
                    sm: {span: 5},
                },
                wrapperCol: {
                    xs: {span: 24},
                    sm: {span: 16},
                },
                confirmLoading: false,
                validatorRules: {
                    notifyType: {
                        rules: [
                            {required: true, message: '请输入消息类别!'},
                        ]
                    },
                    userId: {},
                    startTime: {
                        rules: [
                            {required: true, message: '请选择开始时间段!'},
                        ]
                    },
                    endTime: {
                        rules: [
                            {required: true, message: '请选择结束时间段!'},
                        ]
                    },
                },
                url: {
                    add: "/message/sysMsgNodisturb/add",
                    edit: "/message/sysMsgNodisturb/edit",
                }
            }
        },
        created() {
        },
        methods: {
            moment,
            add() {
                this.edit({});
            },
            edit(record) {
                this.form.resetFields();
                this.model = Object.assign({}, record);
                this.visible = true;
                this.model.userId = this.$store.getters.userInfo.username
                this.$nextTick(() => {
                    this.formatDateTime('HH:mm', this.model, ['startTime', 'endTime'], true)
                    this.form.setFieldsValue(pick(this.model, 'notifyType', 'userId', 'startTime', 'endTime', 'remark'))
                })
            },
            close() {
                this.$emit('close');
                this.visible = false;
            },
            handleOk() {
                const that = this;
                // 触发表单验证
                this.form.validateFields((err, values) => {
                    if (!err) {
                        that.confirmLoading = true;
                        let httpurl = '';
                        let method = '';
                        if (!this.model.id) {
                            httpurl += this.url.add;
                            method = 'post';
                        } else {
                            httpurl += this.url.edit;
                            method = 'put';
                        }
                        let formData = Object.assign(this.model, values);
                        this.formatDateTime('HH:mm', formData, ['startTime', 'endTime'])
                        httpAction(httpurl, formData, method).then((res) => {
                            if (res.success) {
                                that.$message.success(res.message);
                                that.$emit('ok');
                            } else {
                                that.$message.warning(res.message);
                            }
                        }).finally(() => {
                            that.confirmLoading = false;
                            that.close();
                        })
                    }

                })
            },
            handleCancel() {
                this.close()
            },
            popupCallback(row) {
                this.form.setFieldsValue(pick(row, 'notifyType', 'startTime', 'endTime', 'remark'))
            },
            formatDateTime(fmt, obj, keys, isString = false) {
                keys.forEach(key => {
                    let value = obj[key]
                    let arr = key.split('[]')
                    if (arr.length === 2) {
                        value = obj[arr[0]]
                        if (value) {
                            if (isString) {
                                obj[arr[0]] = value.split(',').map(v => moment(v, fmt))
                            } else {
                                obj[arr[0]] = value.map(v => v.format(fmt)).join(',')
                            }
                        } else {
                            obj[arr[0]] = undefined
                        }
                    } else if (value) {
                        obj[key] = isString ? moment(value, fmt) : value.format(fmt)
                    }
                })
            }

        }
    }
</script>
