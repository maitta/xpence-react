import React from 'react'
import {render, act} from '@testing-library/react';
import Navigation from '../components/Navigation.js'
import {createMemoryHistory} from 'history';
import {Router, MemoryRouter} from "react-router-dom";

jest.mock("../db/DataAccess", () => {
  return function DummyDb() {
    const DataAccess = (function(){
	    const dataAccess = {};   
        dataAccess.getAllConsumptionsFromDb = function(){}
        dataAccess.getAllArticlesFromDb = function(){}
        return dataAccess;
    })();
    return (
      DataAccess
    );
  };
});

it('renders dashboard page', () => {
    const history = createMemoryHistory();
    const route = '/';
    history.push(route);

    render(        
        <Router history={history}>
            <Navigation />
        </Router>, {wrapper: MemoryRouter}
    );
    expect(document.body.textContent).toContain('Dashboard');
});

it('navigates to add', () => {
    const history = createMemoryHistory();
    const route = '/';
    history.push(route);

    render(        
        <Router history={history}>
            <Navigation />
        </Router>, {wrapper: MemoryRouter}
    );
    //console.log(document.getElementsByClassName("button")[0].innerHTML)
    expect(document.getElementsByClassName("button")[0].innerHTML).toBe('add');

    act(() => {
        const addLink = document.getElementsByClassName("button")[0];
        addLink.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    //console.log(document.getElementsByTagName('input')[0].value)
    expect(document.getElementsByTagName('input')[0].value).toContain('Consume');
});

it('navigates to new', () => {
    const history = createMemoryHistory();
    const route = '/';
    history.push(route);

    render(        
        <Router history={history}>
            <Navigation />
        </Router>, {wrapper: MemoryRouter}
    );
    expect(document.getElementsByClassName("button")[1].innerHTML).toBe('new');

    act(() => {
        const newLink = document.getElementsByClassName("button")[1];
        newLink.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    //console.log(document.getElementById('input'))
    expect(document.getElementById('btnSubmit').value).toContain('Insert');
});