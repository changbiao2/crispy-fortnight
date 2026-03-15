/**
 * 订单路由
 */

const express = require('express');
const router = express.Router();
const { data, generateId, generateOrderNo } = require('../config/database');
const { verifyToken } = require('../middleware/auth');

// 获取订单列表
router.get('/', verifyToken, (req, res) => {
  let { status, page = 1, limit = 10 } = req.query;
  page = parseInt(page);
  limit = parseInt(limit);

  let orders = data.orders.filter(o => o.userId === req.userId);

  // 状态筛选
  if (status && status !== 'all') {
    orders = orders.filter(o => o.status === status);
  }

  // 按时间倒序
  orders.sort((a, b) => new Date(b.createTime) - new Date(a.createTime));

  // 分页
  const total = orders.length;
  const list = orders.slice((page - 1) * limit, page * limit);

  res.json({
    code: 200,
    message: '获取成功',
    data: {
      list,
      total,
      page,
      limit
    }
  });
});

// 获取订单详情
router.get('/:id', verifyToken, (req, res) => {
  const orderId = parseInt(req.params.id);
  const order = data.orders.find(o => o.id === orderId && o.userId === req.userId);

  if (!order) {
    return res.status(404).json({ code: 404, message: '订单不存在' });
  }

  res.json({
    code: 200,
    message: '获取成功',
    data: order
  });
});

// 创建订单
router.post('/create', verifyToken, (req, res) => {
  const { addressId, items, remark } = req.body;

  // 获取地址
  const addresses = data.addresses[req.userId] || [];
  const address = addresses.find(a => a.id === addressId);
  
  if (!address) {
    return res.status(400).json({ code: 400, message: '请选择收货地址' });
  }

  // 验证商品
  if (!items || items.length === 0) {
    return res.status(400).json({ code: 400, message: '请选择商品' });
  }

  // 计算总价
  let totalAmount = 0;
  const orderItems = items.map(item => {
    const product = data.products.find(p => p.id === item.productId);
    if (!product) {
      throw new Error(`商品ID ${item.productId} 不存在`);
    }
    totalAmount += product.price * item.quantity;
    return {
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: item.quantity,
      image: product.image
    };
  });

  // 创建订单
  const newOrder = {
    id: generateId('orders'),
    orderNo: generateOrderNo(),
    userId: req.userId,
    items: orderItems,
    totalAmount,
    status: 'pending',
    address: {
      name: address.name,
      phone: address.phone,
      address: `${address.province}${address.city}${address.district}${address.detail}`
    },
    remark: remark || '',
    createTime: new Date().toLocaleString('zh-CN')
  };

  data.orders.push(newOrder);

  // 清空购物车中已下单的商品
  if (data.carts[req.userId]) {
    const productIds = items.map(i => i.productId);
    data.carts[req.userId] = data.carts[req.userId].filter(
      item => !productIds.includes(item.productId)
    );
  }

  res.json({
    code: 200,
    message: '下单成功',
    data: newOrder
  });
});

// 取消订单
router.put('/:id/cancel', verifyToken, (req, res) => {
  const orderId = parseInt(req.params.id);
  const order = data.orders.find(o => o.id === orderId && o.userId === req.userId);

  if (!order) {
    return res.status(404).json({ code: 404, message: '订单不存在' });
  }

  if (order.status !== 'pending') {
    return res.status(400).json({ code: 400, message: '该订单状态无法取消' });
  }

  order.status = 'cancelled';
  order.cancelTime = new Date().toLocaleString('zh-CN');

  res.json({
    code: 200,
    message: '取消成功',
    data: order
  });
});

// 确认收货
router.put('/:id/confirm', verifyToken, (req, res) => {
  const orderId = parseInt(req.params.id);
  const order = data.orders.find(o => o.id === orderId && o.userId === req.userId);

  if (!order) {
    return res.status(404).json({ code: 404, message: '订单不存在' });
  }

  if (order.status !== 'shipped') {
    return res.status(400).json({ code: 400, message: '该订单还未发货' });
  }

  order.status = 'completed';
  order.completeTime = new Date().toLocaleString('zh-CN');

  res.json({
    code: 200,
    message: '确认收货成功',
    data: order
  });
});

// 模拟支付
router.put('/:id/pay', verifyToken, (req, res) => {
  const orderId = parseInt(req.params.id);
  const order = data.orders.find(o => o.id === orderId && o.userId === req.userId);

  if (!order) {
    return res.status(404).json({ code: 404, message: '订单不存在' });
  }

  if (order.status !== 'pending') {
    return res.status(400).json({ code: 400, message: '该订单状态无法支付' });
  }

  order.status = 'paid';
  order.payTime = new Date().toLocaleString('zh-CN');

  res.json({
    code: 200,
    message: '支付成功',
    data: order
  });
});

module.exports = router;
