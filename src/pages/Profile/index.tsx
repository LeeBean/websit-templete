import React from 'react';
import { Layout, Menu, Card, Avatar } from 'antd';
import { User, Settings, History, Wrench, MessageSquare, AlertCircle } from 'lucide-react';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';

// Import sub-components
import PersonalInfo from './components/PersonalInfo';
import RepairRecords from './components/RepairRecords';
import ConsultationRecords from './components/ConsultationRecords';
import ComplaintRecords from './components/ComplaintRecords';
import AccountSettings from './components/AccountSettings';

const { Sider, Content } = Layout;

const Profile: React.FC = () => {
  const location = useLocation();
  
  // Get the current sub-path to highlight the menu item
  // e.g., /profile/info -> info
  const pathParts = location.pathname.split('/');
  const selectedKey = pathParts[pathParts.length - 1] || 'info';

  const menuItems = [
    {
      key: 'records',
      label: '服务记录',
      icon: <History size={18} />,
      children: [
        { key: 'repair-records', label: <Link to="/profile/repair-records">售后维修记录</Link>, icon: <Wrench size={14} /> },
        { key: 'consult-records', label: <Link to="/profile/consult-records">服务咨询记录</Link>, icon: <MessageSquare size={14} /> },
        { key: 'complaint-records', label: <Link to="/profile/complaint-records">投诉建议记录</Link>, icon: <AlertCircle size={14} /> },
      ],
    },
    { key: 'info', label: <Link to="/profile/info">个人信息</Link>, icon: <User size={18} /> },
    { key: 'settings', label: <Link to="/profile/settings">账户设置</Link>, icon: <Settings size={18} /> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Layout className="bg-transparent gap-8 flex-col md:flex-row">
        <Sider width={260} className="bg-transparent w-full md:w-[260px]" breakpoint="md" collapsedWidth="0">
          <Card className="shadow-sm border-none overflow-hidden" styles={{ body: { padding: 0 } }}>
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
        <Content className="flex-1">
          <Card className="shadow-md border-none min-h-[600px]">
            <Routes>
              {/* Default redirect to info */}
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
