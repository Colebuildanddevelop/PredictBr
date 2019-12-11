import React from 'react';
import Graph from './Graph';
import SampleGraph from './SampleGraph'

const ProductSelection = () => {
  return (
    <div>
      <ul>
        <li>
          <p>sp 500</p>  
        </li>
        <li>
          <p>gold</p>  
        </li>
        <li>
          <p>oil</p>  
        </li>
        <li>
          <p>ethereum</p>  
        </li>                  
      </ul>
      <Graph product='https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=SPY&apikey=MFZK4WADD8FSBHVF'/>
    </div>  
  )
}

export default ProductSelection;