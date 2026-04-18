import React from 'react';
import { Typography, Divider, Card } from 'antd';

const { Title, Paragraph, Text } = Typography;

const ServiceAgreement: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Card className="shadow-md border-none p-8">
        <Typography>
          <Title className="text-center">用户服务协议</Title>
          <Text type="secondary" className="block text-center mb-8">
            更新日期：2026年04月18日
          </Text>
          
          <Paragraph>
            欢迎使用我们的售后服务平台。在您注册并使用本平台提供的各项服务前，请务必审慎阅读、充分理解本协议各条款内容。
          </Paragraph>

          <Title level={3}>1. 账号注册与使用</Title>
          <Paragraph>
            您在注册账号时应提供真实、准确、完整的个人资料。您应妥善保管您的账号及密码，并对该账号下进行的所有活动承担全部责任。
          </Paragraph>

          <Title level={3}>2. 服务内容</Title>
          <Paragraph>
            本平台为您提供电车维修预约、储能业务咨询、官方商城购物及服务商加盟申请等多元化售后服务。
          </Paragraph>

          <Title level={3}>3. 用户行为规范</Title>
          <Paragraph>
            您在使用本服务时，必须遵守中华人民共和国相关法律法规，不得利用本服务从事任何非法活动，包括但不限于发布违规信息、侵犯他人知识产权等。
          </Paragraph>

          <Divider />

          <Title level={3}>4. 免责声明</Title>
          <Paragraph>
            因不可抗力、网络故障、系统维护等原因导致的服务中断或延迟，本平台不承担相应赔偿责任，但将尽力减少给您带来的影响。
          </Paragraph>

          <Title level={3}>5. 协议修改</Title>
          <Paragraph>
            我们有权根据业务发展需要修改本协议。修改后的协议一经在平台公布即生效。
          </Paragraph>

          <Divider />
          
          <Paragraph className="text-center text-gray-400 mt-12">
            如果您对本协议有任何疑问，请联系我们的官方客服。
          </Paragraph>
        </Typography>
      </Card>
    </div>
  );
};

export default ServiceAgreement;
