export default {
  //登录模块
  LOGIN_ACCOUNT:"/api/account/loginByAccount",//用户登录
  COMPANY_LIST:"/api/enterprise/getEnterprisesByPage",//企业列表
  COMPANY_DELETE:"/api/enterprise/deleteEnterprise",//删除企业
  COMPANY_EDIT:"/api/enterprise/updateEnterprise",//企业编辑
  COMPANY_CREATE:"/api/enterprise/insertEnterprise",//新增企业
  COMMUNITY_LIST:"/api/community/getCommunityByOrganization",//T特定组织机构社区列表
  COMMUNITY_LIST_ALL:"/api/community/getCommunityByOrganizationAll",//组织机构所有社区列表
  COMMUNITY_CREATE:"/api/community/insertCommunity",//新增社区
}
