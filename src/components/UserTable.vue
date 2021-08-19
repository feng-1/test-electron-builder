<template>
  <div class="user_table">
    <div class="table_header">
      <a-button type="primary" @click="addUser">
        新增用户
      </a-button>
      <a-icon type="question-circle" theme="filled" class="icon" @click="openRemind" />
    </div>
    <a-table
      bordered
      :data-source="table_user_list"
      :columns="columns"
      :locale="{
        emptyText: '暂无数据',
      }"
      :pagination="false"
    >
      <template slot="action" slot-scope="e, record">
        <!-- <a-popconfirm
          title="是否删除该用户?"
          ok-text="确定"
          cancel-text="取消"
          @confirm="removeUser(record)"
        > -->
        <a-button type="danger" @click="removeUser(record)"> 删除 </a-button>
        <!-- </a-popconfirm> -->
      </template>
    </a-table>
    <a-pagination
      class="pagination"
      :current="pagination.current"
      :page-size="pagination.pageSize"
      :total="user_list.length"
      @change="paginationChange"
    />
    <AddModal
      :visible="visible"
      @handleCancel="handleCancel"
      @handleOk="handleOk"
    />
    <CreateModal :visible="create_visible" @closeModal="closeModal" />
  </div>
</template>

<script>
import AddModal from "@/components/AddModal.vue";
import CreateModal from "@/components/CreateModal.vue";
export default {
  name: "UserTable",
  components: {
    AddModal,
    CreateModal,
  },
  data() {
    return {
      user_list: [],
      columns: [
        {
          title: "序号",
          dataIndex: "id",
          align: "center",
        },
        {
          title: "注册时间",
          dataIndex: "create_time",
          align: "center",
        },
        {
          title: "账号名",
          dataIndex: "user_name",
          align: "center",
        },
        {
          title: "操作",
          dataIndex: "action",
          align: "center",
          scopedSlots: { customRender: "action" },
        },
      ],
      pagination: {
        total: 10,
        pageSize: 8,
        current: 1,
      },
      visible: false,
      create_visible: false,
      is_create: false,
      index: 5,
    };
  },
  computed: {
    table_user_list() {
      return this.user_list.slice(
        (this.pagination.current - 1) * this.pagination.pageSize,
        this.pagination.current * this.pagination.pageSize
      );
    },
  },
  mounted() {
    this.getUserList();
  },
  watch: {
    user_list() {
      this.storage("user_list", this.user_list);
      this.pagination.total = this.user_list.length;
    },
  },
  methods: {
    paginationChange(e) {
      // this.pagination = { ...e };
      this.pagination.current = e;
      this.storage("page", this.pagination);
      this.getUserList();
    },
    getUserList() {
      this.readStorage();
      if (!this.user_list.length && !this.is_create) {
        this.create_visible = true;
        this.is_create = true;
        this.storage("is_create", this.is_create);
        this.user_list = [
          {
            id: 4,
            key: 4,
            create_time: "2020/02/03 15:44",
            user_name: "test04",
          },
          {
            id: 3,
            key: 3,
            create_time: "2020/01/23 15:44",
            user_name: "test03",
          },
          {
            id: 2,
            key: 2,
            create_time: "2020/01/02 15:44",
            user_name: "test02",
          },
          {
            id: 1,
            key: 1,
            create_time: "2020/01/06 15:44",
            user_name: "test01",
          },
        ];
      }
    },
    storage(key, value) {
      let his_storage = window.sessionStorage.index;
      let storage = his_storage ? JSON.parse(his_storage) : {};
      storage[key] = value;
      window.sessionStorage["index"] = JSON.stringify(storage);
    },
    removeUser(record) {
      this.user_list.splice(
        this.user_list.findIndex((e) => e.id == record.id),
        1
      );
    },
    addUser() {
      this.visible = true;
    },
    handleCancel() {
      this.visible = false;
    },
    handleOk(form) {
      this.visible = false;
      const item = {
        ...form,
        id: this.index,
        key: Date.now(),
        create_time: this.formatTime(),
      };
      this.index++;
      this.storage("list_index", this.index);
      if (this.pagination.current == 1) {
        this.user_list.unshift(item);
      } else {
        this.user_list.splice(
          (this.pagination.current - 1) * this.pagination.pageSize,
          0,
          item
        );
      }
    },
    formatTime(data) {
      let timer = data ? new Date(data) : new Date();
      let year = timer.getFullYear(),
        month =
          timer.getMonth() + 1 > 9
            ? timer.getMonth() + 1
            : `0${timer.getMonth() + 1}`, //月份是从0开始的
        day = timer.getDate() > 9 ? timer.getDate() : `0${timer.getDate()}`,
        hour = timer.getHours() > 9 ? timer.getHours() : `0${timer.getHours()}`,
        min =
          timer.getMinutes() > 9
            ? timer.getMinutes()
            : `0${timer.getMinutes()}`;
      // sec = timer.getSeconds()>9?timer.getSeconds():`0${timer.getSeconds()}`;
      let newTime = year + "/" + month + "/" + day + " " + hour + ":" + min;
      return newTime;
    },
    //读取本地缓存
    readStorage() {
      let his_storage = window.sessionStorage.index;
      if (his_storage) {
        try {
          let storage = JSON.parse(his_storage);
          let { page, user_list, is_create, list_index } = storage;
          if (page) {
            // this.pagination = { ...page };
          }
          if (user_list) {
            this.user_list = user_list;
          }
          if (list_index) {
            this.index = list_index;
          }
          if (is_create) {
            this.is_create = is_create;
          }
        } catch (err) {
          console.error("readStorage", err);
        }
      }
    },
    closeModal() {
      this.create_visible = false;
    },
    openRemind() {
      this.create_visible = true;
    }
  },
};
</script>

<style lang="scss" scoped>
.user_table {
  padding: 20px;
  background-color: #fff;
  height: 100%;
  .pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }
  .table_header{
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    .icon {
      font-size: 20px;
      line-height: 32px;
    }
  }
}
</style>
