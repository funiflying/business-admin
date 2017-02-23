import React from 'react';
import { Router, Route,IndexRoute } from 'dva/router';
import IndexPage from './routes/IndexPage';

import Users from "./routes/Users.js";

import App from "./routes/App.js";

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={App} breadcrumbName="首页" >
          <IndexRoute component={IndexPage}/>
          <Route path="/home" component={IndexPage} breadcrumbName="首页"   />
          <Route path="/users" component={Users} breadcrumbName="用户管理" />
        </Route>
    </Router>
  );
}
export default RouterConfig;
