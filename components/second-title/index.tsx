/*
 * @Author: dengkaixin
 * @Descripttion: dengkaixin的代码
 * @Date: 2021-07-21 17:09:07
 * @LastEditors: dengkaixin
 * @LastEditTime: 2021-09-07 11:08:28
 */
import React, { CSSProperties, ReactNode } from 'react'
import './index.scss'

interface SecondTitleProps {
    title: string;
    divider?: boolean;
    children?: ReactNode | ReactNode[];
    style?: CSSProperties;
}

function SecondTitle({
    title,
    style,
    divider = true,
    children
}: SecondTitleProps) {
    return (
        <div className={`secondary-title ${divider ? 'bottom-line' : ''}`} style={style} >
            <span className={'circle-style'} />
            <span className={'circle-style'} />
            <span className={'title-name'}>{title}</span>
            {children}
        </div>
    )
}
export default SecondTitle