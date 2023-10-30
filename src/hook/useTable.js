import { ref, nextTick } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";

export default function (
  getTableDataCallBack = () => {},
  { pageNumber, tableData } = { pageNumber: ref(1), tableData: ref([]) }
) {
  let formDialogVisible = ref(false);
  let formDialogTitle = ref("");
  let formData = ref({});
  let isEdit = ref(false);
  let isAdd = ref(false);
  let _dom=null;

  // 点击某一行查看模版信息
  const handleRowClick = (row) => {
    formDialogVisible.value = true;
    formDialogTitle.value = "查看数据模版";
    formData.value = JSON.parse(JSON.stringify(row));
  };

  // 上一条下一条
  const handlePrevNext = ({ type, filterForm, pageSize }) => {
    if (type === "prev") {
      if (formData.value.index % pageSize === 1) {
        pageNumber.value--;
        getTableDataCallBack(filterForm).then(
          (res) => {
            if (res) {
              formData.value = tableData.value[tableData.value.length - 1];
            }
          },
          (err) => {
            ElMessage.error(err);
          }
        );
      } else if (formData.value.index % pageSize === 0) {
        formData.value = tableData.value[pageSize - 2];
      } else {
        formData.value = tableData.value[(formData.value.index % pageSize) - 2];
      }
    } else {
      if (formData.value.index % pageSize === 0) {
        pageNumber.value++;
        getTableDataCallBack(filterForm).then(
          (res) => {
            if (res) {
              formData.value = tableData.value[0];
            }
          },
          (err) => {
            ElMessage.error(err);
          }
        );
      } else {
        formData.value = tableData.value[formData.value.index % pageSize];
      }
    }
  };

  // 新增
  const handleAdd = (initValue) => {
    formDialogVisible.value = true;
    formDialogTitle.value = "新增数据模版";
    formData.value = initValue;
    isEdit.value = true;
    isAdd.value = true;
  };

  // 编辑
  const handleEdit = (e, row) => {
    formDialogVisible.value = true;
    isEdit.value = true;
    if (row) formData.value = row;
  };

  // 取消
  const handleCancel = () => {
    if (!isEdit.value || isAdd.value) formDialogVisible.value = false;
    isEdit.value = false;
  };

  // 保存
  const handleSave = ({
    addCallBack,
    updateCallBack,
    addParams,
    updateParams,
    filterForm
  }) => {
    nextTick(() => {
      if (isAdd.value) {
        addCallBack(addParams)
          .then((res) => {
            if (res.code === "200") {
              ElMessage.success("新增成功");
              formDialogVisible.value = false;
              isEdit.value = false;
              isAdd.value = false;
              pageNumber.value = 1;
              getTableDataCallBack(filterForm);
            } else {
              ElMessage.error(res.data);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        updateCallBack(updateParams)
          .then((res) => {
            if (res.code === "200") {
              ElMessage.success("更新成功");
              formDialogVisible.value = false;
              isEdit.value = false;
              getTableDataCallBack(filterForm);
            } else {
              ElMessage.error(res.data);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  // 删除
  const handleDelete = (row, { deleteCallback, filterForm } = {}) => {
    let dataObj = row ? row : formData.value;
    ElMessageBox.confirm(`此操作不可恢复，您确定要进行删除操作吗？`, "删除提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        deleteCallback({
          id: dataObj.id
        }).then((res) => {
          if (res.code === "200") {
            ElMessage({
              type: "success",
              message: "删除成功"
            });
            formDialogVisible.value = false;
            pageNumber.value = 1;
            getTableDataCallBack(filterForm);
          } else {
            ElMessage({
              type: "error",
              message: res.data
            });
          }
        });
      })
      .catch(() => {});
  };

  // 关闭dialog
  const handleCloseDialog = () => {
    formDialogVisible.value = false;
    isEdit.value = false;
    isAdd.value = false;
  };

  const bindScroll = (tableId, fn) => {
    _dom = document.querySelector(
      `#${tableId} .el-scrollbar__wrap--hidden-default`
    );
    _dom.addEventListener("scroll", (e) => {
      if (fn) fn(e);
      // console.log(e.target.scrollLeft)
    });
  };
  const tableScroll =(tableId,obj={
    row:0, //第几行
    col:0,  //第几列
    top: 100,
    left: 3000,
    behavior: "smooth"
  })=>{
    _dom = document.querySelector(
      `#${tableId} .el-scrollbar__wrap--hidden-default`
    );
    
    if(obj.row||obj.col){   
      obj.behavior="smooth"   
      let domR=document.querySelector(`#${tableId} tbody tr:nth-child(${obj.row||1})`)      
      let domC=document.querySelector(`#${tableId} tbody td:nth-child(${obj.col||1})`)
      if(!domR||!domC){
        console.error('行或列数不存在！')
        return;
      }
      obj.top=domR.offsetTop;
      obj.left=domC.offsetLeft;
      _dom.scrollTo(obj);
    }else{
      _dom.scrollTo(obj);
    }
  }

  return {
    bindScroll, //绑定滚动事件
    tableScroll, //滚动到指定位置，支持top/left和行数列数
    formDialogVisible,
    formDialogTitle,
    formData,
    isEdit,
    isAdd,
    handleRowClick,
    handlePrevNext,
    handleAdd,
    handleEdit,
    handleCancel,
    handleSave,
    handleDelete,
    handleCloseDialog
  };
}
