import React from 'react'
import PropTypes from 'prop-types'
import { Router } from 'dva/router'
import App from './routes/app'

const registerModel = (app, model) => {
  if (!(app._models.filter(m => m.namespace === model.namespace).length === 1)) {
    app.model(model)
  }
};

const Routers = function ({ history, app }) {
  const routes = [
    {
      path: '/',
      component: App,
      getIndexRoute (nextState, cb) {
        require.ensure([], require => {
          registerModel(app, require('./models/dashboard'));
          cb(null, { component: require('./routes/dashboard/') })
        }, 'dashboard')
      },
      childRoutes: [
        {
          path: 'dashboard',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/dashboard'));
              cb(null, require('./routes/dashboard/'))
            }, 'dashboard')
          },
        }, {
          path: 'user',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/user'));
              cb(null, require('./routes/user/'))
            }, 'user')
          },
        }, {
          path: 'user/:id',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/user/detail'));
              cb(null, require('./routes/user/detail/'))
            }, 'user-channel')
          },
        }, {
          path: 'login',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/login'));
              cb(null, require('./routes/login/'))
            }, 'login')
          },
        }, {
          path: 'request',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/request/'))
            }, 'request')
          },
        }, {
          path: 'chart/lineChart',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/chart/lineChart/'))
            }, 'chart-lineChart')
          },
        }, {
          path: 'chart/barChart',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/chart/barChart/'))
            }, 'chart-barChart')
          },
        }, {
          path: 'chart/areaChart',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/chart/areaChart/'))
            }, 'chart-areaChart')
          },
        }, {
          path: 'post',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/post'));
              cb(null, require('./routes/post/'))
            }, 'post')
          },
        },{
          path: 'config/tvbrand',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/tvbrand'));
              cb(null, require('./routes/config/tvbrand/'))
            }, 'tvbrand')
          },
        },
        // {
        //   path: 'config/tvbrand/:id',
        //   getComponent (nextState, cb) {
        //     require.ensure([], require => {
        //       registerModel(app, require('./routes/config/tvbrand/channel'));
        //       cb(null, require('./routes/config/tvbrand/channels'))
        //     }, 'tvbrandchannel')
        //   },
        // },
        {
          path: '*',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/error/'))
            }, 'error')
          },
        },
      ],
    },
  ];

  return <Router history={history} routes={routes} />
};

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
};

export default Routers
