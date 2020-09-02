<template>
  <div class="father">
    <div class="top">
      <span>时间范围</span>
      <el-date-picker
        v-model="value2"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        align="right"
      ></el-date-picker>
      <button @click="search">查询</button>
    </div>

    <div id="app_main" style="height:350px;" ref="myCharts"></div>
  </div>
</template>

<script>
import { getChinatime } from "@/utils/utils";
import { ordertotal } from "@/api/apis";
export default {
  data() {
    return {
      time: null,
      month: [],
      money: [],
      value2: [new Date(2019, 6, 6, 10, 10), new Date(2020, 7, 8, 10, 10)],
    };
  },
  methods: {
    ky() {
      let myChart = this.$echarts.init(document.getElementById("app_main"));
      let a = getChinatime(this.value2[0]);
      let b = getChinatime(this.value2[1]);
      this.time = JSON.stringify([a, b]);
      if (this.time) {
        ordertotal(this.time).then((res) => {
          let arr = res.data.data;
          for (let obj of arr) {
            this.month.push(getChinatime(obj.orderTime));
            this.money.push(obj.orderAmount);
          }
          var option = {
            color: ["#3398DB"],
            tooltip: {
              trigger: "axis",
              axisPointer: {
                // 坐标轴指示器，坐标轴触发有效
                type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
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
                data: this.month,
                axisTick: {
                  alignWithLabel: true,
                },
              },
            ],
            yAxis: [
              {
                type: "value",
              },
            ],
            series: [
              {
                name: "直接访问",
                type: "bar",
                barWidth: "60%",
                data: this.money,
              },
            ],
          };
          myChart.setOption(option);
        });
      }
    },
    search() {
      this.month=[];
      this.money=[]
      this.ky();
    },
  },

  mounted() {
      this.ky();
  },
};
</script>

<style scoped lang='less'>
.father {
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
#app_main {
  margin-top: 30px;
  background: #ffffff;
  padding: 10px 5px;
  margin-left: 20px;
}
</style>