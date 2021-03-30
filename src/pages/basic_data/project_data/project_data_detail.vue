<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="项目基本数据" name="first">
        <div class="Project_basic_data">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>{{ `${this.project_basic_data.project_name}` }}</span>
              <el-button style="float: right; padding: 3px 0" type="text"
                >操作按钮</el-button
              >
            </div>
            <el-row :gutter="10">
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="project_message">
                  <span
                    >项目名称：{{ this.project_basic_data.project_name }}</span
                  >
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="project_message">
                  <span>所属产业：{{ this.project_basic_data.industry }}</span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="project_message">
                  <span
                    >所属企业/单位：{{
                      this.project_basic_data.enterprise
                    }}</span
                  >
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12"
                ><div class="project_message">
                  <span>所属地区：{{ this.project_basic_data.area }}</span>
                </div>
              </el-col>
            </el-row>
            <el-divider></el-divider>
            <el-row :gutter="10">
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="project_message">
                  <span
                    >总投资：{{
                      this.project_basic_data.total_investment
                    }}万元</span
                  >
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12"
                ><div class="project_message">
                  <span
                    >年度计划投资：{{
                      this.project_basic_data.annual_investment_plan
                    }}万元</span
                  >
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="project_message">
                  <span
                    >累计完成投资：{{
                      this.project_basic_data.accumulated_investment
                    }}万元</span
                  >
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12"
                ><div class="project_message">
                  <span
                    >年度累计完成投资：{{
                      this.project_basic_data.total_annual_investment_completed
                    }}万元</span
                  >
                </div>
              </el-col>
            </el-row>
            <el-divider></el-divider>
            <el-row :gutter="10">
              <el-col :xs="24" :sm="24" :md="12" :lg="2" :xl="2">
                <div class="project_message">
                  <span>项目简介：</span>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="22" :xl="22"
                ><div class="project_message">
                  <span>{{
                    `${this.project_basic_data.project_introduction}`
                  }}</span>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </div>
      </el-tab-pane>
      <el-tab-pane label="项目完成进度" name="second">
        <div class="Progress_update">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>{{ `${this.project_basic_data.project_name}` }}</span>
              <el-button style="float: right; padding: 3px 0" type="text"
                >操作按钮</el-button
              >
            </div>
            <el-row :gutter="10">
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="project_message">
                  <span
                    >总投资：{{
                      this.project_completion_schedule.total_investment
                    }}万元</span
                  >
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12"
                ><div class="project_message">
                  <span
                    >年度计划投资：{{
                      this.project_completion_schedule.annual_investment_plan
                    }}万元</span
                  >
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="project_message">
                  <span
                    >累计完成投资：{{
                      this.project_completion_schedule.accumulated_investment
                    }}万元</span
                  >
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12"
                ><div class="project_message">
                  <span
                    >年度累计完成投资：{{
                      this.project_completion_schedule
                        .total_annual_investment_completed
                    }}万元</span
                  >
                </div>
              </el-col>
            </el-row>
            <el-divider></el-divider>
            <el-row :gutter="10">
              <el-col :xs="24" :sm="24" :md="12" :lg="3" :xl="3">
                <div class="project_message">
                  <span>项目形象进度：</span>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="21" :xl="21"
                ><div class="project_message">
                  <span>{{
                    `${this.project_completion_schedule.project_progress_description}`
                  }}</span>
                </div>
              </el-col>
            </el-row>
          </el-card>
          <div class="Progress_update_record">
            <div class="filter-container">
              <el-input
                v-model="listQuery.title"
                :placeholder="$t('table.title')"
                style="width: 200px"
                class="filter-item"
                @keyup.enter.native="handleFilter"
              />
              <el-select
                v-model="listQuery.importance"
                :placeholder="$t('table.importance')"
                clearable
                style="width: 90px"
                class="filter-item"
              >
                <el-option
                  v-for="item in importanceOptions"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
              <el-select
                v-model="listQuery.type"
                :placeholder="$t('table.type')"
                clearable
                class="filter-item"
                style="width: 130px"
              >
                <el-option
                  v-for="item in calendarTypeOptions"
                  :key="item.key"
                  :label="item.display_name + '(' + item.key + ')'"
                  :value="item.key"
                />
              </el-select>
              <el-select
                v-model="listQuery.sort"
                style="width: 140px"
                class="filter-item"
                @change="handleFilter"
              >
                <el-option
                  v-for="item in sortOptions"
                  :key="item.key"
                  :label="item.label"
                  :value="item.key"
                />
              </el-select>
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
              v-loading="false"
              :data="list"
              border
              fit
              highlight-current-row
              style="width: 100%"
              @sort-change="sortChange"
            >
              <el-table-column
                :label="$t('table.id')"
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
              <el-table-column
                :label="$t('table.date')"
                width="150px"
                align="center"
              >
                <template slot-scope="{ row }">
                  <span>{{
                    row.timestamp | parseTime("{y}-{m}-{d} {h}:{i}")
                  }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('项目名称')" width="250px">
                <template slot-scope="{ row }">
                  <span class="link-type" @click="handleUpdate(row)"
                    >{{
                    <!-- row.title -->
                    `山东大学国家大学科技园` }}</span
                  >
                </template>
              </el-table-column>
              <el-table-column
                :label="$t('月度完成投资')"
                width="150px"
                align="center"
              >
                <template slot-scope="{ row }">
                  <span>{{ row.author }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('项目形象进度')" min-width="80px">
                <template slot-scope="{ row }">
                  <svg-icon
                    v-for="n in +row.importance"
                    :key="n"
                    icon-class="star"
                    class="meta-item__icon"
                  />
                </template>
              </el-table-column>

              <el-table-column
                :label="$t('table.actions')"
                align="center"
                width="230"
                class-name="small-padding fixed-width"
              >
                <template slot-scope="{ row, $index }">
                  <el-button
                    type="primary"
                    size="mini"
                    style="margin-right: 10px"
                    @click="handleUpdate(row)"
                  >
                    Edit
                  </el-button>
                  <el-button
                    v-if="row.status != 'deleted'"
                    size="mini"
                    type="danger"
                    @click="handleDelete(row, $index)"
                  >
                    {{ $t("table.delete") }}
                  </el-button>
                </template>
              </el-table-column>
            </el-table>

            <pagination
              v-show="total > 0"
              :total="total"
              :page.sync="listQuery.page"
              :limit.sync="listQuery.limit"
              @pagination="getList"
            />

            <el-dialog
              :title="textMap[dialogStatus]"
              :visible.sync="dialogFormVisible"
            >
              <el-form
                ref="dataForm"
                :rules="rules"
                :model="temp"
                label-position="left"
                label-width="70px"
                style="width: 400px; margin-left: 50px"
              >
                <el-form-item :label="$t('table.type')" prop="type">
                  <el-select
                    v-model="temp.type"
                    class="filter-item"
                    placeholder="Please select"
                  >
                    <el-option
                      v-for="item in calendarTypeOptions"
                      :key="item.key"
                      :label="item.display_name"
                      :value="item.key"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item :label="$t('table.date')" prop="timestamp">
                  <el-date-picker
                    v-model="temp.timestamp"
                    type="datetime"
                    placeholder="Please pick a date"
                  />
                </el-form-item>
                <el-form-item :label="$t('table.title')" prop="title">
                  <el-input v-model="temp.title" />
                </el-form-item>
                <el-form-item :label="$t('table.status')">
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
                <el-form-item :label="$t('table.importance')">
                  <el-rate
                    v-model="temp.importance"
                    :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                    :max="3"
                    style="margin-top: 8px"
                  />
                </el-form-item>
                <el-form-item :label="$t('table.remark')">
                  <el-input
                    v-model="temp.remark"
                    :autosize="{ minRows: 2, maxRows: 4 }"
                    type="textarea"
                    placeholder="Please input"
                  />
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">
                  {{ $t("table.cancel") }}
                </el-button>
                <el-button
                  type="primary"
                  @click="
                    dialogStatus === 'create' ? createData() : updateData()
                  "
                >
                  {{ $t("table.confirm") }}
                </el-button>
              </div>
            </el-dialog>

            <el-dialog
              :visible.sync="dialogPvVisible"
              title="Reading statistics"
            >
              <el-table
                :data="pvData"
                border
                fit
                highlight-current-row
                style="width: 100%"
              >
                <el-table-column prop="key" label="Channel" />
                <el-table-column prop="pv" label="Pv" />
              </el-table>
              <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogPvVisible = false">{{
                  $t("table.confirm")
                }}</el-button>
              </span>
            </el-dialog>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="项目图片" name="third">
        <div class="Project_pictures_videos">
          <div class="project_pictures">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>{{ `${this.project_basic_data.project_name}` }}</span>
                <el-button style="float: right; padding: 3px 0" type="text"
                  >操作按钮</el-button
                >
              </div>
              <el-row :gutter="12">
                <el-col
                  :span="4"
                  v-for="(item, index) in 6"
                  :key="item"
                  :offset="index > 0 ? 0 : 0"
                >
                  <el-card
                    class="project_pictrues_card"
                    :body-style="{ padding: '0px' }"
                  >
                    <img
                      src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                      class="image"
                    />
                  </el-card>
                </el-col>
              </el-row>
            </el-card>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="项目视频" name="fourth">
        <div class="Project_videos">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>{{ `${this.project_basic_data.project_name}` }}</span>
              <el-button style="float: right; padding: 3px 0" type="text"
                >操作按钮</el-button
              >
            </div>
            <div class="project_videos_main">
              <div class="project_videos_content">
                <el-card
                  class="project_videos_card"
                  :body-style="{ padding: '0px' }"
                >
                  <video :src="video_play_url" class="video" controls />
                </el-card>
              </div>
              <div class="project_videos_urlList">
                <el-card class="box-card project_videos_urlList_card">
                  <div slot="header" class="clearfix">
                    <span>项目视频地址</span>
                    <el-button style="float: right; padding: 3px 0" type="text"
                      >操作按钮</el-button
                    >
                  </div>
                  <div
                    v-for="(item, index) in video_urlList"
                    :key="index"
                    class="text item"
                    @click="handle_change_video(item)"
                  >
                    {{ item.video_name }}
                  </div>
                </el-card>
              </div>
            </div>
          </el-card>
          <div class="project_videos_list">
            <div class="filter-container">
              <el-button
                class="filter-item"
                style="margin-left: 10px"
                type="primary"
                icon="el-icon-edit"
                @click="project_videos_handleCreate"
              >
                {{ $t("table.add") }}
              </el-button>
              <el-button
                v-waves
                :loading="downloadLoading"
                class="filter-item"
                type="primary"
                icon="el-icon-download"
                @click="project_videos_handleDownload"
              >
                {{ $t("table.export") }}
              </el-button>
            </div>

            <el-table
              :key="tableKey"
              v-loading="false"
              :data="project_videos_list"
              border
              fit
              highlight-current-row
              style="width: 100%"
              @sort-change="sortChange"
            >
              <el-table-column
                :label="$t('table.id')"
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
              <el-table-column
                :label="$t('视频名称')"
                width="500px"
                align="center"
              >
                <template slot-scope="{ row }">
                  <span>{{
                    row.timestamp | parseTime("{y}-{m}-{d} {h}:{i}")
                  }}</span>
                </template>
              </el-table-column>
              <el-table-column
                :label="$t('视频地址')"
                min-width="500px"
                align="center"
              >
                <template slot-scope="{ row }">
                  <span
                    class="link-type"
                    @click="project_videos_handleUpdate(row)"
                    >{{ row.title }}</span
                  >
                </template>
              </el-table-column>

              <el-table-column
                :label="$t('table.actions')"
                align="center"
                width="230"
                class-name="small-padding fixed-width"
              >
                <template slot-scope="{ row, $index }">
                  <el-button
                    type="primary"
                    size="mini"
                    style="margin-right: 10px"
                    @click="project_videos_handleUpdate(row)"
                  >
                    Edit
                  </el-button>
                  <el-button
                    v-if="row.status != 'deleted'"
                    size="mini"
                    type="danger"
                    @click="project_videos_handleDelete(row, $index)"
                  >
                    {{ $t("table.delete") }}
                  </el-button>
                </template>
              </el-table-column>
            </el-table>

            <pagination
              v-show="total > 0"
              :total="total"
              :page.sync="project_videos_listQuery.page"
              :limit.sync="project_videos_listQuery.limit"
              @pagination="getList"
            />

            <el-dialog
              :title="textMap[dialogStatus]"
              :visible.sync="project_videos_dialogFormVisible"
            >
              <el-form
                ref="project_videos_dataForm"
                :rules="rules"
                :model="project_videos_temp"
                label-position="left"
                label-width="70px"
                style="width: 400px; margin-left: 50px"
              >
                <el-form-item :label="'序号'" prop="id">
                  <el-input v-model="project_videos_temp.id" />
                </el-form-item>
                <el-form-item :label="'视频名称'" prop="video_name">
                  <el-input v-model="project_videos_temp.video_name" />
                </el-form-item>
                <el-form-item :label="'视频地址'" prop="video_url">
                  <el-input v-model="project_videos_temp.video_url" />
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="project_videos_dialogFormVisible = false">
                  {{ $t("table.cancel") }}
                </el-button>
                <el-button
                  type="primary"
                  @click="
                    dialogStatus === 'create' ? createData() : updateData()
                  "
                >
                  {{ $t("table.confirm") }}
                </el-button>
              </div>
            </el-dialog>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="项目实时视频" name="fifth">
        <div class="Project_RVC">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>{{ `${this.project_basic_data.project_name}` }}</span>
              <el-button style="float: right; padding: 3px 0" type="text"
                >操作按钮</el-button
              >
            </div>
            <div class="project_videos_main">
              <div class="project_videos_content">
                <el-card
                  class="project_videos_card"
                  :body-style="{ padding: '0px' }"
                >
                  <video
                    src="https://www.w3school.com.cn/example/html5/mov_bbb.mp4"
                    class="video"
                    controls
                  />
                </el-card>
              </div>
              <div class="project_videos_urlList">
                <el-card class="box-card project_videos_urlList_card">
                  <div slot="header" class="clearfix">
                    <span>项目视频地址</span>
                    <el-button style="float: right; padding: 3px 0" type="text"
                      >操作按钮</el-button
                    >
                  </div>
                  <div v-for="o in 10" :key="o" class="text item">
                    {{ "列表内容 " + o }}
                  </div>
                </el-card>
              </div>
            </div>
          </el-card>
        </div>
      </el-tab-pane>
    </el-tabs>
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
      activeName: "first",
      tableKey: 0,

      list: null,
      progress_update_list: null,
      project_videos_list: null,
      project_RVC_list: null,

      total: 0,
      progress_update_list_total: 0,
      project_videos_list_total: 0,
      project_RVC_list_total: 0,

      dialogFormVisible: false,
      progress_update_dialogFormVisible: false,
      project_videos_dialogFormVisible: false,
      project_RVC_dialogFormVisible: false,

      listLoading: true,

      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: "+id",
      },
      progress_update_listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: "+id",
      },
      project_videos_listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: "+id",
      },
      project_RVC_listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: "+id",
      },

      temp: {
        id: undefined,
        importance: 1,
        remark: "",
        timestamp: new Date(),
        title: "",
        type: "",
        status: "published",
      },
      progress_update_temp: {
        id: undefined,
        importance: 1,
        remark: "",
        timestamp: new Date(),
        title: "",
        type: "",
        status: "published",
      },
      project_videos_temp: {
        id: undefined,
        video_name: 1,
        video_url: "",
      },
      project_RVC_temp: {
        id: undefined,
        importance: 1,
        remark: "",
        timestamp: new Date(),
        title: "",
        type: "",
        status: "published",
      },

      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      sortOptions: [
        { label: "ID Ascending", key: "+id" },
        { label: "ID Descending", key: "-id" },
      ],
      statusOptions: ["published", "draft", "deleted"],
      showReviewer: false,
      temp: {
        id: undefined,
        importance: 1,
        remark: "",
        timestamp: new Date(),
        title: "",
        type: "",
        status: "published",
      },

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

      video_urlList: [
        {
          video_name: `视频一`,
          video_url: "https://www.w3school.com.cn/example/html5/mov_bbb.mp4",
        },
        {
          video_name: `视频二`,
          video_url: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4",
        },
        {
          video_name: `视频三`,
          video_url: "https://media.w3.org/2010/05/sintel/trailer.mp4",
        },
      ],

      video_play_url: `https://www.w3school.com.cn/example/html5/mov_bbb.mp4`,

      project_basic_data: {
        id: "1",
        project_name: "山东产业技术研究院高科技创新园项目",
        enterprise: "山东产业技术研究院",
        industry: "新一代信息技术",
        area: "济南市",
        total_investment: "1000000",
        accumulated_investment: "666666",
        annual_investment_plan: "100000",
        total_annual_investment_completed: "10000",
        project_introduction:
          "规划建设用地面积130847.3㎡，总建筑面积约为572755㎡，主要建设研发总部、中小企业研发厂房、标准化厂房、公寓及配套附属用房。项目建成后通过聚集创新资源，在真空电子技术、智能卫星技术等领域开展研究和服务。 规划建设用地面积130847.3㎡，总建筑面积约为572755㎡，主要建设研发总部、中小企业研发厂房、标准化厂房、公寓及配套附属用房。项目建成后通过聚集创新资源，在真空电子技术、智能卫星技术等领域开展研究和服务。",
      },
      project_completion_schedule: {
        project_progress_description:
          "南区5 6 7号楼主体施工，8 9 10号楼基本竣工；南区基础施工",
        total_investment: "1000000",
        accumulated_investment: "666666",
        annual_investment_plan: "100000",
        total_annual_investment_completed: "10000",
        project_progress_record: [
          {
            id: "1",
            issue_date: "2000-01-01",
            project_name: "山东产业技术研究院高科技创新园项目",
            monthly_investment_completed: "1000",
            project_progress_description:
              "南区5 6 7号楼主体施工，8 9 10号楼基本竣工；南区基础施工",
          },
          {
            id: "2",
            issue_date: "2000-01-01",
            project_name: "山东产业技术研究院高科技创新园项目",
            monthly_investment_completed: "1000",
            project_progress_description:
              "南区5 6 7号楼主体施工，8 9 10号楼基本竣工；南区基础施工",
          },
        ],
      },
      picture_video_data: {
        picture_url: [],
        video_url: [],
        RVC_url: [],
      },
    };
  },
  created() {
    // this.getList();
    this.fetch_project_data();
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    getList() {
      this.listLoading = true;
      fetchList(this.listQuery).then((response) => {
        this.list = response.data.items;
        this.total = response.data.total;

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false;
        }, 1.5 * 1000);
      });
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: "操作成功",
        type: "success",
      });
      row.status = status;
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
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: "",
        timestamp: new Date(),
        title: "",
        status: "published",
        type: "",
      };
    },
    handleCreate() {
      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    createData() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024; // mock a id
          this.temp.author = "vue-element-admin";
          createArticle(this.temp).then(() => {
            this.list.unshift(this.temp);
            this.dialogFormVisible = false;
            this.$notify({
              title: "成功",
              message: "创建成功",
              type: "success",
              duration: 2000,
            });
          });
        }
      });
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row); // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp);
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    updateData() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp);
          tempData.timestamp = +new Date(tempData.timestamp); // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateArticle(tempData).then(() => {
            const index = this.list.findIndex((v) => v.id === this.temp.id);
            this.list.splice(index, 1, this.temp);
            this.dialogFormVisible = false;
            this.$notify({
              title: "成功",
              message: "更新成功",
              type: "success",
              duration: 2000,
            });
          });
        }
      });
    },
    handleDelete(row, index) {
      this.$notify({
        title: "成功",
        message: "删除成功",
        type: "success",
        duration: 2000,
      });
      this.list.splice(index, 1);
    },
    handleFetchPv(pv) {
      fetchPv(pv).then((response) => {
        this.pvData = response.data.pvData;
        this.dialogPvVisible = true;
      });
    },
    handleDownload() {
      this.downloadLoading = true;
      import("@/vendor/Export2Excel").then((excel) => {
        const tHeader = ["timestamp", "title", "type", "importance", "status"];
        const filterVal = [
          "timestamp",
          "title",
          "type",
          "importance",
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
    getSortClass: function (key) {
      const sort = this.listQuery.sort;
      return sort === `+${key}` ? "ascending" : "descending";
    },

    handle_change_video(row) {
      console.log(row);
      this.video_play_url = row.video_url;
    },

    /* 
     初始化获取项目信息
    */

    fetch_project_data() {
      console.log("fetch_project_data start!");
      axios({
        url: `/REWRITE/yichun/project/1`,
        method: "get",
        params: this.project_videos_listQuery,
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
          console.log("fetch_project_data success!");
          console.log(res);
          render_project_data(res.data.detail);
        })
        .catch(function (error) {
          console.log(error);
        });
      this.project_videos_list = [{ id: 1 }];
    },

    render_project_data(data) {
      console.log(data);
    },

    /* 
     项目视频相关函数
    */
    project_videos_fetch_list() {
      console.log("project_videos_fetch_list start!");
      axios({
        url: `/REWRITE/yichun/project/1`,
        method: "get",
        params: this.project_videos_listQuery,
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
          console.log("project_videos_fetch_list success!");
          console.log(res);
          this.project_videos_list = res.data.data.list;

          this.project_videos_total = res.data.data.total;
        })
        .catch(function (error) {
          console.log(error);
        });
      this.project_videos_list = [{ id: 1 }];
    },

    project_videos_resetTemp() {
      this.project_videos_temp = {
        id: undefined,
        video_name: 1,
        video_url: "",
      };
    },
    project_videos_handleCreate() {
      this.resetTemp();
      this.dialogStatus = "create";
      this.project_videos_dialogFormVisible = true;
      this.project_videos_dialogUpdate = false;
      this.$nextTick(() => {
        this.$refs["project_videos_dataForm"].clearValidate();
      });
    },
    project_videos_createData() {
      this.$refs["project_videos_dataForm"].validate((valid) => {
        if (valid) {
          // this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          // this.temp.author = 'vue-element-admin'
          console.log(this.project_videos_temp);
          axios({
            url: `API/individual/add`,
            method: "post",
            data: this.project_videos_temp,
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

              const index = this.project_videos_list.findIndex(
                (v) => v.id === this.project_videos_temp.id
              );
              this.project_videos_list.splice(
                index,
                1,
                this.project_videos_temp
              );
              this.project_videos_dialogFormVisible = false;
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
    project_videos_handleUpdate(row) {
      this.project_videos_temp = Object.assign({}, row); // copy obj
      // this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = "update";
      this.project_videos_dialogFormVisible = true;
      this.project_videos_dialogUpdate = true;
      this.$nextTick(() => {
        this.$refs["project_videos_dataForm"].clearValidate();
      });
    },
    project_videos_updateData() {
      let tempData = this.project_videos_temp;

      axios({
        url: `API/individual/edit`,
        method: "post",
        data: this.project_videos_temp,
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
          const index = this.list.findIndex(
            (v) => v.id === this.project_videos_temp.id
          );
          this.project_videos_list.splice(index, 1, this.project_videos_temp);
          this.project_videos_dialogFormVisible = false;
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

    project_videos_handleDelete_confirm(row, index) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.project_videos_handleDelete(row, index);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    project_videos_handleDelete(row, index) {
      axios({
        url: `API/individual/delete`,
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
      this.project_videos_list.splice(index, 1);
    },

    project_videos_handleDownload() {
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
    project_videos_formatJson(filterVal) {
      return this.project_videos_list.map((v) =>
        filterVal.map((j) => {
          if (j === "timestamp") {
            return parseTime(v[j]);
          } else {
            return v[j];
          }
        })
      );
    },
  },
};
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

/* .box-card {
  width: 480px;
} */

.project_message {
  margin: 15px 0;
}

.box-card .clearfix {
  font-size: 1.5rem;
  color: #1890ff;
}

.Progress_update_record {
  margin: 50px 0 150px 0;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  max-height: 250px;
  display: block;
}

.project_pictrues_card {
  margin: 10px 0;
}

.project_videos_main {
  display: flex;
  box-sizing: border-box;
}

.project_videos_content {
  flex: 1;
}

.project_videos_urlList {
  margin: 0 0 0 15px;
  width: 30%;
  height: 100%;
}

.project_videos_urlList_card .item {
  cursor: pointer;
}

.video {
  width: 100%;
  max-height: 60vh;
}

.project_videos_list {
  margin: 50px 0 150px 0;
}
</style>
