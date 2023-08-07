const { createProxyMiddleware } = require("http-proxy-middleware");

// 가상 프록시 서버 세팅
module.exports = function(app){
  app.use(
    // 경로가 /app/v1 이면 http://localhost:8080 도메인으로 프록시 요청
    createProxyMiddleware('/api/v1',{
      target : 'http://localhost:8080',
      changeOrigin : true
    })
  );

  app.use(
    createProxyMiddleware("/api/v2/proxy",{
      target : 'http://localhost:8080',
      changeOrigin : true
    })
  )
}