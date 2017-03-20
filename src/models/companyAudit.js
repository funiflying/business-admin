import * as Service from '../services/service'
export default {
  namespace: 'companyAudit',
  state: {
      list:{}
  },
  reducers: {
      save(state,{payload:{list,data,size,page}}){
          return {...state,list,data,size,page}
      }
  },
  effects: {
     *fetch({payload:{page,size,name}},{call,put}){
       const list=yield call(Service.fetch_company_list,{page,size,name});
         yield put({type:"save",payload:{list,size:parseInt(size),page:parseInt(page)}});
     },
      *fetch_company_info({payload:{eid}},{call,put}){
          const data=yield call(Service.fetch_company_info,{eid});
          yield put({type:"save",payload:{data}});
      },
      *patch({payload:values},{call,put}){
          yield call(Service.audit_company,values);
          yield put({type:'reload'});
      },
      *reload(action,{put,select}){
          const page=yield select(state=>state.companyAudit.page);
          const size=yield select(state=>state.companyAudit.size);
          yield put({type:'fetch',payload:{page,size}});
      }
  },
  subscriptions: {
      setup({dispatch,history}){
          return history.listen(({pathname,query})=>{
              if(pathname==='/service/company'){
                  dispatch({type:'fetch',payload:query})
              }
              if(pathname==='/service/company/info'){
                  dispatch({type:'fetch_company_info',payload:query})
              }
          })
      }
  }
}
