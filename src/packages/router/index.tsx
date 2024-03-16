// 首先，从react和react-router-dom中导入必要的hooks和组件
import { Navigate } from 'react-router-dom';

// 为我们的模块路由定义一个类型
type ModuleRoutes = {
    default: Array<{ path: string; isHidden?: boolean; element: JSX.Element }>;
};

// 从特定目录动态导入路由配置模块
const modulesFiles = import.meta.globEager<ModuleRoutes>('@/config/router/**/*.tsx');

// 将导入的模块转换为可以用来配置路由的格式
const modules = Object.entries(modulesFiles).reduce((modules, [modulePath, value]) => {
    // 从文件路径提取模块名称
    const moduleName = modulePath.replace(/^.*\/(.*)\.ts$/, '$1');
    modules[moduleName] = value.default;
    return modules;
}, {} as { [key: string]: Array<{ path: string; isHidden?: boolean; element: JSX.Element }> });

const routers: Array<{ path: string; isHidden?: boolean; element: JSX.Element }> = [];
for (const key in modules) {
    routers.push(...modules[key]);
}
// 为未定义路径添加一个全匹配路由，重定向到自定义404页面
routers.push({
    path: '*',
    isHidden: true, // 在侧边栏中隐藏
    element: <Navigate to='/err404' replace />
});

export default routers;
