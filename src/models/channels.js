import modelExtend from 'dva-model-extend'
import { create, remove, update ,query} from '../services/channels'
import { pageModel } from './common'
import pathToRegexp from 'path-to-regexp'

function isEmptyObject(obj) {
  for (let key in obj) {
    return false;
  }
  return true;
}
let tvid = '';
export default modelExtend(pageModel, {
  namespace: 'channels',



  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
    isMotion: 'true',
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        const match = pathToRegexp('/config/tvbrand/:id').exec(location.pathname);
        if (match) {
          tvid =match[1];
          dispatch({type: 'query', payload: {id:match[1],page:location.query.page,pageSize:location.query.pageSize}})
        }
      })
    },
  },

  effects: {
    *query ({payload}, { call, put }){
      if (payload.page===undefined) {   //判断是否第一次进这个页面，是就获取第一页10条
        payload["page"]=1;
        payload["pageSize"]=10;
      }
      const data = yield call(query, payload);
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.msg,
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.total,
            },
          },
        })
      }
    },

    *delete ({ payload }, { call, put }) {
      const data = yield call(remove, payload);
      if (data.success) {
        yield put({ type: 'query',payload: {id:payload.tvBrandId}})
      } else {
        throw data
      }
    },
    *'multiDelete' ({ payload }, { call, put }) {
      const data = yield call(usersService.remove, payload);
      if (data.success) {
        yield put({ type: 'updateState', payload: { selectedRowKeys:[]}});
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

    *create ({ payload }, { call, put }) {
      payload.tvBrandId=tvid;
      const data = yield call(create, payload);
      if (data.success) {
        if (data.st === 10002){
          alert("频道号或者频道名称重复!");
        }
        yield put({ type: 'hideModal' });
        yield put({ type: 'query',payload: {id:payload.tvBrandId}})
      } else {
        throw data
      }
    },

    *update ({ payload }, { call, put }) {
      // const id = yield select(({ channels }) => channels.currentItem.tvBrandId);
      // const newchannels = { ...payload, id };
      const data = yield call(update, payload);
      if (data.success) {
        if (data.st === 10002){
          alert("频道号或者频道名称重复!");
        }
        yield put({ type: 'hideModal' });
        yield put({ type: 'query',payload: {id:payload.tvBrandId} })
      } else {
        throw data
      }
    },

  },

  reducers: {

    showModal (state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal (state) {
      return { ...state, modalVisible: false }
    },

    // switchIsMotion (state) {
    //   localStorage.setItem(`${prefix}userIsMotion`, !state.isMotion);
    //   return { ...state, isMotion: !state.isMotion }
    // },

  },
})
