import React, { useEffect, useState } from 'react';
import { VictoryCandlestick, VictoryZoomContainer, VictoryChart, VictoryAxis, VictoryTheme, VictoryTooltip, createContainer, VictoryCursorContainer } from 'victory';


const Graph = (props) => {


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
            data={props.productData}        
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

}

export default Graph; 