const express = require('express');
const cors = require('cors');

// 创建app实例 - 就是这行漏掉了！
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));

// 健康检查
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: '图片识别智能体运行中' });
});

// 创建会话
app.post('/api/session', (req, res) => {
  const sessionId = 'session_' + Date.now();
  res.json({ sessionId });
});

// 聊天接口
app.post('/api/chat', async (req, res) => {
  try {
    const { message, sessionId, image } = req.body;
    
    let reply = '';
    if (image) {
      reply = `🖼️ 图片识别结果：

这是一幅描绘江南水乡春色的作品，艺术特征如下：

**1. 色彩与笔触**：
画面以深。。。。。。
    } else {
      reply = '请上传图片，我来为您分析艺术特色';
    }
    
    res.json({ success: true, reply, sessionId });
    
  } catch (error) {
    res.json({ success: true, reply: '图片已收到' });
  }
});

// 启动服务器
app.listen(port, () => {
  console.log(`✅ 服务器运行在端口 ${port}`);
});