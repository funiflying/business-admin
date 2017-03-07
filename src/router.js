import React from 'react';
import {getSession} from './utils/index'
import { Router, Route,hashHistory,IndexRoute } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Users from "./routes/Users.js";
import App from "./routes/App.js";
import Login from "./routes/Login"
import Company from "./routes/Company.js";
import Community from "./routes/Community.js";
import Community_Append from "./routes/Community-Append.js";
import Application from "./routes/Application.js";
import ApplicationAppend from "./routes/ApplicationAppend.js";
import ApplicationEdit from "./routes/ApplicationEdit.js";
import Building from "./routes/Building.js";
import BuildingAppend from "./routes/BuildingAppend.js";
import Organization from "./routes/Organization.js";
import Authorize from "./routes/Authorize.js";
import Role from "./routes/Role.js";
import Accredit from "./routes/Accredit.js";
import AccreditCompany from "./routes/AccreditCompany.js";
import AccreditCommunity from "./routes/AccreditCommunity.js";
import Room from "./routes/Room.js";
function RouterConfig({ history}) {
  function requireAuth(props) {

  }
  return (
    <Router history={history} onUpdate={requireAuth}>
      <Route path="/home" component={App} breadcrumbName="管理中心" >
        <Route path="/home" component={IndexPage} breadcrumbName="首页"   />
        <Route path="/users" component={Users} breadcrumbName="用户管理" />
        <Route path="/company" component={Company} breadcrumbName="企业管理"/>
        <Route path="/community" component={Community} breadcrumbName="社区管理" />
        <Route path="/community/append" component={Community_Append} breadcrumbName="新增社区"/>
        <Route path="/application" component={Application} breadcrumbName="应用管理"/>
        <Route path="/application/append" component={ApplicationAppend} breadcrumbName="应用接入"/>
        <Route path="/application/conf" component={ApplicationEdit} breadcrumbName="应用配置"/>
        <Route path="/building" component={Building} breadcrumbName="楼宇管理" />
        <Route path="/building/append" component={BuildingAppend} breadcrumbName="新增楼宇" />
        <Route path="/organization" component={Organization} breadcrumbName="组织机构" />
        <Route path="/authorize" component={Authorize} breadcrumbName="权限管理"/>
        <Route path="/role" component={Role} breadcrumbName="角色管理"/>
        <Route path="/accredit" component={Accredit} breadcrumbName="绑定权限"/>
        <Route path="/accredit/company" component={AccreditCompany} breadcrumbName="企业授权"/>
        <Route path="/accredit/community" component={AccreditCommunity} breadcrumbName="社区授权"/>
        <Route path="/room" component={Room} breadcrumbName="房间管理"/>
      </Route>
      <Route path="/" >
        <IndexRoute component={Login}/>
        <Route path="/login" component={Login}/>
      </Route>
    </Router>
  );
}

export default RouterConfig;
