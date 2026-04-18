import React from 'react';
import { Menu, Card, Breadcrumb } from 'antd';
import { CarOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { Link, Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Import sub-components
import CarConsultation from './components/CarConsultation';
import StorageConsultation from './components/StorageConsultation';

const Consultation: React.FC = () => {
  const location = useLocation();
  
  // Get current sub-path
  const pathParts = location.pathname.split('/');
  const selectedKey = pathParts[pathParts.length - 1] || 'car';

  const menuItems = [
    {
      key: 'consult',
      label: '服务咨询',
      children: [
        { 
          key: 'car', 
          label: <Link to="/consultation/car">电车咨询</Link>, 
          icon: <CarOutlined /> 
        },
        { 
          key: 'storage', 
          label: <Link to="/consultation/storage">储能咨询</Link>, 
          icon: <ThunderboltOutlined /> 
        },
      ],
    },
  ];

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
            <Routes>
              {/* Default redirect to car consultation */}
              <Route path="/" element={<Navigate to="car" replace />} />
              <Route path="car" element={<CarConsultation />} />
              <Route path="storage" element={<StorageConsultation />} />
            </Routes>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Consultation;
