import React, { useState } from 'react';
import { Form, Input, Select, Upload, Button, DatePicker, message, Card, Steps } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Wrench, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const { Option } = Select;
const { TextArea } = Input;

const Repair: React.FC = () => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Repair form values:', values);
    setCurrentStep(1);
    message.success('申请提交成功！');
  };

  const productTypes = [
    { label: '新能源汽车 - Model S', value: 'car_s' },
    { label: '新能源汽车 - Model 3', value: 'car_3' },
    { label: '家庭储能系统 - Powerwall', value: 'storage_home' },
    { label: '商用储能系统 - Megapack', value: 'storage_biz' },
  ];

  const faultTypes = [
    { label: '电池/续航问题', value: 'battery' },
    { label: '软件/系统故障', value: 'software' },
    { label: '外观/内饰损坏', value: 'exterior' },
    { label: '充电异常', value: 'charging' },
    { label: '其他问题', value: 'other' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">申请售后维修</h1>
        <p className="text-gray-500">请填写以下信息，我们的工程师将尽快为您安排维修服务</p>
      </div>

      <Card className="shadow-md border-none">
        <Steps
          current={currentStep}
          className="mb-12 px-8"
          items={[
            { title: '填写申请', icon: <Wrench /> },
            { title: '提交成功', icon: <CheckCircle /> },
          ]}
        />

        {currentStep === 0 ? (
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            className="max-w-2xl mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
              <Form.Item
                name="productType"
                label="产品型号"
                rules={[{ required: true, message: '请选择产品型号' }]}
              >
                <Select placeholder="请选择您的产品" size="large">
                  {productTypes.map(type => (
                    <Option key={type.value} value={type.value}>{type.label}</Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="faultType"
                label="故障类型"
                rules={[{ required: true, message: '请选择故障类型' }]}
              >
                <Select placeholder="请选择故障类型" size="large">
                  {faultTypes.map(type => (
                    <Option key={type.value} value={type.value}>{type.label}</Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            <Form.Item
              name="description"
              label="故障详细描述"
              rules={[{ required: true, message: '请输入故障描述' }]}
            >
              <TextArea 
                rows={4} 
                placeholder="请详细描述您遇到的问题，以便我们更好地为您服务" 
                maxLength={500}
                showCount
              />
            </Form.Item>

            <Form.Item
              name="images"
              label="故障图片 (最多5张)"
              valuePropName="fileList"
              getValueFromEvent={(e: any) => {
                if (Array.isArray(e)) return e;
                return e?.fileList;
              }}
            >
              <Upload 
                listType="picture-card" 
                maxCount={5}
                beforeUpload={() => false}
              >
                <div>
                  <UploadOutlined />
                  <div className="mt-2">上传图片</div>
                </div>
              </Upload>
            </Form.Item>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
              <Form.Item
                name="contactName"
                label="联系人姓名"
                rules={[{ required: true, message: '请输入姓名' }]}
              >
                <Input placeholder="请输入姓名" size="large" />
              </Form.Item>

              <Form.Item
                name="contactPhone"
                label="联系电话"
                rules={[
                  { required: true, message: '请输入联系电话' },
                  { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' }
                ]}
              >
                <Input placeholder="请输入手机号" size="large" />
              </Form.Item>
            </div>

            <Form.Item
              name="appointmentDate"
              label="期望维修日期"
              rules={[{ required: true, message: '请选择期望日期' }]}
            >
              <DatePicker className="w-full" size="large" />
            </Form.Item>

            <Form.Item className="mt-8">
              <Button type="primary" htmlType="submit" block size="large" className="h-12 text-lg font-bold">
                提交申请
              </Button>
            </Form.Item>
          </Form>
        ) : (
          <div className="text-center py-12">
            <CheckCircle className="text-6xl text-green-500 mb-6" />
            <h2 className="text-2xl font-bold mb-4">提交成功！</h2>
            <p className="text-gray-500 mb-8">
              您的申请编号为：<span className="text-primary font-bold">RE202604180001</span><br/>
              我们的工作人员将在2小时内与您联系，请保持电话畅通。
            </p>
            <div className="flex justify-center gap-4">
              <Button size="large" onClick={() => setCurrentStep(0)}>再次申请</Button>
              <Button type="primary" size="large" href="/profile">查看申请记录</Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Repair;
