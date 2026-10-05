# 实验索引

> 类型：implementation
> 状态：持续学习；验证范围见正文
> 作者：chenshiyu
> 创建日期：2026-10-05
> 最后更新：2026-10-05

## TL;DR

下面 10 个入口均有代码；“有代码”不代表本轮已经观察了页面行为。完整操作与限制见 [React API 实验记录](implementation/impl_react_api_experiments.md)。

| 入口 | 问题 | 源码 |
| --- | --- | --- |
| /UseActionState1 | form Action 如何返回状态、错误与 pending？ | [demo1](../app/routes/UseActionState/demo1.tsx) |
| /UseActionState2 | onSubmit 中如何显式进入 Action 上下文？ | [demo2](../app/routes/UseActionState/demo2.tsx) |
| /FormAction | Action 返回值与异步任务是否同一生命周期？ | [page](../app/routes/FormAction/page.tsx) |
| /UseFormStatus | 子组件如何读取所属表单的 pending？ | [page](../app/routes/UseFormStatus/page.tsx) |
| /UseOptimistic | 乐观数据何时出现、提交后何时退出？ | [page](../app/routes/UseOptimistic/page.tsx) |
| /UseTransition | 模拟异步期间如何显示 pending？ | [page](../app/routes/UseTransition/page.tsx) |
| /UseDeferredValue | 输入与慢列表更新如何分开观察？ | [page](../app/routes/UseDeferredValue/page.tsx) |
| /RefClean | ref 回调如何注册和清理监听器？ | [page](../app/routes/RefClean/page.tsx) |
| /Use1 | use 如何读取 Context？ | [demo1](../app/routes/Use/demo1.tsx) |
| /Use2 | Promise 与 Suspense 如何配合？ | [demo2](../app/routes/Use/demo2.tsx) |

新增实验先扩展现有记录；只有问题规模需要时才拆成新文档。不要为每个小 API 都建立空模板。
