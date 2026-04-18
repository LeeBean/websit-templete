import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Button, InputNumber, Tag, Divider, Breadcrumb, Card, message, Tabs } from 'antd';
import { ShoppingCart, Heart, ShieldCheck, Truck, RefreshCcw } from 'lucide-react';
import { useMallStore } from '@/store/useMallStore';

const products = [
  { 
    id: '1', 
    name: '家用壁挂式充电桩', 
    price: 2999, 
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=1000', 
    category: '充电设备',
    desc: '专为家用场景设计，支持7kW大功率充电，智能防盗，IP55级防水。',
    specs: ['7kW 交流电', '5米充电枪', 'WiFi/蓝牙连接', 'APP 智能控制'],
    stock: 15,
  },
  // ... other products would be here
];

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useMallStore();

  const product = products.find(p => p.id === id) || products[0]; // Fallback to first for demo

  const handleAddToCart = () => {
    addToCart(product, quantity);
    message.success('已加入购物车');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumb className="mb-8">
        <Breadcrumb.Item><a onClick={() => navigate('/mall')}>商城</a></Breadcrumb.Item>
        <Breadcrumb.Item>{product.category}</Breadcrumb.Item>
        <Breadcrumb.Item>{product.name}</Breadcrumb.Item>
      </Breadcrumb>

      <Row gutter={[48, 48]}>
        {/* Product Image */}
        <Col xs={24} md={12}>
          <div className="rounded-2xl overflow-hidden shadow-lg bg-white">
            <img src={product.image} alt={product.name} className="w-full h-auto" />
          </div>
          <div className="grid grid-cols-4 gap-4 mt-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="rounded-lg overflow-hidden border-2 border-transparent hover:border-primary cursor-pointer">
                <img src={product.image} alt="" className="w-full h-20 object-cover" />
              </div>
            ))}
          </div>
        </Col>

        {/* Product Info */}
        <Col xs={24} md={12}>
          <div className="flex flex-col h-full">
            <Tag color="blue" className="w-fit mb-4">{product.category}</Tag>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{product.name}</h1>
            <p className="text-gray-500 text-lg mb-6 leading-relaxed">
              {product.desc}
            </p>

            <div className="bg-gray-50 p-6 rounded-xl mb-8">
              <div className="text-gray-500 mb-2">价格</div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-red-500">¥{product.price.toLocaleString()}</span>
                <span className="text-gray-400 line-through">¥{(product.price * 1.2).toFixed(0)}</span>
              </div>
            </div>

            <div className="mb-8">
              <div className="text-gray-700 font-bold mb-3">核心参数</div>
              <div className="grid grid-cols-2 gap-y-2">
                {product.specs.map(spec => (
                  <div key={spec} className="flex items-center gap-2 text-gray-600">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    {spec}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-6 mt-auto">
              <div className="flex items-center gap-4">
                <span className="text-gray-700">数量</span>
                <InputNumber 
                  min={1} 
                  max={product.stock} 
                  value={quantity} 
                  onChange={(val) => setQuantity(val || 1)} 
                  size="large"
                  className="w-32"
                />
                <span className="text-gray-400">库存: {product.stock}</span>
              </div>

              <div className="flex gap-4">
                <Button 
                  type="primary" 
                  size="large" 
                  icon={<ShoppingCart size={20} />}
                  className="flex-grow h-14 text-lg font-bold rounded-xl"
                  onClick={handleAddToCart}
                >
                  加入购物车
                </Button>
                <Button 
                  size="large" 
                  icon={<Heart size={20} />}
                  className="h-14 w-14 flex items-center justify-center rounded-xl"
                />
              </div>
            </div>

            <Divider className="my-8" />

            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center gap-2 text-gray-500 text-sm text-center">
                <ShieldCheck size={24} className="text-green-500" />
                <span>官方正品</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-gray-500 text-sm text-center">
                <Truck size={24} className="text-blue-500" />
                <span>极速送达</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-gray-500 text-sm text-center">
                <RefreshCcw size={24} className="text-orange-500" />
                <span>7天无理由</span>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      <div className="mt-20">
        <Tabs
          size="large"
          items={[
            {
              key: 'details',
              label: '商品详情',
              children: (
                <div className="py-8 text-center text-gray-400">
                  <p className="mb-8">这里是详细的商品图文介绍内容...</p>
                  <img src={product.image} className="max-w-4xl mx-auto rounded-xl shadow-sm" alt="" />
                </div>
              )
            },
            {
              key: 'reviews',
              label: '用户评价 (128)',
              children: <div className="py-8 text-center text-gray-400">暂无评价内容</div>
            }
          ]}
        />
      </div>
    </div>
  );
};

export default ProductDetail;
