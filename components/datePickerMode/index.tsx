/*
 * @Author: dengkaixin
 * @Descripttion: dengkaixin的代码
 * @Date: 2021-07-26 16:45:38
 * @LastEditors: dengkaixin
 * @LastEditTime: 2021-09-07 14:34:37
 */
import React, { useState } from 'react';
import { DatePicker, Select } from 'antd';
import { DatePickerProps } from "antd/lib/date-picker/interface";

export const monthList = [
  { value: '01', name: '一月' },
  { value: '02', name: '二月' },
  { value: '03', name: '三月' },
  { value: '04', name: '四月' },
  { value: '05', name: '五月' },
  { value: '06', name: '六月' },
  { value: '07', name: '七月' },
  { value: '08', name: '八月' },
  { value: '09', name: '九月' },
  { value: '10', name: '十月' },
  { value: '11', name: '十一月' },
  { value: '12', name: '十二月' },
]
interface DatePickerYearType extends DatePickerProps {
  onChange?: (value) => void
}

const DatePickerYear: React.FC<DatePickerYearType> = (props: DatePickerYearType) => {
  const { onChange, ...restProps } = props;
  const [isopen, setIsopen] = useState(false);

  const handlePanelChange = (value) => {
    setIsopen(false);
    onChange && onChange(value);
  }

  const handleOpenChange = (status) => {
    setIsopen(status);
  }

  return (<DatePicker
    mode={'year'}
    format={'YYYY'}
    {...restProps}
    open={isopen}
    onOpenChange={handleOpenChange}
    onPanelChange={handlePanelChange}
  />);
}

const DatePickerMonth: React.FC<any> = (props: any) => {
  return (
    <Select placeholder={'请选择月份'} {...props}>
      {monthList.map(item => <Select.Option key={item.value} value={item.value}>{item.name}</Select.Option>)}
    </Select>
  );
}
export {
  DatePickerYear,
  DatePickerMonth
}