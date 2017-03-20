import * as Service from '../services/service'
export default {
    namespace: 'communityApp',
    state: {
        list:{}
    },
    reducers: {
        save(state,{payload:{list,page,size}}){
            return {...state,list,page,size}
        }
    },
    effects: {
        *fetch({payload:{page=1,size=20,name}},{call,put}){
            const list=yield call(Service.fetch_community_app_list,{page,size,name});
            yield put({type:"save",payload:{list,size:parseInt(size),page:parseInt(page)}});
        },
        *patch({payload:values},{call,put}){
            yield call(Service.audit_community_app,values);
            yield put({type:'reload'});
        },
        *reload(action,{put,select}){
            const page=yield select(state=>state.communityApp.page);
            const size=yield select(state=>state.communityApp.size);
            yield put({type:'fetch',payload:{page,size}});
        }
    },
    subscriptions: {
        setup({dispatch,history}){
            return history.listen(({pathname,query})=>{
                if(pathname==='/service/community/app'){
                    dispatch({type:'fetch',payload:query})
                }
            })
        }
    },
}
