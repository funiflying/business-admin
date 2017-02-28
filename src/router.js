import React from 'react';
import { Router, Route,IndexRoute } from 'dva/router';

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
function RouterConfig({ history }) {
  function isLogin() {

  }
  return (
    <Router history={history} onUpdate={isLogin}>
      <Route path="/" component={App} breadcrumbName="管理中心" >
          <IndexRoute component={IndexPage}/>
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
      </Route>
      <Route path="/login" component={Login} />
    </Router>
  );
}
export default RouterConfig;
