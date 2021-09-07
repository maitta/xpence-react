function ArticleRow(props){

    function handleClick(id){
        console.log(props.id)
        console.log(props.selected)
        props.updateSelected(id);        
    }
    return(
        <tr className={props.selected === props.id ? "selected" : ""} onClick={() => handleClick(props.id)}>
            <td>{props.name}</td>
            <td>{props.comment}</td>
            <td>{props.price}</td>
        </tr>
    );
}

export default ArticleRow;