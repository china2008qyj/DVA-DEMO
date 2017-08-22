import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import styles from './List.less'
import classnames from 'classnames'
import AnimTableBody from '../../../components/DataTable/AnimTableBody'
import { DropOption } from 'components'
import { Link } from 'dva/router'

const confirm = Modal.confirm;

const List = ({isMotion, location, ...tableProps }) => {
  const columns = [
    {
      title: '日志文件名',
      dataIndex: 'logname',
      key: 'logname',
    },{
      title: '所属设备ID',
      dataIndex: 'deviceCDK',
      key: 'deviceCDK',
    },{
      title: '所属家庭',
      dataIndex: 'fname',
      key: 'fname',
    },{
      title: '位置',
      dataIndex: 'locationPetName',
      key: 'locationPetName',
    },{
      title: '时间',
      dataIndex: 'createtime',
      key: 'createtime',
    },{
      title: '文件下载',
      dataIndex: 'url',
      key: 'url',
      render: (url, record) => <a href={url} target="_blank">点击下载Blob文件</a>,
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

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  onRestart: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
};

export default List
