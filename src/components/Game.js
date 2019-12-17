import React, { useState, useEffect } from 'react';
/*
 *  allows user to interact with the game contract
 */
const Game = (props) => {
  const [predictionVal, setPredictionVal] = useState(0);

  useEffect(() => {    
    console.log(props)
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

  // 


  return (
    <div>
      <p>game</p>
      <input type='number' min={1} value={predictionVal} onChange={(e) => setPredictionVal(e.target.value)} />
      <button onClick={() => handlePredict()}>predict</button>
      <button onClick={handleClaimWinningPrediction}>log prediction valu</button>
    </div>

  )
}

export default Game;