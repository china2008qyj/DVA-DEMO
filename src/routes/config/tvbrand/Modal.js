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
        key: item.key,
      };
      //data.address = data.address.join(' ');
      onOk(data)
    })
  };

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  };

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="电视品牌" hasFeedback {...formItemLayout}>
          {getFieldDecorator('brandName', {
            initialValue: item.brandName,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
        </FormItem>
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
