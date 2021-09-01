function Add(props){
    return(
        <div>
            <div class="header-title"><label>Select an item:</label></div>
            <hr/>
            <div class="main">
                <table id="tblItems">
                    <tbody>
                        <tr>
                            <th>Item</th>					
                            <th>Description</th>
                            <th>Price</th>
                        </tr>
                    </tbody>			
                </table>
                <br/>
                <div class="button-region">
                    <div>
                        <input class="button disabled" id="btnSiss" type="button" disabled value="Sissamen!"/>
                    </div>
                    <div class="button-right">
                        <a class="button" onClick={props.callback} >Back</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Add;