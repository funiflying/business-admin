import React from 'react';
import { connect } from 'dva';
import { Breadcrumb, Alert } from 'antd';
var classNames = require('classnames');
import styles from '../components/Layout/main.less';
import Header from '../components/Layout/Header';
import Sider from '../components/Layout/Sider'
import Bread from '../components/Layout/Bread'
import Footer from '../components/Layout/Footer'
function App({ children,location,routes,dispatch,app}) {
  let {darkTheme}=app;
  const siderProps={
    location,
    darkTheme:darkTheme?'dark':'',
    changeTheme(){
      dispatch({type:"app/changeTheme"})
    }
  }
  return (
      <div className={styles.layout}>
          <aside className={darkTheme?styles.sider:styles.sider+" "+styles.light}>
              <Sider {...siderProps}/>
          </aside>
          <div className={styles.main}>
              <Header />
              <Bread routes={routes}/>
              <div className={styles.container}>
                  <div className={styles.content}>
                      {children}
                  </div>
              </div>
            <Footer/>
          </div>
      </div>
  );
}

function mapStateToProps(state) {
  let {app}=state;
  return {
    app:app
  };
}

export default connect(mapStateToProps)(App);
