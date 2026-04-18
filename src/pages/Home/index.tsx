import React from 'react';
import { Carousel, Button, Card, Badge, List } from 'antd';
import { Wrench, MessageSquare, ShoppingBag, Users, ChevronRight, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';



const Home: React.FC = () => {
  const { t } = useTranslation();

  const banners = [
    {
      id: 1,
      title: '专业售后服务，保驾护航',
      desc: '提供全方位的电车维修与储能咨询服务',
      image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=2072',
      color: 'from-blue-600/80 to-blue-900/80',
    },
    {
      id: 2,
      title: '智能储能解决方案',
      desc: '为您的家庭和企业提供绿色能源支持',
      image: 'https://images.unsplash.com/photo-1592833159155-c62df1b65634?auto=format&fit=crop&q=80&w=2070',
      color: 'from-emerald-600/80 to-emerald-900/80',
    },
    {
      id: 3,
      title: '官方商城现已上线',
      desc: '原厂配件、周边精品，正品保障',
      image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=2070',
      color: 'from-orange-600/80 to-orange-900/80',
    },
  ];

  const quickLinks = [
    { icon: <Wrench size={32} />, title: t('header.repair'), desc: '在线预约，快速维修', path: '/repair', color: 'bg-blue-50 text-blue-600' },
    { icon: <MessageSquare size={32} />, title: t('header.consultation'), desc: '专家在线，答疑解惑', path: '/consultation', color: 'bg-purple-50 text-purple-600' },
    { icon: <ShoppingBag size={32} />, title: t('header.mall'), desc: '正品配件，极速送达', path: '/mall', color: 'bg-orange-50 text-orange-600' },
    { icon: <Users size={32} />, title: t('header.join'), desc: '携手合作，共赢未来', path: '/join', color: 'bg-green-50 text-green-600' },
  ];

  const announcements = [
    { id: 1, title: '关于五一劳动节期间售后服务安排的通知', date: '2026-04-15', tag: '通知' },
    { id: 2, title: '新一代家庭储能系统正式开启咨询预约', date: '2026-04-10', tag: '产品' },
    { id: 3, title: '售后官网系统升级维护公告', date: '2026-04-05', tag: '维护' },
    { id: 4, title: '恭喜我司荣获“年度最佳售后服务商”奖项', date: '2026-04-01', tag: '新闻' },
  ];

  return (
    <div className="pb-20">
      {/* Banner Carousel */}
      <section className="relative">
        <Carousel autoplay effect="fade">
          {banners.map((banner) => (
            <div key={banner.id} className="relative h-[400px] md:h-[600px] overflow-hidden">
              <img src={banner.image} alt={banner.title} className="w-full h-full object-cover" />
              <div className={`absolute inset-0 bg-gradient-to-r ${banner.color} flex items-center`}>
                <div className="max-w-7xl mx-auto px-8 w-full">
                  <div className="max-w-2xl text-white">
                    <h1 className="text-3xl md:text-6xl font-bold mb-4 animate-fade-in-up">
                      {banner.title}
                    </h1>
                    <p className="text-lg md:text-xl mb-8 opacity-90">
                      {banner.desc}
                    </p>
                    <Button type="primary" size="large" className="h-12 px-8 text-lg rounded-full">
                      立即了解
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </section>

      {/* Quick Access Grid */}
      <section className="max-w-7xl mx-auto px-4 -mt-16 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {quickLinks.map((link) => (
            <Link key={link.path} to={link.path}>
              <Card 
                hoverable 
                className="border-none shadow-lg text-center h-full group transition-transform hover:-translate-y-2"
                styles={{ body: { padding: '2rem 1.5rem' } }}
              >
                <div className={`w-16 h-16 ${link.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  {link.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{link.title}</h3>
                <p className="text-gray-500 text-sm">{link.desc}</p>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Announcements Section */}
      <section className="max-w-7xl mx-auto px-4 mt-20">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-50 text-red-500 rounded-lg">
              <Bell size={24} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">最新公告</h2>
          </div>
          <Button type="link" className="flex items-center gap-1">
            查看更多 <ChevronRight size={16} />
          </Button>
        </div>
        
        <Card className="shadow-sm border-gray-100">
          <List
            itemLayout="horizontal"
            dataSource={announcements}
            renderItem={(item) => (
              <List.Item
                className="hover:bg-gray-50 px-4 transition-colors cursor-pointer rounded-lg"
                extra={<span className="text-gray-400">{item.date}</span>}
              >
                <List.Item.Meta
                  title={
                    <div className="flex items-center gap-3">
                      <Badge 
                        count={item.tag} 
                        style={{ 
                          backgroundColor: item.tag === '通知' ? '#1677ff' : 
                                           item.tag === '产品' ? '#52c41a' : 
                                           item.tag === '维护' ? '#faad14' : '#eb2f96'
                        }} 
                      />
                      <span className="text-gray-700 font-medium hover:text-primary transition-colors">
                        {item.title}
                      </span>
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        </Card>
      </section>

      {/* Features Showcase */}
      <section className="bg-white mt-24 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">为什么选择我们的售后服务？</h2>
            <p className="text-gray-500 text-lg">
              遍布全国的服务网络，专业的工程师团队，为您提供最可靠的保障。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Wrench size={40} />
              </div>
              <h3 className="text-xl font-bold mb-3">原厂配件</h3>
              <p className="text-gray-500">所有维修均使用原厂配件，确保性能稳定，延长产品使用寿命。</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users size={40} />
              </div>
              <h3 className="text-xl font-bold mb-3">专业团队</h3>
              <p className="text-gray-500">经过严格培训的专业工程师，为您提供最权威的技术支持与维修服务。</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag size={40} />
              </div>
              <h3 className="text-xl font-bold mb-3">极速响应</h3>
              <p className="text-gray-500">7*24小时在线预约，核心城市2小时内极速响应，解决您的燃眉之急。</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
