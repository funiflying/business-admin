import request from '../utils/request';
import constant from '../utils/constant'
export function fetch({page=1,size=20,name='',code='',address=''}) {
  return request(constant.COMMUNITY+`?pageNo=${page}&pageNum=${size}&name=${name}&code=${code}&address=${address}`)
}
export function fetchAll({page=1,size=1000000,name='',orgId}) {
  return request(constant.COMMUNITY_LIST_ALL+`?pageNo=${page}&pageNum=1000000&name=${name}&organizationId=${orgId}`)
}
export function fetchChildren({page=1,size=1000000,name='',orgId}) {
    return request(constant.COMMUNITY_LIST_CHILDREN+`?pageNo=${page}&pageNum=1000000&name=${name}&organizationId=${orgId}`)
}
export function fetch_by_eid({page=1,size=1000000,eid}) {
  return request(constant.COMMUNITY_LIST_BY_COMPANY+`?pageNo=${page}&pageNum=1000000&eid=${eid}`)
}
export function remove(id) {
  return request(constant.COMMUNITY_DELETE+`?id=${id}`)
}
export function patch(values) {
  return request(constant.COMMUNITY_EDIT,{
    method:'POST',
    body:JSON.stringify(values)
  })
}
export function create(values) {
  return request(constant.COMMUNITY_CREATE,{
    method:'POST',
    body:JSON.stringify(values)
  })
}
