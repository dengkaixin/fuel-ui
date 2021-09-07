/*
 * @Author: dengkaixin
 * @Descripttion: dengkaixin的代码
 * @Date: 2021-07-23 15:39:38
 * @LastEditors: dengkaixin
 * @LastEditTime: 2021-09-07 14:42:17
 */
import React, { useEffect, useState } from 'react';
import useDict from './useDict';
interface MapLovDictTextProps {
  value: string;
  code?: string;
}

const MapLovDictText: React.FC<MapLovDictTextProps> = (props) => {
  const { code, value } = props;

  const dataSource = useDict(code);
  const [v, setV] = useState<string>('');
  useEffect(() => {
    if (dataSource && dataSource.length && value) {
      const name = dataSource.find(item => item.value === value)?.title;
      setV(name);
    }
    else
      setV('');
  }, [value, dataSource]);
  return <span title={v}>{v}</span>
};

export default MapLovDictText;
