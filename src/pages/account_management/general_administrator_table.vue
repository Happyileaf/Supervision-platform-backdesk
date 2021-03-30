<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.administrator_account"
        :placeholder="'账号'"
        style="width: 170px"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.access_level"
        :placeholder="'权限等级'"
        style="width: 110px"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.owner"
        :placeholder="'所有者'"
        style="width: 170px"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.department"
        :placeholder="'所在单位'"
        style="width: 170px"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-select
        v-model="listQuery.status"
        :placeholder="'状态'"
        clearable
        class="filter-item"
        style="width: 110px"
      >
        <el-option
          v-for="item in statusOptions"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
      <!-- <el-select v-model="listQuery.sort" style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />
      </el-select> -->
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >
        {{ $t("table.search") }}
      </el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >
        {{ $t("table.add") }}
      </el-button>
      <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
      >
        {{ $t("table.export") }}
      </el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
      @sort-change="sortChange"
    >
      <el-table-column
        :label="'序号'"
        prop="id"
        sortable="custom"
        align="center"
        width="80"
        :class-name="getSortClass('id')"
      >
        <template slot-scope="{ row }">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'账号'" width="180px" align="center">
        <template slot-scope="{ row }">
          <!-- <span>{{ row.administrator_account | parseTime('{y}-{m}-{d} {h}:{i}') }}</span> -->
          <span>{{ row.administrator_account }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'密码'" width="180px" align="center">
        <template slot-scope="{ row }">
          <span class="link-type" @click="handleUpdate(row)">{{
            row.administrator_password
          }}</span>
          <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
        </template>
      </el-table-column>
      <el-table-column :label="'邮箱'" width="180px" align="center">
        <template slot-scope="{ row }">
          <span class="link-type" @click="handleUpdate(row)">{{
            row.email
          }}</span>
          <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
        </template>
      </el-table-column>
      <el-table-column :label="'权限等级'" width="80px" align="center">
        <template slot-scope="{ row }">
          <!-- <span>{{ row.administrator_account | parseTime('{y}-{m}-{d} {h}:{i}') }}</span> -->
          <span>{{ row.access_level }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'用户名'" width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'所有者'" width="100px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.owner }}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="showReviewer"
        :label="$t('table.reviewer')"
        width="110px"
        align="center"
      >
        <template slot-scope="{ row }">
          <span style="color: red">{{ row.reviewer }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'所在单位'" min-width="180px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.department }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="'状态'"
        class-name="status-col"
        width="100"
        align="center"
      >
        <template slot-scope="{ row }">
          <el-tag :type="row.status | statusFilter">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        :label="'操作'"
        align="center"
        width="230"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row, $index }">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            {{ "编辑" }}
          </el-button>
          <el-button
            v-if="row.status != 'published'"
            size="mini"
            type="success"
            @click="handleModifyStatus(row, 'published')"
          >
            {{ "激活" }}
          </el-button>
          <el-button
            v-if="row.status != 'draft'"
            size="mini"
            @click="handleModifyStatus(row, 'draft')"
          >
            {{ "禁用" }}
          </el-button>
          <el-button
            v-if="row.status != 'deleted'"
            size="mini"
            type="danger"
            @click="handleDelete_confirm(row, $index)"
          >
            {{ "删除" }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="fetch_general_administrator_list"
    />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left: 50px"
      >
        <el-form-item :label="'账号'" prop="administrator_account">
          <el-input v-model="temp.administrator_account" disabled="true" placeholder="由系统生成"/>
        </el-form-item>
        <el-form-item :label="'密码'" prop="administrator_password">
          <el-input v-model="temp.administrator_password" />
        </el-form-item>
        <el-form-item :label="'邮箱'" prop="email">
          <el-input v-model="temp.email"/>
        </el-form-item>
        <el-form-item :label="'权限等级'" prop="access_level">
          <el-select
            v-model="temp.access_level"
            class="filter-item"
            placeholder="Please select"
          >
            <el-option
              v-for="item in access_levelOptions"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item :label="'用户名'" prop="username">
          <el-input v-model="temp.username" />
        </el-form-item>
        <el-form-item :label="'所有者'" prop="owner">
          <el-input v-model="temp.owner" />
        </el-form-item>
        <el-form-item :label="'所在单位'">
          <el-input v-model="temp.department" prop="department" />
        </el-form-item>
        <el-form-item :label="'状态'">
          <el-select
            v-model="temp.status"
            class="filter-item"
            placeholder="Please select"
          >
            <el-option
              v-for="item in statusOptions"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <!-- <el-form-item :label="$t('table.importance')">
          <el-rate v-model="temp.importance" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :max="3" style="margin-top:8px;" />
        </el-form-item> -->
        <!-- <el-form-item :label="$t('table.remark')">
          <el-input v-model="temp.remark" :autosize="{ minRows: 2, maxRows: 4}" type="textdepartment" placeholder="Please input" />
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          {{ $t("table.cancel") }}
        </el-button>
        <el-button
          type="primary"
          @click="dialogStatus === 'create' ? createData() : updateData()"
        >
          {{ $t("table.confirm") }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
import {
  fetchList,
  fetchPv,
  createArticle,
  updateArticle,
} from "@/api/article";
import waves from "@/directive/waves"; // waves directive
import { parseTime } from "@/utils";
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination

const calendarTypeOptions = [
  { key: "CN", display_name: "China" },
  { key: "US", display_name: "USA" },
  { key: "JP", display_name: "Japan" },
  { key: "EU", display_name: "Eurozone" },
];

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name;
  return acc;
}, {});

export default {
  name: "ComplexTable",
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "info",
        deleted: "danger",
      };
      return statusMap[status];
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type];
    },
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 20,
        administrator_account: '',
        access_level: '',
        username: '',
        owner: '',
        department: '',
        status: '',
      },

      dialogUpdate: '',
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      sortOptions: [
        { label: "ID Ascending", key: "+id" },
        { label: "ID Descending", key: "-id" },
      ],
      statusOptions: ["published", "draft"],
      access_levelOptions: [0, 1, 2, 3, 4, 5, 6],
      showReviewer: false,
      temp: {
        id: "",
        administrator_account: "",
        administrator_password: "",
        email:'',
        access_level: "",
        username: "",
        owner: "",
        department: "",
        status: "",
      },
      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        update: "Edit",
        create: "Create",
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [
          { required: true, message: "type is required", trigger: "change" },
        ],
        timestamp: [
          {
            type: "date",
            required: true,
            message: "timestamp is required",
            trigger: "change",
          },
        ],
        title: [
          { required: true, message: "title is required", trigger: "blur" },
        ],
      },
      downloadLoading: false,
    };
  },
  created() {
    // this.getList();
    this.fetch_general_administrator_list();
  },
  methods: {
    fetch_general_administrator_list() {
      axios({
        url: `API/admin/query2/${this.listQuery.page}`,
        method: "get",
        params: this.listQuery,
        transformRequest: [
          function (data) {
            data = qs.stringify(data);
            return data;
          },
        ],
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
        dataType: "json",
      })
        .then((res) => {
          console.log(res);
          console.log("working");
          this.list = res.data.data.list;
          this.total = res.data.data.total;

          // console.log(this.list)
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    search_general_administrator_list() {
      axios({
        url: `API/admin/search1/${this.listQuery.page}`,
        method: "get",
        params: this.listQuery,
        transformRequest: [
          function (data) {
            data = qs.stringify(data);
            return data;
          },
        ],
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
        dataType: "json",
      })
        .then((res) => {
          console.log(res);
          console.log("working");
          this.list = res.data.data.list;
          this.total = res.data.data.total;

          // console.log(this.list)
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    handleFilter() {
      this.listQuery.page = 1;
      // this.getList()
      this.search_general_administrator_list();
    },
    handleModifyStatus(row, status) {
      let status_interface = "";
      if (status == "published") {
        status_interface = "thaw";
      } else {
        status_interface = "frozen";
      }
      axios({
        url: `API/admin/${status_interface}`,
        method: "get",
        params: {
          administrator_account: row.administrator_account,
        },
        transformRequest: [
          function (data) {
            data = qs.stringify(data);
            return data;
          },
        ],
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
        dataType: "json",
      })
        .then((res) => {
          console.log(res);
          console.log("createData working");
        })
        .catch(function (error) {
          console.log(error);
        });

      this.$message({
        message: "操作成功",
        type: "success",
      });

      row.status = status;
    },

    resetTemp() {
      this.temp = {
        id: undefined,
        administrator_account: undefined,
        administrator_password: undefined,
        access_level: "",
        username: "",
        owner: "",
        department: "",
        status: "published",
      };
    },
    handleCreate() {
      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.dialogUpdate = false
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    createData() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          // this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          // this.temp.author = 'vue-element-admin'
          console.log(this.temp);
          axios({
            url: `API/admin/add`,
            method: "post",
            data: this.temp,
            transformRequest: [
              function (data) {
                data = qs.stringify(data);
                return data;
              },
            ],
            headers: {
              "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
            },
            dataType: "json",
          })
            .then((res) => {
              console.log(res);
              console.log("createData working");

              const index = this.list.findIndex((v) => v.id === this.temp.id);
              this.list.splice(index, 1, this.temp);
              this.dialogFormVisible = false;
              this.$notify({
                title: "成功",
                message: "更新成功",
                type: "success",
                duration: 2000,
              });
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      });
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row); // copy obj
      // this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.dialogUpdate = true
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    updateData() {
      let tempData = this.temp;

      axios({
        url: `API/admin/edit`,
        method: "post",
        data: this.temp,
        transformRequest: [
          function (data) {
            console.log(data);
            data = qs.stringify(data);
            return data;
          },
        ],
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
          //x-www-form-urlencoded
        },
        dataType: "json",
      })
        .then((res) => {
          console.log(res);
          console.log("updateData working");
          const index = this.list.findIndex((v) => v.id === this.temp.id);
          this.list.splice(index, 1, this.temp);
          this.dialogFormVisible = false;
          this.$notify({
            title: "成功",
            message: "更新成功",
            type: "success",
            duration: 2000,
          });
        })
        .catch((error) => {
          console.log("updateData error");
          console.log(error);
        });
    },

    handleDelete_confirm(row, index) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.handleDelete(row, index);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleDelete(row, index) {

      axios({
        url: `API/admin/delete`,
        method: "delete",
        params: {
          administrator_account: row.administrator_account,
        },
        transformRequest: [
          function (data) {
            
            console.log(data);
            
            data = qs.stringify(data);
            
            return data;
          },
        ],
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
        dataType: "json",
      })
        .then((res) => {
          console.log(res);
          console.log("handleDelete working");
        })
        .catch(function (error) {
          console.log(error);
        });
      this.$notify({
        title: "成功",
        message: "删除成功",
        type: "success",
        duration: 2000,
      });
      this.list.splice(index, 1);
    },

    handleDownload() {
      this.downloadLoading = true;
      import("@/vendor/Export2Excel").then((excel) => {
        const tHeader = [
          "序号",
          "账号",
          "密码",
          "权限等级",
          "用户名",
          "所有者",
          "所在单位",
          "状态",
        ];
        const filterVal = [
          "id",
          "administrator_account",
          "administrator_password",
          "access_level",
          "username",
          "owner",
          "department",
          "status",
        ];
        const data = this.formatJson(filterVal);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: "table-list",
        });
        this.downloadLoading = false;
      });
    },
    formatJson(filterVal) {
      return this.list.map((v) =>
        filterVal.map((j) => {
          if (j === "timestamp") {
            return parseTime(v[j]);
          } else {
            return v[j];
          }
        })
      );
    },



        sortChange(data) {
      const { prop, order } = data;
      if (prop === "id") {
        this.sortByID(order);
      }
    },
    sortByID(order) {
      if (order === "ascending") {
        this.listQuery.sort = "+id";
      } else {
        this.listQuery.sort = "-id";
      }
      this.handleFilter();
    },
        getSortClass: function (key) {
      const sort = this.listQuery.sort;
      return sort === `+${key}` ? "ascending" : "descending";
    },
  },
};
</script>
