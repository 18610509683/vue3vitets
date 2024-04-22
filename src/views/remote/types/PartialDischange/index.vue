<template>
  <div class="page full_wh flex">
    <div class="model-left h100">
      <slot name="left"></slot>
    </div>
    <div class="model-right h100 flex flex-direction">
      <slot name="swd"></slot>
      <div class="model-form h100 flex-1">
        <slot name="right"></slot>
        <el-collapse>
          <el-collapse-item name="放电监测">
            <template #title>放电监测</template>
            <el-form :form="form" label-position="left">
              <el-form-item label="数据模板">
                <div class="mix-box w100" tabindex="1">
                  <el-select class="pre-select" v-model="form.dataTemplateType">
                    <el-option label="瞬时量" value="1"></el-option>
                    <el-option label="累计量" value="2"></el-option>
                  </el-select>
                  <el-select v-model="form.dataTemplate"> </el-select>
                </div>
              </el-form-item>
              <el-form-item label="数据匹配">
                <div class="mix-box w100" tabindex="1">
                  <el-select class="pre-select" v-model="form.matchDataType">
                    <el-option label="新增" value="1"></el-option>
                    <el-option label="选择" value="2"></el-option>
                  </el-select>
                  <el-input
                    v-if="form.matchDataType == '1'"
                    v-model="form.matchData"
                  ></el-input>
                  <el-select v-model="form.matchData" v-else></el-select>
                  <span
                    class="mix-box-btn"
                    @click.stop="
                      () => {
                        controlField.isShowDetail = !controlField.isShowDetail;
                      }
                    "
                  >
                    {{ controlField.isShowDetail ? "隐藏" : "展开" }}
                  </span>
                </div>
              </el-form-item>
              <div
                :class="[
                  controlField.isShowDetail
                    ? 'kr-collapse-list-open'
                    : 'kr-collapse-list-close',
                ]"
              >
                <el-form-item label="数据单位">
                  <el-input
                    v-model="form.unit"
                    v-if="form.matchDataType == '1'"
                  ></el-input>
                  <div v-else class="read-only"></div>
                </el-form-item>
                <el-form-item label="数据说明">
                  <textarea
                    v-model="form.explain"
                    v-if="form.matchDataType == '1'"
                    class="w100"
                  ></textarea>
                  <div v-else class="read-only" style="height: auto"></div>
                </el-form-item>
                <el-form-item label="数据验证">
                  <el-switch
                    v-model="form.isDataVerify"
                    size="large"
                    inline-prompt
                    active-text="启用"
                    inactive-text="关闭"
                    active-value="Y"
                    inactive-value="N"
                    style="
                      --el-switch-on-color: #07909e;
                      --el-switch-off-color: #033240;
                    "
                  ></el-switch>
                </el-form-item>
                <el-form-item label="数据精度">
                  <el-input-number
                    :precision="2"
                    :step="0.1"
                    v-model="form.presicion"
                    v-if="form.matchDataType == '1'"
                  ></el-input-number>
                  <div v-else class="read-only"></div>
                </el-form-item>
                <el-form-item label="数据下限">
                  <div
                    class="flex row-box align-center"
                    v-if="form.matchDataType == '1'"
                  >
                    <el-select v-model="controlField.isDataLower">
                      <el-option
                        v-for="item in controlFieldOptions.isDataLower"
                        :value="item.value"
                        :label="item.label"
                      ></el-option>
                    </el-select>
                    <template v-if="controlField.isDataLower">
                      <el-input v-model="form.dataLower">
                        <template #suffix>
                          <span class="text-active">{{ form.unit }}</span>
                        </template>
                      </el-input>
                      <div class="font-12">时，数据不合规</div>
                    </template>
                  </div>
                  <div v-else class="read-only"></div>
                </el-form-item>
                <el-form-item label="数据上限">
                  <div
                    class="flex row-box align-center"
                    v-if="form.matchDataType == '1'"
                  >
                    <el-select v-model="controlField.isDataUpper">
                      <el-option
                        v-for="item in controlFieldOptions.isDataUpper"
                        :value="item.value"
                        :label="item.label"
                      ></el-option
                    ></el-select>
                    <template v-if="controlField.isDataUpper">
                      <el-input v-model="form.dataUpper">
                        <template #suffix>
                          <span class="text-active">{{ form.unit }}</span>
                        </template>
                      </el-input>
                      <div class="font-12">时，数据不合规</div>
                    </template>
                  </div>
                  <div v-else class="read-only"></div>
                </el-form-item>
                <el-form-item label="采集间隔">
                  <el-input
                    v-model="form.interval"
                    v-if="form.matchDataType == '1'"
                  >
                    <template #suffix>
                      <span class="text-active">{{ "s" }}</span>
                    </template></el-input
                  >
                  <div v-else class="read-only"></div>
                </el-form-item>
                <el-form-item label="告警配置">
                  <el-switch
                    v-model="form.isAlarm"
                    size="large"
                    inline-prompt
                    active-text="启用"
                    inactive-text="关闭"
                    active-value="Y"
                    inactive-value="N"
                    style="
                      --el-switch-on-color: #07909e;
                      --el-switch-off-color: #033240;
                    "
                  ></el-switch>
                </el-form-item>
                <el-form-item label="严重下限">
                  <div
                    class="flex row-box align-center"
                    v-if="form.matchDataType == '1'"
                  >
                    <el-select v-model="controlField.isSeriourLower">
                      <el-option
                        v-for="item in controlFieldOptions.isSeriourLower"
                        :value="item.value"
                        :label="item.label"
                      ></el-option
                    ></el-select>
                    <template v-if="controlField.isSeriourLower">
                      <el-input v-model="form.seriousLower">
                        <template #suffix>
                          <span class="text-active">{{ form.unit }}</span>
                        </template>
                      </el-input>
                      <div class="font-12">时，进行严重级别的报警</div>
                    </template>
                  </div>
                  <div v-else class="read-only"></div>
                </el-form-item>
                <el-form-item label="警告下限">
                  <div
                    class="flex row-box align-center"
                    v-if="form.matchDataType == '1'"
                  >
                    <el-select v-model="controlField.isAlarmLower">
                      <el-option
                        v-for="item in controlFieldOptions.isAlarmLower"
                        :value="item.value"
                        :label="item.label"
                      ></el-option
                    ></el-select>
                    <template v-if="controlField.isAlarmLower">
                      <el-input v-model="form.alarmLower">
                        <template #suffix>
                          <span class="text-active">{{ form.unit }}</span>
                        </template>
                      </el-input>
                      <div class="font-12">时，进行警告级别的报警</div>
                    </template>
                  </div>
                  <div v-else class="read-only"></div>
                </el-form-item>
                <el-form-item label="警告上限">
                  <div
                    class="flex row-box align-center"
                    v-if="form.matchDataType == '1'"
                  >
                    <el-select v-model="controlField.isAlarmUpper">
                      <el-option
                        v-for="item in controlFieldOptions.isAlarmUpper"
                        :value="item.value"
                        :label="item.label"
                      ></el-option
                    ></el-select>
                    <template v-if="controlField.isAlarmUpper">
                      <el-input v-model="form.alarmUpper">
                        <template #suffix>
                          <span class="text-active">{{ form.unit }}</span>
                        </template>
                      </el-input>
                      <div class="font-12">
                        时，进行警告级别的告警
                      </div></template
                    >
                  </div>
                  <div v-else class="read-only"></div>
                </el-form-item>
                <el-form-item label="严重上限">
                  <div
                    class="flex row-box align-center"
                    v-if="form.matchDataType == '1'"
                  >
                    <el-select v-model="controlField.isSeriousUpper">
                      <el-option
                        v-for="item in controlFieldOptions.isSeriousUpper"
                        :value="item.value"
                        :label="item.label"
                      ></el-option
                    ></el-select>
                    <template v-if="controlField.isSeriousUpper">
                      <el-input v-model="form.seriousUpper">
                        <template #suffix>
                          <span class="text-active">{{ form.unit }}</span>
                        </template>
                      </el-input>
                      <div class="font-12">时，进行严重级别的报警</div>
                    </template>
                  </div>
                  <div v-else class="read-only"></div>
                </el-form-item>
              </div>
            </el-form>
          </el-collapse-item>
        </el-collapse>
      </div>
      <div class="model-btn-sty flex justify-end">
        <el-button class="el-btn-cancel" @click="cancelClick">取 消</el-button>
        <el-button type="primary" @click="confirmClick">保 存</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted } from "vue";
const { proxy } = getCurrentInstance();
const props = defineProps({
  publicData: {
    type: Object,
  },
});
let form = ref({
  dataTemplateType: "1", //数据模板类型
  dataTemplate: null, //数据模板
  matchDataType: "1", //匹配数据类型
  matchData: null, //匹配数据
  unit: null, //数据单位
  explain: null, //数据说明
  isDataVerify: "Y", //数据验证开关
  presicion: 0, //数据精度
  dataLower: 0, //数据下限
  dataUpper: 0, //数据上限
  interval: null, //采集间隔
  isAlarm: "Y", //告警配置开关
  seriousLower: 0, //严重下限
  alarmLower: 0, //警告下限
  alarmUpper: 0, //警告上限
  seriousUpper: 0, //严重上限
});
let controlField = ref({
  isShowDetail: false, //是否展示模板详情
  isDataLower: true, //是否有数据下限
  isDataUpper: true, //是否数据上限
  isSeriourLower: true, //是否有严重下限
  isAlarmLower: true, //是否有警告下限
  isAlarmUpper: true, //是否有警告上限
  isSeriousUpper: true, //是否有严重上限
});
const controlFieldOptions = {
  isDataLower: [
    { value: true, label: "当数据≤" },
    { value: false, label: "无" },
  ],
  isDataUpper: [
    { value: true, label: "当数据≥" },
    { value: false, label: "无" },
  ],
  isSeriourLower: [
    { value: true, label: "当数据≤" },
    { value: false, label: "无" },
  ],
  isAlarmLower: [
    { value: true, label: "当数据≤" },
    { value: false, label: "无" },
  ],
  isAlarmUpper: [
    { value: true, label: "当数据≥" },
    { value: false, label: "无" },
  ],
  isSeriousUpper: [
    { value: true, label: "当数据≥" },
    { value: false, label: "无" },
  ],
};
let selectValue = ref(1);
const cancelClick = () => {};
const confirmClick = () => {};
onMounted(() => {});
</script>

<style lang="scss" scoped>
@import "../../css/typeBaseStyle.scss";
.page {
}
</style>
