import { Suspense, useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import BasePageLoadingIndicator from '@/resources/components/base-page-loading-indicator';

const App = () => {
    const [router, setRouter] = useState(null);
    const ROUTER_BASE = import.meta.env.VITE_APP_ROUTER_BASE;

    useEffect(() => {
        const fetchRoutes = async () => {
            const routesModule = await import('@/packages/router');
            const routes = routesModule.default; // 假设默认导出就是路由配置
            const routerInstance: any = createBrowserRouter(routes, { basename: ROUTER_BASE });
            setRouter(routerInstance);
        };

        fetchRoutes();
    }, []);
    // 设置根元素字体大小为10px，这是1rem的默认大小
    const rootElement = document.getElementById('root');

    rootElement.style.fontSize = '12px';
    // 当路由未准备好时显示加载指示器
    if (!router) {
        return <BasePageLoadingIndicator />;
    }

    return (
        <Suspense fallback={<BasePageLoadingIndicator />}>
            <RouterProvider router={router} />
        </Suspense>
    );
};

export default App;
