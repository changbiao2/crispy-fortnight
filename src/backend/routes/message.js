/**
 * 留言路由
 */

const express = require('express');
const router = express.Router();
const { data, generateId } = require('../config/database');
const { verifyToken, optionalAuth } = require('../middleware/auth');

// 获取留言列表
router.get('/', optionalAuth, (req, res) => {
  let { page = 1, limit = 10 } = req.query;
  page = parseInt(page);
  limit = parseInt(limit);

  const messages = [...data.messages].sort(
    (a, b) => new Date(b.createTime) - new Date(a.createTime)
  );

  const total = messages.length;
  const list = messages.slice((page - 1) * limit, page * limit);

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

// 发表留言
router.post('/', verifyToken, (req, res) => {
  const { content } = req.body;

  if (!content || content.trim() === '') {
    return res.status(400).json({ code: 400, message: '留言内容不能为空' });
  }

  const newMessage = {
    id: generateId('messages'),
    userId: req.userId,
    username: req.user.nickname || req.user.username,
    avatar: req.user.avatar || '',
    content: content.trim(),
    replies: [],
    createTime: new Date().toLocaleString('zh-CN')
  };

  data.messages.push(newMessage);

  res.json({
    code: 200,
    message: '发表成功',
    data: newMessage
  });
});

// 回复留言
router.post('/:id/reply', verifyToken, (req, res) => {
  const messageId = parseInt(req.params.id);
  const { content } = req.body;

  const message = data.messages.find(m => m.id === messageId);
  if (!message) {
    return res.status(404).json({ code: 404, message: '留言不存在' });
  }

  if (!content || content.trim() === '') {
    return res.status(400).json({ code: 400, message: '回复内容不能为空' });
  }

  const reply = {
    userId: req.userId,
    username: req.user.nickname || req.user.username,
    avatar: req.user.avatar || '',
    content: content.trim(),
    createTime: new Date().toLocaleString('zh-CN')
  };

  message.replies.push(reply);

  res.json({
    code: 200,
    message: '回复成功',
    data: message
  });
});

// 删除留言（仅本人或管理员）
router.delete('/:id', verifyToken, (req, res) => {
  const messageId = parseInt(req.params.id);
  const index = data.messages.findIndex(m => m.id === messageId);

  if (index === -1) {
    return res.status(404).json({ code: 404, message: '留言不存在' });
  }

  const message = data.messages[index];
  
  // 只有本人或管理员可以删除
  if (message.userId !== req.userId && req.user.role !== 'admin') {
    return res.status(403).json({ code: 403, message: '无权删除此留言' });
  }

  data.messages.splice(index, 1);

  res.json({ code: 200, message: '删除成功' });
});

module.exports = router;
