<template>
  <div class="form-container">
    <el-form
      :model="form"
      ref="formRef"
      :rules="formRules"
      label-position="left"
    >
      <el-form-item label="数据模板">
        <div class="mix-box w100" tabindex="1">
          <el-select
            class="pre-select"
            v-model="form.dataType"
            placeholder="未选择模板"
            @change="dataTypeChangeHandle"
          >
            <el-option
              v-for="item in dataTypeOptions"
              :label="item.desc"
              :value="item.type"
            ></el-option>
          </el-select>
          <el-select
            v-model="form.dataTemplate"
            @change="dataTemplateChangeHandle"
          >
            <el-option label="不选择模板" value="custom"></el-option>
            <el-option label="模板1" value="1"></el-option>
            <el-option label="模板2" value="2"></el-option>
            <el-option label="模板3" value="3"></el-option>
          </el-select>
        </div>
      </el-form-item>
      <el-form-item label="数据匹配" prop="matchData">
        <div class="mix-box w100" tabindex="1">
          <el-select class="pre-select" v-model="form.matchDataType">
            <el-option label="新增" value="1"></el-option>
            <el-option label="选择" value="2"></el-option>
          </el-select>
          <el-input
            v-if="form.matchDataType == '1'"
            v-model="form.matchData"
          ></el-input>
          <el-select v-model="form.matchData" v-else>
            <el-option label="模板1" value="1"></el-option>
            <el-option label="模板2" value="2"></el-option>
            <el-option label="模板3" value="3"></el-option
          ></el-select>
          <span
            class="mix-box-btn"
            @click.stop="
              () => {
                isShowDetail = !isShowDetail;
              }
            "
          >
            {{ isShowDetail ? "隐藏" : "详情" }}
          </span>
        </div>
      </el-form-item>
      <div
        :class="[
          isShowDetail ? 'kr-collapse-list-open' : 'kr-collapse-list-close',
        ]"
      >
        <el-form-item
          prop="unit"
          label="数据单位"
          v-if="form.hasOwnProperty('unit')"
        >
          <el-input
            v-model="form.unit"
            v-if="form.dataTemplate == 'custom'"
          ></el-input>
          <div v-else class="read-only"></div>
        </el-form-item>
        <el-form-item
          label="默认位"
          v-if="
            form.hasOwnProperty('defaultBit') && form.dataType == 'SWITCHING'
          "
        >
          <el-switch
            v-if="form.dataTemplate == 'custom'"
            v-model="form.defaultBit"
            inline-prompt
            style="
              --el-switch-on-color: #07909e;
              --el-switch-off-color: #033240;
            "
            active-text="1"
            inactive-text="0"
            active-value="1"
            inactive-value="0"
          >
          </el-switch>
          <div class="read-only" v-else></div>
        </el-form-item>
        <el-form-item
          label="状态字段"
          prop="statusField"
          v-if="form.hasOwnProperty('statusField')"
        >
          <el-input
            v-if="form.dataTemplate == 'custom'"
            v-model="form.statusField"
            maxlength="40"
            show-word-limit
          />
          <div class="read-only" v-else></div>
        </el-form-item>
        <el-form-item
          label="名称翻译"
          prop="translation"
          v-if="form.hasOwnProperty('translation')"
        >
          <el-input
            v-if="form.dataTemplate == 'custom'"
            v-model="form.translation"
            maxlength="40"
            show-word-limit
          />
          <div class="read-only" v-else></div>
        </el-form-item>
        <el-form-item
          label="字段范围"
          prop="statusRange"
          v-if="form.hasOwnProperty('statusRange')"
        >
          <div
            class="table-container w100"
            v-if="form.dataTemplate == 'custom'"
          >
            <div class="table-header w100 flex justify-start align-center">
              <div class="th table-cell">序号</div>
              <div
                class="th table-cell"
                v-for="propItem in statusRangeTablePropertyList"
              >
                {{ propItem.label }}
              </div>
              <div class="th table-cell">操作</div>
            </div>
            <div class="table-body">
              <div
                class="tbody-tr flex justify-start align-center"
                v-for="(rangeItem, index) in form.statusRange"
              >
                <div class="index td" :title="index + 1">
                  {{ index + 1 }}
                </div>
                <el-input
                  class="property td"
                  v-model="rangeItem[propItem.property]"
                  v-for="propItem in statusRangeTablePropertyList"
                />
                <div class="td">
                  <i
                    class="iconfont iconfont-shanchu"
                    @click="handleDeleteStatusRangeTableRow(index)"
                  ></i>
                </div>
              </div>
            </div>
            <div
              class="add-btn flex justify-center align-center"
              @click="handleAddStatusRangeTableRow"
            >
              <i
                class="iconfont iconfont-add"
                style="margin-right: 0.5208vw"
              ></i>
              <span>新增</span>
            </div>
          </div>
          <div
            class="status-range-list w100 flex flex-direction justify-start align-center"
            v-else
          >
            <div
              class="list-item w100 flex justify-start align-center"
              v-for="(item, index) in form.statusRange"
            >
              <div class="index list-item-property" :title="index + 1">
                {{ index + 1 }}
              </div>
              <div
                class="name list-item-property"
                :title="item[propItem.property]"
                v-for="propItem in statusRangeTablePropertyList"
              >
                {{ item[propItem.property] }}
              </div>
            </div>
          </div>
        </el-form-item>
        <el-form-item
          label="默认字段"
          v-if="
            form.hasOwnProperty('defaultBit') && form.dataType == 'ENUMERATION'
          "
          prop="defaultBit"
        >
          <el-select
            class="w100"
            v-model="form.defaultBit"
            v-if="form.dataTemplate == 'custom'"
            clearable
          >
            <el-option
              v-for="tabItem in form.statusRange"
              :label="tabItem.name"
              :value="tabItem.name"
            />
          </el-select>
          <div class="value-tag h100" v-else>{{}}</div>
        </el-form-item>
        <el-form-item label="数据说明" v-if="form.hasOwnProperty('explain')">
          <textarea
            v-model="form.explain"
            v-if="form.dataTemplate == 'custom'"
            class="w100"
          ></textarea>
          <div v-else class="read-only" style="height: auto"></div>
        </el-form-item>
        <el-form-item label="数据验证">
          <el-switch
            v-model="form.isDataVerify"
            size="large"
            inline-prompt
            active-text="on"
            inactive-text="off"
            active-value="Y"
            inactive-value="N"
            style="
              --el-switch-on-color: #07909e;
              --el-switch-off-color: #033240;
            "
          ></el-switch>
        </el-form-item>
        <el-form-item
          prop="precision"
          label="数据精度"
          v-if="form.hasOwnProperty('presicion')"
        >
          <el-input-number
            :precision="2"
            :step="0.1"
            v-model="form.presicion"
            v-if="form.dataTemplate == 'custom'"
          ></el-input-number>
          <div v-else class="read-only"></div>
        </el-form-item>
        <el-form-item
          v-for="item in controlField.slice(0, 2)"
          :label="item.label"
          v-show="form.hasOwnProperty(item.field)"
          :prop="item.field"
        >
          <div class="row-box" v-if="form.dataTemplate == 'custom'">
            <div class="flex">
              <el-select
                v-model="item.isExist"
                @change="(val) => controlFieldChange(val, item.field)"
              >
                <el-option
                  v-for="item in item.options"
                  :value="item.value"
                  :label="item.label"
                ></el-option>
              </el-select>
              <el-input v-if="item.isExist" v-model="form[item.field]">
                <template #suffix>
                  <span class="text-active">{{ form.unit }}</span>
                </template>
              </el-input>
            </div>
            <div v-if="item.isExist">时，数据不合规</div>
          </div>
          <div v-else class="read-only"></div>
        </el-form-item>
        <el-form-item
          label="采集间隔"
          prop="collectInterval"
          v-if="form.hasOwnProperty('interval')"
        >
          <el-input
            v-model="form.interval"
            v-if="form.dataTemplate == 'custom'"
          >
            <template #suffix>
              <span class="text-active">{{ "s" }}</span>
            </template>
          </el-input>
          <div v-else class="read-only"></div>
        </el-form-item>
        <el-form-item
          prop="statPeriod"
          label="统计周期"
          v-if="form.hasOwnProperty('statPeriod')"
        >
          <el-input
            class="interval"
            v-model.number="form.statPeriod"
            v-if="form.dataTemplate == 'custom'"
          >
            <template #suffix>
              <span class="text-active">{{ "min" }}</span>
            </template>
          </el-input>
          <div class="read-only" v-else>{{}}</div>
        </el-form-item>
        <el-form-item label="告警配置">
          <el-switch
            v-model="form.isAlarm"
            size="large"
            inline-prompt
            active-text="on"
            inactive-text="off"
            active-value="Y"
            inactive-value="N"
            style="
              --el-switch-on-color: #07909e;
              --el-switch-off-color: #033240;
            "
          ></el-switch>
        </el-form-item>
        <el-form-item
          v-for="item in controlField.slice(2, 6)"
          :label="item.label"
          v-show="form.hasOwnProperty(item.field)"
          :prop="item.field"
        >
          <div class="row-box" v-if="form.dataTemplate == 'custom'">
            <div class="flex">
              <el-select
                v-model="item.isExist"
                @change="(val) => controlFieldChange(val, item.field)"
              >
                <el-option
                  v-for="item in item.options"
                  :value="item.value"
                  :label="item.label"
                ></el-option
              ></el-select>
              <el-input v-if="item.isExist" v-model="form[item.field]">
                <template #suffix>
                  <span class="text-active">{{ form.unit }}</span>
                </template>
              </el-input>
            </div>
            <div v-if="item.isExist">{{ item.tips }}</div>
          </div>
          <div v-else class="read-only"></div
        ></el-form-item>
        <el-form-item label="报警等级" v-if="form.hasOwnProperty('alarmLevel')">
          <el-select
            v-model="form.alarmLevel"
            v-if="form.dataTemplate == 'custom'"
          >
          </el-select>
          <div v-else class="read-only"></div>
        </el-form-item>
        <el-form-item
          v-for="item in controlField.slice(6)"
          :label="item.label"
          v-show="form.hasOwnProperty(item.field)"
          :prop="item.field"
        >
          <div v-if="form.dataTemplate == 'custom'" class="row-box">
            <div class="flex">
              <span>当数据为</span>
              <el-select
                :placeholder="
                  '请选择' +
                  (item.field === 'warningLimits' ? '警告' : '严重') +
                  '级别的报警'
                "
                class="w100 tag-select"
                multiple
                @change="
                  (value) =>
                    handleChangeWarningSeverityLimits({
                      property: item.field,
                      value: value,
                    })
                "
                :model-value="
                  form[item.field] ? form[item.field].split(',') : []
                "
              >
                <el-option
                  v-for="tagItem in form.statusRange"
                  :label="tagItem.name"
                  :value="tagItem.name"
                />
              </el-select>
              <span>时，</span>
            </div>
            <span>{{ item.tips }}</span>
          </div>
          <div v-else class="read-only"></div>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
const props = defineProps({
  formData: {
    type: Object,
    default: null,
  },
});

/* --------表单类型 start--------- */
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
      presicion: 0, //数据精度
      dataLowerLimit: 0, //数据下限
      dataUpperLimit: 0, //数据上限
      interval: null, //采集间隔
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
      presicion: 0, //数据精度
      dataLowerLimit: 0, //数据下限
      dataUpperLimit: 0, //数据上限
      interval: null, //采集间隔
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
      presicion: 0, //数据精度:
      interval: null, //采集间隔
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
      interval: null, //采集间隔
      isAlarm: "Y", //告警配置开关
      warningLimits: null, //警告限度
      severityLimits: null, //严重限度
    },
  },
];
const formRef = ref();
let form = ref(JSON.parse(JSON.stringify(dataTypeOptions[0].formTemplate)));
//切换数据类型，保留已填过的相同数据
const dataTypeChangeHandle = (val) => {
  formRef.value.clearValidate();
  let tempForm = JSON.parse(JSON.stringify(form.value));
  form.value = JSON.parse(
    JSON.stringify(
      dataTypeOptions.find((item) => item.type == val).formTemplate
    )
  );
  if (tempForm.dataTemplate == "custom") {
    for (let key in tempForm) {
      if (form.value.hasOwnProperty(key) && key !== "dataType") {
        form.value[key] = tempForm[key];
      }
    }
  }
};
//切换数据模板
const dataTemplateChangeHandle = (val) => {
  formRef.value.clearValidate();
  if (val == "custom") {
    isShowDetail.value = true;
  }
};
/* --------表单类型 end------------- */

/* ------控制表单项 start-------- */
let isShowDetail = ref(true); //是否展示模板详情
let controlField = ref([
  {
    label: "数据下限",
    field: "dataLowerLimit",
    isExist: true, //是否有数据下限
    options: [
      { value: true, label: "当数据≤" },
      { value: false, label: "无" },
    ],
    tips: "时，数据不合规",
  },
  {
    label: "数据上限",
    field: "dataUpperLimit",
    isExist: true, //是否有数据上限
    options: [
      { value: true, label: "当数据≥" },
      { value: false, label: "无" },
    ],
    tips: "时，数据不合规",
  },
  {
    label: "严重下限",
    field: "criticalLowerLimit",
    isExist: true, //是否有严重下限
    options: [
      { value: true, label: "当数据≤" },
      { value: false, label: "无" },
    ],
    tips: "时，进行严重级别的报警",
  },
  {
    label: "警告下限",
    field: "warningLowerLimit",
    isExist: true, //是否有警告下限
    options: [
      { value: true, label: "当数据≤" },
      { value: false, label: "无" },
    ],
    tips: "时，进行警告级别的报警",
  },
  {
    label: "警告上限",
    field: "warningUpperLimit",
    isExist: true, //是否有警告上限
    options: [
      { value: true, label: "当数据≥" },
      { value: false, label: "无" },
    ],
    tips: "时，进行警告级别的报警",
  },
  {
    label: "严重上限",
    field: "criticalUpperLimit",
    isExist: true, //是否有严重上限
    options: [
      { value: true, label: "当数据≥" },
      { value: false, label: "无" },
    ],
    tips: "时，进行严重级别的报警",
  },
  {
    label: "警告限度",
    field: "warningLimits",
    isExist: true,
    options: [],
    tips: "进行警告级别的报警",
  },
  {
    label: "严重限度",
    field: "severityLimits",
    isExist: true,
    options: [],
    tips: "进行严重级别的报警",
  },
]);
const controlFieldChange = (val, field) => {
  form.value[field] = val ? 0 : null;
};
/* ------控制表单项 end---------- */
/**
 * @description: 状态量字段范围表格字段
 * @date 2023-09-12 13:49
 */
let statusRangeTablePropertyList = ref([
  {
    label: "字段值",
    property: "name",
  },
  {
    label: "字段",
    property: "translation",
  },
  {
    label: "翻译值",
    property: "comment",
  },
]);
// 删除状态量字段范围表格行
const handleDeleteStatusRangeTableRow = (index) => {
  form.value.statusRange.splice(index, 1);
};

// 新增状态量字段范围表格行
const handleAddStatusRangeTableRow = () => {
  form.value.statusRange.push({
    name: "",
    translation: "",
    fields: "",
  });
};

// 警告限度和严重限度的牵制
const handleChangeWarningSeverityLimits = ({ property, value }) => {
  let oppositeProperty =
    property === "warningLimits" ? "severityLimits" : "warningLimits";
  let statusList = form.value[oppositeProperty].split(",");
  let intersect = Array.from(
    new Set(statusList.filter((x) => !value.includes(x)))
  );
  form.value[oppositeProperty] = intersect.join(",");
  form.value[property] = value.join(",");
};

/* --------表单校验规则 start------------ */
// 验证数据上下限
const validDataLimit = (index, type) => {
  return (rule, value, callback) => {
    if (controlField.value[index].isExist && (value === "" || value === null)) {
      callback(
        new Error("请填写" + controlField.value[index].label + "具体值")
      );
    } else {
      callback();
    }
  };
};

// 验证字段范围不为空
const validStatusRange = () => {
  return (rule, value, callback) => {
    if (form.value.statusRange.length === 0) {
      callback(new Error("请填充具体的字段值"));
    } else {
      callback();
    }
  };
};
const formRules = ref({
  type: [{ required: true, message: "请输入数据类型", trigger: "blur" }],
  matchData: [{ required: true, message: "请输入点位名称", trigger: "blur" }],
  statusField: [{ required: true, message: "请输入状态字段", trigger: "blur" }],
  name: [{ required: true, message: "请输入数据名称", trigger: "blur" }],
  translation: [{ required: true, message: "请输入名称翻译", trigger: "blur" }],
  precision: [{ required: true, message: "请输入数据精度", trigger: "blur" }],
  statusRange: [{ validator: validStatusRange(), trigger: "change" }],
  defaultBit: [
    { required: true, message: "请选择默认字段", trigger: "change" },
  ],
  collectInterval: [
    { required: true, message: "请输入采集间隔", trigger: "blur" },
  ],
  dataLowerLimit: [
    {
      validator: validDataLimit(0, "validation"),
      trigger: "change",
    },
  ],
  dataUpperLimit: [
    {
      validator: validDataLimit(1, "validation"),
      trigger: "change",
    },
  ],
  criticalLowerLimit: [
    {
      validator: validDataLimit(2, "alarm"),
      trigger: "change",
    },
  ],
  warningLowerLimit: [
    {
      validator: validDataLimit(3, "alarm"),
      trigger: "change",
    },
  ],
  warningUpperLimit: [
    {
      validator: validDataLimit(4, "alarm"),
      trigger: "change",
    },
  ],
  criticalUpperLimit: [
    {
      validator: validDataLimit(5, "alarm"),
      trigger: "change",
    },
  ],
  warningLimits: [
    {
      validator: validDataLimit(6, "alarm"),
      trigger: "change",
    },
  ],
  severityLimits: [
    {
      validator: validDataLimit(7, "alarm"),
      trigger: "change",
    },
  ],
  statPeriod: [{ required: true, message: "请输入采集间隔", trigger: "blur" }],
  alarmLevel: [{ required: true, message: "请选择报警等级", trigger: "blur" }],
});

//整体表单保存验证，选定模板后不作验证，自定义填写才验证
const dataConfigFormValidate = async () => {
  let validateFlag = true;
  let msg = "";
  if (form.value.dataTemplate != "custom") {
    if (form.value.matchData == "" || form.value.matchData == null) {
      validateFlag = false;
      msg = "数据匹配不能为空！";
    }
  } else {
    await formRef.value.validate((valid) => {
      if (!valid) {
        validateFlag = false;
        msg = "请检查表单！";
      }
    });
  }
  return {
    validateFlag,
    msg,
  };
};
/* --------表单校验规则 end------------ */

watch(
  () => props.formData,
  (val) => {
    if (val) {
      form.value = val;
    }
  }
);

defineExpose({
  form,
  validate: dataConfigFormValidate,
});
</script>

<style lang="scss" scoped>
.form-container {
  :deep(.el-form) {
    //混合表单项类型1：选择器+选择器/输入框
    .mix-box {
      border: 1px solid rgba(0, 255, 243, 0.5);
      display: flex;
      height: 3.1481vh;
      min-height: 34px;
      justify-content: center;
      padding: 0 5px;
      cursor: pointer;
      .el-input {
        flex: 1;
        height: 100%;
        .el-input__wrapper {
          box-shadow: none;
          border: none;
        }
      }
      .el-select {
        flex: 1;
        &.pre-select {
          max-width: 20%;
          .el-select__wrapper {
            padding: 0;
            &::after {
              content: "";
              height: 50%;
              width: 1px;
              background: linear-gradient(
                to top,
                transparent,
                #fff,
                transparent
              );
            }
            .el-select__selected-item {
              display: flex;
              justify-content: center;

              span {
                color: #00fff3;
              }
            }
          }
          .el-select__suffix {
            display: none;
          }
        }
        .el-select__wrapper {
          box-shadow: none;
        }
      }
      &-btn {
        color: rgba(0, 255, 243, 0.5);
        &:hover {
          color: #00fff3;
        }
      }
    }
    //只读表单项
    .read-only {
      background-color: #074954;
      width: 100%;
      height: 3.1481vh;
      min-height: 34px;
    }
    //混合表单项类型2：选择器+选择器+文字
    .row-box {
      width: 100%;
      .el-select {
        flex: 1;
        min-width: 65px;
        margin-right: 5px;
        .el-select__wrapper {
          min-height: 34px;
          span {
            color: #00fff3;
          }
        }
      }
      .el-input {
        margin-right: 5px;
        min-height: 34px;
        height: 3.1481vh;
        flex: 1;
        &__inner {
          color: #00fff3;
        }
      }
    }
    //kr样式化的数字输入框
    .el-input-number {
      width: 100%;
      .el-input-number__decrease:hover
        ~ .el-input:not(.is-disabled)
        .el-input__wrapper,
      .el-input-number__increase:hover
        ~ .el-input:not(.is-disabled)
        .el-input__wrapper {
        box-shadow: none;
      }
      .el-input-number__decrease,
      .el-input-number__increase {
        background-color: transparent;
        border-radius: 0;
        border: none;
        i {
          border: 1px solid rgba(0, 255, 243, 0.5);
        }
      }
      .el-input-number__decrease {
        left: 100%;
        transform: translateX(-200%);
        border-left: 1px solid rgba(0, 255, 243, 0.5);
      }
      .el-input__wrapper {
        padding: 5px 64px 5px 10px;
        input {
          text-align: left;
        }
      }
    }
    .value-tag {
      margin-right: 0.2604vw;
      padding: 0 0.4167vw;
      max-width: 2.6042vw;
      height: 2.2222vh;
      font-size: 1.2963vh;
      border: 1px solid themed(primary-color-2-40);
      border-radius: 0.1042vw;
      text-align: center;
      background-color: themed(primary-color-2-70);
      line-height: 2.2222vh;
    }
    .tag-select {
      margin: 0 0.5208vw;
      width: 0;
      flex: 1;
      .el-select__tags {
        height: 100%;
        .el-select-tags-wrapper {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          overflow-x: auto;
          height: 100%;
        }
        &.is-disabled {
          .el-tag {
            opacity: 0.5;
          }
        }
      }
    }
    .table-container {
      .table-header {
        height: 3.1481vh;
        background-color: #064955;
        .th {
          height: 100%;
          line-height: 3.1481vh;
          font-size: 1.2963vh;
        }
      }
      .table-body {
        background-color: rgb(6 73 85 / 30%);
        .tbody-tr {
          height: 3.1481vh;
        }
        .el-input {
          .el-input__wrapper {
            padding-left: 0 !important;
            border: none !important;
            box-shadow: none !important;
            cursor: default;
          }
        }
      }
      .th,
      .td {
        height: 100%;
        flex: 1;
        &:first-of-type,
        &:last-of-type {
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
        }
        .kr-icon {
          height: 100%;
          line-height: 3.1481vh;
          &::before {
            font-size: 1.2963vh;
          }
        }
        &.property {
          .el-input__wrapper {
            &.is-focus {
              margin-right: 0.625vw !important;
              padding-left: 0.625vw !important;
              box-shadow: 0 0 0 1px rgba(0, 255, 243, 0.5) inset !important;
            }
          }
        }
      }
    }
    .status-range-list {
      padding: 0 0.7813vw;
      border-radius: 2px;
      background-color: rgb(6 73 85 / 30%);
      .list-item {
        height: 3.3333vh;
        border-bottom: 1px solid rgba(0, 255, 243, 0.5);
        .list-item-property {
          overflow: hidden;
          height: 100%;
          font-size: 1.2963vh;
          text-overflow: ellipsis;
          white-space: nowrap;
          line-height: 3.3333vh;
          flex: 2;
          &:first-of-type {
            flex: 1;
          }
        }
      }
    }
  }
}
</style>
