/*
 * @Author: dengkaixin
 * @Descripttion: dengkaixin的代码
 * @Date: 2021-09-07 10:36:13
 * @LastEditors: dengkaixin
 * @LastEditTime: 2021-09-07 10:42:34
 */
/*
 * @Author: dengkaixin
 * @Descripttion: dengkaixin的代码
 * @Date: 2021-09-07 10:36:13
 * @LastEditors: dengkaixin
 * @LastEditTime: 2021-09-07 10:42:34
 */
// /*
//  * @Author: 邓凯欣
//  * @Date: 2021-06-16 11:17:44
//  * @LastEditTime: 2021-08-11 09:28:03
//  * @LastEditors: dengkaixin
//  * @Description: In User Settings Edit
//  * @FilePath: /fuel-mc-web/src/components/pageHeader/index.tsx
//  */
// import * as React from "react";
// import { Button, Form } from 'antd';
// import { WrappedFormUtils } from 'antd/lib/form/Form';
// const { useState } = React;
// import './index.scss';

// interface HeaderOptionsType {
//   title: string,
//   size?: 'small' | 'middle' | 'big',
//   iconList?: React.ReactNode[], //icon按钮组
//   form: WrappedFormUtils,
//   searchOptions?: SearchOption,
// }

// export type SearchOption = (
//   form: WrappedFormUtils,
// ) => {
//   canExpend?: boolean,  //是否可以筛选收起
//   defaultShowLength?: number,  //默认展示搜索框数量
//   formList: React.ReactNode[],  //搜索输入框列表
//   onQuerySubmit: (value: any) => void,
// };

// const Page_Header: React.FC<HeaderOptionsType> = ({ title, form, size, iconList, searchOptions }: HeaderOptionsType) => {
//   const { canExpend = false, formList, defaultShowLength = 4, onQuerySubmit } = (searchOptions && searchOptions(form)) ?? {};
//   const [expend, setExpend] = useState<boolean>(false);
//   const resetFields = () => {
//     form.resetFields();
//     formSubmit();
//   }
//   const formSubmit = () => {
//     form.validateFields((err: any, values: any) => {
//       if (!err) {
//         onQuerySubmit && onQuerySubmit(values)
//       }
//     });
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

//       {/* 默认搜索输入框 */}
//       {formList && !expend && <div className={'header-right'}>
//         {formList.map((item, index) => {
//           if (index > defaultShowLength - 1 && canExpend) return <div style={{ display: 'none' }}>{item}</div>
//           return <div>{item}</div>
//         })}
//         <Button type={'primary'} onClick={formSubmit}>查询</Button>
//       </div>}

//       {canExpend && <Button type={'link'} onClick={() => setExpend(!expend)}>
//         {expend ? '收起' : '筛选'}
//       </Button>}
//     </header>

//     {/* expend */}
//     {formList && expend && <>
//       <div className={'multi-search-bar'}>
//         {formList}
//         <div>
//           <Button type={'primary'} onClick={formSubmit}>查询</Button>
//           {expend && <Button onClick={resetFields}>重置</Button>}
//         </div>
//       </div>
//     </>}
//   </div>
// }
// export default Form.create<HeaderOptionsType>()(Page_Header);