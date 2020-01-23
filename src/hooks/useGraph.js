import React, { useEffect, useState } from 'react';

/**
 * @desc used to get data from the given contracts price api
 * @param Object contractData 
 * @returns price data formatted for candlesticks
 */
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
    }
    getGraphData();
  }, [])  

  return state.productData;

}


