import React, { useEffect, useState } from 'react';

export const useSubscribeContractEvents = (contractRef) => {
  const [eventState, setEventState] = useState()

  useEffect(() => {
      
  })



        // subscribe turn into hooks? 
        gameContract.events.assetPriceSet({
            fromBlock: 0,
            toBlock: 'latest',
          }, (error, event) => {
            if (!error) {
              setState(state => ({
                ...state,
                games: {
                  ...state.games,
                  [gameAddress]: {
                    ...state.games[gameAddress],
                    assetPrice: event.returnValues.price
                  }
                }
              }))  
            }  
          })  
}