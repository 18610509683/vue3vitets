const dataTypeOptions = [
  {
    type: "INSTANTANEOUS",
    desc: "瞬时量",
    formTemplate: {
      dataType: "INSTANTANEOUS", //数据模板类型
      dataTemplate: "custom", //数据模板
      matchDataType: "1", //匹配数据类型
      matchData: null, //匹配数据
      unit: null, //数据单位
      explain: null, //数据说明
      isDataVerify: "Y", //数据验证开关
      precision: 0, //数据精度
      dataLowerLimit: 0, //数据下限
      dataUpperLimit: 0, //数据上限
      collectInterval: null, //采集间隔
      isAlarm: "Y", //告警配置开关
      criticalLowerLimit: 0, //严重下限
      warningLowerLimit: 0, //警告下限
      warningUpperLimit: 0, //警告上限
      criticalUpperLimit: 0, //严重上限
    },
  },
  {
    type: "CUMULATIVE",
    desc: "累计量",
    formTemplate: {
      dataType: "CUMULATIVE", //数据模板类型
      dataTemplate: "custom", //数据模板
      matchDataType: "1", //匹配数据类型
      matchData: null, //匹配数据
      unit: null, //数据单位
      explain: null, //数据说明
      isDataVerify: "Y", //数据验证开关
      precision: 0, //数据精度
      dataLowerLimit: 0, //数据下限
      dataUpperLimit: 0, //数据上限
      collectInterval: null, //采集间隔
      statPeriod: null, //采集周期
      isAlarm: "Y", //告警配置开关
      criticalLowerLimit: 0, //严重下限
      warningLowerLimit: 0, //警告下限
      warningUpperLimit: 0, //警告上限
      criticalUpperLimit: 0, //严重上限
    },
  },
  {
    type: "SWITCHING",
    desc: "开关量",
    formTemplate: {
      dataType: "SWITCHING", //数据模板类型
      dataTemplate: "custom", //数据模板
      matchDataType: "1", //匹配数据类型
      matchData: null, //匹配数据
      defaultBit: "0", //默认位
      explain: null, //数据说明
      isDataVerify: "Y", //数据验证开关
      precision: 0, //数据精度:
      collectInterval: null, //采集间隔
      isAlarm: "Y", //告警配置开关
      alarmLevel: null, //报警等级
    },
  },
  {
    type: "ENUMERATION",
    desc: "枚举量",
    formTemplate: {
      dataType: "ENUMERATION", //数据模板类型
      dataTemplate: "custom", //数据模板
      matchDataType: "1", //匹配数据类型
      matchData: null, //匹配数据
      statusField: null, //状态字段
      translation: null, //名称翻译
      statusRange: [], //字段范围
      defaultBit: null, //默认字段
      explain: null, //数据说明
      isDataVerify: "Y", //数据验证开关
      collectInterval: null, //采集间隔
      isAlarm: "Y", //告警配置开关
      warningLimits: null, //警告限度
      severityLimits: null, //严重限度
    },
  },
];
export{
    dataTypeOptions
}