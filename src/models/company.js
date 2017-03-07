import * as Service from '../services/company'
export default {
  namespace: 'company',
  state: {
    data:{},
    size:20,
    status:0
  },
  reducers: {
    save(state,{payload:{data,page,size,eid}}){
      return {...state,page,data,size,eid};
    }
  },
  effects: {
    *fetch({payload:{page=1,size=20,name}},{call,put}){
      var data= yield call(Service.fetch,{page,size,name});
      yield put({ type: 'save', payload: {data,page:parseInt(page),size:parseInt(size)} });
    },
    *remove({payload:id},{call,put}){
       var data= yield call(Service.remove,id);
        yield put({type:'reload'});
    },
    *patch({payload:values},{call,put}){
        var data=yield call(Service.patch,values);
        yield put({type:'reload',payload:{eid:values.eid}});
    },
    *execute({payload:values},{call,put}){
      var data=yield call(Service.execute,values);
    },
    *create({payload:values},{call,put}){
     var data=yield call(Service.create,values);
      yield put({type:'reload'})
    },
    *reload(action,{put,select}){
      const page=yield select(state=>state.company.page);
      const size=yield select(state=>state.company.size);
      yield put({type:'fetch',payload:{page,size}})
    }

  },
  subscriptions: {
    setup({dispatch,history}){
      return history.listen(({pathname,query})=>{
        if(pathname==='/company'){
          dispatch({type:'fetch',payload:query})
        }
      })

    }
  },
}
