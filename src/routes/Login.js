import React, {PropTypes} from 'react'
import LoginComponent from '../components/Login/Login'
import {connect} from 'dva';
import { routerRedux } from 'dva/router';
import {setSession} from '../utils/index'
function Login({dispatch,loading,isLogin,data}) {
  function onLogin(value) {
    dispatch({
      type: "login/enter",
      payload: value
    })
  }
  function loginSuccess() {
    setSession('PROFILE',data.data);
    dispatch(routerRedux.push({
      pathname: '/home'
    }))
  };
  function loginFailed() {
    dispatch({
      type:'login/loginFailed'
    })
  };
  return (
    <LoginComponent loading={loading} onLogin={onLogin} data={data}  loginSuccess={loginSuccess} loginFailed={loginFailed}/>
  )
}
function  mapStateToProps(state) {
  const { isLogin,data }=state.login;
  return {
    loading: state.loading.models.login,
    isLogin,
    data
  };
}
export default connect(mapStateToProps)(Login);
