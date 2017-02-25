import * as Service from '../services/company'
export default {
  namespace: 'company',
  state: {
    data:{},
    size:20,
    status:0
  },
  reducers: {
    save(state,{payload:{data,page,size}}){
      return {...state,page,...data,size,...{status:0}};
    },
    responseStatus(state,{payload:{data}}){
          return {...state,...data.data};
    }
  },
  effects: {
    *fetch({payload:{page=1,size=20,name}},{call,put}){
      var data= yield call(Service.fetch,{page,size,name});
      yield put({ type: 'save', payload: {data,page:parseInt(page),size:parseInt(size)} });
    },
    *remove({payload:id},{call,put}){
       var data= yield call(Service.remove,id);
        yield put({type:'responseStatus',payload:{data}});
        yield put({type:'reload'});
    },
    *patch({payload:values},{call,put}){
        var data=yield call(Service.patch,values);
        yield put({type:'responseStatus',payload:{data}});
        yield put({type:'reload'});
    },
    *create({payload:values},{call,put}){
     var data=yield call(Service.create,values);
      yield put({type:'responseStatus',payload:{data}});
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
