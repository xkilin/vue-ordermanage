<template>
  <div class="father">
    <div class="top">
      <span>时间范围</span>
      <el-time-picker
        is-range
        v-model="value1"
        range-separator="至"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        placeholder="选择时间范围"
      ></el-time-picker>
      <button>查询</button>
    </div>
    <div id="app_main" style="height:350px;" ref="myCharts"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
    };
  },
  mounted() {
    let myChart = this.$echarts.init(document.getElementById("app_main"));
    var option = {
      title: {
        text: "堆叠区域图",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#6a7985",
          },
        },
      },
      legend: {
        data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"],
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "邮件营销",
          type: "line",
          stack: "总量",
          areaStyle: {},
          data: [120, 132, 101, 134, 90, 230, 210],
        },
        {
          name: "联盟广告",
          type: "line",
          stack: "总量",
          areaStyle: {},
          data: [220, 182, 191, 234, 290, 330, 310],
        },
        {
          name: "视频广告",
          type: "line",
          stack: "总量",
          areaStyle: {},
          data: [150, 232, 201, 154, 190, 330, 410],
        },
        {
          name: "直接访问",
          type: "line",
          stack: "总量",
          areaStyle: {},
          data: [320, 332, 301, 334, 390, 330, 320],
        },
        {
          name: "搜索引擎",
          type: "line",
          stack: "总量",
          label: {
            normal: {
              show: true,
              position: "top",
            },
          },
          areaStyle: {},
          data: [820, 932, 901, 934, 1290, 1330, 1320],
        },
      ],
    };
    window.onresize = myChart.resize;
    myChart.setOption(option);
  },
};
</script>

<style scoped lang='less'>
.father{
  background: #ffffff;
  margin: 20px 20px;
  padding-top: 20px;
}
.top {
  margin-left: 20px;
  span {
    margin-right: 20px;
  }
  button {
    padding: 10px 15px;
    border: none;
    background: #0099cc;
    color: #ffffff;
    border-radius: 5px;
    margin-left: 15px;
  }
}
#app_main{
      // width: 90%;
      margin-top: 30px;
      background: #ffffff;
      padding: 10px 5px ;
  }
</style>