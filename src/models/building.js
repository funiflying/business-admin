import * as Service from '../services/building'
import {fetch} from '../services/community'
export default {
  namespace: 'building',
  state: {
    data:{},
    size:20,
    status:0,
    community:{
      data:[]
    }
  },
  reducers: {
    save(state,{payload:{data,id,page,size,community}}){
      return {...state,page,...data,size,id,...{community:community.data}};
    },
    responseStatus(state,{payload:{data}}){
      return {...state,...data};
    }
  },
  effects: {
    *fetch({payload:{id,page=1,size=20,name,code}},{call,put}){
      var data= yield call(Service.fetch,{page,size,name,id,code});
      var community=yield call(fetch,{page,size});
      yield put({ type: 'save', payload: {data,id,community,page:parseInt(page),size:parseInt(size)} });
    },
    *fetchCommunity({payload:{pageNo=1,name,page,size,id}},{call,put,select}){
      var community=yield call(fetch,{page:pageNo,name});
      const data={
         data:yield select(state=>state.building.data)
      };
      //var data= yield call(Service.fetch,{page,size,name,id});
      yield put({ type: 'save', payload: {data,community,page,size,id}});
    },
    *remove({payload:id},{call,put}){
      var data= yield call(Service.remove,id);
      // yield put({type:'responseStatus',payload:{data}});
      yield put({type:'reload'});
    },
    *patch({payload:values},{call,put}){
      var data=yield call(Service.patch,values);
      //yield put({type:'responseStatus',payload:{data}});
      yield put({type:'reload'});
    },
    *create({payload:values},{call,put}){
      var data=yield call(Service.create,values);
      //yield put({type:'responseStatus',payload:{data}});
      yield put({type:'reload'})
    },
    *reload(action,{put,select}){
      const page=yield select(state=>state.building.page);
      const size=yield select(state=>state.building.size);
      yield put({type:'fetch',payload:{page,size}})
    }
  },
  subscriptions: {
    setup({dispatch,history}){
      return history.listen(({pathname,query})=>{
        if(pathname==='/building'){
          dispatch({type:'fetch',payload:query});
        }
        if(pathname==='/building/append'){
          dispatch({type:'fetchCommunity',payload:query});
        }
      })

    }
  },
}
