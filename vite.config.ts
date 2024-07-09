import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'
import bundleAnalyzer from 'rollup-plugin-bundle-analyzer'
import { viteMockServe } from 'vite-plugin-mock'

const isDev = process.env.NODE_ENV === 'development'
export default defineConfig({
  base: './',
  plugins: [
    react(),
    bundleAnalyzer({}),
    viteMockServe({
      mockPath: 'mock',
      localEnabled: isDev,
      prodEnabled: !isDev,
      supportTs: false,
      watchFiles: true,
      injectCode: `
        import { setupProdMockServer } from './mockProdServer';
        setupProdMockServer();
      `,
      injectFile: path.resolve(process.cwd(), 'src/main.jsx'),
    }),
  ],
  define: {
    'process.env': process.env,
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './'), // 根路径
      '@': path.resolve(__dirname, './src'), // src 路径
    },
  },
  server: {
    // host: '0.0.0.0', //使用当前的IP地址，没有这个就是以localhost作为本地地址
    // port: 3000, //端口号为3000
    // open: false, //是否在默认浏览器中自动打开该地址
    proxy: {
      //使用代理
      // '/api': {
      //   //当有 /api开头的地址是，代理到target地址
      //   target: 'http://127.0.0.1:8080', // 需要跨域代理的本地路径
      //   changeOrigin: true, //是否改变请求源头
      //   rewrite: (path) => path.replace(/^\/api/, ''), // 路径重写
      // },
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
