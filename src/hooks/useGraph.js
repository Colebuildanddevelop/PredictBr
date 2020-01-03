import React, { useEffect, useState } from 'react';

export const useGraph = (contractData) => {
  const [state, setState] = useState({
    isLoading: true,
    productData: null
  });

  useEffect(() => {
    const getGraphData = async() => {
      const response = await fetch(contractData.apiUrl);
      const myJson = await response.json();
      let updatedArr = [] 
      let maxTenDays = 0;
      Object.entries(myJson[contractData.timeSeriesKey]).forEach((entry) => {
        if (maxTenDays <= 10) {
          updatedArr.push({
            x: new Date(entry[0]),  
            open: entry[1][contractData.OHLCKeys.open], 
            high: entry[1][contractData.OHLCKeys.high],
            low: entry[1][contractData.OHLCKeys.low],
            close: entry[1][contractData.OHLCKeys.close],  
          });
          maxTenDays += 1;
        }
      })
      setState({
        isLoading: false,
        productData: updatedArr,
      })
      console.log('usegraph')
    }
    getGraphData();
  }, [])  

  return state.productData;

}


