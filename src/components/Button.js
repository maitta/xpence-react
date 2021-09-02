import {ButtonType} from  '../Services/Enum.js';

function Button(props){

    function getCss(){
        let css;
        if(props.text === ButtonType.ADD){
            css = "button";
        }else if(props.text === ButtonType.NEW){
            css = "button button-right";
        }
        return css;
    }

    return(
        <div>
            <button className={getCss()} onClick={props.callback}>{props.text}</button>
        </div>
    );
}

export default Button;