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

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

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
