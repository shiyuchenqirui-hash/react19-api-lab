# React API 实验与复现

> 类型：implementation
> 状态：持续学习；验证范围见正文
> 作者：chenshiyu
> 创建日期：2026-10-05
> 最后更新：2026-10-05

## TL;DR

基于历史提交 `cdcea65` 整理，保留探索性实现，不把示例当作生产范式。本轮已通过类型检查和构建，页面交互仍待复验。

## 基线与追溯

macOS / Node 22.23.2 / React 19.0.0 / React Router 7.1.5；开发服务与 SSR 构建是不同形态，观察时记录自己用哪一种。历史代码来自 2025-02-18～20 的 14 次提交，可用 `git log --reverse --oneline` 查看，不能把提交标题当作验证日志。

关键进展：`7d29bd3` 过渡与乐观更新、`ef778d1` 延迟值、`bed9866` useActionState、`317213d` useFormStatus、`9644478` Context、`cdcea65` 当前基线。

## 操作与观察

先执行根目录 README 的启动命令。每次从首页进入目标页面，打开浏览器 Console；刷新页面可重置内存状态。下表的观察点是待操作核对的问题，不是本次实测结果。

| 实验 | 操作 | 观察点与证据边界 |
| --- | --- | --- |
| UseActionState1 / 2 | 分别填普通用户名和有效邮箱，再用用户名 `error` 提交 | 模拟请求 1.5 秒；记录 pending、成功、失败三阶段。demo1 是 form action，demo2 是 onSubmit + startTransition |
| FormAction | 提交一次，观察按钮、反馈和表单重置时间 | 源码中 transition 回调没有返回 Promise，不能直接宣称 pending 覆盖整个请求 |
| UseFormStatus | 输入名称后提交 | 源码延迟 2 秒；SubmitButton 是 form 后代，观察禁用与恢复 |
| UseOptimistic | 发送一条消息，观察立即、约 1 秒、约 4 秒三个时点 | 模拟发送后更新基础列表，又额外等待 3 秒才结束 Action；记录是否出现重复行，不预填结论 |
| UseTransition | 输入内容并点击添加 | 3 秒计时器；记录输入清空、pending 和列表更新，不等价于 CPU 性能测试 |
| UseDeferredValue | 连续输入，比较 Console 中 text 和 deferredValue 日志 | 250 个 SlowItem，每个忙等约 1ms；设备、模式和 StrictMode 都影响观察，不得当性能收益数字 |
| RefClean | 滚动容器，再点击返回首页 | 对照挂载、滚动与清理日志；清理返回函数在 ref 回调内 |
| Use1 | 打开页面 | 对照 Provider 字符串和展示内容 |
| Use2 | 打开页面与客户端跳转分别试验 | 观察 Suspense fallback / Promise 结果；SSR 首访和客户端导航不混为一次结果 |

## 已知限制与下一轮问题

- **代码事实**：FormAction 的 `startTransition` 回调既未 return 也未 await 请求；**推断**：它的 pending 不会可靠代表整个网络等待阶段。下一轮应做返回 Promise 前后的对照，不在本次整理中偷偷改语义。
- **代码事实**：Use2 每次父组件渲染都调用 `fetchData()` 创建新 Promise；下一轮对照稳定 Promise 身份与当前实现，记录警告和重渲染行为。
- **代码事实**：UseTransition 在计时器回调里 setState；不能因外层存在 transition 就断言此更新一定带有 transition 优先级。pending 生命周期与更新优先级应分开验证。
- **代码事实**：UseOptimistic 成功时追加基础数据，而 Action 延后结束；当前没有去重逻辑。失败分支需改变模拟参数后才能触发，页面没有失败开关。
- 类型检查与构建不能覆盖交互、SSR hydration、错误呈现和性能结论。各页面的 CSS 也未做隔离审计。

## 本次验证记录

2026-10-05，基线 `cdcea65` 加本轮文档/名称整理：

| 检查 | 实际结果 |
| --- | --- |
| npm ci --ignore-scripts --no-audit --no-fund | 成功，安装 436 个包，未升级锁文件 |
| npm run typecheck | 退出码 0 |
| npm run build | 退出码 0，客户端 74 模块、SSR 26 模块构建成功 |
| 浏览器逐页交互 / 性能测量 | 本轮未执行 |
| 依赖漏洞审计 | 本轮未执行，不代表依赖无漏洞 |

## 官方资料

先看对应一项再做实验，不必一次读完：

- [useActionState](https://react.dev/reference/react/useActionState)、[form action](https://react.dev/reference/react-dom/components/form)、[useFormStatus](https://react.dev/reference/react-dom/hooks/useFormStatus)
- [useOptimistic](https://react.dev/reference/react/useOptimistic)、[useTransition](https://react.dev/reference/react/useTransition)
- [useDeferredValue](https://react.dev/reference/react/useDeferredValue)、[ref 回调](https://react.dev/reference/react-dom/components/common#ref-callback)
- [use](https://react.dev/reference/react/use)

官网为滚动更新文档，本项目固定 React 19.0.0；后续新增 API 或行为变化不能直接套到历史版本。
