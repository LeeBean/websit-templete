import React, { useState } from 'react';
import { Card, Form, Input, Select, Upload, Button, message, Divider, Space, Typography, Steps } from 'antd';
import { ShopOutlined, UserOutlined, FileProtectOutlined, SearchOutlined, InboxOutlined, CheckCircleOutlined } from '@ant-design/icons';

const { Option } = Select;
const { Title, Paragraph } = Typography;

const Join: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'apply' | 'query'>('apply');
  const [form] = Form.useForm();
  const [queryForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [queryResult, setQueryResult] = useState<any>(null);

  const onApplyFinish = async (values: any) => {
    setLoading(true);
    // Simulate API
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Join application:', values);
    message.success('加盟申请已提交，我们将尽快审核！');
    form.resetFields();
    setLoading(false);
  };

  const onQueryFinish = async (values: any) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setQueryResult({
      status: 'auditing',
      time: '2026-04-18 10:00:00',
      remark: '资料已收到，正在进行初步审核，预计3个工作日内完成。'
    });
    setLoading(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <Title level={1}>服务商加盟</Title>
        <Paragraph className="text-gray-500 text-lg">
          加入我们的全球服务网络，共同打造世界领先的售后服务体系
        </Paragraph>
        <div className="flex justify-center mt-8">
          <Space size="large">
            <Button 
              type={activeTab === 'apply' ? 'primary' : 'default'} 
              size="large" 
              onClick={() => setActiveTab('apply')}
              className="px-8"
            >
              提交加盟申请
            </Button>
            <Button 
              type={activeTab === 'query' ? 'primary' : 'default'} 
              size="large" 
              onClick={() => setActiveTab('query')}
              className="px-8"
            >
              查询申请进度
            </Button>
          </Space>
        </div>
      </div>

      {activeTab === 'apply' ? (
        <Card className="shadow-lg border-none p-4 md:p-8">
          <Form form={form} layout="vertical" onFinish={onApplyFinish}>
            <Divider orientation="left"><Space><ShopOutlined /> 公司信息</Space></Divider>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
              <Form.Item name="companyName" label="公司全称" rules={[{ required: true }]}>
                <Input placeholder="请输入营业执照上的公司名称" size="large" />
              </Form.Item>
              <Form.Item name="businessScope" label="主营业务" rules={[{ required: true }]}>
                <Select mode="multiple" placeholder="请选择主营业务" size="large">
                  <Option value="repair">车辆维修</Option>
                  <Option value="battery">电池维护</Option>
                  <Option value="storage">储能安装</Option>
                  <Option value="parts">配件销售</Option>
                </Select>
              </Form.Item>
            </div>

            <Divider orientation="left" className="mt-12"><Space><UserOutlined /> 联系人信息</Space></Divider>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
              <Form.Item name="contactName" label="联系人姓名" rules={[{ required: true }]}>
                <Input placeholder="请输入姓名" size="large" />
              </Form.Item>
              <Form.Item name="contactPhone" label="联系电话" rules={[{ required: true }, { pattern: /^1[3-9]\d{9}$/ }]}>
                <Input placeholder="请输入手机号" size="large" />
              </Form.Item>
            </div>

            <Divider orientation="left" className="mt-12"><Space><FileProtectOutlined /> 资质上传</Space></Divider>
            <Form.Item name="qualifications" label="相关资质证明 (营业执照、行业许可等)" rules={[{ required: true }]}>
              <Upload.Dragger multiple beforeUpload={() => false}>
                <p className="ant-upload-drag-icon"><InboxOutlined /></p>
                <p className="ant-upload-text">点击或拖拽文件到此区域上传</p>
                <p className="ant-upload-hint">支持多文件上传，单个文件不超过10MB</p>
              </Upload.Dragger>
            </Form.Item>

            <Form.Item name="intent" label="加盟意向说明" rules={[{ required: true }]}>
              <Input.TextArea rows={4} placeholder="请简要说明您的加盟优势及合作意向" />
            </Form.Item>

            <div className="text-center mt-12">
              <Button type="primary" htmlType="submit" size="large" loading={loading} className="px-20 h-12 font-bold text-lg">
                提交申请
              </Button>
            </div>
          </Form>
        </Card>
      ) : (
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-lg border-none mb-8">
            <Form form={queryForm} layout="vertical" onFinish={onQueryFinish}>
              <Form.Item name="phone" label="申请手机号" rules={[{ required: true }]}>
                <Input placeholder="请输入提交申请时的手机号" size="large" />
              </Form.Item>
              <Form.Item name="code" label="验证码" rules={[{ required: true }]}>
                <Space.Compact className="w-full">
                  <Input placeholder="请输入验证码" size="large" />
                  <Button size="large">获取验证码</Button>
                </Space.Compact>
              </Form.Item>
              <Button type="primary" htmlType="submit" block size="large" loading={loading} icon={<SearchOutlined />}>
                立即查询
              </Button>
            </Form>
          </Card>

          {queryResult && (
            <Card className="shadow-lg border-none animate-fade-in">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center">
                  <CheckCircleOutlined style={{ fontSize: 24 }} />
                </div>
                <div>
                  <div className="text-lg font-bold">查询结果</div>
                  <div className="text-gray-500 text-sm">更新时间：{queryResult.time}</div>
                </div>
              </div>
              <Steps
                direction="vertical"
                current={1}
                items={[
                  { title: '申请已提交', description: '2026-04-18 09:30:00' },
                  { title: '资料审核中', description: queryResult.remark },
                  { title: '实地考察', description: '待进行' },
                  { title: '正式签约', description: '待进行' },
                ]}
              />
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default Join;
