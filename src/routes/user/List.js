import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import styles from './List.less'
import classnames from 'classnames'
import AnimTableBody from '../../components/DataTable/AnimTableBody'
import { DropOption } from 'components'
import { Link } from 'dva/router'

const confirm = Modal.confirm;

const List = ({ onDeleteItem, onEditItem, onRestart,isMotion, location, ...tableProps }) => {
  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: '您确定要删除这条记录吗?',
        onOk () {
          onDeleteItem(record.id)
        },
      })
    }else if(e.key === '3'){
      confirm({
        title: '您确定要重启该设备么?',
        onOk(){
          onRestart(record.id)
        },
      })
    }
  };

  const columns = [
    {
      title: '设备SN码',
      dataIndex: 'deviceCDK',
      key: 'deviceCDK',
      render: (text, record) => <Link to={`user/${record.id}`}>{text}</Link>,
    }, {
      title: '家庭名称',
      dataIndex: 'familyID',
      key: 'familyID',
    }, {
      title: '所在区域',
      dataIndex: 'locationPetName',
      key: 'locationPetName',
    }, {
      title: '所在位置',
      dataIndex: 'locationPetName1',
      key: 'locationPetName1',
    }, {
      title: '设备IP',
      dataIndex: 'ip',
      key: 'ip',
    }, {
      title: '设备类型',
      dataIndex: 'type',
      key: 'type',
      render: (text) => <span>{text
        ? '墙面机'
        : '其他'}</span>,
    }, {
      title: 'Operation',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return <DropOption  onMenuClick={e => handleMenuClick(record, e)}  menuOptions={[{ key: '1', name: '编   辑' }, { key: '2', name: '删   除' } ,{key:'3' ,name:'重   启'},{key:'4' ,name:'升   级'}]} />
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

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  onRestart: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
};

export default List
