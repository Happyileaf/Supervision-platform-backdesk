<template>
  <div class="hello">
    <el-card class="box-card">
      <h1>宜春市重大项目服务平台 后台管理系统</h1>
    </el-card>
    <el-card class="box-card-item">
      <div slot="header" class="clearfix">
        <span>春野樱 下午好</span>
      </div>
      <div class="text item">管理员名称：春野樱</div>
      <div class="text item">管理员身份：超级管理员</div>
      <div class="text item">所在单位：江西省宜春市XX部</div>
      <div class="text item">
        {{ `登录时间：${new Date()}` }}
      </div>
      <div class="text item">
        {{ `登录ip： 10.128.80.26 ` }}
      </div>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";

export default {
  name: "HelloWorld",
  components: {},

  props: {
    // msg: String,
    // project_article_Data: Array,
    ArticleList_props_Data: Object,
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js App",

      current: 2,
      pageSize: 10,
      total: 500,

      project_article_Data: project_article_Data_category_1,
    };
  },
  created() {},
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.hello {
  padding: 25px 25px;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

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

.box-card {
  margin: 0 0 50px 0;
  display: flex;
  justify-content: center;
}

.box-card h1 {
  font-size: 2rem;
  margin: 0;
  color: #409eff;
}

.box-card-item span{
  font-size: 1.5rem;
}
</style>