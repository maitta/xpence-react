import { render, unmountComponentAtNode } from "react-dom";
import {SummaryType} from '../services/Enum.js';
import Summary from '../components/Summary.js';

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

const testData = [{price: 5.99}, {price: 1.01}, {price: 3.00}];

it('yields error when wrong type', () => {
    render(<Summary type='bogus'/>, container);
    expect(container.textContent).toContain("error");
});

it('yields correct type', () => {
    for(const p in SummaryType){
        render(<Summary type={p} />, container);
        expect(container.textContent).toContain(p);
    }
});

it('has the right total', () => {
  render(<Summary type={SummaryType.TOTAL} />, container);
  expect(container.querySelector('span').textContent).toBe("420");
});

it('has the right subtotal', () => {
  render(<Summary type={SummaryType.SUBTOTAL} data={testData}/>, container);
  expect(container.textContent).toContain(10.0);
});

it('has the right percentage', () => {
  render(<Summary type={SummaryType.PERCENTAGE} data={testData}/>, container);
  expect(container.querySelector('span').textContent).toBe(0.024+'%')
});