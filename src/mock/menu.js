const { config } = require('./common');

const { apiPrefix } = config;
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
    id: '21',
    mpid: '-1',
    bpid: '2',
    name: '详细信息',
    route: '/user/:id',
  },
  {
    id: '7',
    bpid: '1',
    name: 'Posts',
    icon: 'shopping-cart',
    route: '/post',
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
    name: '电视品牌',
    route: '/config/tvbrand',
    icon: 'database',
  },
  {
    id: '62',
    bpid: '61',
    mpid: '-1',
    name: '电视频道',
    route: '/config/tvbrand/:id',
    icon: 'bars',
  },
];



// id: string, 唯一id
// bpid: string, 面包屑导航的父id
// mpid: string, 菜单的父id,缺省时为一级菜单,为-1时在菜单中不显示
// name: 显示名称
// route: 匹配路由,缺省时不做跳转
// icon: 在名称前显示的图标




module.exports = {

  [`GET ${apiPrefix}/menus`] (req, res) {
    res.status(200).json(database)
  },
};
