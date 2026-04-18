import React from 'react';
import { Avatar, Button, Descriptions } from 'antd';
import { User, Edit, Camera } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { maskPhone } from '@/utils/mask';

const PersonalInfo: React.FC = () => {
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
        <Descriptions.Item label="手机号">{maskPhone(user?.phone)}</Descriptions.Item>
        <Descriptions.Item label="邮箱">未绑定</Descriptions.Item>
        <Descriptions.Item label="收货地址">广东省深圳市南山区高新科技园T3大厦</Descriptions.Item>
      </Descriptions>
      <Button type="primary" icon={<Edit size={16} />} className="mt-8 flex items-center gap-2">
        修改资料
      </Button>
    </div>
  );
};

export default PersonalInfo;
