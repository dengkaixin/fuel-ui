import jreap, { JreapService } from 'jreap-core';

/**
 * 组织机构树查询
 *
 * @export
 * @param {object} [params={}]
 * @return {*}  {Promise<any>}
 */
export function getTreeData(params: object = {}): Promise<any> {
	return new Promise((resolve, reject) => {
		JreapService.post(`${jreap.jreapProj}usercenter/organManager/findBusiOrgTree.form`, params).then((res: any) => {
			let { result } = res?.data || {};
			if (result && Object.keys(result).length) {
				result = [result];
			}
			resolve(Array.isArray(result) ? result : []);
		});
	});
}

/**
 * 根据关键字查询
 *
 * @export
 * @param {object} [params={}]
 * @return {*}  {Promise<any>}
 */
export function searchTreeData(params: object = {}): Promise<any> {
	return new Promise((resolve, reject) => {
		JreapService.post(`${jreap.jreapProj}usercenter/organManager/searchBusiOrgTreeByKeyWord.form`, params).then((res: any) => {
			const { result } = res?.data || {};
			resolve(result || {});
		});
	});
}
