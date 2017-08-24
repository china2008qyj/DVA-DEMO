import modelExtend from 'dva-model-extend'
import { create, remove, update ,query} from '../services/channels'
import { pageModel } from './common'
import pathToRegexp from 'path-to-regexp'

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
          dispatch({
            type: 'query',
            payload: {id:match[1]}
          })
        }
      })
    },
  },

  effects: {
    *query ({payload}, { call, put }){
      const url=document.location.href;
      const url1=url.split("/");
      const aaaa= url1[url1.length];
      console.log(payload);
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
      console.log(payload.tvbrand);
      if (data.success) {
        yield put({ type: 'query',payload:{id:payload.tvbrand} })
      } else {
        throw data
      }
    },
    *'multiDelete' ({ payload }, { call, put }) {
      const data = yield call(usersService.remove, payload);
      if (data.success) {
        yield put({ type: 'updateState', payload: { selectedRowKeys: [] } });
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

    *create ({ payload }, { call, put }) {
      const data = yield call(create, payload);
      if (data.success) {
        yield put({ type: 'hideModal' });
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

    *update ({ payload }, { select, call, put }) {
      const id = yield select(({ channels }) => channels.currentItem.tvBrandId);
      const newchannels = { ...payload, id };
      const data = yield call(update, newchannels);
      if (data.success) {
        if (data.st === 10002){
          alert("家电品牌重复!");
        }
        yield put({ type: 'hideModal' });
        yield put({ type: 'query' })
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
