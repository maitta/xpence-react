function Article(props){
    return(
        <div class='div-dashboard-element'>
            <span class='dashboard-element'>{props.id}</span>
            <span class='dashboard-element'>{props.name}</span>
            <span class='dashboard-element-last'>{props.price}</span>
        </div>
    );
}

export default Article;