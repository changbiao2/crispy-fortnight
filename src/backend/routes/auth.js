/**
 * 认证路由 - 登录、注册、退出
 */

const express = require('express');
const router = express.Router();
const { data, generateId, generateToken } = require('../config/database');
const { verifyToken } = require('../middleware/auth');

// 用户注册
router.post('/register', (req, res) => {
  const { username, password, nickname, email, phone } = req.body;

  // 参数验证
  if (!username || !password) {
    return res.status(400).json({ code: 400, message: '用户名和密码不能为空' });
  }

  // 检查用户名是否存在
  if (data.users.find(u => u.username === username)) {
    return res.status(400).json({ code: 400, message: '用户名已存在' });
  }

  // 创建用户
  const newUser = {
    id: generateId('users'),
    username,
    password,
    nickname: nickname || username,
    email: email || '',
    phone: phone || '',
    avatar: '',
    role: 'user',
    status: 'active',
    createTime: new Date().toLocaleString('zh-CN')
  };

  data.users.push(newUser);

  // 生成Token并登录
  const token = generateToken();
  data.tokens[token] = newUser.id;

  res.json({
    code: 200,
    message: '注册成功',
    data: {
      token,
      user: {
        id: newUser.id,
        username: newUser.username,
        nickname: newUser.nickname,
        email: newUser.email,
        phone: newUser.phone,
        avatar: newUser.avatar,
        role: newUser.role
      }
    }
  });
});

// 用户登录
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ code: 400, message: '用户名和密码不能为空' });
  }

  const user = data.users.find(u => u.username === username && u.password === password);
  
  if (!user) {
    return res.status(400).json({ code: 400, message: '用户名或密码错误' });
  }

  if (user.status === 'disabled') {
    return res.status(403).json({ code: 403, message: '账号已被禁用' });
  }

  // 生成Token
  const token = generateToken();
  data.tokens[token] = user.id;

  res.json({
    code: 200,
    message: '登录成功',
    data: {
      token,
      user: {
        id: user.id,
        username: user.username,
        nickname: user.nickname,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar,
        role: user.role
      }
    }
  });
});

// 退出登录
router.post('/logout', verifyToken, (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (token && data.tokens[token]) {
    delete data.tokens[token];
  }

  res.json({ code: 200, message: '退出成功' });
});

// 获取当前用户信息
router.get('/me', verifyToken, (req, res) => {
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
      avatar: user.avatar,
      role: user.role
    }
  });
});

module.exports = router;
