<template>
  <div class="header">
    <div class="title"></div>
    <a-space class="user">
      <a-dropdown>
        <!-- <a-menu slot="overlay">
          <a-menu-item key="1"> <a-icon type="logout" />退出登录</a-menu-item>
        </a-menu> -->
        <span> admin </span>
      </a-dropdown>
    </a-space>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {};
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.header {
  background: #fff;
  box-shadow: 0 2px 4px #ccc;
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  .user {
    line-height: 60px;
  }
  .title {
    line-height: 60px;
    font-weight: bold;
    font-size: 16px;
  }
}
</style>
