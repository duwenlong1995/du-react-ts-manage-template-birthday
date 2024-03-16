import { createRoot } from 'react-dom/client';
// 样式初始化一般放在最前面
import 'reset-css';
import '@/assets/css/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'tailwindcss/tailwind.css';
import 'antd/dist/antd.min.css';

// 状态管理
import { Provider } from 'react-redux';
import store from '@/packages/store';
// Create the root container and render the app
const rootContainer: HTMLElement | null = document.getElementById('root');
if (rootContainer) {
    const root = createRoot(rootContainer);
    root.render(
        <Provider store={store}>
            <App />
        </Provider>
    );
}

reportWebVitals();
