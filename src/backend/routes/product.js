/**
 * 商品路由 - 商品列表、详情、分类
 */

const express = require('express');
const router = express.Router();
const { data } = require('../config/database');

// 获取商品列表
router.get('/', (req, res) => {
  let { category, keyword, sort, page = 1, limit = 12 } = req.query;
  page = parseInt(page);
  limit = parseInt(limit);

  let products = data.products.filter(p => p.status === 'on');

  // 分类筛选
  if (category && category !== '全部') {
    products = products.filter(p => p.category === category);
  }

  // 关键词搜索
  if (keyword) {
    const kw = keyword.toLowerCase();
    products = products.filter(p => 
      p.name.toLowerCase().includes(kw) || 
      p.description.toLowerCase().includes(kw)
    );
  }

  // 排序
  switch (sort) {
    case 'price_asc':
      products.sort((a, b) => a.price - b.price);
      break;
    case 'price_desc':
      products.sort((a, b) => b.price - a.price);
      break;
    case 'sales':
      products.sort((a, b) => b.sales - a.sales);
      break;
    case 'newest':
      products.sort((a, b) => new Date(b.createTime) - new Date(a.createTime));
      break;
    default:
      // 默认按销量排序
      products.sort((a, b) => b.sales - a.sales);
  }

  // 分页
  const total = products.length;
  const startIndex = (page - 1) * limit;
  const list = products.slice(startIndex, startIndex + limit);

  res.json({
    code: 200,
    message: '获取成功',
    data: {
      list,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  });
});

// 获取商品详情
router.get('/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = data.products.find(p => p.id === productId);

  if (!product) {
    return res.status(404).json({ code: 404, message: '商品不存在' });
  }

  res.json({
    code: 200,
    message: '获取成功',
    data: product
  });
});

// 获取分类列表
router.get('/meta/categories', (req, res) => {
  res.json({
    code: 200,
    message: '获取成功',
    data: data.categories
  });
});

// 获取推荐商品
router.get('/meta/recommend', (req, res) => {
  const limit = parseInt(req.query.limit) || 8;
  const products = data.products
    .filter(p => p.status === 'on')
    .sort((a, b) => b.sales - a.sales)
    .slice(0, limit);

  res.json({
    code: 200,
    message: '获取成功',
    data: products
  });
});

// 获取热销商品
router.get('/meta/hot', (req, res) => {
  const limit = parseInt(req.query.limit) || 6;
  const products = data.products
    .filter(p => p.status === 'on')
    .sort((a, b) => b.sales - a.sales)
    .slice(0, limit);

  res.json({
    code: 200,
    message: '获取成功',
    data: products
  });
});

// 获取新品
router.get('/meta/new', (req, res) => {
  const limit = parseInt(req.query.limit) || 6;
  const products = data.products
    .filter(p => p.status === 'on')
    .sort((a, b) => new Date(b.createTime) - new Date(a.createTime))
    .slice(0, limit);

  res.json({
    code: 200,
    message: '获取成功',
    data: products
  });
});

module.exports = router;
