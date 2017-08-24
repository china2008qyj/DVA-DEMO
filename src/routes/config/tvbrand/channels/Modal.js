import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal} from 'antd'

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const modal = ({
  item = {},
  onOk,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
  ...modalProps
}) => {
  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        id: item.id,
        tvBrandId:item.tvBrandId,
      };
      //data.address = data.address.join(' ');
      onOk(data);
    })
  };

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  };

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="频道号" hasFeedback {...formItemLayout}>
          {getFieldDecorator('channelNumber', {
            initialValue: item.channelNumber,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="频道名称" hasFeedback {...formItemLayout}>
        {getFieldDecorator('channelName', {
          initialValue: item.channelName,
          rules: [
            {
              required: true,
            },
          ],
        })(<Input />)}
      </FormItem>
      {/*<FormItem label="频道ID" hasFeedback {...formItemLayout}>*/}
        {/*{getFieldDecorator('id', {*/}
          {/*initialValue: item.id,*/}
          {/*rules: [*/}
            {/*{*/}
              {/*required: true,*/}
            {/*},*/}
          {/*],*/}
        {/*})(<Input />)}*/}
      {/*</FormItem>*/}
        {/*<FormItem label="频道绑定" hasFeedback {...formItemLayout}>*/}
          {/*{getFieldDecorator('tvBrandId', {*/}
            {/*initialValue: item.tvBrandId,*/}
            {/*rules: [*/}
              {/*{*/}
                {/*required: true,*/}
              {/*},*/}
            {/*],*/}
          {/*})(<Input />)}*/}
        {/*</FormItem>*/}
      </Form>
    </Modal>
  )
};

// modal.propTypes = {
//   form: PropTypes.object.isRequired,
//   type: PropTypes.string,
//   item: PropTypes.object,
//   onOk: PropTypes.func,
// };

export default Form.create()(modal)
