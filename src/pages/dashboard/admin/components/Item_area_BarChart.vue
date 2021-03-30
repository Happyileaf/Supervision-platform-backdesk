<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "./mixins/resize";

const animationDuration = 6000;

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: "chart",
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "350px",
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, "macarons");

      this.chart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        title: {
          left: "center",
          text: "大数据量面积图",
        },
        legend: {
          // orient: 'vertical',
          left: 100,
        top: 20,
        bottom: 20,
          data: [
              "已签约",
              "已落地",
              "已开工",
              "已投产",
              "奉新县",
              "高安市",
              "铜鼓县",
              "万载县",
              "宜春经开区",
              "宜阳新区",
              "明月山",
            ],
        },
        grid: {
          top: 10,
          left: "2%",
          right: "2%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: [
              "袁州区",
              "宜丰县",
              "丰城市",
              "靖安县",
              "奉新县",
              "高安市",
              "铜鼓县",
              "万载县",
              "宜春经开区",
              "宜阳新区",
              "明月山",
            ],
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            axisTick: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: "已签约",
            type: "bar",
            stack: "vistors",
            barWidth: "60%",
            data: [79, 52, 200, 334, 390, 330, 220, 600, 300, 150, 200],
            // animationDuration
          },
          {
            name: "已落地",
            type: "bar",
            stack: "vistors",
            barWidth: "60%",
            data: [80, 52, 200, 334, 390, 330, 220, 100, 150, 60, 650],
            // animationDuration
          },
          {
            name: "已开工",
            type: "bar",
            stack: "vistors",
            barWidth: "60%",
            data: [30, 52, 200, 334, 390, 330, 220, 200, 260, 100, 250],
            // animationDuration
          },
          {
            name: "已投产",
            type: "bar",
            stack: "vistors",
            barWidth: "60%",
            data: [30, 52, 200, 334, 390, 330, 220, 100, 60, 290, 660],
            // animationDuration
          },
        ],
      });
    },
  },
};
</script>
