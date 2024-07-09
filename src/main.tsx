import { createRoot } from 'react-dom/client'
// 样式初始化一般放在最前面
import 'reset-css'
import '@/assets/css/index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import 'tailwindcss/tailwind.css'
import 'antd/dist/antd.min.css'
// import FrontendMonitoringSDK from '../sdk/index.js'

// 状态管理
import { Provider } from 'react-redux'
import store from '@/packages/store'
// 判断配置文件里，mock是否要开启
process.env.NODE_ENV === 'development' && import('@/config/mock')

// 配置参数
// const config = {
//     apiKey: 'your-api-key', // 后端 API 密钥
//     errorLevel: 'error', // 错误报告级别：error, warn, info
//     includeUserData: true, // 是否包含用户数据
// };

// // 初始化 SDK
// const sdk = new FrontendMonitoringSDK(config);
// Create the root container and render the app
// main.js

const rootContainer: HTMLElement | null = document.getElementById('root')
if (rootContainer) {
  const root = createRoot(rootContainer)
  root.render(
    <Provider store={store}>
      <App />
    </Provider>,
  )
}

reportWebVitals()
