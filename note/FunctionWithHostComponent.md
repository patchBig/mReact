# Function 组件和 Host 组件的差别

1. Function 组件的 Fiber 没有 DOM 节点，也就是 stateNode = null
2. Function 组件的 children 来自 Function 的执行结果，而不是 props.children
