<template>
  <a-modal
    title="上机题"
    :visible="visible"
    @cancel="closeModal"
  >
    <div>
      <p v-for="item in info" :key="item">{{item}}</p>
    </div>
    <template slot="footer">
      <a-button type="primary" @click="closeModal">确定</a-button>
    </template>
  </a-modal>
</template>

<script>
export default {
  name: "CreateModal",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      info: [
        '1. 可测功能点：新增用户 删除用户 分页',
        '2. 请实际操作该系统进行测试，口述你发现的bug',
        '3. 请站在用户角度，提出系统不合理的地方',
        '4. 根据你的测试经验，提出系统不合理的地方'
      ]
    };
  },
  methods: {
    closeModal() {
      this.$emit('closeModal')
    }
  },
};
</script>

<style lang="scss" scoped>
</style>