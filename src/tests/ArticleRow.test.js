import { render, unmountComponentAtNode } from "react-dom";
import ArticleRow from '../components/ArticleRow.js';
import { act } from "react-dom/test-utils";

let container = null;
beforeEach(() => {
  container = document.createElement("tbody");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('renders correct name', () => {
    render(<ArticleRow name="testName" />, container);
    expect(container.querySelector('td').textContent).toBe("testName");
});

it('renders correct comment', () => {
    render(<ArticleRow comment="test comment" />, container);
    expect(container.querySelectorAll('td')[1].textContent).toBe("test comment");
});

it('renders correct price', () => {
    render(<ArticleRow price={2.99} />, container);
    expect(container.querySelectorAll('td')[2].textContent).toBe('2.99');
});

it('highlights', () => {
    const updateSelected = jest.fn();
    render(<ArticleRow id={1} selected={1} updateSelected={updateSelected} />, container);
    const row = document.querySelector('tr');
    act(() => {
        row.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(updateSelected).toHaveBeenCalledTimes(1);
    expect(container.querySelector('tr').classList.contains("selected")).toBe(true);
});