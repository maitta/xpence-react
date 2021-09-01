import { useState } from 'react';
import db from '../db/DataAccess.js';

function New(props){

    const [name, updateName] = useState('');
    const [price, updatePrice] = useState('');
    const [comment, updateComment] = useState('');
    const [showWarnings, updateShowWarnings] = useState('');

    function handleInsert(e){
        e.preventDefault();
        if(canValidate()){
            db.insertItemToDb(name, price, comment);
            updateName('');
            updatePrice('');
            updateComment('');
        }     
        else{
            updateShowWarnings(!showWarnings);
        }   
    }

    function canValidate(){
        // TODO
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
        <form role="form" class="main">
            <div class="header-title"><label>Insert Article</label></div>                    
            <div class="form-group">
                <label for="txtItem">Name:</label>
                <input class="form-control" id="txtItem" type="textbox" class="text-box" 
                    value={name} onChange={handleNameChange} maxlength="50"/>
            </div>
            <div class="form-group">
                <label for="txtPrice">Price:</label>
                <input class="form-control" id="txtPrice" type="textbox" class="price-box"
                    value={price} onChange={handlePriceChange} type="number" min="5"/>
            </div>
            <div class="form-group">
                <label for="txtComment">Comment:</label>
                <textarea class="form-control" id="txtComment" type="textbox" class="text-box"
                    value={comment} onChange={handleCommentChange}></textarea>
            </div>
            <div class="button-region">
                <div>
                    <input class={"button " + (!isInputOk() ? "disabled" : '')} id="btnSubmit" type="button"
                    value="Insert" onClick={handleInsert} maxlength="250"/>
                </div>
                <div class="button-right">
                    <a class="button" onClick={props.callback}>Back</a>
                </div>
            </div>
        </form>
    );
}
export default New;