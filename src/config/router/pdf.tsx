import { lazy } from 'react'
import BasePageTitle from '@/resources/components/base-page-title' // 页面标题组件

// 懒加载路由组件
const BigScream = lazy(() => import('@/views/pdf'))
const routes = [
  {
    path: '/pdf',
    meta: {
      title: 'pdf',
    },
    exact: true,
    isHidden: true, // 不在侧边栏展示
    element: <BasePageTitle element={BigScream} meta={{ title: '大屏页' }} />,
  },
]
export default routes
