import React, { useState } from 'react';
import { Card, Input, Row, Col, Badge, Button, Drawer, List, InputNumber, Empty, message, Tag } from 'antd';
import { Search, ShoppingCart, Trash2, ChevronRight } from 'lucide-react';
import { useMallStore } from '@/store/useMallStore';
import { Link } from 'react-router-dom';

const { Meta } = Card;

const products = [
  { id: '1', name: '家用壁挂式充电桩', price: 2999, image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=500', category: '充电设备' },
  { id: '2', name: '全气候脚垫 (Model 3)', price: 880, image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=500', category: '内饰精品' },
  { id: '3', name: '便携式充电连接器', price: 1500, image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=500', category: '充电设备' },
  { id: '4', name: '玻璃屋顶遮阳帘', price: 450, image: 'https://images.unsplash.com/photo-1542362567-b05500269734?auto=format&fit=crop&q=80&w=500', category: '内饰精品' },
  { id: '5', name: '车载HEPA空气滤芯', price: 320, image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=500', category: '配件' },
  { id: '6', name: '无线手机充电座升级版', price: 680, image: 'https://images.unsplash.com/photo-1584438784894-089d6a62b850?auto=format&fit=crop&q=80&w=500', category: '内饰精品' },
];

const Mall: React.FC = () => {
  const [cartVisible, setCartVisible] = useState(false);
  const { cart, addToCart, removeFromCart, updateQuantity, toggleSelection, toggleAll } = useMallStore();
  
  const selectedCount = cart.filter(item => item.selected).length;
  const totalPrice = cart.reduce((sum, item) => sum + (item.selected ? item.price * item.quantity : 0), 0);

  const handleAddToCart = (product: any) => {
    addToCart(product, 1);
    message.success('已加入购物车');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">官方商城</h1>
          <p className="text-gray-500 mt-2">原厂正品保障，为您的爱车升级</p>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <Input
            prefix={<Search size={18} className="text-gray-400" />}
            placeholder="搜索商品..."
            className="rounded-full h-11 w-full md:w-64"
          />
          <Badge count={cart.length} offset={[-2, 2]}>
            <Button 
              type="primary" 
              shape="circle" 
              icon={<ShoppingCart size={20} />} 
              size="large"
              onClick={() => setCartVisible(true)}
              className="flex items-center justify-center h-12 w-12"
            />
          </Badge>
        </div>
      </div>

      {/* Product Grid */}
      <Row gutter={[24, 24]}>
        {products.map(product => (
          <Col xs={24} sm={12} lg={8} xl={6} key={product.id}>
            <Card
              hoverable
              className="h-full border-none shadow-sm group"
              cover={
                <Link to={`/mall/${product.id}`} className="block overflow-hidden h-48">
                  <img 
                    alt={product.name} 
                    src={product.image} 
                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                  />
                </Link>
              }
              actions={[
                <Button type="link" onClick={() => handleAddToCart(product)}>加入购物车</Button>,
                <Link to={`/mall/${product.id}`}><Button type="link">查看详情</Button></Link>
              ]}
            >
              <Tag color="blue" className="mb-2">{product.category}</Tag>
              <Meta
                title={<span className="text-lg font-bold group-hover:text-primary transition-colors">{product.name}</span>}
                description={
                  <div className="mt-2">
                    <span className="text-xl font-bold text-red-500">¥{product.price.toLocaleString()}</span>
                  </div>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>

      {/* Cart Drawer */}
      <Drawer
        title={<div className="flex items-center gap-2"><ShoppingCart size={20} /> 购物车</div>}
        placement="right"
        onClose={() => setCartVisible(false)}
        open={cartVisible}
        width={450}
        footer={
          <div className="py-4">
            <div className="flex justify-between items-center mb-4 text-lg">
              <span className="text-gray-600">已选 {selectedCount} 件</span>
              <span className="font-bold text-red-500 text-2xl">¥{totalPrice.toLocaleString()}</span>
            </div>
            <Button type="primary" block size="large" className="h-12 font-bold text-lg rounded-lg">
              立即结算
            </Button>
          </div>
        }
      >
        {cart.length === 0 ? (
          <Empty description="购物车还是空的" className="mt-20" />
        ) : (
          <List
            itemLayout="horizontal"
            dataSource={cart}
            renderItem={(item) => (
              <List.Item
                className="px-0"
                actions={[
                  <Button 
                    type="text" 
                    danger 
                    icon={<Trash2 size={18} />} 
                    onClick={() => removeFromCart(item.id)}
                  />
                ]}
              >
                <div className="flex gap-4 w-full">
                  <img src={item.image} className="w-20 h-20 object-cover rounded-lg flex-shrink-0" />
                  <div className="flex-grow">
                    <h4 className="font-bold text-gray-800 mb-1">{item.name}</h4>
                    <div className="text-red-500 font-bold mb-2">¥{item.price.toLocaleString()}</div>
                    <InputNumber 
                      min={1} 
                      value={item.quantity} 
                      onChange={(val) => updateQuantity(item.id, val || 1)} 
                    />
                  </div>
                </div>
              </List.Item>
            )}
          />
        )}
      </Drawer>
    </div>
  );
};

export default Mall;
