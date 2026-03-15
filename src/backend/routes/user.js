/**
 * 用户路由 - 个人信息、地址管理
 */

const express = require('express');
const router = express.Router();
const { data } = require('../config/database');
const { verifyToken } = require('../middleware/auth');

// 获取个人信息
router.get('/profile', verifyToken, (req, res) => {
  const user = req.user;
  res.json({
    code: 200,
    message: '获取成功',
    data: {
      id: user.id,
      username: user.username,
      nickname: user.nickname,
      email: user.email,
      phone: user.phone,
      avatar: user.avatar
    }
  });
});

// 更新个人信息
router.put('/profile', verifyToken, (req, res) => {
  const { nickname, email, phone, avatar } = req.body;
  const user = data.users.find(u => u.id === req.userId);

  if (nickname) user.nickname = nickname;
  if (email) user.email = email;
  if (phone) user.phone = phone;
  if (avatar) user.avatar = avatar;

  res.json({
    code: 200,
    message: '更新成功',
    data: {
      id: user.id,
      username: user.username,
      nickname: user.nickname,
      email: user.email,
      phone: user.phone,
      avatar: user.avatar
    }
  });
});

// 修改密码
router.put('/password', verifyToken, (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = data.users.find(u => u.id === req.userId);

  if (!oldPassword || !newPassword) {
    return res.status(400).json({ code: 400, message: '请输入原密码和新密码' });
  }

  if (user.password !== oldPassword) {
    return res.status(400).json({ code: 400, message: '原密码错误' });
  }

  user.password = newPassword;
  res.json({ code: 200, message: '密码修改成功' });
});

// 获取收货地址列表
router.get('/addresses', verifyToken, (req, res) => {
  const addresses = data.addresses[req.userId] || [];
  res.json({
    code: 200,
    message: '获取成功',
    data: addresses
  });
});

// 添加收货地址
router.post('/addresses', verifyToken, (req, res) => {
  const { name, phone, province, city, district, detail, isDefault } = req.body;

  if (!name || !phone || !province || !city || !detail) {
    return res.status(400).json({ code: 400, message: '请填写完整的地址信息' });
  }

  if (!data.addresses[req.userId]) {
    data.addresses[req.userId] = [];
  }

  const addresses = data.addresses[req.userId];
  const newId = addresses.length > 0 ? Math.max(...addresses.map(a => a.id)) + 1 : 1;

  // 如果设为默认，取消其他默认
  if (isDefault) {
    addresses.forEach(a => a.isDefault = false);
  }

  const newAddress = {
    id: newId,
    name,
    phone,
    province,
    city,
    district: district || '',
    detail,
    isDefault: isDefault || addresses.length === 0
  };

  addresses.push(newAddress);

  res.json({
    code: 200,
    message: '添加成功',
    data: newAddress
  });
});

// 更新收货地址
router.put('/addresses/:id', verifyToken, (req, res) => {
  const addressId = parseInt(req.params.id);
  const { name, phone, province, city, district, detail, isDefault } = req.body;

  const addresses = data.addresses[req.userId] || [];
  const address = addresses.find(a => a.id === addressId);

  if (!address) {
    return res.status(404).json({ code: 404, message: '地址不存在' });
  }

  if (name) address.name = name;
  if (phone) address.phone = phone;
  if (province) address.province = province;
  if (city) address.city = city;
  if (district !== undefined) address.district = district;
  if (detail) address.detail = detail;
  
  if (isDefault) {
    addresses.forEach(a => a.isDefault = false);
    address.isDefault = true;
  }

  res.json({
    code: 200,
    message: '更新成功',
    data: address
  });
});

// 删除收货地址
router.delete('/addresses/:id', verifyToken, (req, res) => {
  const addressId = parseInt(req.params.id);
  const addresses = data.addresses[req.userId] || [];
  const index = addresses.findIndex(a => a.id === addressId);

  if (index === -1) {
    return res.status(404).json({ code: 404, message: '地址不存在' });
  }

  addresses.splice(index, 1);

  // 如果删除的是默认地址，设置第一个为默认
  if (addresses.length > 0 && !addresses.some(a => a.isDefault)) {
    addresses[0].isDefault = true;
  }

  res.json({ code: 200, message: '删除成功' });
});

// 设置默认地址
router.put('/addresses/:id/default', verifyToken, (req, res) => {
  const addressId = parseInt(req.params.id);
  const addresses = data.addresses[req.userId] || [];
  const address = addresses.find(a => a.id === addressId);

  if (!address) {
    return res.status(404).json({ code: 404, message: '地址不存在' });
  }

  addresses.forEach(a => a.isDefault = false);
  address.isDefault = true;

  res.json({ code: 200, message: '设置成功' });
});

module.exports = router;
