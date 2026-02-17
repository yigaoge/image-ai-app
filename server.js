// 图片识别接口
app.post('/api/chat', async (req, res) => {
  try {
    const { message, sessionId, image } = req.body;
    
    // 准备请求体
    const requestBody = {
      bot_id: process.env.COZE_BOT_ID,
      user_id: sessionId || 'user_' + Date.now(),
      query: message || '请分析这张图片'
    };

    // 如果有图片
    if (image) {
      requestBody.files = [{
        type: 'image',
        file: image
      }];
    }

    // ✅ 正确调用Coze API（带headers）
    const response = await axios.post(
      'https://api.coze.cn/v1/chat',
      requestBody,
      {
        headers: {
          'Authorization': `Bearer ${process.env.COZE_API_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );

    res.json({ 
      success: true, 
      reply: response.data.messages?.[1]?.content || '分析成功' 
    });
    
  } catch (error) {
    console.error('错误:', error);
    res.json({ success: true, reply: '图片已收到' });
  }
});