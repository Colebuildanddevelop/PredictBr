import React, { useEffect, useState } from 'react';
import { VictoryCandlestick, VictoryChart, VictoryAxis, VictoryTheme, VictoryTooltip } from 'victory';


const Graph = (props) => {

  const [state, setState] = useState({
    isLoading: true,
    productData: null  
  })  

  useEffect(() => {
    const getData = async() => {
      const response = await fetch(props.product);
      const myJson = await response.json();
      let updatedArr = [] 
      Object.entries(myJson[props.timeSeriesKey]).forEach((entry) => {
        updatedArr.push({
          x: new Date(entry[0]),  
          open: entry[1][props.OHLCKeys.open], 
          high: entry[1][props.OHLCKeys.high],
          low: entry[1][props.OHLCKeys.low],
          close: entry[1][props.OHLCKeys.close],  
        });
      })
  
      setState({
        isLoading: false,
        productData: updatedArr,
      })
      console.log(updatedArr)
    }
    getData();
  }, [])

  if (state.isLoading !== true) { 
    return (
      <div style={{padding: 50}}>

        <VictoryChart
          theme={VictoryTheme.material}
          domainPadding={{ x: 25 }}
          scale={{ x: "time" }}
        >
          <VictoryAxis tickCount={12} style={{tickLabels: {fontSize: 6, padding: 5}}} tickFormat={(t) => `${t.getMonth()}/${t.getDate()}`}/>
          <VictoryAxis dependentAxis tickCount={20} style={{tickLabels: {fontSize: 5, padding: 5}}}/>  
          <VictoryCandlestick
            candleColors={{ positive: "#5f5c5b", negative: "#c43a31" }}
            data={state.productData}        
            style={{labels: {fontSize: 5}}}
            labels={({ datum }) => {
              return (                                
                `${datum.x.getMonth()}/${datum.x.getDate()}
                open: ${datum.open}
                high: ${datum.high}
                low: ${datum.low} 
                close: ${datum.close}`                
              )
            }}          
            labelComponent={
              <VictoryTooltip
                flyoutWidth={60}
                flyoutHeight={30}
                pointerWidth={5}                
              />
            }
            events={[{
              target: "data",
              eventHandlers: {
                onMouseOver: () => ({
                  target: "labels", mutation: () => ({ active: true })
                }),
                onMouseOut: () => ({
                  target: "labels", mutation: () => ({ active: false })
                })
              }
            }]}
          />        
        </VictoryChart>
      </div>  
    )
  } else {
    return (<p>loading graph</p>)  
  }

}

export default Graph; 