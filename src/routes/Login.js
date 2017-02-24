import React, {PropTypes} from 'react'
import LoginComponent from '../components/Login/Login'
import {connect} from 'dva';
import { routerRedux } from 'dva/router';
import {setSession} from '../utils/index'
function Login({dispatch,loading,isLogin,data}) {
  function onLogin(value) {
    dispatch({
      type: "login/login",
      payload: value
    })
  }
  if(isLogin){
    setSession('PROFILE',data.data);
    dispatch(routerRedux.push({
      pathname: '/home'
    }))
  }
  return (
    <LoginComponent loading={loading} onLogin={onLogin} dispatch={dispatch}/>
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
