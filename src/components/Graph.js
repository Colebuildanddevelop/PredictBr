import React, { useEffect, useState } from 'react';
import { VictoryCandlestick, VictoryLabel, Line, VictoryZoomContainer, VictoryChart, VictoryAxis, VictoryTheme, VictoryTooltip, createContainer, VictoryCursorContainer } from 'victory';

const Graph = (props) => {

  return (
    <React.Fragment >
      <VictoryChart
        containerComponent={
          <VictoryCursorContainer
            style={{
              cursorlabel: {
                stroke: 'white'
              }
            }}
            cursorComponent={<Line style={{ stroke: "white" }}/>}
            cursorLabelComponent={<VictoryLabel style={{ fill: 'white'}}/>}
            cursorLabel={({ datum }) => `${datum.x.getMonth()+1}/${datum.x.getDay()}, ${Math.round(datum.y, 2)}`}
          />
        }
        theme={VictoryTheme.material}
        domainPadding={{ x: 10 }}
        scale={{ x: "time" }}
      >
        <VictoryAxis
          tickCount={2} 
          style={{
            tickLabels: {fontSize: 15, padding: 0},
            axis: {
              stroke: 'white'
            },
            grid: {
              stroke: 'grey'
            },
            tickLabels: {
              fill: '#f9fbe7'
            },
            ticks: {
              fill: 'white'
            }      
          }} 
          tickFormat={(t) => `${t.getMonth()+1}/${t.getDate()}`}
        />
        <VictoryAxis            
          dependentAxis 
          tickCount={5} 
          style={{
            axis: {
              stroke: 'white'
            },
            grid: {
              stroke: 'grey'
            },
            tickLabels: {
              fill: '#f9fbe7'
            },
            ticks: {
              fill: 'white'
            } 
          }}
        />  
        <VictoryCandlestick
          data={props.productData}        
          style={{
            labels: {
              fontSize: 5,
              color: 'white'
            },
            data: {
              stroke: 'white'
            }
          }}   
          candleColors={{
            positive: '#00e676',
            negative: 'red'
          }}
          labelComponent={
            <VictoryTooltip
              flyoutWidth={60}
              flyoutHeight={30}
              pointerWidth={5}                
            />
          }
        />        
      </VictoryChart>
    </React.Fragment>  
  )
}

export default Graph; 