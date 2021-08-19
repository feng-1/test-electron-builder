<template>
  <div class="page">
    <a-layout class="layout">
      <a-layout-sider
        breakpoint="lg"
        collapsed-width="0"
      >
        <div class="logo"></div>
        <a-menu theme="dark" mode="inline" :default-selected-keys="['1']">
          <a-menu-item key="1">
            <a-icon type="user" />
            <span class="nav-text">用户管理</span>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header class="layout_header">
          <Header />
        </a-layout-header>
        <a-layout-content>
          <Home />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import Header from '@/components/header.vue'
import Home from '@/components/UserTable.vue'
export default {
  name: "Layout",
  components: {
    Header,
    Home
  },
};
</script>

<style lang="scss" scoped>
.page {
  // width: 100vw;
  height: 100vh;
  // overflow: hidden;
  .layout {
    height: 100%;
    .logo{
      height: 32px;
      line-height: 32px;
      // background: rgba(255, 255, 255, 0.2);
      margin: 16px;
      color: #fff;
      text-align: center;
    }
    .layout_header{ 
      padding: 0;
      height: 60px;
      z-index: 999;
      background-color: #fff;
    }
  }
}
</style>
