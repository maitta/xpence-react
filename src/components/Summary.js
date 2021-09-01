import {SummaryType} from '../Services/Enum.js';

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
        return props.testData.reduce((x, y) => x + y.price, 0);
    }

    function getTotal(){        
        return total;
    }

    function getPercentage(){
        return (getSubTotal() / total).toFixed(3) + '%';
    }

    return(
        <div class="div-aggregate">
          <label>{props.type}</label>
          <span class="totals">{calculate()}</span>
        </div>
    );
}

export default Summary;