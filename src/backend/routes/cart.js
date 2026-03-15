/**
 * 购物车路由
 */

const express = require('express');
const router = express.Router();
const { data } = require('../config/database');
const { verifyToken } = require('../middleware/auth');

// 获取购物车
router.get('/', verifyToken, (req, res) => {
  const cart = data.carts[req.userId] || [];
  
  // 计算总价
  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  res.json({
    code: 200,
    message: '获取成功',
    data: {
      items: cart,
      totalAmount,
      totalCount
    }
  });
});

// 添加商品到购物车
router.post('/add', verifyToken, (req, res) => {
  const { productId, quantity = 1 } = req.body;

  const product = data.products.find(p => p.id === productId);
  if (!product) {
    return res.status(404).json({ code: 404, message: '商品不存在' });
  }

  if (!data.carts[req.userId]) {
    data.carts[req.userId] = [];
  }

  const cart = data.carts[req.userId];
  const existingItem = cart.find(item => item.productId === productId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      id: Date.now(),
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity
    });
  }

  res.json({
    code: 200,
    message: '添加成功',
    data: cart
  });
});

// 更新购物车商品数量
router.put('/update', verifyToken, (req, res) => {
  const { itemId, quantity } = req.body;

  const cart = data.carts[req.userId] || [];
  const item = cart.find(i => i.id === itemId);

  if (!item) {
    return res.status(404).json({ code: 404, message: '商品不在购物车中' });
  }

  if (quantity <= 0) {
    // 数量为0，删除商品
    const index = cart.indexOf(item);
    cart.splice(index, 1);
  } else {
    item.quantity = quantity;
  }

  res.json({
    code: 200,
    message: '更新成功',
    data: cart
  });
});

// 删除购物车商品
router.delete('/:id', verifyToken, (req, res) => {
  const itemId = parseInt(req.params.id);
  const cart = data.carts[req.userId] || [];
  const index = cart.findIndex(i => i.id === itemId);

  if (index === -1) {
    return res.status(404).json({ code: 404, message: '商品不在购物车中' });
  }

  cart.splice(index, 1);

  res.json({ code: 200, message: '删除成功' });
});

// 清空购物车
router.delete('/', verifyToken, (req, res) => {
  data.carts[req.userId] = [];
  res.json({ code: 200, message: '清空成功' });
});

module.exports = router;
