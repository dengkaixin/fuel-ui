/*
 * @Author: dengkaixin
 * @Descripttion: dengkaixin的代码
 * @Date: 2021-07-23 15:46:56
 * @LastEditors: dengkaixin
 * @LastEditTime: 2021-07-23 16:43:29
 */
import { useEffect, useState } from 'react';
import JReap from 'jreap-core';
const formHeaders = { 'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8' };

// 获取数据字典数据
const getDictSource = async (code) => {
  if (!code) return;

  const data = JReap.getSessionAttr(code)
  if (data) {
    return data;
  } else {
    const res:any = await JReap.getDataService(`/base/web/code/getCodeTree.form`, {mark: code}, "POST", formHeaders);
    const dictData = res?.data?.rows?.map(item => {
      return {
        title: item.name,
        key: item.value,
        value: item.value,
      }
    });
    JReap.setSessionAttr(code, dictData);
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