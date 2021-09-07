// /*
//  * @Author: 邓凯欣
//  * @Date: 2021-06-16 11:17:44
//  * @LastEditTime: 2021-09-07 13:53:56
//  * @LastEditors: dengkaixin
//  * @Description: In User Settings Edit
//  * @FilePath: /fuel-mc-web/src/components/pageHeader/index.tsx
//  */
// import React, { useState } from "react";
// import { Button, Form, Input } from 'antd';
// import { WrappedFormUtils } from 'antd/lib/form/Form';
// import './index.scss';

// interface HeaderOptionsProps {
//   title: string,
//   size?: 'small' | 'middle' | 'big',
//   iconList?: React.ReactNode[], //icon按钮组
//   form: WrappedFormUtils,
//   searchOptions?: SearchOption,
// }

// export type SearchOption = (
//   form: WrappedFormUtils,
// ) => {
//   defaultShowLength?: number,  //默认展示搜索框数量
//   formList: React.ReactNode[],  //搜索输入框列表
//   onQuerySubmit: (value: any) => void,
// };

// const PageTitle: React.FC<HeaderOptionsProps> = ({
//   title,
//   form,
//   size,
//   iconList,
//   searchOptions
// }: HeaderOptionsProps) => {
//   const { defaultShowLength, formList, onQuerySubmit } = (searchOptions && searchOptions(form)) ?? {};
//   const [expend, setExpend] = useState<boolean>(false);  //默认收起； 收起-展开筛选
//   // 重置
//   const resetFields = () => {
//     form.resetFields();
//     formSubmit();
//   }
//   // 查询
//   const formSubmit = () => {
//     form.validateFields((err: any, values: any) => {
//       if (!err) {
//         onQuerySubmit && onQuerySubmit(values)
//       }
//     });
//   }

//   const renderFormContent = () => {
//     if (!formList?.length) return;
//     // 收起
//     if (!expend) {
//       return <div className={'header-right'}>
//         {formList.map((item, index) => {
//           if (defaultShowLength && index > defaultShowLength - 1) return <div style={{ display: 'none' }}>{item}</div>
//           return <div>{item}</div>
//         })}
//         <Button type={'primary'} onClick={formSubmit}>查询</Button>
//       </div>
//     }
//     // 展开
//     return <div className={'multi-search-bar'}>
//       {formList}
//       <div>
//         <Button type={'primary'} onClick={formSubmit}>查询</Button>
//         <Button onClick={resetFields}>重置</Button>
//       </div>
//     </div>
//   }
//   return <div className={'page-header'}>
//     <header className={size ? `header ${size}` : 'header'}>
//       {/* 标题 */}
//       <span className={'header-left'}>
//         <span className={'titleName'}>{title}</span>
//         <div className={'header-left-item'}>
//           {iconList}
//         </div>
//       </span>

//       {/* 收起 */}
//       {renderFormContent()}

//       {defaultShowLength && <Button type={'link'} onClick={() => setExpend(!expend)}>
//         {expend ? '收起' : '筛选'}
//       </Button>}
//     </header>

//     {/* 全部展开 */}
//     {renderFormContent()}
//   </div>
// }
// export default Form.create<HeaderOptionsProps>()(PageTitle);