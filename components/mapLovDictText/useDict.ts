/*
 * @Author: dengkaixin
 * @Descripttion: dengkaixin的代码
 * @Date: 2021-07-23 15:46:56
 * @LastEditors: dengkaixin
 * @LastEditTime: 2021-09-07 16:00:24
 */
import { useEffect, useState } from 'react';
import axios from 'axios';
const formHeaders = { 'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8' };

// 获取数据字典数据
const getDictSource = async (code) => {
  if (!code) return;

  const data = sessionStorage[code] && JSON.parse(sessionStorage[code]);
  if (data) {
    return data;
  } else {
    const res: any = await axios.post('/base/web/code/getCodeTree.form', { mark: code }, { headers: formHeaders,})
    const dictData = res?.data?.rows?.map(item => {
      return {
        title: item.name,
        key: item.value,
        value: item.value,
      }
    });
    sessionStorage[code] = JSON.stringify(dictData);
    return dictData;
  }
};

const useDict = (code) => {
  const [dataSource, setDataSource] = useState<any>([]);

  useEffect(() => {
    getDictSource(code).then((dictData) => {
      setDataSource(dictData || []);
    });
  }, [code]);

  return dataSource;
};

export default useDict;