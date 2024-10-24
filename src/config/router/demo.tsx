import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import { HighlightOutlined } from '@ant-design/icons'
import Layout from '@/layout' // 布局组件
import BasePageTitle from '@/resources/components/base-page-title' // 页面标题组件
import Demo2 from '@/views/Demo2' // 示例页面2
import Demo3 from '@/views/Demo3' // 示例页面2
// 懒加载路由组件
const Error404 = lazy(() => import('@/views/err404'))
const routes = [
  {
    path: '/demo',
    meta: {
      title: '示例页面',
      icon: HighlightOutlined,
    },
    element: <Layout />,
    order: 3, // 菜单项的排序，数字越小越靠前
    children: [
      {
        path: '/demo/404',
        meta: {
          title: '404 Page',
        },
        element: <BasePageTitle element={Error404} meta={{ title: '404 Page' }} />,
      },
      {
        path: '/demo',
        isHidden: true,
        element: <Navigate to="/demo/404" replace />,
      },
      {
        path: '/demo/demo2',
        meta: {
          title: 'demo2',
        },
        element: <Demo2 />,
      },
      {
        path: '/demo/demo3',
        meta: {
          title: 'demo3',
        },
        element: <Demo3 />,
      },
    ],
  },
]
export default routes
