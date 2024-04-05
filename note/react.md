render 阶段
目的：做 DOM Diff，找出核心变化的部分，打上增删改标记
异步，可中断，对任务按照优先级处理，可以暂停、继续、丢弃等，需要无副作用
入口方法：renderRootConcurrent

commit 阶段
目的: 把变化的部分一次性更新到 DOM 上
同步，不可中断
入口方法： commitRootConcurrent

异步可中断的更新 Fiber
遍历顺序：先遍历 Child，然后 sibling，然后 return

Fiber 双缓冲
current -> alternate
在 commit 阶段

```ts
function commitRootImpl(
  root: FiberRoot, // FiberRoot
) {
  // finishedWork 即为 workInProgress 数的根节点
  // root.current 指向它来完成树的切换
  root.current = finishedWork;
  scheduler.requestPaint();
}
```
