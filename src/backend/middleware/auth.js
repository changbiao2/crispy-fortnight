/**
 * 认证中间件
 */

const { data } = require('../config/database');

// 验证Token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ code: 401, message: '请先登录' });
  }

  const userId = data.tokens[token];
  if (!userId) {
    return res.status(401).json({ code: 401, message: 'Token已失效，请重新登录' });
  }

  const user = data.users.find(u => u.id === userId);
  if (!user) {
    return res.status(401).json({ code: 401, message: '用户不存在' });
  }

  if (user.status === 'disabled') {
    return res.status(403).json({ code: 403, message: '账号已被禁用' });
  }

  req.user = user;
  req.userId = userId;
  next();
};

// 验证管理员权限
const verifyAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ code: 403, message: '需要管理员权限' });
  }
  next();
};

// 可选认证（不强制要求登录）
const optionalAuth = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (token) {
    const userId = data.tokens[token];
    if (userId) {
      const user = data.users.find(u => u.id === userId);
      if (user) {
        req.user = user;
        req.userId = userId;
      }
    }
  }
  next();
};

module.exports = {
  verifyToken,
  verifyAdmin,
  optionalAuth
};
