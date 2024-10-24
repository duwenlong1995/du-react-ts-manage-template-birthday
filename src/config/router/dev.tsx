import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { ShopOutlined } from '@ant-design/icons';
import Layout from '@/layout'; // 布局组件
import BasePageTitle from '@/resources/components/base-page-title'; // 页面标题组件
// 懒加载路由组件
const DevPlugin = lazy(() => import('@/views/dev/plugin'));
const DevInfo = lazy(() => import('@/views/dev/module'));

const routes = [
    {
        path: '/dev',
        order: 2, // 菜单项的排序，数字越小越靠前
        element: <Layout />,
        meta: {
            title: '开发者中心',
            icon: ShopOutlined
        },
        children: [
            {
                path: '/dev/module',
                meta: {
                    title: '全局组件'
                },
                element: <BasePageTitle element={DevInfo} meta={{ title: '全局组件' }} />
            },
            {
                path: '/dev/plugin',
                meta: {
                    title: '全局插件'
                },
                element: <BasePageTitle element={DevPlugin} meta={{ title: '全局插件' }} />
            }
        ]
    }
];
export default routes;
