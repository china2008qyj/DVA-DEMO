import modelExtend from 'dva-model-extend'
import { create, remove, update ,restart} from '../services/user'
import * as usersService from '../services/users'
import { pageModel } from './common'
import { config } from 'utils'

const { query } = usersService;
const { prefix } = config;

function isEmptyObject(obj) {
  for (let key in obj) {
    return false;
  }
  return true;
}
export default modelExtend(pageModel, {
  namespace: 'user',

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
        if (location.pathname === '/user') {
          dispatch({type: 'query', payload: location.query,})
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

    *delete ({ payload }, { call, put, select }) {
      const data = yield call(remove, { id: payload });
      const { selectedRowKeys } = yield select(_ => _.user);
      if (data.success) {
        yield put({ type: 'updateState', payload: { selectedRowKeys: selectedRowKeys.filter(_ => _ !== payload) } });
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

    *restart ({ payload }, { call, put, select }) {
      const data = yield call(restart, { dcdk: payload });
      const { selectedRowKeys } = yield select(_ => _.user);
      if (data.success) {
        yield put({ type: 'updateState', payload: { selectedRowKeys: selectedRowKeys.filter(_ => _ !== payload) } });
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
      const id = yield select(({ user }) => user.currentItem.id);
      const newUser = { ...payload, id };
      const data = yield call(update, newUser);
      if (data.success) {
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

    switchIsMotion (state) {
      localStorage.setItem(`${prefix}userIsMotion`, !state.isMotion);
      return { ...state, isMotion: !state.isMotion }
    },

  },
})
