import request from '../utils/request';
import constant from '../utils/constant'
export function fetch({page=1,size=20,name='',code='',address=''}) {
  return request(constant.COMMUNITY+`?pageNo=${page}&pageNum=${size}&name=${name}&code=${code}&address=${address}`)
}
export function fetchAll({page=1,size=20,name,org,code,address}) {
  return request(constant.COMMUNITY_LIST_ALL+`?pageNo=${page}&pageNum=${size}&name=${name}&organizationId=${org}&code=${code}&address=${address}`)
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
