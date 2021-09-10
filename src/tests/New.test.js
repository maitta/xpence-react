import {render, unmountComponentAtNode} from "react-dom";
import {render as tRender, act} from '@testing-library/react';
import New from '../components/New.js';
import App from '../components/App.js';
import {createMemoryHistory} from 'history';
import {Route, Router, MemoryRouter} from "react-router-dom";

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

jest.mock("../db/DataAccess", () => {
    return function DummyDb() {
      const DataAccess = (function(){
          const dataAccess = {};   
          dataAccess.getAllConsumptionsFromDb = function(){}
          return dataAccess;
      })();
      return (
        DataAccess
      );
    };
});

it('renders the inputs', () => {
    render(<New />, container);
    expect(container.getElementsByTagName('input').length).toBe(3);
});

it('navigates back on click', () => {
    const history = createMemoryHistory();
    const route = '/new';
    history.push(route);
    tRender(
        <Router history={history}>
            <Route path="/new" children={<New />} />
            <Route path="/" children={<App />} />
        </Router>, {wrapper: MemoryRouter});
    expect(document.getElementsByClassName("button")[1].innerHTML).toBe('Back');
    act(() => {
        const backLink = document.getElementsByClassName("button")[1];
        backLink.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    //console.log(document.body.textContent)
    expect(document.body.textContent).toContain('Dashboard');
});
