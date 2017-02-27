export default {
  //登录模块
  LOGIN_ACCOUNT:"/api/account/loginByAccount",//用户登录
  COMPANY_LIST:"/api/enterprise/getEnterprisesByPage",//企业列表
  COMPANY_DELETE:"/api/enterprise/deleteEnterprise",//删除企业
  COMPANY_EDIT:"/api/enterprise/updateEnterprise",//企业编辑
  COMPANY_CREATE:"/api/enterprise/insertEnterprise",//新增企业
  COMMUNITY:"/api/community/getByWhere",//查询社区
  COMMUNITY_LIST:"/api/community/getCommunityByOrganization",//特定组织机构社区列表
  COMMUNITY_LIST_ALL:"/api/community/getCommunityByOrganizationAll",//组织机构所有社区列表
  COMMUNITY_CREATE:"/api/community/insertCommunity",//新增社区
  COMMUNITY_DELETE:"/api/community/deleteCommunity",//删除社区
  COMMUNITY_EDIT:"/api/community/updateCommunity",//编辑社区
  APP_LIST:"/api/third/getByPage",//应用列表
  APP_DELETE:"/api/third/deleteThird",//删除应用
  APP_CREATE:"/api/third/insertThird",//新增应用
  APP_EDIT:"/api/third/updateThird",//编辑应用
  APP_GET_CONF:"/api/third/getCallbackUrl",//获取应用回调
  APP_CONF:"/api/third/setCallbackUrl",//设置回调
  BUILDING_LIST:"/api/community/getBuildingByCommunity",//楼宇列表
  BUILDING_DELETE:"/api/community/deleteBuilding",//删除楼宇
  BUILDING_EDIT:"/api/community/updateBuilding",//编辑楼宇
  BUILDING_CREATE:"/api/community/insertBuilding",//创建楼宇

}
