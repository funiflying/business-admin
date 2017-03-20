import request from '../utils/request';
import constant from '../utils/constant';

export function fetch_company_list({page=1,size=20,name=''}) {
    return request(constant.SERVICE_COMPANY_LIST+`?pageNo=${page}&pageNum=${size}&name=${name}`)
}
export function fetch_company_info({eid}) {
    return request(constant.SERVICE_COMPANY_INFO+`?eid=${eid}`)
}
export function audit_company({eid,status,reply}) {
    return request(constant.SERVICE_COMPANY_AUDIT+`?eid=${eid}&status=${status}&reply=${reply}`)
}
export function fetch_company_app_list({page=1,size=20,name=''}) {
    return request(constant.SERVICE_COMPANY_APP_LIST+`?pageNo=${page}&pageNum=${size}&name=${name}`)
}
export function audit_company_app({id,status,reply,deviceType,deviceCount,eid}) {
    return request(constant.SERVICE_COMPANY_AUDIT+`?id=${id}&status=${status}&reply=${reply}&deviceType=${deviceType}&deviceCount=${deviceCount}&eid=${eid}`)
}
export function fetch_community_app_list({page=1,size=20,name=''}) {
    return request(constant.SERVICE_COMMUNITY_APP_LIST+`?pageNo=${page}&pageNum=${size}&name=${name}`)
}
export function audit_community_app({id,status,reply,deviceType,deviceCount,eid}) {
    return request(constant.SERVICE_COMMUNITY_APP_AUDIT+`?id=${id}&status=${status}&reply=${reply}&deviceType=${deviceType}&deviceCount=${deviceCount}&eid=${eid}`)
}