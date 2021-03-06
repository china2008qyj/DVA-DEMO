import modelExtend from 'dva-model-extend'
import { create, remove, update ,query} from '../services/tvbrand'
import { pageModel } from './common'


function isEmptyObject(obj) {
  for (let key in obj) {
    return false;
  }
  return true;
}
export default modelExtend(pageModel, {
  namespace: 'tvbrand',

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
        if (location.pathname === '/config/tvbrand') {
          dispatch({
            type: 'query',
            payload: location.query,
          })
        }
      })
    },
  },

  effects: {
    *query ({ payload = {} }, { call, put }){
      if (isEmptyObject(payload)) {   //判断是否第一次进这个页面，是就获取第一页10条
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
      const data = yield call(remove, { id: payload });
      if (data.success) {
        yield put({ type: 'query' })
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
      const id = yield select(({ tvbrand }) => tvbrand.currentItem.id);
      const newtvbrand = { ...payload, id };
      const data = yield call(update, newtvbrand);
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
