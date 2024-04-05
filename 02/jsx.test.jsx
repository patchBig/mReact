import { describe, it, expect } from "vitest";

import AReact from './AReact.jsx';

describe('render jsx', () => {
  it('should render jsx', () => {
    const container = document.createElement('div');
    const element = (
      <div id='foo'>
        <div id="bar">bar</div>
        <button>button</button>
      </div>
    )
    const root = AReact.createRoot(container);
    root.render(element);

    expect(container.innerHTML).toBe(
      `<div id="foo"><div id="bar">bar</div><button>button</button></div>`
    )
  })


  it('should render jsx className', () => {
    const container = document.createElement('div');
    const element = (
      <div id='foo'>
        <div id="bar" className="bar">bar</div>
        <button>button</button>
      </div>
    )
    const root = AReact.createRoot(container);
    root.render(element);

    expect(container.innerHTML).toBe(
      `<div id="foo"><div id="bar" class="bar">bar</div><button>button</button></div>`
    )
  })
})
