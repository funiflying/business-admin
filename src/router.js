import React from 'react';
import { Router, Route,IndexRoute } from 'dva/router';

import IndexPage from './routes/IndexPage';
import Users from "./routes/Users.js";
import App from "./routes/App.js";
import Login from "./routes/Login"
import Company from "./routes/Company.js";
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
        </Route>
      <Route path="/login" component={Login} />

    </Router>
  );
}
export default RouterConfig;
