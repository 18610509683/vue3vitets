import * as echarts from "echarts/core";
import dayjs from "dayjs";
export function partailDischargeChart() {
  return {
    grid: {
      top: 0,
      bottom: "10%",
      left: 0,
      right: 0,
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        crossStyle: {
          color: "#999",
        },
      },
      backgroundColor: "rgba(0,0,0,0.7)",
      borderWidth: 0,
      textStyle: {
        color: "#fff",
      },
    },
    xAxis: [
      {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        axisPointer: {
          type: "shadow",
        },
        axisLine: {
          lineStyle: {
            color: "rgba(22, 174, 224, 0.2)",
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "rgba(22, 174, 224, 0.2)",
          },
        },
        axisLabel:{
          color:'#fff'
        }
      },
    ],
    yAxis: [
      {
        type: "value",
        name: "柱状图",
        min: 0,
        max: 250,
        interval: 50,
        axisLabel: {
          formatter: "{value} ml",
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "rgba(22, 174, 224, 0.2)",
          },
        },
      },
      {
        type: "value",
        name: "波形图",
        min: 0,
        max: 25,
        interval: 5,
        axisLabel: {
          formatter: "{value} °C",
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: "rgba(22, 174, 224, 0.2)",
          },
        },
      },
    ],
    series: [
      {
        name: "柱状图",
        type: "bar",
        tooltip: {
          valueFormatter: function (value) {
            return value + " ml";
          },
        },
        data: [
          2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3,
        ],
        itemStyle:{
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgba(0, 255, 243, 1)",
            },
            {
              offset: 1,
              color: "rgba(0, 255, 243, 0.0)",
            },
          ]),
        }
      },
      {
        name: "波形图",
        type: "line",
        yAxisIndex: 1,
        tooltip: {
          valueFormatter: function (value) {
            return value + " °C";
          },
        },
        symbol:'none',
        lineStyle:{
          color:'#117595',
        },
        data: [
          2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2,
        ],
      },
    ],
  };
}
