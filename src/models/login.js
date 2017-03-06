import * as Service from '../services/login';
export default {
  namespace: 'login',
  state: {
   data:{}
  },
  reducers: {
      loginSuccess(state,action){
        return {
          ...state,
          ...action.payload
        }
      },
      loginFailed(state,action){
        return {
          ...state,
          ...{data:{}}
        }
      },
      logoutSuccess(state,action){
        return {
          ...state,
          ...{data:{}},
          isLogin:false
        }
      }
  },
  effects: {
    *enter({payload},{call,put}){
      let data= yield call(Service.login,payload);
      yield put({type:'loginSuccess',payload:{data}})
    },
    *logout(){
      yield put({type:'logoutSuccess'})
    }
  },
  subscriptions: {

  },
}
