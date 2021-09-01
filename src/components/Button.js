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
            <a class={getCss()} onClick={props.callback}>{props.text}</a>
        </div>
    );
}

export default Button;