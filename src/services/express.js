const express = require('express');
const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

// Các route khác của ứng dụng
app.post('/admin/addTrainLine', (req, res) => {
  // Xử lý yêu cầu POST ở đây
  res.send('Yêu cầu POST đã được xử lý');
});

// Khởi động server
const port = 3000;
app.listen(port, () => {
  console.log(`Server đang lắng nghe ở cổng ${port}`);
});
