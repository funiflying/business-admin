import * as Service from '../services/login';
export default {
  namespace: 'login',
  state: {
    isLogin:false,
  },
  reducers: {
      loginSuccess(state,action){
        return {
          ...state,
          ...action.payload,
          isLogin:true
        }
      }
  },
  effects: {
    *login({payload},{call,put}){
      let {data}= yield call(Service.login,payload);
      if(data.status){
        yield put({type:'loginSuccess',payload:{data}})
      }
    }
  },
  subscriptions: {},
}
