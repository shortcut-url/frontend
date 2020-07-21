import { createProxyMiddleware } from 'http-proxy-middleware';

export const config = {
  api: {
    bodyParser: false
  }
};

let proxyMiddleware = createProxyMiddleware({
  target: process.env.API_SERVER,
  pathRewrite: {
    '^/api/': ''
  },
  changeOrigin: true
});

export default proxyMiddleware;
