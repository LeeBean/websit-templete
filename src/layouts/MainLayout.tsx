import React from 'react';
import { Layout, ConfigProvider } from 'antd';
import { Outlet } from 'react-router-dom';
import AppHeader from '../components/Header';
import AppFooter from '../components/Footer';
import AuthModal from '../components/AuthModal';

import zhCN from 'antd/locale/zh_CN';
import enUS from 'antd/locale/en_US';
import { useTranslation } from 'react-i18next';

const { Content } = Layout;

const MainLayout: React.FC = () => {
  const { i18n } = useTranslation();
  const locale = i18n.language === 'zh' ? zhCN : enUS;

  return (
    <ConfigProvider locale={locale}>
      <Layout className="min-h-screen bg-gray-50">
        <AppHeader />
        <Content className="layout-content pt-16">
          <Outlet />
        </Content>
        <AppFooter />
        <AuthModal />
      </Layout>
    </ConfigProvider>
  );
};

export default MainLayout;
