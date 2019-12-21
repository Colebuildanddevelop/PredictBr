import React, { useEffect, useState } from 'react';
import { VictoryCandlestick, VictoryZoomContainer, VictoryChart, VictoryAxis, VictoryTheme, VictoryTooltip, createContainer, VictoryCursorContainer } from 'victory';


const Graph = (props) => {
  const CustomContainer = createContainer('voronoi', 'cursor')

  const [state, setState] = useState({
    isLoading: true,
    productData: null  
  })  

  useEffect(() => {
    const getData = async() => {
      const response = await fetch(props.product);
      const myJson = await response.json();
      let updatedArr = [] 
      let maxTenDays = 0;
      Object.entries(myJson[props.timeSeriesKey]).forEach((entry) => {
        if (maxTenDays <= 10) {
          updatedArr.push({
            x: new Date(entry[0]),  
            open: entry[1][props.OHLCKeys.open], 
            high: entry[1][props.OHLCKeys.high],
            low: entry[1][props.OHLCKeys.low],
            close: entry[1][props.OHLCKeys.close],  
          });
          maxTenDays += 1;
        }
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
      <div style={{padding: 0}}>

        <VictoryChart
          containerComponent={
            <VictoryCursorContainer
              cursorLabel={({ datum }) => `${datum.x.getMonth()}/${datum.x.getDay()}, ${Math.round(datum.y, 2)}`}
            />
          }
          theme={VictoryTheme.material}
          domainPadding={{ x: 0 }}
          scale={{ x: "time" }}
        >
          <VictoryAxis tickCount={2} style={{tickLabels: {fontSize: 20, padding: 0}}} tickFormat={(t) => `${t.getMonth()}/${t.getDate()}`}/>
          <VictoryAxis dependentAxis tickCount={5} style={{tickLabels: {fontSize: 20, padding: 0}}}/>  
          <VictoryCandlestick
            candleColors={{ positive: "#5f5c5b", negative: "#c43a31" }}
            data={state.productData}        
            style={{labels: {fontSize: 5}}}
      
            labelComponent={
              <VictoryTooltip
                flyoutWidth={60}
                flyoutHeight={30}
                pointerWidth={5}                
              />
            }
  
          />        
        </VictoryChart>
      </div>  
    )
  } else {
    return (<p>loading graph</p>)  
  }

}

export default Graph; 