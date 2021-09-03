import React, {useState, useEffect} from 'react';
import ArticleRow from './ArticleRow.js';
import db from '../db/DataAccess.js';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory,
    useLocation,
    useParams
  } from "react-router-dom";

function Add(props){

    const [articles, updateArticles] = useState([]);
    const [articleRows, updateArticleRows] = useState();
    const [selected, updateSelected] = useState();

    let history = useHistory();    
    let back = e => {
        e.stopPropagation();
        history.goBack();
    };

    useEffect(() => {
        db.getAllArticlesFromDb((tx, result) => {                           
            const articleCol = [];           
            const res = result.rows;
            for (var i=0; i < res.length; i++) {
                articleCol.push(res[i]);
            }                
            updateArticles(articleCol);
        })
    }, []);

    useEffect(() => {
        console.debug(articles);
        updateArticleRows(articles.map(x =>
            <ArticleRow key={x.id} id={x.id} name={x.name} comment={x.comment} price={x.price} 
                updateSelected={updateSelected} selected={selected}/>
        ));
    }, [articles, selected]);

    function handleClick(){
        db.insertConsumptionToDb(selected);
    }

    function isDisabled(){
        if(selected === undefined) return true;
    }

    return(
        <div>
            <div className="header-title"><label>Select an item:</label></div>
            <hr/>
            <div className="main">
                <table id="tblItems">
                    <tbody>
                        <tr>
                            <th>Item</th>					
                            <th>Description</th>
                            <th>Price</th>                        
                        </tr>
                        {articleRows}
                    </tbody>
                </table>
                <br/>
                <div className="button-region">
                    <div>
                        <input className={"button " + (isDisabled() ? "disabled" : '')} id="btnSiss" type="button" 
                        disabled={isDisabled()} value="Sissamen!" onClick={handleClick}/>
                    </div>
                    <div className="button-right">
                        <button className="button" onClick={back}>Back</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Add;