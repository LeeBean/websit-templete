import React from 'react';
import { Form, Select, Input, Upload, Button, message, Divider } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const { Option } = Select;

const StorageConsultation: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Storage Consultation values:', values);
    message.success('储能咨询提交成功，编号：CS' + Date.now().toString().slice(-8));
    form.resetFields();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">储能业务咨询</h2>
      <Divider className="my-6" />
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="max-w-3xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
          <Form.Item
            name="productSeries"
            label="产品系列"
            rules={[{ required: true, message: '请选择产品系列' }]}
          >
            <Select placeholder="请选择系列" size="large">
              <Option value="powerwall">Powerwall (家庭版)</Option>
              <Option value="powerpack">Powerpack (商用版)</Option>
              <Option value="megapack">Megapack (电网级)</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="scenario"
            label="应用场景"
            rules={[{ required: true, message: '请选择应用场景' }]}
          >
            <Select placeholder="请选择场景" size="large">
              <Option value="home">家庭储能</Option>
              <Option value="factory">工厂节能</Option>
              <Option value="microgrid">微电网</Option>
              <Option value="backup">备用电源</Option>
            </Select>
          </Form.Item>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
          <Form.Item
            name="projectScale"
            label="项目规模 (kWh)"
            rules={[{ required: true, message: '请输入项目规模' }]}
          >
            <Input placeholder="例如：100" type="number" size="large" />
          </Form.Item>
          <Form.Item
            name="techProblem"
            label="技术关注点"
          >
            <Select placeholder="请选择关注点" size="large">
              <Option value="safety">安全性</Option>
              <Option value="efficiency">转化效率</Option>
              <Option value="cycle">循环寿命</Option>
              <Option value="cost">成本预算</Option>
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
          label="附件上传"
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
            <p className="ant-upload-hint">支持 PDF, DOCX, JPG 等格式</p>
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

export default StorageConsultation;
