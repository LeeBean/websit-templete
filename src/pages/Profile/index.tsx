import React, { useState } from 'react';
import { Layout, Menu, Card, Avatar, Button, Descriptions, Table, Tag, Space, Tabs, Input, Form, message } from 'antd';
import { User, Settings, History, Wrench, MessageSquare, AlertCircle, Edit, Camera } from 'lucide-react';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';

const { Sider, Content } = Layout;

// --- Sub-components for Profile ---

const RepairRecords = () => {
  const data = [
    { id: 'RE202604180001', model: 'Model 3', fault: '电池续航异常', date: '2026-04-18', status: 'pending' },
    { id: 'RE202603150042', model: 'Powerwall', fault: '充电指示灯不亮', date: '2026-03-15', status: 'completed' },
  ];

  const columns = [
    { title: '申请编号', dataIndex: 'id', key: 'id' },
    { title: '产品型号', dataIndex: 'model', key: 'model' },
    { title: '故障描述', dataIndex: 'fault', key: 'fault' },
    { title: '申请时间', dataIndex: 'date', key: 'date' },
    { 
      title: '状态', 
      dataIndex: 'status', 
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'pending' ? 'orange' : 'green'}>
          {status === 'pending' ? '处理中' : '已完成'}
        </Tag>
      )
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Space>
          <Button type="link" size="small">详情</Button>
          <Button type="link" size="small" danger>取消</Button>
        </Space>
      ),
    },
  ];

  return <Table columns={columns} dataSource={data} rowKey="id" />;
};

const ConsultationRecords = () => {
  return (
    <Tabs
      items={[
        { key: 'car', label: '电车咨询', children: <div className="py-10 text-center text-gray-400">暂无电车咨询记录</div> },
        { key: 'storage', label: '储能咨询', children: <div className="py-10 text-center text-gray-400">暂无储能咨询记录</div> },
      ]}
    />
  );
};

const ComplaintRecords = () => {
  return <div className="py-10 text-center text-gray-400">暂无投诉建议记录</div>;
};

const PersonalInfo = () => {
  const { user } = useAuthStore();
  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-8 mb-12">
        <div className="relative group">
          <Avatar src={user?.avatar} size={100} icon={<User size={40} />} />
          <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
            <Camera className="text-white" size={24} />
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-bold mb-1">{user?.nickname}</h3>
          <p className="text-gray-500">UID: {user?.id}</p>
        </div>
      </div>
      <Descriptions bordered column={1}>
        <Descriptions.Item label="昵称">{user?.nickname}</Descriptions.Item>
        <Descriptions.Item label="手机号">{user?.phone}</Descriptions.Item>
        <Descriptions.Item label="邮箱">未绑定</Descriptions.Item>
        <Descriptions.Item label="收货地址">广东省深圳市南山区高新科技园T3大厦</Descriptions.Item>
      </Descriptions>
      <Button type="primary" icon={<Edit size={16} />} className="mt-8 flex items-center gap-2">
        修改资料
      </Button>
    </div>
  );
};

const AccountSettings = () => {
  return (
    <div className="max-w-xl">
      <h3 className="text-lg font-bold mb-6">账户安全</h3>
      <div className="space-y-6">
        <div className="flex justify-between items-center py-4 border-b">
          <div>
            <div className="font-bold">登录密码</div>
            <div className="text-gray-500 text-sm">定期更换密码可提高账户安全性</div>
          </div>
          <Button>修改密码</Button>
        </div>
        <div className="flex justify-between items-center py-4 border-b">
          <div>
            <div className="font-bold">手机绑定</div>
            <div className="text-gray-500 text-sm">已绑定：138****8888</div>
          </div>
          <Button>更换手机</Button>
        </div>
        <div className="flex justify-between items-center py-4 border-b">
          <div>
            <div className="font-bold">账号注销</div>
            <div className="text-gray-500 text-sm">注销后所有数据将无法找回</div>
          </div>
          <Button danger>注销账号</Button>
        </div>
      </div>
    </div>
  );
};

// --- Main Profile Page ---

const Profile: React.FC = () => {
  const location = useLocation();
  const selectedKey = location.pathname.split('/').pop() || 'info';

  const menuItems = [
    {
      key: 'records',
      label: '服务记录',
      icon: <History size={18} />,
      children: [
        { key: 'repair-records', label: <Link to="repair-records">售后维修记录</Link>, icon: <Wrench size={14} /> },
        { key: 'consult-records', label: <Link to="consult-records">服务咨询记录</Link>, icon: <MessageSquare size={14} /> },
        { key: 'complaint-records', label: <Link to="complaint-records">投诉建议记录</Link>, icon: <AlertCircle size={14} /> },
      ],
    },
    { key: 'info', label: <Link to="info">个人信息</Link>, icon: <User size={18} /> },
    { key: 'settings', label: <Link to="settings">账户设置</Link>, icon: <Settings size={18} /> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Layout className="bg-transparent gap-8">
        <Sider width={260} className="bg-transparent">
          <Card className="shadow-sm border-none overflow-hidden" bodyStyle={{ padding: 0 }}>
            <div className="p-6 text-center bg-primary/5 border-b">
              <Avatar size={64} icon={<User size={32} />} className="mb-4 bg-primary" />
              <div className="font-bold text-lg">测试用户</div>
            </div>
            <Menu
              mode="inline"
              selectedKeys={[selectedKey]}
              defaultOpenKeys={['records']}
              items={menuItems}
              className="border-none py-2"
            />
          </Card>
        </Sider>
        <Content>
          <Card className="shadow-md border-none min-h-[600px]">
            <Routes>
              <Route path="/" element={<Navigate to="info" replace />} />
              <Route path="info" element={<PersonalInfo />} />
              <Route path="repair-records" element={<RepairRecords />} />
              <Route path="consult-records" element={<ConsultationRecords />} />
              <Route path="complaint-records" element={<ComplaintRecords />} />
              <Route path="settings" element={<AccountSettings />} />
            </Routes>
          </Card>
        </Content>
      </Layout>
    </div>
  );
};

export default Profile;
