import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { render, act } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Route, Router, MemoryRouter } from "react-router-dom";
import pretty from "pretty";

import App from "../components/App.js";

jest.mock("../db/DataAccess", () => {
  return function DummyDb() {
    const DataAccess = (function () {
      const dataAccess = {};
      dataAccess.getAllConsumptionsFromDb = function () {};
      return dataAccess;
    })();
    return DataAccess;
  };
});

it("should render the dashboard", () => {
  const history = createMemoryHistory();
  const route = "/";
  history.push(route);
  act(() => {
    render(
      <Router history={history}>
        <Route path="/" children={<App />} />
      </Router>,
      { wrapper: MemoryRouter }
    );
  });

  expect(pretty(document.body.innerHTML)).toMatchInlineSnapshot(`
    "<div>
      <div>
        <div class=\\"header-title\\"><label>Dashboard</label></div>
        <hr>
        <div class=\\"main\\">
          <div id=\\"divMain\\">
            <div>
              <div role=\\"complementary\\" class=\\"gridjs gridjs-container gridjs-loading\\" style=\\"width: 100%;\\">
                <div class=\\"gridjs-loading-bar\\"></div>
                <div class=\\"gridjs-head\\">
                  <div class=\\"gridjs-search\\"><input type=\\"search\\" placeholder=\\"Type a keyword...\\" aria-label=\\"Type a keyword...\\" class=\\"gridjs-input gridjs-search-input\\"></div>
                </div>
                <div class=\\"gridjs-wrapper\\" style=\\"height: auto;\\">
                  <table role=\\"grid\\" class=\\"gridjs-table\\" style=\\"height: auto;\\">
                    <thead class=\\"gridjs-thead\\">
                      <tr class=\\"gridjs-tr\\">
                        <th data-column-id=\\"name\\" class=\\"gridjs-th gridjs-th-sort\\" tabindex=\\"0\\">
                          <div class=\\"gridjs-th-content\\">Name</div><button tabindex=\\"-1\\" aria-label=\\"Sort column ascending\\" title=\\"Sort column ascending\\" class=\\"gridjs-sort gridjs-sort-neutral\\"></button>
                        </th>
                        <th data-column-id=\\"price\\" class=\\"gridjs-th gridjs-th-sort\\" tabindex=\\"0\\">
                          <div class=\\"gridjs-th-content\\">Price</div><button tabindex=\\"-1\\" aria-label=\\"Sort column ascending\\" title=\\"Sort column ascending\\" class=\\"gridjs-sort gridjs-sort-neutral\\"></button>
                        </th>
                      </tr>
                    </thead>
                    <tbody class=\\"gridjs-tbody\\">
                      <tr class=\\"gridjs-tr\\">
                        <td role=\\"alert\\" colspan=\\"2\\" class=\\"gridjs-td gridjs-message gridjs-loading\\">Loading...</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class=\\"gridjs-footer\\">
                  <div class=\\"gridjs-pagination\\">
                    <div class=\\"gridjs-pages\\"><button tabindex=\\"0\\" role=\\"button\\" disabled=\\"\\" title=\\"Previous\\" aria-label=\\"Previous\\" class=\\"\\">Previous</button><button tabindex=\\"0\\" role=\\"button\\" disabled=\\"\\" title=\\"Next\\" aria-label=\\"Next\\" class=\\"\\">Next</button></div>
                  </div>
                </div>
                <div id=\\"gridjs-temp\\" class=\\"gridjs-temp\\"></div>
              </div>
            </div>
          </div>
          <div class=\\"div-aggregate\\"><label>SubTotal</label><span class=\\"totals\\">0.000</span></div>
          <div class=\\"div-aggregate\\"><label>Percentage</label><span class=\\"totals\\">0.000%</span></div>
          <div class=\\"div-aggregate\\"><label>Total</label><span class=\\"totals\\">420</span></div>
          <div class=\\"button-region\\"><a href=\\"/add\\">
              <div><button class=\\"button\\">add</button></div>
            </a><a href=\\"/new\\">
              <div><button class=\\"button button-right\\">new</button></div>
            </a></div>
        </div>
      </div>
    </div>"
  `);
});
