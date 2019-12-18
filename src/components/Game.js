import React, { useState, useEffect } from 'react';
/*
 *  allows user to interact with the game contract
 */
const Game = (props) => {
  const [state, setState] = useState({
    assetPrice: null, 
    winningPrediction: null,
    numOfWinners: null, 
    feeCollected: null, 
    totalPredictionPool: null,
    positions: [],
  })
  const [predictionVal, setPredictionVal] = useState(0);

  useEffect(() => {    
    console.log(props)
    console.log(state)
    let isSubscribed = true;
    const subscribeToGame = (gameContract) => {
      // subscribe turn into hooks? 
      gameContract.events.assetPriceSet({
        fromBlock: 0,
        toBlock: 'latest',
      }, (error, event) => {
        if (!error) {
          setState(state => ({
            ...state,
            assetPrice: event.returnValues.price
          }))
        }  
      })
      gameContract.events.winningPredictionSet({
        fromBlock: 0,
        toBlock: 'latest',
      }, (error, event) => {
        if (!error) {
          setState(state => ({
            ...state,
            winningPrediction: event.returnValues.prediction
          }))                                         
        }  
      })
      gameContract.events.numberOfWinners({
        fromBlock: 0,
        toBlock: 'latest',
      }, (error, event) => {
        if (!error) {
          setState(state => ({
            ...state,
            numOfWinners: event.returnValues.winners                          
          }))              
        }  
      })
      gameContract.events.feeCollected({
        fromBlock: 0,
        toBlock: 'latest',
      }, (error, event) => {
        if (!error) {
          setState(state => ({
            ...state,       
            feeCollected: event.returnValues.collected                          
          }))                    
        }  
      })
      gameContract.events.totalPredictionPool({
        fromBlock: 0,
        toBlock: 'latest',
      }, (error, event) => {
        if (!error) {
          setState(state => ({
            ...state,  
            totalPredictionPool: event.returnValues.total                          
          }))                        
        }  
      })
      gameContract.events.positionAdded({
        fromBlock: 0,
        toBlock: 'latest',
      }, (error, event) => {
        if (!error) {
          let player = event.returnValues.player
          let predictionPrice = event.returnValues.predictionPrice
          setState(state => ({
            ...state,  
            positions: [
              ...state.positions,
              {
                player: player, 
                predictionPrice: predictionPrice
              }
            ]                          
          }))                                                          
        }  
      }) 
    }    
    if (isSubscribed === true) {
      subscribeToGame(props.gameState.gameContract)
    }
    console.log(props)
    console.log(state)
    return () => isSubscribed = false;
  }, [])

  // send user prediction and staked eth
  const handlePredict = () => {
    let value = parseInt(props.gameState.predictionCost, 10)
    props.gameState.gameContract.methods.predict(predictionVal).send(
      {
        from: props.myAddress[0], 
        value: value,
        gas: 3000000
      })
      .then((err, res) => {
        if (!err) {
          console.log(res)
        } else {
          console.log(err)
        }
      })      
  }

  // claim most accurate position
  const handleClaimWinningPrediction = async() => {
    let differences = [];
    // get users positions and convert to differences    
    let numOfPositions = await props.gameState.gameContract.methods.prediction_number(props.myAddress[0]).call()
    for (let i=0; i<numOfPositions; i++) {
      let userPrediction = await props.gameState.gameContract.methods.positions(props.myAddress[0], i).call()
      differences.push((Math.abs(userPrediction - parseInt(props.gameState.assetPrice))))
    }
    // find the most accurate prediciton
    let closestPrediction = Math.min.apply(Math, differences)
    let indexOfClosestPrediction = differences.indexOf(closestPrediction)
    // call claim winning prediciton
    props.gameState.gameContract.methods.claim_winning_prediction(indexOfClosestPrediction)
      .send({
        from: props.myAddress[0]
      })
      .then((err, res) => {
        if (!err) {
          console.log(res)
        } else {
          console.log(err)
        }
      })
  }

  // collect winnings 
  const collectWinnings = () => {
    props.gameState.gameContract.methods.collect_my_winnings()
      .send({
        from: props.myAddress[0]
      })
  }
  


  return (
    <div>
      <p>game</p>
      <input type='number' min={1} value={predictionVal} onChange={(e) => setPredictionVal(e.target.value)} />
      <button onClick={() => handlePredict()}>predict</button>
      <button onClick={() => console.log(state)}>log prediction valu</button>
    </div>

  )
}

export default Game;