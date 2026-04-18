import React, { useState } from 'react';
import { Menu, Form, Input, Select, Upload, Button, message, Card, Divider, Breadcrumb } from 'antd';
import { CarOutlined, ThunderboltOutlined, InboxOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const { Option } = Select;

const Consultation: React.FC = () => {
  const [selectedKey, setSelectedKey] = useState('car');
  const [form] = Form.useForm();

  const menuItems = [
    {
      key: 'consult',
      label: '服务咨询',
      children: [
        { key: 'car', label: '电车咨询', icon: <CarOutlined /> },
        { key: 'storage', label: '储能咨询', icon: <ThunderboltOutlined /> },
      ],
    },
  ];

  const onFinish = (values: any) => {
    console.log('Consultation values:', values);
    message.success('咨询提交成功，编号：CS20260418' + Math.floor(Math.random() * 1000));
    form.resetFields();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Sidebar */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <Card className="shadow-sm border-none sticky top-24" styles={{ body: { padding: 0 } }}>
            <Menu
              mode="inline"
              selectedKeys={[selectedKey]}
              defaultOpenKeys={['consult']}
              items={menuItems}
              onClick={({ key }) => setSelectedKey(key)}
              className="border-none rounded-lg overflow-hidden"
            />
          </Card>
        </div>

        {/* Right Content */}
        <div className="flex-grow">
          <Breadcrumb 
            className="mb-6"
            items={[
              { title: <Link to="/">首页</Link> },
              { title: '服务咨询' },
              { title: selectedKey === 'car' ? '电车咨询' : '储能咨询' },
            ]}
          />
          <Card className="shadow-md border-none min-h-[600px]">
            <h2 className="text-2xl font-bold mb-6">
              {selectedKey === 'car' ? '电车业务咨询' : '储能业务咨询'}
            </h2>
            <Divider className="my-6" />

            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              className="max-w-3xl"
            >
              {selectedKey === 'car' ? (
                <>
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
                </>
              ) : (
                <>
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
                </>
              )}

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
                label={selectedKey === 'car' ? '图片上传 (最多5张)' : '附件上传'}
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
                  <p className="ant-upload-hint">支持 JPG, PNG, PDF, DOCX 等格式</p>
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
          </Card>
        </div>
      </div>

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

export default Consultation;
