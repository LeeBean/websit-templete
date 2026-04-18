import React from 'react';
import { Tabs } from 'antd';

const ConsultationRecords: React.FC = () => {
  return (
    <Tabs
      items={[
        { key: 'car', label: '电车咨询', children: <div className="py-10 text-center text-gray-400">暂无电车咨询记录</div> },
        { key: 'storage', label: '储能咨询', children: <div className="py-10 text-center text-gray-400">暂无储能咨询记录</div> },
      ]}
    />
  );
};

export default ConsultationRecords;
