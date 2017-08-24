import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm } from 'antd'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const channels = ({ location, dispatch, channels, loading }) => {
  const { list, pagination, currentItem, modalVisible, modalType, isMotion, selectedRowKeys } = channels;
  const { pageSize } = pagination;

  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['channels/update'],
    title: `${modalType === 'create' ? '添加新的电视频道' : '编辑电视频道'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `channels/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'channels/hideModal',
      })
    },
  };

  const listProps = {
    dataSource: list,
    loading: loading.effects['channels/query'],
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
    onDeleteItem (id) {
      dispatch({
        type: 'channels/delete',
        payload: id,
      })
    },
    onAdd () {
      dispatch({
        type: 'channels/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'channels/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
    rowSelection: {
      selectedRowKeys,
      onChange: (keys) => {
        dispatch({
          type: 'channels/updateState',
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
        pathname: '/tvbrand',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/tvbrand',
      }))
    },
    onAdd () {
      dispatch({
        type: 'channels/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    switchIsMotion () {
      dispatch({ type: 'channels/switchIsMotion' })
    },
  };

  const handleDeleteItems = () => {
    dispatch({
      type: 'channels/multiDelete',
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

// Tvbrand.propTypes = {
//   tvbrand: PropTypes.object,
//   location: PropTypes.object,
//   dispatch: PropTypes.func,
//   loading: PropTypes.object,
// };

export default connect(({ channels, loading }) => ({ channels, loading }))(channels)
