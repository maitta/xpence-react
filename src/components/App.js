import Article from './Article';
import Summary from './Summary';
import {SummaryType} from '../Services/enum.js';


function App() {

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
          <div>
            <a class="button" href="new.html">New</a>
          </div>
          <div class="button-right">
            <a class="button" href="config.html">Config</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
