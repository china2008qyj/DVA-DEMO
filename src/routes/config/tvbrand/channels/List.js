import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import styles from './List.less'
import classnames from 'classnames'
import AnimTableBody from '../../../../components/DataTable/AnimTableBody'
import { DropOption } from 'components'
import { Link } from 'dva/router'

const confirm = Modal.confirm;

const List = ({ onDeleteItem, onEditItem,isMotion, location, ...tableProps }) => {
  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: '您确定要删除该电视频道吗?',
        onOk () {
          onDeleteItem(record)
        },
      })
    }
  };

  const columns = [
    {
      title: '频道号',
      dataIndex: 'channelNumber',
      key: 'channelNumber',
    }, {
      title: '频道名称',
      dataIndex: 'channelName',
      key: 'channelName',
    }, {
      title: 'Operation',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return <DropOption  onMenuClick={e => handleMenuClick(record, e)}  menuOptions={[{ key: '1', name: '编   辑'}, { key: '2', name: '删   除'}]} />
      },
    },
  ];

  const getBodyWrapperProps = {
    page: location.query.page,
    current: tableProps.pagination.current,
  };

  const getBodyWrapper = body => { return isMotion ? <AnimTableBody {...getBodyWrapperProps} body={body} /> : body };

  return (
    <div>
      <Table
        {...tableProps}
        className={classnames({ [styles.table]: true, [styles.motion]: isMotion })}
        bordered
        scroll={{ x: 1250 }}
        columns={columns}
        simple
        rowKey={record => record.id}
        getBodyWrapper={getBodyWrapper}
      />
    </div>
  )
};

// List.propTypes = {
//   onDeleteItem: PropTypes.func,
//   onEditItem: PropTypes.func,
//   isMotion: PropTypes.bool,
//   location: PropTypes.object,
// };

export default List
