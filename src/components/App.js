import React, {useState, useEffect} from 'react';
import Consumption from './Consumption.js';
import Summary from './Summary.js';
import {SummaryType, ButtonType} from '../services/Enum.js';
import Button from './Button.js';
import Add from './Add.js';
import New from './New.js';
import db from '../db/DataAccess.js';

function App() {

  const [isVisible, setVisible] = useState(false);
  const [consumptions, updateConsumptions] = useState();
  const [consTable, updateConsTable] = useState();

  useEffect(() => {
    db.getAllConsumptionsFromDb((tx, result) => {
      const cons = [];
      for(let i = 0; i < result.rows.length; i++){
        cons.push(result.rows[i]);
        console.debug(JSON.stringify(result.rows[i]));      
      }
      updateConsumptions(cons);
      updateConsTable(cons.map(x => <Consumption key={x.id} id={x.id} name={x.name} price={x.price} />))
    }); 
  }, []);


  return (
    <div>
      <div className="header-title"><label>Dashboard</label></div>
      <hr/>
      <div className="main">
        <div id="divMain">
          {consTable}
        </div>
        
        <Summary data={consumptions} type={SummaryType.SUBTOTAL}/>
        <Summary data={consumptions} type={SummaryType.PERCENTAGE}/>
        <Summary data={consumptions} type={SummaryType.TOTAL}/>
        
        <div className="button-region">
          <Button text={ButtonType.ADD} callback={() => {
            setVisible(!isVisible);
            console.log(isVisible);
          }}/>
          <Button text={ButtonType.NEW} callback={() => setVisible(!isVisible)}/>
        </div>
        <div className={isVisible ? '' : 'invisible'}>
          <Add callback={() => setVisible(!isVisible)} />
          <New callback={() => setVisible(!isVisible)} />
        </div>
      </div>
    </div>
  );
}

export default App;
