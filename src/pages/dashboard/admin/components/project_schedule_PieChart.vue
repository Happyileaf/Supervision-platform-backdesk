<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          bottom: '10',
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
            ]
        },
        series: [
          {
            name: 'WEEKLY WRITE ARTICLES',
            type: 'pie',
            roseType: 'radius',
            radius: [15, 95],
            center: ['50%', '38%'],
            data: [
              { value: 320, name: '袁州区' },
              { value: 240, name: '宜丰县' },
              { value: 149, name: '丰城市' },
              { value: 100, name: '靖安县' },
              { value: 59, name: '奉新县' },
              { value: 320, name: '高安市' },
              { value: 240, name: '铜鼓县' },
              { value: 149, name: '万载县' },
              { value: 100, name: '宜春经开区' },
              { value: 59, name: '宜阳新区' },
              { value: 240, name: '明月山' },
            ],
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ]
      })
    }
  }
}
</script>
