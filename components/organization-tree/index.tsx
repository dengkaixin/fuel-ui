import SearchTree from '../search-tree';
import * as React from 'react';
import './index.scss';
import { loginInfoSend } from '../../page/frame/actions'
import JReap from 'jreap-core';
import { getLoginUserInfo, DEFAUTL_JREAP_01 } from '@utils';
import { getTreeData, searchTreeData } from './services';

const JUMP_PAGE = {
	TOTLE: 10,
	NUMBER: 5,
};
interface OrganizationTreeType {
	selectedKey?: string,
	onSelect: (selectedKeys, selectedNodes) => void,
	isReload?: string,
}
const OrganizationTree: React.FC<OrganizationTreeType> = (props: OrganizationTreeType) => {
	const { onSelect, isReload, selectedKey = '' } = props;

	const [treeData, setTreeData] = React.useState<Array<any>>([]);
	const [searchNodes, setSearchNodes] = React.useState<Array<any>>([]);
	const [expandedKeys, setExpandedKeys] = React.useState<Array<any>>([]);
	const [selectedKeys, setSelectedKeys] = React.useState<Array<any>>([]);
	const [loadedKeys, setLoadedKeys] = React.useState<Array<any>>([]);
	const [data, setData] = React.useState<Array<any>>([]);
	const [expandInfo, setExpandInfo] = React.useState<{
		expandIds: Array<any>;
		nextIds: Array<any>;
		prevIds: Array<any>;
	}>({ expandIds: [], nextIds: [], prevIds: [] });

	React.useEffect(() => {
		initTreeData();
	}, [isReload]);



	/**
	   * 获得及保存登录信息到setSessionAttr
	*/
	function onGetLogin(): any {
		const loginInfo = {
			dataSource: {
				read: {
					url: JReap.jreapProj + 'web/right/auth/loginInfo.form',
					data: {
					}
				}
			}
		}
		let infos = loginInfoSend(loginInfo).then((data: any) => {
			//根据data.pwdhint判断是否需要修改密码
			const _data = data.data.result ? data.data.result : "";
			setData(_data)
			JReap.setSessionAttr('loginInfo', JSON.stringify(_data))
			return _data
		})
		return infos
	}
	/**
	 * 机构树初始化
	 *
	 */
	async function userInfo() {
		const userInfodata = await onGetLogin();
		const _data = userInfodata ? userInfodata : "";
		if (_data) {
			// TODO 遗留是否查询默认机构取值逻辑
			// searchType 1表示机构树初始化查询用户区分查询table与子节点
			getTreeData({ condition: { busiCode: DEFAUTL_JREAP_01, ...getLoginUserInfo(), searchType: 1 } }).then((res: any) => {
				setTreeData(res);
				if (res.length > 0) {
					// 重新查询后子节点数据不存在，需要清空已加载的节点重新再查询
					setLoadedKeys([]);
					// 设置展开节点
					setExpandedKeys([String(res[0].id), ...expandedKeys]);
					// 设置选中节点
					let currKey = selectedKeys.length ? selectedKeys[0] : res[0].id;
					if (selectedKey) currKey = selectedKey;
					setSelectedKeys([String(currKey)]);
				}
			});
		}
	}
	const initTreeData = (): void => {
		if(getLoginUserInfo().id!=""){
			// TODO 遗留是否查询默认机构取值逻辑
			// searchType 1表示机构树初始化查询用户区分查询table与子节点
			getTreeData({ condition: { busiCode: DEFAUTL_JREAP_01, ...getLoginUserInfo(), searchType: 1 } }).then((res: any) => {
				setTreeData(res);
				if (res.length > 0) {
					// 重新查询后子节点数据不存在，需要清空已加载的节点重新再查询
					setLoadedKeys([]);
					// 设置展开节点
					setExpandedKeys([String(res[0].id), ...expandedKeys]);
					// 设置选中节点
					let currKey = selectedKeys.length ? selectedKeys[0] : res[0].id;
					if (selectedKey) currKey = selectedKey;
					setSelectedKeys([String(currKey)]);
				}
			});
		}else{
			userInfo()
		}
		
	};

	/**
	 * 记录选中节点，默认再次选中
	 *
	 * @param {Array<string>} selectedKeys
	 * @param {Array<object>} selectedNodes
	 */
	const treeSelect = (selectedKeys: Array<string>, selectedNodes: Array<object>): void => {
		setSelectedKeys(selectedKeys);
		onSelect && onSelect(selectedKeys, selectedNodes);
	};

	const treeProps = {
		inputProps: {
			onSearch(event: any, value: string) {
				searchTreeData({ condition: { busiCode: DEFAUTL_JREAP_01, ...getLoginUserInfo(), name: value, searchType: 1 } }).then((res) => {
					const { busiOrganTreeDto = {}, expandId = [] } = res;
					// 如果展开ID总长度为10，直接全部加载
					let nextIds = [],
						prevIds = [];
					if (expandId.length <= JUMP_PAGE.TOTLE) {
						setExpandedKeys((oldKeys: Array<string>) => {
							return [...oldKeys, ...expandId];
						});
					} else {
						// 如果长度大于10条，取前后各5个ID展开加载，分批次展开节点
						nextIds = expandId.slice(0, JUMP_PAGE.NUMBER);
						prevIds = expandId.slice(expandId.length - JUMP_PAGE.NUMBER, expandId.length + 1);
						setExpandedKeys((oldKeys: Array<string>) => {
							return [...oldKeys, ...nextIds, ...prevIds];
						});
					}
					// 存放展开的ID
					setExpandInfo({ expandIds: expandId, nextIds, prevIds });
					// 延后设置，防止展开节点未加载完毕
					setTimeout(() => {
						setSearchNodes(busiOrganTreeDto);
					}, 1000);
				});
			},
			onChange() { },
			placeholder: '在机构树中查询',
			showResult: true,
		},
		treeProps: {
			nodeKey: 'id',
			nodeName: 'name',
			nodeLeaf: 'hasChild',
			children: 'items',
			iconRender(node: any) {
				let htmlNode = <i style={{ color: '#AEADAD' }} className="icon iconfont icon-yuandian" />;
				if (!node.isLeaf) {
					htmlNode = <i style={{ color: '#F2B223' }} className="icon iconfont icon-tree-folder-close" />;
					if (node.expanded) {
						htmlNode = <i style={{ color: '#F2B223' }} className="icon iconfont icon-tree-folder-open" />;
					}
				}
				return <React.Fragment>{htmlNode}</React.Fragment>;
			},
			treeSelect,
			beforeJump(jumpType: string, currNodeIndex: number) {
				let { expandIds, nextIds, prevIds } = expandInfo;
				// 需展开的id长度大于10个才分批次展开
				// 判断nextIds与prevIds的总长度是否等于需展开的id长度
				const expandedLength = nextIds.length + prevIds.length;
				if (expandIds.length > JUMP_PAGE.TOTLE && expandIds.length >= expandedLength) {
					if (jumpType === 'next') {
						// 获取下批次展开的ID
						nextIds = expandIds.slice(nextIds.length, nextIds.length + JUMP_PAGE.NUMBER);
						// 设置到展开treeData属性中
						setExpandedKeys((oldKeys: Array<string>) => {
							return [...oldKeys, ...nextIds];
						});
						// 记录展开的数据信息
						setExpandInfo((oldDatas: any) => {
							return {
								expandIds,
								nextIds: [...oldDatas.nextIds, ...nextIds],
								prevIds,
							};
						});
					} else {
						// 获取下批次展开的ID
						const endIndex = expandIds.length - prevIds.length;
						prevIds = expandIds.slice(endIndex - JUMP_PAGE.NUMBER, endIndex);
						// 设置到展开treeData属性中
						setExpandedKeys((oldKeys: Array<string>) => {
							return [...oldKeys, ...prevIds];
						});
						// 记录展开的数据信息
						setExpandInfo((oldDatas: any) => {
							return {
								expandIds,
								nextIds,
								prevIds: [...oldDatas.prevIds, ...prevIds],
							};
						});
					}
				}
			},
			searchNodes,
			lastNodeClassName: 'last-node-style',
			defaultProps: {
				treeData,
				loadData(treeNode: any): Promise<any> {
					return new Promise((resolve) => {
						const { hasChild, id, children } = treeNode.props;
						if (!hasChild || children.length) {
							resolve('');
							return;
						}
						// 异步加载子节点
						getTreeData({ condition: { busiCode: DEFAUTL_JREAP_01, ...getLoginUserInfo(), id } }).then((res: any) => {
							const [resData = {}] = res;
							// 后端返回了父节点，需过滤
							treeNode.props.dataRef.items = resData.items || [];
							setLoadedKeys([id, ...loadedKeys]);
							setTreeData(() => [...treeData]);
							resolve('');
						});
					});
				},
				onExpand(expandedKeys: Array<string>) {
					setExpandedKeys(expandedKeys);
				},
				expandedKeys,
				selectedKeys,
				loadedKeys,
				showIcon: true,
				showLine: true,
			},
		},
	};

	return (
		<React.Fragment>
			<SearchTree {...treeProps} className={'organization-tree'} />
		</React.Fragment>
	);
};

export default OrganizationTree;