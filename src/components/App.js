import React, {useState} from 'react';
import Article from './Article';
import Summary from './Summary';
import {SummaryType, ButtonType} from '../Services/Enum.js';
import Button from './Button.js';
import Add from './Add.js';
import New from './New.js';


function App() {

  const [isVisible, setVisible] = useState(false);

  const testData = [
    {id: 1, name: 'item1', price: 2.5},
    {id: 2, name: 'item2', price: 1},
    {id: 3, name: 'item3', price: 3.5}
  ];

  function getElements(){
    return testData.map(x => 
      <Article id={x.id} name={x.name} price={x.price} />
    );
  }

  return (
    <div>
      <div class="header-title"><label>Dashboard</label></div>
      <hr/>
      <div class="main">
        <div id="divMain">
          {getElements()}
        </div>
        
        <Summary testData={testData} type={SummaryType.SUBTOTAL}/>
        <Summary testData={testData} type={SummaryType.PERCENTAGE}/>
        <Summary testData={testData} type={SummaryType.TOTAL}/>
        
        <div class="button-region">
          <Button text={ButtonType.ADD} callback={() => {
            setVisible(!isVisible);
            console.log(isVisible);
          }}/>
          <Button text={ButtonType.NEW} callback={() => setVisible(!isVisible)}/>
        </div>
        <div class={isVisible ? '' : 'invisible'}>
          <Add callback={() => setVisible(!isVisible)} />
          <New callback={() => setVisible(!isVisible)} />
        </div>
      </div>
    </div>
  );
}

export default App;