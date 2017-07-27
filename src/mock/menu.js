const { config } = require('./common')

const { apiPrefix } = config
let database = [
  {
    id: '1',
    icon: 'laptop',
    name: '修改测试版',
    route: '/dashboard',
  },
  {
    id: '2',
    bpid: '1',
    name: '家庭管理',
    icon: 'user',
    route: '/user',
  },
  {
    id: '7',
    bpid: '1',
    name: 'Posts',
    icon: 'shopping-cart',
    route: '/post',
  },
  {
    id: '21',
    mpid: '-1',
    bpid: '2',
    name: 'User Detail',
    route: '/user/:id',
  },
  {
    id: '3',
    bpid: '1',
    name: 'Request',
    icon: 'api',
    route: '/request',
  },
  {
    id: '6',
    bpid: '1',
    name: '默认参数管理',
    icon: 'setting',
  },
  {
    id: '61',
    bpid: '6',
    mpid: '6',
    name: '情景管理',
    route: '/config/infrared',
    icon: 'database',
  },
  {
    id: '62',
    bpid: '6',
    mpid: '6',
    name: '红外管理',
    route: '/config/scene',
    icon: 'bars',
  },
];

module.exports = {

  [`GET ${apiPrefix}/menus`] (req, res) {
    res.status(200).json(database)
  },
};
