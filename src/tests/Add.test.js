// TODO enzyme can update a component's state from the test but it is not compatible 
// yet with react 17. When it is, populate the table and test for completeness, 
// highlights on click & consume click. https://github.com/enzymejs/enzyme/issues/2462

import { render, unmountComponentAtNode } from "react-dom";
import {render as tRender, act} from '@testing-library/react';
import Add from '../components/Add.js';
import {createMemoryHistory} from 'history';
import {Route, Router, MemoryRouter} from "react-router-dom";
import App from '../components/App.js';

jest.mock('../db/DataAccess', () => {
    return function DummyDb() {
        const DataAccess = (function(){
            const dataAccess = {};
            dataAccess.getAllConsumptionsFromDb = function(){}
            dataAccess.getAllArticlesFromDb = function(){
                return [{}, {}, {}];
            }
            return dataAccess;
        })();
        return (
          DataAccess
        );
    };
})

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

it('renders the table', () => {
    render(<Add />, container);
    expect(container.getElementsByTagName('th')[0].innerHTML).toBe('Item');
    expect(container.getElementsByTagName('th')[1].innerHTML).toBe('Description');
    expect(container.getElementsByTagName('th')[2].innerHTML).toBe('Price');
});

it('renders the buttons', () => {
    render(<Add />, container);
    expect(container.getElementsByTagName('button').length +
        container.getElementsByTagName('input').length).toBe(2);
});

it('navigates back on click', () => {
  const history = createMemoryHistory();
  const route = '/add';
  history.push(route);
  tRender(
      <Router history={history}>
          <Route path="/add" children={<Add />} />
          <Route path="/" children={<App />} />
      </Router>, {wrapper: MemoryRouter});
  expect(document.getElementsByClassName("button")[1].innerHTML).toBe('Back');
  act(() => {
      const backLink = document.getElementsByClassName("button")[1];
      backLink.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  expect(document.body.textContent).toContain('Dashboard');
});