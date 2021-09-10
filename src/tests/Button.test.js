import { render, unmountComponentAtNode } from "react-dom";
import {ButtonType} from  '../services/Enum.js';
import Button from '../components/Button.js';

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

it('renders add button', () => {
    render(<Button text={ButtonType.ADD} />, container);
    //console.log(container.querySelector('button').className)
    expect(container.querySelector('button').innerHTML).toBe(ButtonType.ADD);
    expect(container.querySelector('button').className).toBe("button");
});

it('renders new button', () => {
    render(<Button text={ButtonType.NEW} />, container);
    expect(container.querySelector('button').innerHTML).toBe(ButtonType.NEW);
    expect(container.querySelector('button').className).toBe("button button-right");
});