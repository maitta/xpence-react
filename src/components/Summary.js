import {SummaryType} from '../services/Enum.js';

function Summary(props){

    const total = 420;

    function calculate(){
        let total;
        switch(props.type){
            case SummaryType.SUBTOTAL:
                total = getSubTotal();
                break;
            case SummaryType.PERCENTAGE:
                total = getPercentage();
                break;
            case SummaryType.TOTAL:
                total = getTotal();
                break;
            default:
                total = 'error';
        }
        return total;
    }

    function getSubTotal(){
        if(props.data) return props.data.reduce((x, y) => (x + y.price), 0).toFixed(3);
    }

    function getTotal(){        
        return total;
    }

    function getPercentage(){
        return (getSubTotal() / total).toFixed(3) + '%';
    }

    return(
        <div className="div-aggregate">
          <label>{props.type}</label>
          <span className="totals">{calculate()}</span>
        </div>
    );
}

export default Summary;