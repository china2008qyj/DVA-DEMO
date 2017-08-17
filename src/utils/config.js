const APIV1 = '/api/v1';
const APIV2 = '/api/v2';

module.exports = {
  name: '管理后台',
  prefix: 'antdAdmin',
  footerText: 'Ant Design Admin  © 2017 zz',
  logo: '/logo.png',
  iconFontCSS: '/iconfont.css',
  iconFontJS: '/iconfont.js',
  YQL: ['http://www.zuimeitianqi.com'],
  CORS: [],
  openPages: ['/login'],
  apiPrefix: '/api/v1',
  api: {
    userLogin: `${APIV1}/user/login`,
    userLogout: `${APIV1}/user/logout`,
    userInfo: `${APIV1}/userInfo`,
    users: `http://42.159.247.58:4324/AppProcess/1.0/devices/`,
    usersdetail: `http://42.159.247.58:4324/AppProcess/1.0/devices/:id`,
    posts: `${APIV1}/post`,
    user: `${APIV1}/user/:id`,
    dashboard: `${APIV1}/dashboard`,
    menus: `${APIV1}/menus`,
    v1test: `${APIV1}/test`,
    v2test: `${APIV2}/test`,
    tvbrand: `http://42.159.247.58:4324/AppProcess/1.0/tvbrands`,
    channel: `http://42.159.247.58:4324/AppProcess/1.0/tvbrands/:id/tvchannels`,
  },
};
