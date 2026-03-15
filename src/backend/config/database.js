/**
 * 数据库配置 - 使用内存模拟
 * 可扩展为MySQL/MongoDB连接
 */

// 模拟数据存储
const data = {
  // 用户数据
  users: [
    { id: 1, username: 'admin', password: '123456', nickname: '管理员', email: 'admin@shop.com', phone: '13800000000', avatar: '', role: 'admin', status: 'active', createTime: '2026-01-01 10:00:00' },
    { id: 2, username: 'user1', password: '123456', nickname: '张三', email: 'zhangsan@qq.com', phone: '13800000001', avatar: '', role: 'user', status: 'active', createTime: '2026-01-15 14:30:00' },
    { id: 3, username: 'user2', password: '123456', nickname: '李四', email: 'lisi@qq.com', phone: '13800000002', avatar: '', role: 'user', status: 'active', createTime: '2026-02-01 09:15:00' }
  ],

  // 商品分类
  categories: [
    { id: 1, name: '手机数码', icon: 'fa-mobile-screen' },
    { id: 2, name: '电脑办公', icon: 'fa-laptop' },
    { id: 3, name: '家用电器', icon: 'fa-tv' },
    { id: 4, name: '服装鞋帽', icon: 'fa-shirt' },
    { id: 5, name: '食品生鲜', icon: 'fa-apple-whole' },
    { id: 6, name: '美妆护肤', icon: 'fa-spray-can-sparkles' }
  ],

  // 商品数据
  products: [
    { id: 1, name: 'iPhone 15 Pro Max', price: 9999, originalPrice: 10999, image: 'https://picsum.photos/400/400?random=1', category: '手机数码', description: '苹果最新旗舰手机，A17 Pro芯片', stock: 100, sales: 520, status: 'on', createTime: '2026-01-01' },
    { id: 2, name: '华为 Mate 60 Pro', price: 6999, originalPrice: 7499, image: 'https://picsum.photos/400/400?random=2', category: '手机数码', description: '麒麟9000S芯片，卫星通话', stock: 80, sales: 380, status: 'on', createTime: '2026-01-02' },
    { id: 3, name: '小米14 Ultra', price: 5999, originalPrice: 6299, image: 'https://picsum.photos/400/400?random=3', category: '手机数码', description: '徕卡影像，骁龙8 Gen3', stock: 150, sales: 290, status: 'on', createTime: '2026-01-03' },
    { id: 4, name: 'MacBook Pro 14', price: 14999, originalPrice: 15999, image: 'https://picsum.photos/400/400?random=4', category: '电脑办公', description: 'M3 Pro芯片，18小时续航', stock: 50, sales: 120, status: 'on', createTime: '2026-01-04' },
    { id: 5, name: '联想小新Pro 16', price: 5499, originalPrice: 5999, image: 'https://picsum.photos/400/400?random=5', category: '电脑办公', description: 'AMD R7-7840H，16寸2.5K屏', stock: 200, sales: 450, status: 'on', createTime: '2026-01-05' },
    { id: 6, name: '戴尔XPS 15', price: 12999, originalPrice: 13999, image: 'https://picsum.photos/400/400?random=6', category: '电脑办公', description: 'i7-13700H，OLED触控屏', stock: 30, sales: 85, status: 'on', createTime: '2026-01-06' },
    { id: 7, name: '海尔冰箱 BCD-500', price: 3999, originalPrice: 4599, image: 'https://picsum.photos/400/400?random=7', category: '家用电器', description: '500L大容量，风冷无霜', stock: 60, sales: 200, status: 'on', createTime: '2026-01-07' },
    { id: 8, name: '美的空调 KFR-35GW', price: 2999, originalPrice: 3499, image: 'https://picsum.photos/400/400?random=8', category: '家用电器', description: '1.5匹变频，一级能效', stock: 100, sales: 350, status: 'on', createTime: '2026-01-08' },
    { id: 9, name: '索尼65寸电视', price: 5999, originalPrice: 6999, image: 'https://picsum.photos/400/400?random=9', category: '家用电器', description: '4K HDR，120Hz高刷', stock: 40, sales: 95, status: 'on', createTime: '2026-01-09' },
    { id: 10, name: '耐克运动鞋 Air Max', price: 899, originalPrice: 1099, image: 'https://picsum.photos/400/400?random=10', category: '服装鞋帽', description: '气垫缓震，透气网面', stock: 300, sales: 680, status: 'on', createTime: '2026-01-10' },
    { id: 11, name: '优衣库羽绒服', price: 599, originalPrice: 799, image: 'https://picsum.photos/400/400?random=11', category: '服装鞋帽', description: '轻薄保暖，90%白鸭绒', stock: 500, sales: 920, status: 'on', createTime: '2026-01-11' },
    { id: 12, name: '兰蔻小黑瓶精华', price: 1080, originalPrice: 1280, image: 'https://picsum.photos/400/400?random=12', category: '美妆护肤', description: '50ml，修护肌底精华', stock: 200, sales: 560, status: 'on', createTime: '2026-01-12' }
  ],

  // 购物车数据 (userId -> items)
  carts: {},

  // 订单数据
  orders: [
    { id: 1, orderNo: 'ORD202601010001', userId: 2, items: [{ productId: 1, name: 'iPhone 15 Pro Max', price: 9999, quantity: 1, image: 'https://picsum.photos/400/400?random=1' }], totalAmount: 9999, status: 'completed', address: { name: '张三', phone: '13800000001', address: '广东省广州市天河区' }, createTime: '2026-01-01 10:30:00' },
    { id: 2, orderNo: 'ORD202601150002', userId: 2, items: [{ productId: 10, name: '耐克运动鞋', price: 899, quantity: 2, image: 'https://picsum.photos/400/400?random=10' }], totalAmount: 1798, status: 'shipped', address: { name: '张三', phone: '13800000001', address: '广东省广州市天河区' }, createTime: '2026-01-15 15:20:00' },
    { id: 3, orderNo: 'ORD202602010003', userId: 3, items: [{ productId: 4, name: 'MacBook Pro 14', price: 14999, quantity: 1, image: 'https://picsum.photos/400/400?random=4' }], totalAmount: 14999, status: 'pending', address: { name: '李四', phone: '13800000002', address: '北京市海淀区' }, createTime: '2026-02-01 09:45:00' }
  ],

  // 留言数据
  messages: [
    { id: 1, userId: 2, username: '张三', avatar: '', content: '这个网站商品很丰富，服务态度也很好！', replies: [{ userId: 1, username: '管理员', content: '感谢您的支持！', createTime: '2026-01-02 10:00:00' }], createTime: '2026-01-01 15:30:00' },
    { id: 2, userId: 3, username: '李四', avatar: '', content: '物流速度很快，第二天就收到了', replies: [], createTime: '2026-01-10 11:20:00' }
  ],

  // 聊天记录 (userId -> messages)
  chatHistory: {},

  // 收货地址 (userId -> addresses)
  addresses: {
    2: [
      { id: 1, name: '张三', phone: '13800000001', province: '广东省', city: '广州市', district: '天河区', detail: '体育西路123号', isDefault: true }
    ],
    3: [
      { id: 1, name: '李四', phone: '13800000002', province: '北京市', city: '北京市', district: '海淀区', detail: '中关村大街1号', isDefault: true }
    ]
  },

  // Token存储
  tokens: {}
};

// ID生成器
const generateId = (collection) => {
  const maxId = data[collection].reduce((max, item) => Math.max(max, item.id), 0);
  return maxId + 1;
};

// 生成订单号
const generateOrderNo = () => {
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `ORD${dateStr}${random}`;
};

// 生成Token
const generateToken = () => {
  return 'token_' + Math.random().toString(36).substr(2) + Date.now().toString(36);
};

module.exports = {
  port: 3000,
  data,
  generateId,
  generateOrderNo,
  generateToken
};
