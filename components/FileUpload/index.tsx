import React, { useEffect, useState } from 'react';
import { Button, Icon, message, Popconfirm, Progress, Tooltip, Upload } from "antd";
import axios from 'axios';
import './index.scss'
const acceptType = '.xls,.xlsx,.doc,.docx,.ppt,.pptx,.jpg,.png,.rar,.tar,.txt,.pdf';
let deleteFileIds: string[] = [];
// 返回文件列表的id，以,逗号分隔的字符串
const fileIdsTrans = (list) => {
    let fileIds = [] as any
    list.forEach(file => {
        if (file.response?.id) {
            fileIds.push(file.response.id);
        } else if (file.uid) {
            fileIds.push(file.uid);
        }
    })
    return fileIds
}
// 文件大小格式化
const formatSize = (size) => {
    if (size < 1024) {
        return `${size} 字节`;
    } else if (size < 1024 * 1024) {
        return (size / 1024).toFixed(1) + 'KB';
    } else {
        return (size / 1024 / 1024).toFixed(1) + 'MB'
    }
}
// 上传参数
const param: any = {
    // bizType: 'acountPutuers',
    bizId: null,
    uploadType: '1',
    lastModified: '',
    subPath: '',
    orderName: 'recordDate',
    six: 'asc'
}
let paramStr = ''

for (var i in param) {
    paramStr += `${i}=${param[i]}&`
}

type fileList = {
    uid: string,
    name: string,
    status: string,
    createTime?: string,
    createUser?: string,
    size: number,
}[]
interface FileUploadProps {
    bizType?: string,
    bizId?: string | number, // 业务ID
    onChange: (fileIds, deleteFileIds) => void,
    saveCount?: any;
    disabled?: boolean,
    showUploadButton?: boolean,
    update?: number | string,
}
const FileUpload: React.FC<FileUploadProps> = (props: FileUploadProps) => {
    let {
        bizId,
        bizType = 'acountPutuers',
        onChange,
        disabled = false,
        showUploadButton = true,
        update,
    } = props;
    const [fileList, setFileList] = useState<fileList>([]);
    const [url, setuUrl] = React.useState({
        idvUrl: '',
        downloadUrl: ''
    })
    useEffect(() => {
        deleteFileIds = [];
        if (!bizId) {
            setFileList([]);
        } else {
            axios.get('/jreap/web/fileupload/list.form', { 
                params: {...param, bizType, bizId },
                headers: {'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'}
            })
            .then((res: any) => {
                const data = res?.data?.rows ?? [];
                data.forEach((item: any) => {
                    item.uid = item.id;
                    item.name = item.fileName;
                    item.status = 'done';
                });
                setFileList(data);
            });
        }
    }, [update, bizId]);

    useEffect(() => {
        axios.post('/base/web/code/getCodeTree.form', { mark: 'dzurlcode_' } , { 
            headers: {'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
        .then((res: any) => {
            const rows = (res.data || {}).rows || [];
            setuUrl({
                idvUrl: rows[0] && rows[0].value,
                downloadUrl: rows[1] && rows[1].value
            })
        });
    }, [])
    console.log('url', url);
    useEffect(() => {
        const newFileList = fileList.filter(i => i.status === 'done');
        const fileIds = fileIdsTrans(newFileList)
        onChange(String(fileIds), String(deleteFileIds))
    }, [fileList])
    const fileProps = {
        // action: `/jreap/web/fileupload/upload.form?${paramStr.substring(0, paramStr.length - 1)}`,
        action: `/jreap/web/fileupload/upload.form?${paramStr}bizType=${bizType}`,
        accept: acceptType,
        headers: {
            Accept: 'multipart/form-data'
        },
        data: {
            uploadType: 1,
        },
        beforeUpload: (file): any => {
            return new Promise((resolve, reject) => {
                const fileType = file.name.split('.').splice(-1)[0];
                const acceptTypeArray = acceptType.split(',');
                if (acceptTypeArray.indexOf(`.${fileType}`) === -1) {
                    message.warning('上传文件类型不正确');
                    return reject(false);
                }
                if (file.size > 1048576 * 20) {
                    message.error('不能上传超过20M的文件');
                    return reject(false);
                }
                if (file?.serverResponse?.flag == 'error') {
                    message.error('文件上传失败, 服务器异常')
                    return reject(false);
                }
                if (file.status === 'error') {
                    message.error(`${file.name} 文件上传失败。`);
                    return reject(false);
                }
                return resolve(true);
            });
        },
        onChange(data) {
            const { file } = data;
            const newFileList = [...fileList];
            const item: any = newFileList.filter(i => i.uid === file.uid);
            if (item.length) {
                item.percent = file.percent;
                setFileList(newFileList);
            } else {
                const newFileList = fileList.concat(file);
                setFileList(newFileList);
            }
            // if (file.status === 'done') {
            //     const newFileList = [...fileList].filter(i => i.status === 'done');
            //     onChange(fileIdsTrans(newFileList));
            // }
        },
        onPreview: (file) => {
            // 统计预览次数
            if (file.id) {
                if (props.saveCount !== undefined) {
                    props.saveCount()
                }
            }
            const uid = file.id ?? file.response?.id;
            // window.open('/jreap/web/fileupload/viewFile.form?attrId=' + uid);
            // window.open(`/view/url?url=` + encodeURIComponent(`http://192.168.20.199/jreap/web/fileupload/downloadData.form?attrId=${uid}`))
            window.open(`${url.idvUrl}/view/url?url=` + encodeURIComponent(`${url.downloadUrl}/fuel-mc/web/fileupload/downloadData.form?attrId=${uid}`))
        },
        onRemove: (file) => {
            const newFileList = fileList.slice().filter(i => i.uid !== file.uid);
            setFileList(newFileList);
            if (file?.response?.id) {
                axios.post('/jreap/web/fileupload/deleteData.form', { fileid: file.response.id } , { 
                    headers: {'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'}
                })
            } else {
                deleteFileIds.push(file.uid);
            }
        },
        onDownload: (file) => {
            const uid = file.id ?? file.response?.id ?? file.uid;
            (window as any).location.href = '/jreap/web/fileupload/downloadData.form?attrId=' + uid;
        },
        fileList: fileList as any,
    }
    return (
        <>
            {showUploadButton &&
                <Upload {...fileProps} disabled={disabled} showUploadList={false}>
                    <Button className={disabled ? 'upload-btn disabled' : 'upload-btn'} type="dashed">
                        <span className="icon iconfont  k-i-export" />上传附件
                    </Button>
                </Upload>
            }
            <div className={'fileListWrapper'}>
                {fileList.map((file: any, index) => {
                    const size = formatSize(file.size);
                    return (<div style={{ position: 'relative' }}>
                        <div className={file.status === 'error' ? 'file-item error' : 'file-item'}>
                            <Tooltip title={file.status === 'error' ? file.response : ''}>
                                <div className={'file'}>
                                    <div className={'file-name'} title={file.name}>
                                        <span className="icon iconfont iconfujian" />
                                        {file.name}
                                    </div>
                                    <div className={'file-size'}>
                                        {size}
                                    </div>
                                </div>
                            </Tooltip>
                            <div className={'action'}>
                                {file.status === 'error' ?
                                    <span className="k-icon k-i-delete" onClick={() => {
                                        fileProps.onRemove(file)
                                    }} />
                                    :
                                    <>
                                        <span className="k-icon k-i-chaxun" onClick={() => {
                                            fileProps.onPreview(file);
                                        }} />
                                        <Icon type="download" onClick={() => {
                                            fileProps.onDownload(file);
                                        }} />
                                        {showUploadButton && !disabled &&
                                            <Popconfirm title="您确定要删除此文件吗？" placement="leftTop" onConfirm={() => {
                                                fileProps.onRemove(file)
                                            }}>
                                                <span className="k-icon k-i-delete" />
                                            </Popconfirm>
                                        }
                                    </>
                                }
                            </div>
                        </div>
                        {file.percent && file.percent !== 100 &&
                            <Progress style={{ position: 'absolute', bottom: '-10px' }} percent={file.percent} strokeWidth={2} showInfo={false} />}
                    </div>)
                })}
            </div>
        </>
    )
}

export default FileUpload;
