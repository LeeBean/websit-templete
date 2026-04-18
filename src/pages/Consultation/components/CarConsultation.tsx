import React from 'react';
import { Form, Select, Input, Upload, Button, message, Divider } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const { Option } = Select;

const CarConsultation: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Car Consultation values:', values);
    message.success('电车咨询提交成功，编号：CS' + Date.now().toString().slice(-8));
    form.resetFields();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">电车业务咨询</h2>
      <Divider className="my-6" />
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="max-w-3xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
          <Form.Item
            name="carModel"
            label="咨询车型"
            rules={[{ required: true, message: '请选择车型' }]}
          >
            <Select placeholder="请选择车型" size="large">
              <Option value="model_s">Model S</Option>
              <Option value="model_3">Model 3</Option>
              <Option value="model_x">Model X</Option>
              <Option value="model_y">Model Y</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="questionType"
            label="问题类型"
            rules={[{ required: true, message: '请选择问题类型' }]}
          >
            <Select placeholder="请选择问题类型" size="large">
              <Option value="buy">购车咨询</Option>
              <Option value="tech">技术支持</Option>
              <Option value="finance">金融保险</Option>
              <Option value="delivery">交付进度</Option>
            </Select>
          </Form.Item>
        </div>

        <Form.Item
          name="description"
          label="详细描述"
          rules={[{ required: true, message: '请输入描述内容' }]}
        >
          <div className="quill-wrapper bg-white border border-gray-300 rounded-lg overflow-hidden">
            <ReactQuill theme="snow" placeholder="请详细描述您的问题..." />
          </div>
        </Form.Item>

        <Form.Item
          name="attachments"
          label="图片上传 (最多5张)"
        >
          <Upload.Dragger 
            multiple={true} 
            maxCount={5}
            beforeUpload={() => false}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">点击或拖拽文件到此区域上传</p>
            <p className="ant-upload-hint">支持 JPG, PNG 格式</p>
          </Upload.Dragger>
        </Form.Item>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
          <Form.Item
            name="contact"
            label="联系方式"
            rules={[{ required: true, message: '请输入联系电话或邮箱' }]}
          >
            <Input placeholder="电话 / 邮箱" size="large" />
          </Form.Item>
        </div>

        <Divider className="my-8" />

        <Form.Item>
          <Button type="primary" htmlType="submit" size="large" className="px-12 h-12 font-bold">
            提交咨询
          </Button>
        </Form.Item>
      </Form>
      <style>{`
        .quill-wrapper .ql-container {
          min-height: 200px;
          font-size: 16px;
        }
        .quill-wrapper .ql-toolbar {
          border: none;
          border-bottom: 1px solid #e5e7eb;
          background: #f9fafb;
        }
        .quill-wrapper .ql-container {
          border: none;
        }
      `}</style>
    </div>
  );
};

export default CarConsultation;
