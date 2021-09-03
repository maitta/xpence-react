import { useState } from 'react';
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

function New(props){

    const [name, updateName] = useState('');
    const [price, updatePrice] = useState('');
    const [comment, updateComment] = useState('');
    const [showWarnings, updateShowWarnings] = useState('');

    let history = useHistory();    
    let back = e => {
        e.stopPropagation();
        //history.goBack(); it bounces back to '/new?'
        history.push("/");
    };

    function handleInsert(e){
        e.preventDefault();
        if(isInputOk()){
            db.insertArticleToDb(name, price, comment);
            updateName('');
            updatePrice('');
            updateComment('');
        }     
        else{
            updateShowWarnings(!showWarnings);
        }   
    }

    function isInputOk(){
        if(name !== '' && price > 0 && comment !== '') return true;
        else return false;
    }

    function handleNameChange(e){
        updateName(e.target.value); 
    }
    function handlePriceChange(e){
        updatePrice(e.target.value); 
    }
    function handleCommentChange(e){
        updateComment(e.target.value);        
    }

    return(
        <form className="main">
            <div className="header-title"><label>Insert Article</label></div>                    
            <div className="form-group">
                <label htmlFor="txtItem">Name:</label>
                <input id="txtItem" type="textbox" className="form-control text-box" 
                    value={name} onChange={handleNameChange} maxLength="50"/>
            </div>
            <div className="form-group">
                <label htmlFor="txtPrice">Price:</label>
                <input id="txtPrice" className="form-control price-box"
                    value={price} onChange={handlePriceChange} type="number" min="5"/>
            </div>
            <div className="form-group">
                <label htmlFor="txtComment">Comment:</label>
                <textarea id="txtComment" type="textbox" className="form-control text-box"
                    value={comment} onChange={handleCommentChange}></textarea>
            </div>
            <div className="button-region">
                <div>
                    <input className={"button " + (!isInputOk() ? "disabled" : '')} id="btnSubmit" 
                    type="button"  value="Insert" onClick={handleInsert} maxLength="250"/>
                </div>
                <div className="button-right">
                    <button className="button" onClick={back}>Back</button>
                </div>
            </div>
        </form>
    );
}
export default New;