import React from 'react';
import { Typography, Divider, Card } from 'antd';

const { Title, Paragraph, Text } = Typography;

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Card className="shadow-md border-none p-8">
        <Typography>
          <Title className="text-center">隐私政策</Title>
          <Text type="secondary" className="block text-center mb-8">
            更新日期：2026年04月18日
          </Text>
          
          <Paragraph>
            欢迎访问我们的售后官网系统！我们非常重视您的个人隐私和数据保护。本隐私政策旨在向您说明我们如何收集、使用、存储和保护您的个人信息。
          </Paragraph>

          <Title level={3}>1. 我们收集的信息</Title>
          <Paragraph>
            为了向您提供优质的售后服务，我们可能会收集以下信息：
            <ul>
              <li>身份信息：如您的姓名、手机号、邮箱地址。</li>
              <li>产品信息：如您购买的车型、储能产品型号、序列号。</li>
              <li>咨询与投诉信息：您在咨询表单或投诉页面提交的文字描述、图片或附件。</li>
            </ul>
          </Paragraph>

          <Title level={3}>2. 我们如何使用信息</Title>
          <Paragraph>
            我们收集的信息将用于以下用途：
            <ul>
              <li>处理您的售后维修预约申请。</li>
              <li>回复您的电车或储能业务咨询。</li>
              <li>跟进并解决您的投诉与建议。</li>
              <li>向您推送必要的产品维护提醒或系统公告。</li>
            </ul>
          </Paragraph>

          <Divider />

          <Title level={3}>3. 信息安全与保护</Title>
          <Paragraph>
            我们采用了行业标准的物理、电子及管理安全措施来保护您的个人信息，防止未经授权的访问、泄露或篡改。
          </Paragraph>

          <Title level={3}>4. 您的权利</Title>
          <Paragraph>
            您可以通过个人中心随时查阅、修改您的个人信息。如果您希望注销账号，可以在账户设置中提交申请。
          </Paragraph>

          <Title level={3}>5. 政策更新</Title>
          <Paragraph>
            我们可能会不时更新本隐私政策。任何重大变更，我们都会通过官网公告或短信形式通知您。
          </Paragraph>

          <Divider />
          
          <Paragraph className="text-center text-gray-400 mt-12">
            如果您对本隐私政策有任何疑问，请联系我们的官方客服。
          </Paragraph>
        </Typography>
      </Card>
    </div>
  );
};

export default PrivacyPolicy;
