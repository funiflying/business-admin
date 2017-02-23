import * as usersService from '../services/users'
export default {
  namespace: 'users',
  state: {
    list:[],
    total:null
  },
  reducers: {
    save(state,{payload:{data:list,total,page}}){
      return {...state,list,total,page}
    }
  },
  effects: {
    *fetch({payload:{page}},{call,put}){
        const {data}=yield call(usersService.fetch,{page});
        yield put({ type: 'save', payload: { data,page:parseInt(page)} });
    },
    *remove({payload:id},{call,put,select}){
        yield call(usersService.remove,id);
        const page=yield select(state=>state.users.page);
        yield put({type:'fetch',payload:{page}})
     },
    *patch({payload:{id,values}},{call,put,select}){
        yield call(usersService.fetch,id,values);
        yield put({type:'reload'})
     },
    *create({payload:values},{call,put}){
        yield call(usersService.create,values);
        yield put({type:'reload'})
    },
    *reload(action,{put,select}){
      const page=yield select(state=>state.users.page);
      yield put({type:'fetch',payload:{page}})
    }
  },
  subscriptions: {
    setup({dispatch,history}){
      return history.listen(({pathname,query})=>{
        if(pathname==='/users'){
            dispatch({type:'fetch',payload:query})
        }
      })

    }


  },
}