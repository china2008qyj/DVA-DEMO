import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm } from 'antd'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const Log = ({ location, dispatch, log, loading }) => {
  const { list, pagination, currentItem, modalVisible, modalType, isMotion, selectedRowKeys } =log;
  const { pageSize } = pagination;

  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['log/update'],
    title: `${modalType === 'create' ? '添加新家庭' : '编辑设备信息'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `log/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'log/hideModal',
      })
    },
  };

  const listProps = {
    dataSource: list,
    loading: loading.effects['log/query'],
    pagination,
    location,
    isMotion,
    onChange (page) {
      const { query, pathname } = location;
      dispatch(routerRedux.push({
        pathname,
        query: {
          ...query,
          page: page.current,
          pageSize: page.pageSize,
        },
      }))
    },
    rowSelection: {
      selectedRowKeys,
      onChange: (keys) => {
        dispatch({
          type: 'log/updateState',
          payload: {
            selectedRowKeys: keys,
          },
        })
      },
    },
  };

  const filterProps = {
    isMotion,
    filter: {
      ...location.query,
    },
    onFilterChange (value) {
      dispatch(routerRedux.push({
        pathname: location.pathname,
        query: {
          ...value,
          page: 1,
          pageSize,
        },
      }))
    },
    onSearch (fieldsValue) {
      fieldsValue.keyword.length ? dispatch(routerRedux.push({
        pathname: '/log',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/log',
      }))
    },
    switchIsMotion () {
      dispatch({ type: 'log/switchIsMotion' })
    },
  };

  const handleDeleteItems = () => {
    dispatch({
      type: 'log/multiDelete',
      payload: {
        ids: selectedRowKeys,
      },
    })
  };

  return (
    <div className="content-inner">
      <Filter {...filterProps} />
      {/*{*/}
         {/*selectedRowKeys.length > 0 &&*/}
           {/*<Row style={{ marginBottom: 24, textAlign: 'right', fontSize: 13 }}>*/}
             {/*<Col>*/}
               {/*{`Selected ${selectedRowKeys.length} items `}*/}
               {/*<Popconfirm title={'您确定要删除这些记录吗?'} placement="left" onConfirm={handleDeleteItems}>*/}
                 {/*<Button type="primary" size="large" style={{ marginLeft: 8 }}>Remove</Button>*/}
               {/*</Popconfirm>*/}
             {/*</Col>*/}
           {/*</Row>*/}
      {/*}*/}
      <List {...listProps} />
      {modalVisible && <Modal {...modalProps} />}
    </div>
  )
};

Log.propTypes = {
  log: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
};

export default connect(({ log, loading }) => ({ log, loading }))(Log)
