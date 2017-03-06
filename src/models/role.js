import * as Service from '../services/role'
export default {
  namespace: 'role',
  state: {
    data:{}
  },
  reducers: {
    save(state,{payload:{data}}){
      return {...state,data};
    },
    size(state,{payload:{page,size}}){
      return {...state,page,size};
    }
  },
  effects: {
    *fetch({payload:{name=''}},{call,put}){
      var data= yield call(Service.fetch,{name});
      yield put({ type: 'save', payload: {data}});
    },
    *remove({payload:id},{call,put}){
      var data= yield call(Service.remove,id);
      yield put({type:'reload'});
    },
    *patch({payload:values},{call,put}){
      var data=yield call(Service.patch,values);
      yield put({type:'reload'});
    },
    *create({payload:values},{call,put}){
      var data=yield call(Service.create,values);
      yield put({type:'reload'})
    },
    *reload(action,{put,select}){
      yield put({type:'fetch'})
    }
  },
  subscriptions: {
    setup({dispatch,history}){
      return history.listen(({pathname,query})=>{
        if(pathname==='/role'){
          dispatch({type:'fetch',payload:query})
        }
      })

    }

  },
}
