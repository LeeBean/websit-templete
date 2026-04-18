import React from 'react';
import { Layout, Space } from 'antd';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const { Footer } = Layout;

const AppFooter: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Company Info */}
        <div className="flex flex-col gap-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
              AS
            </div>
            <span className="text-xl font-bold text-white">售后官网</span>
          </Link>
          <p className="text-sm leading-relaxed text-gray-400">
            我们致力于提供最专业的售后服务，涵盖电车维修、储能系统咨询及多元化商城产品。
          </p>
          <div className="flex gap-4 mt-2">
            <Facebook className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
            <Twitter className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
            <Instagram className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-4">
          <h3 className="text-white font-bold text-lg">{t('footer.company')}</h3>
          <nav className="flex flex-col gap-2">
            <Link to="/about" className="hover:text-white transition-colors">关于我们</Link>
            <Link to="/news" className="hover:text-white transition-colors">新闻动态</Link>
            <Link to="/careers" className="hover:text-white transition-colors">加入我们</Link>
            <Link to="/contact" className="hover:text-white transition-colors">联系我们</Link>
          </nav>
        </div>

        {/* Support Links */}
        <div className="flex flex-col gap-4">
          <h3 className="text-white font-bold text-lg">{t('footer.links')}</h3>
          <nav className="flex flex-col gap-2">
            <Link to="/help" className="hover:text-white transition-colors">帮助中心</Link>
            <Link to="/service-agreement" className="hover:text-white transition-colors">服务协议</Link>
            <Link to="/privacy-policy" className="hover:text-white transition-colors">隐私政策</Link>
            <Link to="/feedback" className="hover:text-white transition-colors">意见反馈</Link>
          </nav>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-4">
          <h3 className="text-white font-bold text-lg">{t('footer.contact')}</h3>
          <div className="flex flex-col gap-3">
            <div className="flex items-start gap-3">
              <Phone size={18} className="text-primary mt-1" />
              <span>400-123-4567<br/><span className="text-xs text-gray-500">(周一至周日 9:00-18:00)</span></span>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={18} className="text-primary" />
              <span>support@aftersales.com</span>
            </div>
            <div className="flex items-start gap-3">
              <MapPin size={18} className="text-primary mt-1" />
              <span>广东省深圳市南山区高新科技园T3大厦</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
        <p>{t('footer.icp')}</p>
        <Space className="mt-2" split={<span className="text-gray-700">|</span>}>
          <span>粤公网安备 44030002000001号</span>
          <span>增值电信业务经营许可证：B2-20260001</span>
        </Space>
      </div>
    </Footer>
  );
};

export default AppFooter;
