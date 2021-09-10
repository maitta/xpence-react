import { render, unmountComponentAtNode } from "react-dom";
import Consumption from '../components/Consumption.js';

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('renders correct name', () => {
    render(<Consumption name="testName" />, container);
    expect(container.querySelectorAll('span')[1].textContent).toBe("testName");
});

it('renders correct price', () => {
    render(<Consumption price={2.99} />, container);
    expect(container.querySelectorAll('span')[2].textContent).toBe('2.99');
});