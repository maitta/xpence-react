import React, {useState, useEffect} from 'react';
import ArticleRow from './ArticleRow.js';
import db from '../db/DataAccess.js';

function Add(props){

    const [articles, updateArticles] = useState([]);
    const [articleRows, updateArticleRows] = useState();

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
            <ArticleRow name={x.name} comment={x.comment} price={x.price} />
        ));
    }, [articles]);

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
                        <input className="button disabled" id="btnSiss" type="button" disabled value="Sissamen!"/>
                    </div>
                    <div className="button-right">
                        <button className="button" onClick={props.callback} >Back</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Add;