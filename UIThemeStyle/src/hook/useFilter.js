import { ref } from "vue";
export default function () {
  // 当前点击的筛选字段
  let currentFilterLabel = ref("");

  // 获取含有筛选功能字段的下标
  const hasFilterOptionsIndexList = ({ prop, tableOptions }) => {
    return tableOptions
      .filter((item) => item.isNeedFilter)
      .findIndex((filterItem) => filterItem.prop === prop);
  };

  // 开启筛选
  const handleEditFilter = ({ itemOption, tableOptions }) => {
    let result = tableOptions.find(
      (item) => item.label === currentFilterLabel.value
    );
    if (result && result !== itemOption) result.isOnEdit = false;
    itemOption.isOnEdit = !itemOption.isOnEdit;
    currentFilterLabel.value = itemOption.label;
  };

  return {
    currentFilterLabel,
    hasFilterOptionsIndexList,
    handleEditFilter
  };
}
