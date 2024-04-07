import { describe, it, expect } from "vitest";

import AReact from './AReact.jsx';

const act = AReact.act;

describe('render jsx', () => {
  it('should render jsx', async () => {
    const container = document.createElement('div');
    const element = (
      <div id='foo'>
        <div id="bar">bar</div>
        <button>button</button>
      </div>
    )
    const root = AReact.createRoot(container);
    await act(() => {
      root.render(element);
      expect(container.innerHTML).toBe('');
    })
    expect(container.innerHTML).toBe(
      `<div id="foo"><div id="bar">bar</div><button>button</button></div>`
    )
  })


  it('should render jsx className', async () => {
    const container = document.createElement('div');
    const element = (
      <div id='foo'>
        <div id="bar" className="bar">bar</div>
        <button>button</button>
      </div>
    )
    const root = AReact.createRoot(container);
    await act(() => {
      root.render(element);
      expect(container.innerHTML).toBe('');
    })

    expect(container.innerHTML).toBe(
      `<div id="foo"><div id="bar" class="bar">bar</div><button>button</button></div>`
    )
  })
})

describe('AReact Concurrent', () => {
  it('should render in async', async () => {
    const container = document.createElement('div');
    const element = (
      <div id='foo'>
        <div id="bar">bar</div>
        <button>button</button>
      </div>
    )
    const root = AReact.createRoot(container);
    await act(() => {
      root.render(element);
      expect(container.innerHTML).toBe('');
    })
    expect(container.innerHTML).toBe(
      `<div id="foo"><div id="bar">bar</div><button>button</button></div>`
    )
  })

  it('should render in async act', async () => {
    const container = document.createElement('div');
    const element = (
      <div id='foo'>
        <div id="bar">bar</div>
        <button>button</button>
      </div>
    )
    const root = AReact.createRoot(container);
    await act(() => {
      root.render(element);
      expect(container.innerHTML).toBe('');
    })
    expect(container.innerHTML).toBe(
      `<div id="foo"><div id="bar">bar</div><button>button</button></div>`
    )
  })
})

describe('Function Component', () => {
  it('should render function Component', async () => {
      const container = document.createElement('div');
      function App(props) {
        return (
          <div id='foo'>
            <div id="bar">{props.title}</div>
            <button></button>
            {props.children}
          </div>
        )
      }
      const root = AReact.createRoot(container);
      await act(() => {
        root.render(
          <App title="mainTitle">
            <App title="subTitle" />
          </App>
        );
        expect(container.innerHTML).toBe('');
      })
    console.log(container.innerHTML)
      expect(container.innerHTML).toBe(
        `<div id="foo"><div id="bar">mainTitle</div><button></button><div id="foo"><div id="bar">subTitle</div><button></button></div></div>`
      )
  })
})

describe('Hooks', () => {
  it.only('should support useState', async () => {
    const container = document.createElement('div');
    const globalObj = {};

    function App() {
      const [count, setCount]= AReact.useState(100);
      globalObj.count = count;
      globalObj.setCount = setCount;
      return (
        <div>
          {count}
        </div>
      )
    }
    const root = AReact.createRoot(container);
    await act(() => {
      root.render(<App />);
    });
    await act(() => {
      globalObj.setCount((count) => count + 1)
    })
    await act(() => {
      globalObj.setCount(globalObj.count + 1)
    })
    expect(globalObj.count).toBe(102)
  })

  it.only('should support useReducer', async () => {
    const container = document.createElement('div');
    const globalObj = {};

    function reducer(state, action) {
      switch (action.type) {
        case 'add' :
          return state + 1;
        case 'sub' :
          return state - 1;
      }
    }

    function App() {
      const [count, dispath]= AReact.useReducer(reducer, 100);
      globalObj.count = count;
      globalObj.dispath = dispath;
      return (
        <div>
          {count}
        </div>
      )
    }
    const root = AReact.createRoot(container);
    await act(() => {
      root.render(<App />);
    });
    await act(() => {
      globalObj.dispath({ type: 'add' });
      globalObj.dispath({ type: 'add' });
    })
    expect(globalObj.count).toBe(102)
  })
})
