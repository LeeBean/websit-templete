# 售后官网系统 (After-sales Official Website)

基于 React 19 + Vite + React Router + TailwindCSS + Ant Design 开发的高性能、响应式售后服务平台。

## 技术栈

- **前端框架**: React 19
- **构建工具**: Vite 5
- **路由管理**: React Router 7 (支持路由守卫、懒加载)
- **样式框架**: TailwindCSS 3 + Ant Design 5
- **状态管理**: Zustand + Immer (不可变状态管理)
- **国际化**: i18next + react-i18next
- **网络请求**: Axios (集成请求/响应拦截器)
- **图标库**: Lucide-React + Ant Design Icons

## 核心功能模块

1.  **首页**: 品牌展示、轮播图、功能快捷入口、最新公告、四栏式页脚。
2.  **登录注册**: 基于 Ant Design Modal 实现，支持手机号/邮箱登录、注册、找回密码。
3.  **个人中心**: 包含服务记录（维修、咨询、投诉）、个人信息管理、账户安全设置。
4.  **售后维修**: 在线填写维修申请，支持图片上传、预约日期、进度查询。
5.  **服务咨询**: 分为电车咨询和储能咨询，支持富文本编辑、附件上传。
6.  **商城**: 商品列表展示、详情页、购物车（支持数量修改、删除、总价计算）。
7.  **服务商加盟**: 在线提交加盟申请、上传资质证明、申请进度查询。
8.  **投诉建议**: 提交投诉或改进建议，查看官方处理进度与回复。

## 项目结构说明

```text
src/
├── api/          # Axios 请求封装与接口定义
├── assets/       # 静态资源 (图片, 样式)
├── components/   # 公共组件 (Header, Footer, AuthModal 等)
├── hooks/        # 自定义 Hooks
├── i18n/         # 国际化配置与翻译文件
├── layouts/      # 页面布局组件
├── pages/        # 业务页面模块
├── routes/       # 路由配置与守卫
├── store/        # Zustand 状态管理
├── types/        # TypeScript 类型定义
└── utils/        # 工具函数 (cn, request 等)
```

## 安装与运行

1.  **安装依赖**:
    ```bash
    npm install --legacy-peer-deps
    ```

2.  **启动开发服务器**:
    ```bash
    npm run dev
    ```

3.  **构建生产版本**:
    ```bash
    npm run build
    ```

## 开发规范

- **组件化**: 按功能拆分小组件，保持代码简洁可维护。
- **样式**: 优先使用 TailwindCSS 原子类，复杂样式在 `index.css` 中定义。
- **状态**: 业务全局状态（如 Auth, Cart）存放在 Zustand，局部状态使用 `useState`。
- **验证**: 表单提交前必须通过 `Form.Item` 的 `rules` 进行前端验证。
- **响应式**: 必须兼容移动端（320px+）、平板（768px+）及 PC 端。
