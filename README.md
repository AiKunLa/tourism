# react 旅游项目 App
- 融合绝大多数考点，适用于任何App项目

## 技术栈
- react 全家桶
    - react 
        组件封装
        hooks  自定义hooks
        受控于非受控
    - react-dom
    - react-router-dom
        SPA 单页应用
        路由懒加载
        路由守卫
    - zustand

- vite 配置

- module css 样式模块  style
    弹性布局
    transition transform

- axios 网络请求，请求拦截器，响应拦截器
- jwt 登录校验
- mock 模拟后端接口
- 性能优化
    防抖节流
    useCallback useMemo 
    图片懒加载
- LLM 
    流式输出
    - chat
    - 生成图片、语音、coze 工作流 
    - 图片预览，base64URL

- 移动端设备的适配

- 单例模式

- git 版本控制

## 项目的架构
- api  接口
- components  组件
- pages  页面
- hooks  自定义hooks
- store  状态管理
- mock 后端接口

## 配置
1. 依赖安装
    pnpm i vite-plugin-mock -D 开发阶段
    pnpm i react-router-dom zustand axios react react-dom react-vant

    pnpm i lib-flexible  解决移动端适配 等分屏幕
    pnpm i -D postcss postcss-pxtorem  解决px 转换为rem
    react-vant 移动端组件库

2. 配置vite.config.js
    ```js
    import { defineConfig } from 'vite'
    import react from '@vitejs/plugin-react-swc'
    import {viteMockServe} from 'vite-plugin-mock'
    import path from 'path'

    // https://vite.dev/config/
    export default defineConfig({
    plugins: [react(), viteMockServe({
        mockPath:'mock',
        localEnabled:true
    })],
    resolve: {
        alias: {
        '@': path.resolve(__dirname, './src'),
        },
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },
    ```
3. 创建.env.local 配置环境变量

4. 移动端配置
    - 在index.html中 设置
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
    - css预处理
        index.css  reset
            统一盒模型为怪异盒模型，清除默认样式，font-family：apple-system
        App.css 全局样式
        module.css 模块样式
    - 移动端适配
        不能使用px，使用相对单位rem。不同设备上体验要一致
        不同尺寸手机等比例缩放
        设计稿：750px 以iphone4 375pt * 2 = 750px
        - 使用flexible.js 阿里的  ，在任何设备上1rem = 屏幕的1/10 （window.innerHeight）
            css 1px 的宽度 = 手机设备宽度 = 375  
            1px = 2 发光源5
        - 还原设计稿
            若设计稿为750 则一个宽为200px 则 他为200/75 = 2.666 rem
            由于lib-flexible 将屏幕宽度分为10份，1rem 为一份。
            200 / 750 * 10  = 2.666rem  求出比例，再*rem的数量就可以求出对应的rem

            - 这里存在频繁的计算，所以可以使用postcss 插件来计算
                安装pnpm i -D postcss postcss-pxtorem  解决px 转换为rem
                配置postcss.config.js
                ```js
                export default {
                    plugins: {
                        'postcss-pxtorem': {
                            rootValue: 75, // 以 iPhone6 为参考，1rem = 75px    200 / 75 = 2.6666666666666665rem
                            propList: ['*'], // 所有属性都转换
                            exclude: /node_modules/i, // 排除 node_modules 中的文件
                        },
                    },
                }
                ```


5. 修改项目标题
    在index.html中
    <title>稀饭旅游网</title>

## git 提交规范
- 项目初始化 移动端适配

## 功能模块
- UI 组件库
    - react-vant 选择适合业务的组件库

- 路由模块
    - 使用Layout组件 嵌套路由Outlet 分组显示
        Route 不加path对应的路由自动选择
        导航栏
            使用react-vant + @react-vant/icons 来实现图标
            value + onChange 来实现tabbar的切换
            结合es6 特性 使用findIndex 方法来根据路由路径，设置当前激活的tabbar，当用户从链接直接进入页面时，根据链接路径，激活对应的tabbar
            

- 自定义hooks
    - useTitle 用于设置页面标题  接收一个**页面标题参数**

- chat模块
    封装LLM模块结合大模型打造智能客服
    - llm模块 chat封装
    - 迭代chat 支持任意模型

## 项目迭代
1. 智能客服，从上到下，由浅入深，不断丰富功能
    - 功能由浅入深
    - chatbot deepseek 简单chat
    - deepseek-r1 推理模型
    - 流式输出
    - 上下文 LRU
    - coze

## 项目的亮点和难点

1. 自定义hooks
2. 前端智能
    - 封装chat 函数
    - 由于对各家模型比较感兴趣， 我将这个函数升级为kimiChat deepSeekChat，从而可以灵活调用各种模型
        这是出于对不同大模型的性能 能力 性价比来考虑的
    - 文生图，prompt设计
3. css
    - 原子css
        一个元素按功能逻辑拆分为多个类，和原子一样，每个类负责的样式功能不同。元素的样式由这些原子类来组成。
        优点：这样可以复用样式，
    在App.css 里面添加通用样式
    各种模块里module.css 不影响别的组件
    使用lib-flexible 移动端适配
    postcss pxtorem 插件快速还原设计稿

4. 组件亮点
    - 通用组件**Loading**  中使用animation
        性能优化 memo，
        居中方案： 
            position: fixed;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            margin: auto;
        动画方案：animation  与transation只能适用于简单的过度动画 animation 适用于复杂的关键帧动画
            // loading (动画名称)  1s (动画时间)  linear (动画运动方式)  infinite (动画次数)
            animation: loading 1s linear infinite;  
            @keyframes loading { /* 在loading中可以配置关键帧，关键帧中可以配置不同阶段所要展示的的样式 每一帧都是一个动画 */
                0% ,100%{
                    transform: scale(0);
                }
                50% {
                    transform: scale(1);    
                }
            }
    - **Search 页面组件**
        - 防抖
            使用 工具类中的debounce 函数来实现防抖
            使用 useMemo来缓存 debounce 函数实例，避免每次渲染都生成新的防抖函数实例
        - api
            GoogleSuggest
        - 搜索历史 localStroage

### 遇到的问题并如何解决
- chat message中遇到message覆盖问题 —— 这是一个闭包陷阱的问题
