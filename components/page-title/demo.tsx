/*
 * @Author: dengkaixin
 * @Descripttion: dengkaixin的代码
 * @Date: 2021-09-07 10:36:13
 * @LastEditors: dengkaixin
 * @LastEditTime: 2021-09-07 11:05:00
 */
// /*
//  * @Author: dengkaixin
//  * @Descripttion: dengkaixin的代码
//  * @Date: 2021-07-21 17:04:16
//  * @LastEditors: dengkaixin
//  * @LastEditTime: 2021-08-06 09:00:12
//  */
// import * as React from 'react';
// import { Form, DatePicker, Tooltip } from 'antd'; 

// import PageHeader, { SearchOption } from '.';

// const Demo: React.FC<any> = (props: any) => {

//   const SearchOptions: SearchOption = (form) => {
//     const { getFieldDecorator } = form;
//     return {
//       canExpend: true,
//       defaultShowLength: 3,
//       formList: [
//         <Form.Item>
//           {getFieldDecorator('rangeDate', {
//             initialValue: undefined,
//           })(
//             <DatePicker.RangePicker
//               style={{ width: '260px' }}
//               placeholder={['填报开始时间', '填报结束时间']}
//             />
//           )}
//         </Form.Item>,
//       ],
//       onQuerySubmit: (values: any) => {
//         console.log('value', values);
//       }
//     }
//   }

//   return (
//     <PageHeader
//       title={'报告模版'}
//       iconList={[
//         <Tooltip title="添加">
//           <span className="k-icon k-i-add" onClick={() => { }} />
//         </Tooltip>,
//         <Tooltip title="编辑">
//           <span className="k-icon k-i-edit" />
//         </Tooltip>
//       ]}
//       searchOptions={SearchOptions}
//     />
//   );
// };

// export default Demo;