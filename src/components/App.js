import React, {useState, useEffect} from 'react';
//Using grid.js by now import Consumption from './Consumption.js';
import Summary from './Summary.js';
import {SummaryType, ButtonType} from '../services/Enum.js';
import Button from './Button.js';
import db from '../db/DataAccess.js';
import { Grid } from 'gridjs-react';
import {Link} from "react-router-dom";

function App() {

  const [consumptions, updateConsumptions] = useState([]);
  //Using grid.js by now const [consTable, updateConsTable] = useState();

  useEffect(() => {
    db.getAllConsumptionsFromDb((tx, result) => {
      const cons = [];
      for(let i = 0; i < result.rows.length; i++){
        cons.push(result.rows[i]);
        console.debug(JSON.stringify(result.rows[i]));      
      }
      updateConsumptions(cons);
      //Using grid.js by now updateConsTable(cons.map(x => <Consumption key={x.id} id={x.id} name={x.name} price={x.price} />))
    }); 
  }, []);


  return (
    <div>
      <div className="header-title"><label>Dashboard</label></div>
      <hr/>
      <div className="main">
        <div id="divMain">
          {/*consTable will use grid library with pagination and sorting instead of custom jsx*/}
          <Grid
            data={consumptions}
            search={true}
            sort={true}
            columns={[{name: 'Id', hidden: true}, 'Name', 'Price']}
            pagination={{
              limit: 5,
            }}
          />
        </div>
        
        <Summary data={consumptions} type={SummaryType.SUBTOTAL}/>
        <Summary data={consumptions} type={SummaryType.PERCENTAGE}/>
        <Summary data={consumptions} type={SummaryType.TOTAL}/>
        
        <div className="button-region">
          <Link to="/add">
            <Button text={ButtonType.ADD} />
          </Link>
          <Link to="/new">
            <Button text={ButtonType.NEW} />
          </Link>          
        </div>
      </div>
    </div>
  );
}

export default App;
