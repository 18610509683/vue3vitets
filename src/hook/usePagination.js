import { ref } from "vue";
export default function (getTableDataCallBack, pageSizeInitValue) {
  let pageNumber = ref(1);
  let pageSize = ref(pageSizeInitValue);
  let total = ref(0);

  const handleChangePage = ({ pageNum, filterForm }) => {
    console.log(filterForm);
    pageNumber.value = pageNum;
    getTableDataCallBack(filterForm);
  };

  return {
    pageNumber,
    pageSize,
    total,
    handleChangePage
  };
}
