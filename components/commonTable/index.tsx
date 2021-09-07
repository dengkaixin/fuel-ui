/*
 * @Author: dengkaixin
 * @Descripttion: dengkaixin的代码
 * @Date: 2021-07-21 19:14:13
 * @LastEditors: dengkaixin
 * @LastEditTime: 2021-07-21 19:16:19
 */
import * as React from "react";
import { Table } from 'antd';
import './index.scss';
import { TableProps } from "antd/lib/table/interface";

interface CommonTableProps extends TableProps<any> {
    pagination?: any;
}

const BaseTable: React.FC<CommonTableProps> = (props: CommonTableProps) => {
    const { pagination = true, ...restProps } = props;

    return <Table
        bordered={true}
        {...restProps}
        pagination={
            typeof pagination === 'object' ?
                {
                    style: { margin: '10px 0', left: '0' },
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: () => {
                        const { current = 1, total = 0, pageSize = 20 } = pagination || {} as any;
                        const totalPage = Math.ceil(total / pageSize);
                        return `共 ${total} 条记录 第 ${current} / ${totalPage} 页`
                    },
                    ...pagination,
                } : pagination}
    />
}
export default BaseTable;