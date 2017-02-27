import request from '../utils/request';
import constant from '../utils/constant'
export function fetch({page=1,size=20,name,status}) {
  return request(constant.APP_LIST+`?pageNo=${page}&pageNum=${size}&name=${name}&status=${status}&}`)
}
export function fetchConf(id) {
  return request(constant.APP_GET_CONF+`?id=${id}`)
}
export function setConf(values) {
  return request(constant.APP_CONF,{
    method:"POST",
    body:JSON.stringify(values)
  })
}
export function remove(id) {
  return request(constant.APP_DELETE+`?id=${id}`)
}
export function patch(values) {
  return request(constant.APP_EDIT,{
    method:'POST',
    body:JSON.stringify(values)
  })
}
export function patchConf(values) {
  return request(constant.APP_CONF,{
    method:'POST',
    body:JSON.stringify(values)
  })
}
export function create(values) {
  return request(constant.APP_CREATE,{
    method:'POST',
    body:JSON.stringify(values)
  })
}
