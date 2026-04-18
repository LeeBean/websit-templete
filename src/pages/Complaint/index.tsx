import React, { useState } from 'react';
import { Card, Form, Input, Select, Upload, Button, message, Tabs, List, Tag, Space, Checkbox, Divider } from 'antd';
import { MessageOutlined, BulbOutlined, HistoryOutlined, UploadOutlined, InboxOutlined } from '@ant-design/icons';

const { Option } = Select;
const { TextArea } = Input;

const Complaint: React.FC = () => {
  const [form] = Form.useForm();
  const [suggestionForm] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onComplaintFinish = async (values: any) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Complaint:', values);
    message.success('投诉已提交，我们将尽快处理并回复您！');
    form.resetFields();
    setLoading(false);
  };

  const onSuggestionFinish = async (values: any) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Suggestion:', values);
    message.success('感谢您的宝贵建议！');
    suggestionForm.resetFields();
    setLoading(false);
  };

  const historyData = [
    {
      id: 'CP20260410001',
      type: '服务质量',
      content: '售后网点服务态度有待提高',
      status: 'replied',
      reply: '尊敬的用户，非常抱歉给您带来不便。我们已对相关网点进行了约谈并要求整改，感谢您的监督。',
      time: '2026-04-10'
    },
    {
      id: 'SG20260320005',
      type: '建议',
      content: '希望商城能增加更多定制化配件',
      status: 'pending',
      time: '2026-03-20'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-800">投诉与建议</h1>
        <p className="text-gray-500 mt-2">您的每一份反馈都是我们前进的动力</p>
      </div>

      <Card className="shadow-lg border-none overflow-hidden" bodyStyle={{ padding: 0 }}>
        <Tabs
          centered
          size="large"
          items={[
            {
              key: 'complaint',
              label: <Space><MessageOutlined /> 我要投诉</Space>,
              children: (
                <div className="p-8">
                  <Form form={form} layout="vertical" onFinish={onComplaintFinish}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                      <Form.Item name="type" label="投诉类型" rules={[{ required: true }]}>
                        <Select placeholder="请选择投诉类型" size="large">
                          <Option value="service">服务质量</Option>
                          <Option value="product">产品质量</Option>
                          <Option value="logistics">物流配送</Option>
                          <Option value="other">其他</Option>
                        </Select>
                      </Form.Item>
                      <Form.Item name="target" label="投诉对象" rules={[{ required: true }]}>
                        <Input placeholder="如：XX服务中心 / 订单号" size="large" />
                      </Form.Item>
                    </div>
                    <Form.Item name="description" label="投诉详细描述" rules={[{ required: true }]}>
                      <TextArea rows={5} placeholder="请详细描述您遇到的问题及相关情况" showCount maxLength={1000} />
                    </Form.Item>
                    <Form.Item name="evidence" label="相关证据 (照片/截图)">
                      <Upload.Dragger multiple beforeUpload={() => false} maxCount={5}>
                        <p className="ant-upload-drag-icon"><InboxOutlined /></p>
                        <p className="ant-upload-text">上传证据图片</p>
                      </Upload.Dragger>
                    </Form.Item>
                    <Form.Item name="expectation" label="期望解决方案">
                      <Input placeholder="如：道歉、退款、重新维修等" size="large" />
                    </Form.Item>
                    <Button type="primary" htmlType="submit" block size="large" loading={loading} className="h-12 text-lg font-bold">
                      提交投诉
                    </Button>
                  </Form>
                </div>
              )
            },
            {
              key: 'suggestion',
              label: <Space><BulbOutlined /> 提出建议</Space>,
              children: (
                <div className="p-8">
                  <Form form={suggestionForm} layout="vertical" onFinish={onSuggestionFinish}>
                    <Form.Item name="type" label="建议类型" rules={[{ required: true }]}>
                      <Select placeholder="请选择建议类型" size="large">
                        <Option value="feature">功能改进</Option>
                        <Option value="ux">体验优化</Option>
                        <Option value="content">内容建设</Option>
                        <Option value="other">其他建议</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item name="content" label="建议内容" rules={[{ required: true }]}>
                      <TextArea rows={6} placeholder="我们非常期待听到您的宝贵意见" showCount maxLength={1000} />
                    </Form.Item>
                    <Form.Item name="anonymous" valuePropName="checked">
                      <Checkbox>匿名提交</Checkbox>
                    </Form.Item>
                    <Button type="primary" htmlType="submit" block size="large" loading={loading} className="h-12 text-lg font-bold">
                      提交建议
                    </Button>
                  </Form>
                </div>
              )
            },
            {
              key: 'history',
              label: <Space><HistoryOutlined /> 处理进度</Space>,
              children: (
                <div className="p-8">
                  <List
                    dataSource={historyData}
                    renderItem={(item) => (
                      <Card className="mb-4 bg-gray-50 border-none">
                        <div className="flex justify-between items-start mb-4">
                          <Space>
                            <Tag color="blue">{item.type}</Tag>
                            <span className="text-gray-400 text-sm">编号：{item.id}</span>
                          </Space>
                          <Tag color={item.status === 'replied' ? 'green' : 'orange'}>
                            {item.status === 'replied' ? '已回复' : '处理中'}
                          </Tag>
                        </div>
                        <div className="text-gray-800 font-medium mb-4">{item.content}</div>
                        {item.reply && (
                          <div className="bg-white p-4 rounded-lg border-l-4 border-primary">
                            <div className="text-primary font-bold text-sm mb-2">官方回复：</div>
                            <div className="text-gray-600 leading-relaxed">{item.reply}</div>
                          </div>
                        )}
                        <div className="text-right mt-4 text-gray-400 text-xs">{item.time}</div>
                      </Card>
                    )}
                  />
                </div>
              )
            }
          ]}
        />
      </Card>
    </div>
  );
};

export default Complaint;
