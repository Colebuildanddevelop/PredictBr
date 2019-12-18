import React from 'react';
import Graph from './Graph';
import SampleGraph from './SampleGraph'
import { Link } from 'react-router-dom';

const ProductSelection = () => {
  return (
    <div>
      <ul>
        <Link to='/SPY'>
          <p>sp 500</p>  
        </Link>
        <Link to='/GLD'>
          <p>gold</p>  
        </Link>
        <Link to='/USO'>
          <p>USO</p>  
        </Link>
        <Link to='/ETH'>
          <p>ethereum</p>  
        </Link>                  
      </ul>
    </div>  
  )
}

export default ProductSelection;