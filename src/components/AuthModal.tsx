import React, { useState } from 'react';
import { Modal, Form, Input, Button, Checkbox, message, Space } from 'antd';
import { User, Lock, Phone, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { useTranslation } from 'react-i18next';

type AuthMode = 'login' | 'register' | 'forgot-password';

const AuthModal: React.FC = () => {
  const { t } = useTranslation();
  const { showLoginModal, setShowLoginModal, login } = useAuthStore();
  const [mode, setMode] = useState<AuthMode>('login');
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleCancel = () => {
    setShowLoginModal(false);
    form.resetFields();
    setMode('login');
  };

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (mode === 'login') {
        login({
          id: '1',
          phone: values.username,
          nickname: '测试用户',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
        });
        message.success(t('auth.loginSuccess'));
        handleCancel();
      } else if (mode === 'register') {
        message.success(t('auth.registerSuccess'));
        setMode('login');
      } else {
        message.success(t('auth.resetSuccess'));
        setMode('login');
      }
    } catch (error) {
      message.error('操作失败，请稍后再试');
    } finally {
      setLoading(false);
    }
  };

  const renderLoginForm = () => (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      requiredMark={false}
      initialValues={{ remember: true }}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: t('auth.usernamePlaceholder') }]}
      >
        <Input 
          prefix={<User size={18} className="text-gray-400" />} 
          placeholder={t('auth.usernamePlaceholder')} 
          size="large" 
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: t('auth.passwordPlaceholder') }]}
      >
        <Input.Password 
          prefix={<Lock size={18} className="text-gray-400" />} 
          placeholder={t('auth.passwordPlaceholder')} 
          size="large" 
        />
      </Form.Item>
      <div className="flex justify-between items-center mb-6">
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>{t('auth.rememberMe')}</Checkbox>
        </Form.Item>
        <Button 
          type="link" 
          className="p-0 h-auto" 
          onClick={() => setMode('forgot-password')}
        >
          {t('auth.forgotPassword')}
        </Button>
      </div>
      <Button 
        type="primary" 
        htmlType="submit" 
        block 
        size="large" 
        loading={loading}
        className="rounded-lg h-12 font-bold text-lg"
      >
        {t('header.login')}
      </Button>
      <div className="text-center mt-6 text-gray-500">
        {t('auth.noAccount')} 
        <Button 
          type="link" 
          className="p-1 h-auto" 
          onClick={() => setMode('register')}
        >
          {t('auth.registerNow')}
        </Button>
      </div>
    </Form>
  );

  const renderRegisterForm = () => (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      requiredMark={false}
    >
      <Form.Item
        name="phone"
        rules={[
          { required: true, message: t('auth.phonePlaceholder') },
          { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' }
        ]}
      >
        <Input 
          prefix={<Phone size={18} className="text-gray-400" />} 
          placeholder={t('auth.phonePlaceholder')} 
          size="large" 
        />
      </Form.Item>
      <Form.Item
        name="code"
        rules={[{ required: true, message: t('auth.codePlaceholder') }]}
      >
        <Space.Compact className="w-full">
          <Input 
            prefix={<ShieldCheck size={18} className="text-gray-400" />} 
            placeholder={t('auth.codePlaceholder')} 
            size="large" 
          />
          <Button size="large">{t('auth.getCode')}</Button>
        </Space.Compact>
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          { required: true, message: t('auth.passwordSetPlaceholder') },
          { min: 6, message: '密码长度不能少于6位' }
        ]}
      >
        <Input.Password 
          prefix={<Lock size={18} className="text-gray-400" />} 
          placeholder={t('auth.passwordSetPlaceholder')} 
          size="large" 
        />
      </Form.Item>
      <Form.Item
        name="confirm"
        dependencies={['password']}
        rules={[
          { required: true, message: t('auth.passwordConfirmPlaceholder') },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('两次输入的密码不一致'));
            },
          }),
        ]}
      >
        <Input.Password 
          prefix={<Lock size={18} className="text-gray-400" />} 
          placeholder={t('auth.passwordConfirmPlaceholder')} 
          size="large" 
        />
      </Form.Item>
      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject(new Error(t('auth.agreementError') || '请阅读并同意用户协议')) }]}
      >
        <Checkbox className="text-xs">
          {t('auth.agreementPrefix')} <a href="/service-agreement" target="_blank" className="text-primary hover:underline">{t('auth.serviceAgreement')}</a> {t('common.and')} <a href="/privacy-policy" target="_blank" className="text-primary hover:underline">{t('auth.privacyPolicy')}</a>
        </Checkbox>
      </Form.Item>
      <Button 
        type="primary" 
        htmlType="submit" 
        block 
        size="large" 
        loading={loading}
        className="rounded-lg h-12 font-bold text-lg"
      >
        {t('header.register')}
      </Button>
      <div className="text-center mt-6 text-gray-500">
        {t('auth.alreadyHaveAccount')} 
        <Button 
          type="link" 
          className="p-1 h-auto" 
          onClick={() => setMode('login')}
        >
          {t('auth.goLogin')}
        </Button>
      </div>
    </Form>
  );

  const renderForgotPasswordForm = () => (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      requiredMark={false}
    >
      <Button 
        type="link" 
        icon={<ArrowLeft size={16} />} 
        className="p-0 mb-4 flex items-center gap-1 text-gray-400 hover:text-primary"
        onClick={() => setMode('login')}
      >
        {t('auth.backToLogin')}
      </Button>
      <h3 className="text-xl font-bold mb-6">{t('auth.resetPasswordTitle')}</h3>
      <Form.Item
        name="phone"
        rules={[{ required: true, message: t('auth.phonePlaceholder') }]}
      >
        <Input 
          prefix={<Phone size={18} className="text-gray-400" />} 
          placeholder={t('auth.phonePlaceholder')} 
          size="large" 
        />
      </Form.Item>
      <Form.Item
        name="code"
        rules={[{ required: true, message: t('auth.codePlaceholder') }]}
      >
        <Space.Compact className="w-full">
          <Input 
            prefix={<ShieldCheck size={18} className="text-gray-400" />} 
            placeholder={t('auth.codePlaceholder')} 
            size="large" 
          />
          <Button size="large">{t('auth.getCode')}</Button>
        </Space.Compact>
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: t('auth.newPasswordPlaceholder') }]}
      >
        <Input.Password 
          prefix={<Lock size={18} className="text-gray-400" />} 
          placeholder={t('auth.newPasswordPlaceholder')} 
          size="large" 
        />
      </Form.Item>
      <Button 
        type="primary" 
        htmlType="submit" 
        block 
        size="large" 
        loading={loading}
        className="rounded-lg h-12 font-bold text-lg mt-4"
      >
        {t('auth.resetPasswordBtn')}
      </Button>
    </Form>
  );

  return (
    <Modal
      open={showLoginModal}
      onCancel={handleCancel}
      footer={null}
      width={400}
      centered
      className="auth-modal"
    >
      <div className="py-4">
        {mode === 'login' && (
          <>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800">{t('auth.loginTitle')}</h2>
              <p className="text-gray-500 mt-2">{t('auth.loginDesc')}</p>
            </div>
            {renderLoginForm()}
          </>
        )}
        {mode === 'register' && (
          <>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800">{t('auth.registerTitle')}</h2>
              <p className="text-gray-500 mt-2">{t('auth.registerDesc')}</p>
            </div>
            {renderRegisterForm()}
          </>
        )}
        {mode === 'forgot-password' && renderForgotPasswordForm()}
      </div>
    </Modal>
  );
};

export default AuthModal;
