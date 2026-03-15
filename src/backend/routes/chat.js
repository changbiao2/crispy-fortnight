/**
 * 在线客服路由
 */

const express = require('express');
const router = express.Router();
const { data } = require('../config/database');
const { verifyToken } = require('../middleware/auth');

// 获取聊天历史
router.get('/history', verifyToken, (req, res) => {
  const history = data.chatHistory[req.userId] || [];

  res.json({
    code: 200,
    message: '获取成功',
    data: history
  });
});

// 发送消息
router.post('/send', verifyToken, (req, res) => {
  const { content } = req.body;

  if (!content || content.trim() === '') {
    return res.status(400).json({ code: 400, message: '消息内容不能为空' });
  }

  if (!data.chatHistory[req.userId]) {
    data.chatHistory[req.userId] = [];
  }

  const history = data.chatHistory[req.userId];

  // 用户消息
  const userMessage = {
    id: Date.now(),
    type: 'user',
    content: content.trim(),
    createTime: new Date().toLocaleString('zh-CN')
  };
  history.push(userMessage);

  // 模拟客服自动回复
  const autoReply = generateAutoReply(content);
  setTimeout(() => {
    const serviceMessage = {
      id: Date.now() + 1,
      type: 'service',
      content: autoReply,
      createTime: new Date().toLocaleString('zh-CN')
    };
    history.push(serviceMessage);
  }, 500);

  res.json({
    code: 200,
    message: '发送成功',
    data: userMessage
  });
});

// 清空聊天记录
router.delete('/history', verifyToken, (req, res) => {
  data.chatHistory[req.userId] = [];
  res.json({ code: 200, message: '清空成功' });
});

// 自动回复生成
function generateAutoReply(message) {
  const msg = message.toLowerCase();
  
  if (msg.includes('你好') || msg.includes('在吗') || msg.includes('hello')) {
    return '您好！欢迎光临，请问有什么可以帮您的吗？😊';
  }
  
  if (msg.includes('价格') || msg.includes('多少钱') || msg.includes('优惠')) {
    return '您好，商品价格以页面显示为准，我们经常会有优惠活动，请关注首页促销信息哦！';
  }
  
  if (msg.includes('发货') || msg.includes('快递') || msg.includes('物流')) {
    return '我们一般在付款后24小时内发货，默认使用顺丰/京东快递，您可以在订单详情中查看物流信息。';
  }
  
  if (msg.includes('退款') || msg.includes('退货') || msg.includes('换货')) {
    return '我们支持7天无理由退换货，请在订单页面申请退换货，客服会在24小时内处理。';
  }
  
  if (msg.includes('支付') || msg.includes('付款')) {
    return '我们支持微信支付、支付宝、银联等多种支付方式，请放心购买！';
  }
  
  if (msg.includes('谢谢') || msg.includes('感谢')) {
    return '不客气！感谢您的支持，祝您购物愉快！😊';
  }

  // 默认回复
  const defaultReplies = [
    '好的，我已经记录了您的问题，会尽快为您处理。',
    '感谢您的咨询，请问还有其他问题吗？',
    '您的问题我已收到，稍后会有专员为您解答。',
    '非常感谢您的反馈，我们会持续改进服务！'
  ];
  
  return defaultReplies[Math.floor(Math.random() * defaultReplies.length)];
}

module.exports = router;
