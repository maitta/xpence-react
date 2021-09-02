function Consumption(props){
    return(
        <div className='div-dashboard-element'>
            <span className='dashboard-element'>{props.id}</span>
            <span className='dashboard-element'>{props.name}</span>
            <span className='dashboard-element-last'>{props.price}</span>
        </div>
    );
}

export default Consumption;