<template>
  <a-modal
    title="新增用户"
    :visible="visible"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-form-model
      ref="ruleForm"
      autocomplete="off"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item
        ref="user_name"
        label="用户名"
        prop="user_name"
        :wrapperCol="{ span: 20 }"
      >
        <a-space>
          <a-input
            v-model="form.user_name"
            placeholder="请输入用户名"
            style="width: 250px"
            @blur="
              () => {
                $refs.user_name.onFieldBlur();
              }
            "
          />
          <span>可以输入任意字符</span>
        </a-space>
      </a-form-model-item>

      <div class="password">
        <a-form-model-item
          ref="password"
          label="用户密码"
          prop="password"
          :wrapperCol="{ span: 20 }"
        >
          <a-space>
            <a-input
              v-model="form.password"
              placeholder="请输入用户名"
              style="width: 250px"
              @blur="
                () => {
                  $refs.password.onFieldBlur();
                }
              "
            />
            <span>6位(数字和字母)组成</span>
          </a-space>
        </a-form-model-item>

        <a-form-model-item
          ref="repetition_password"
          label="确认密码"
          prop="repetition_password"
        >
          <a-input
            v-model="form.repetition_password"
            placeholder="请输入确认密码"
            style="width: 250px"
          />
        </a-form-model-item>
      </div>
    </a-form-model>
  </a-modal>
</template>

<script>
import { message } from "ant-design-vue";
export default {
  name: "AddModal",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 10 },
      form: {
        user_name: "",
        password: "",
        repetition_password: "",
      },
      rules: {
        user_name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [
          { required: true, message: "6位(数字和字母)组成", trigger: "blur" },
          { pattern: /^[A-Za-z0-9\s]+$/, message: "6位(数字和字母)组成" },
          { min: 6, message: "6位(数字和字母)组成" },
        ],
        repetition_password: [
          { required: true, message: "6位(数字和字母)组成", trigger: "blur" },
          { pattern: /^[A-Za-z0-9\s]+$/, message: "6位(数字和字母)组成" },
          { min: 6, message: "6位(数字和字母)组成" },
        ],
      },
    };
  },
  methods: {
    handleOk() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (this.form.password === this.form.repetition_password) {
            this.$emit("handleOk", { ...this.form });
            this.clearData();
          } else {
            message.error("两次密码不一致");
          }
        }
      });
    },
    handleCancel() {
      this.$emit("handleCancel");
      if (
        this.form.user_name &&
        this.form.password &&
        this.form.repetition_password
      ) {
        this.$emit("handleOk", { ...this.form });
      }
      this.clearData();
    },
    clearData() {
      this.form = {
        user_name: "",
        password: "",
        repetition_password: "",
      };
      this.$refs.ruleForm.resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
.password {
  /deep/.ant-form-item-required::before {
    display: none;
  }
}
</style>