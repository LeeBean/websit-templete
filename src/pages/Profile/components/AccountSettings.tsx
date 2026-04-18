import React from 'react';
import { Button } from 'antd';
import { maskPhone } from '@/utils/mask';

const AccountSettings: React.FC = () => {
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
            <div className="text-gray-500 text-sm">已绑定：{maskPhone('13888888888')}</div>
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

export default AccountSettings;
