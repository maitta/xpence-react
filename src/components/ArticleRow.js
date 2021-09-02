import React, {useState} from 'react';
import db from '../db/DataAccess.js';

function ArticleRow(props){
    return(
        <tr>
            <td>{props.name}</td>
            <td>{props.comment}</td>
            <td>{props.price}</td>
        </tr>
    );
}

export default ArticleRow;