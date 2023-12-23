import { useState, useEffect } from "react";

/**
 * @description useRequest
 * @param {Function} api // 接口函数
 * @param {Array} params //给函数传的值
 * @param {String} pages //分页数据
 * @returns
 */
function useRequest(api, params, pages) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await api(params, pages)
        .then((res) => {
          // const data = res.data.result.map( (item, index) => {
          //   item.serialnumber = (query.current - 1) * query.size + index + 1;
          //   return item;
          // })
          setData(res.data.result);
        })
        .catch((error) => {
          setError(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    fetchData();
  }, [api, pages.current, pages.size]);

  return [data, error, isLoading];
}
export default useRequest;
/**
 * 使用方法
  const params = [
    {
      key: "areaComID",
      cond: "eq",
      value: JSON.parse(localStorage.getItem("com"))["id"],
    },
    { key: "updatedAt", cond: "sort", value: "desc" },
  ];
  const pages = {
    current,
    size,
  };
  const [data, error, isLoading] = useRequest(TableDataApi, params, pages);
  console.log("use函数", data, error, isLoading);
 */
