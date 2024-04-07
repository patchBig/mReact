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
  it.only('should render function Component', async () => {
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
