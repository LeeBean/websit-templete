import React, { useState } from 'react';
import { Layout, Input, Button, Dropdown, Space, Avatar, Drawer } from 'antd';
import { Search, Globe, User, LogOut, Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { cn } from '@/utils/cn';

const { Header } = Layout;

const AppHeader: React.FC = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const { isLoggedIn, user, logout, setShowLoginModal } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleLanguage = () => {
    const nextLng = i18n.language === 'zh' ? 'en' : 'zh';
    i18n.changeLanguage(nextLng);
  };

  const navItems = [
    { label: t('header.home'), path: '/' },
    { label: t('header.repair'), path: '/repair' },
    { label: t('header.consultation'), path: '/consultation' },
    { label: t('header.mall'), path: '/mall' },
    { label: t('header.join'), path: '/join' },
    { label: t('header.complaint'), path: '/complaint' },
  ];

  const userMenuItems = [
    {
      key: 'profile',
      label: <Link to="/profile">{t('header.personalCenter')}</Link>,
      icon: <User size={14} />,
    },
    {
      key: 'logout',
      label: <span onClick={logout}>{t('header.logout')}</span>,
      icon: <LogOut size={14} />,
    },
  ];

  return (
    <Header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-white px-4 md:px-8 shadow-sm h-16 border-b">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
          AS
        </div>
        <span className="text-xl font-bold text-gray-800 hidden sm:block">售后官网</span>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center gap-6">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "text-gray-600 hover:text-primary transition-colors font-medium",
              location.pathname === item.path && "text-primary"
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Right Actions */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Search */}
        <div className="hidden md:block w-48 xl:w-64">
          <Input
            prefix={<Search size={16} className="text-gray-400" />}
            placeholder={t('header.search')}
            className="rounded-full bg-gray-100 border-none"
          />
        </div>

        {/* Language Switch */}
        <Button
          type="text"
          icon={<Globe size={18} />}
          onClick={toggleLanguage}
          className="flex items-center justify-center"
        >
          <span className="hidden sm:inline ml-1 uppercase">{i18n.language}</span>
        </Button>

        {/* User Account */}
        {isLoggedIn ? (
          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
            <Space className="cursor-pointer hover:bg-gray-100 p-1 rounded-full transition-colors">
              <Avatar src={user?.avatar} icon={<User size={16} />} size="small" />
              <span className="hidden md:inline font-medium text-gray-700">{user?.nickname}</span>
            </Space>
          </Dropdown>
        ) : (
          <Button
            type="primary"
            className="rounded-full px-6"
            onClick={() => setShowLoginModal(true)}
          >
            {t('header.login')}
          </Button>
        )}

        {/* Mobile Menu Toggle */}
        <Button
          type="text"
          icon={mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          className="lg:hidden flex items-center justify-center"
          onClick={() => setMobileMenuOpen(true)}
        />
      </div>

      {/* Mobile Menu Drawer */}
      <Drawer
        title="菜单"
        placement="right"
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen}
        width={280}
      >
        <div className="flex flex-col gap-4">
          <div className="md:hidden mb-4">
            <Input
              prefix={<Search size={16} className="text-gray-400" />}
              placeholder={t('header.search')}
              className="rounded-lg bg-gray-100 border-none"
            />
          </div>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "text-lg text-gray-600 hover:text-primary py-2 px-4 rounded-lg",
                location.pathname === item.path && "bg-blue-50 text-primary"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </Drawer>
    </Header>
  );
};

export default AppHeader;
