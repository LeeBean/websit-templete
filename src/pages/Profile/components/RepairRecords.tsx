import React from 'react';
import { Table, Tag, Space, Button } from 'antd';

const RepairRecords: React.FC = () => {
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

export default RepairRecords;
