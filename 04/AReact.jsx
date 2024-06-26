import '../requestCallback';

function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.flat().map(child => {
        return typeof child !== "object" ? createTest(child) : child
      }),
    }
  }
}

function createTest(text) {
  return {
    type: 'HostText',
    props: {
      nodeValue: text,
      children: [],
    }
  }
}

const isProperty = (prop) => prop !== 'children'
// 当前处理的 Fiber 节点
let workInProgress = null;
// 存储整个 Fiber root
let workInProgressRoot = null;

class AReactDomRoot {
  _internalRoot = null;
  constructor(container) {
    this._internalRoot = {
      current: null,
      containerInfo: container,
    }
  }
  render(element) {
    this._internalRoot.current = {
      alternate: {
        stateNode: this._internalRoot.containerInfo,
        props: {
          children: [element]
        }
      }
    }
    workInProgressRoot = this._internalRoot;
    workInProgress = workInProgressRoot.current.alternate;
    window.requestIdleCallback(workLoop);
    // this.renderImpl(element, this.container);
  }
}

function workLoop() {
  while (workInProgress) {
    workInProgress = performUnitOfWork(workInProgress);
  }
}

function performUnitOfWork(fiber) {
  // 处理当前 fiber：创建 DOM，设置 props，插入当前 dom 到 parent
  const isFunctionComponent = fiber.type instanceof Function;
  if (isFunctionComponent) {
    fiber.props.children = [fiber.type(fiber.props)];
  } else {
    // 处理当前 Fiber：创建 DOM 设置 props
    if (!fiber.stateNode) {
      fiber.stateNode = fiber.type === 'HostText'
        ? document.createTextNode('')
        : document.createElement(fiber.type);
      Object.keys(fiber.props).filter(isProperty).forEach(key => {
        fiber.stateNode[key] = fiber.props[key];
      });
    }
    if (fiber.return) {
      // 往上查找，直到有一个节点存在 stateNode
      let domParentFiber = fiber.return;
      while (!domParentFiber.stateNode) {
        domParentFiber = domParentFiber.return;
      }
      domParentFiber.stateNode.appendChild(fiber.stateNode);
    }
  }

  // 初始化 children 的 Fiber
  let prevSibling = null;
  fiber.props.children.forEach((child, index) => {
    const newFiber = {
      type: child.type,
      stateNode: null,
      props: child.props,
      return: fiber,
    }

    if (index === 0) {
      fiber.child = newFiber;
    } else {
      prevSibling.sibling = newFiber;
    }
    prevSibling = newFiber;
  })

  // 返回下一个处理的 Fiber
  return getNextFiber(fiber);
}

function getNextFiber(fiber) {
  if (fiber.child) {
    return fiber.child;
  }
  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.return;
  }
  return null;
}

function createRoot(container) {
  return new AReactDomRoot(container);
}

function act(callback) {
  callback();
  return new Promise((resolve) => {
    function loop() {
      if (workInProgress) {
        window.requestIdleCallback(loop);
      } else {
        resolve();
      }
    }
    loop();
  })
}

export default {
  createElement,
  createRoot,
  act,
}
