import React, {useEffect, useState} from 'react';

// WEB 3
import { withWeb3 } from 'react-web3-provider';

// gets a list of all availible and expired games
const Gamelist = (props) => {
  const { web3 } = props;  

  const [state, setState] = useState({
    isLoading: true,
  })  

  const handleCountdown = (address, countdown, duration, countdownName, isOverMessage) => {
    countdown = setInterval(function() {  
      // Get today's date and time
      let now = new Date().getTime();
      let durationDated = new Date(duration * 1000)
      // Find the distance between now and the count down date
      let distance = durationDated - now;
      // Time calculations for days, hours, minutes and seconds
      let days = Math.floor(distance / (1000 * 60 * 60 * 24));
      let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);
      let timeLeft = days + "d " + hours + "h " + minutes + "m " + seconds + "s "; 
  
      setState(state => ({
        ...state,
        [address]: {
          ...state[address],
          [countdownName]: timeLeft 
        }    
      }))
      
      // If the count down is finished
      if (distance < 0) {
        clearInterval(countdown);
        setState(state => ({
          ...state,
          [address]: {
            ...state[address],
            [countdownName]: isOverMessage
          }    
        }))            
      }

    }, 1000);      

  }

  useEffect(() => {
    const factoryAddress = '0x58D902c26f34e6D20a1f29223E5916c64e23FEdF';
    const factoryContract = new web3.eth.Contract([
          {
              "constant": false,
              "inputs": [
                  {
                      "name": "_name",
                      "type": "string"
                  },
                  {
                      "name": "_asset",
                      "type": "string"
                  },
                  {
                      "name": "_prediction_cost",
                      "type": "uint256"
                  },
                  {
                      "name": "time_to_start_minutes",
                      "type": "uint256"
                  },
                  {
                      "name": "duration_minutes",
                      "type": "uint256"
                  }
              ],
              "name": "createToken",
              "outputs": [
                  {
                      "name": "tokenAddress",
                      "type": "address"
                  }
              ],
              "payable": false,
              "stateMutability": "nonpayable",
              "type": "function"
          },
          {
              "anonymous": false,
              "inputs": [
                  {
                      "indexed": false,
                      "name": "newAddress",
                      "type": "address"
                  }
              ],
              "name": "contractCreated",
              "type": "event"
          }
    ], factoryAddress);
    const gameAbi = [
          {
              "constant": true,
              "inputs": [
                  {
                      "name": "",
                      "type": "address"
                  }
              ],
              "name": "prediction_number",
              "outputs": [
                  {
                      "name": "",
                      "type": "uint256"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": true,
              "inputs": [],
              "name": "name",
              "outputs": [
                  {
                      "name": "",
                      "type": "string"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": true,
              "inputs": [],
              "name": "competition_duration",
              "outputs": [
                  {
                      "name": "",
                      "type": "uint256"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": false,
              "inputs": [],
              "name": "collect_fees",
              "outputs": [],
              "payable": false,
              "stateMutability": "nonpayable",
              "type": "function"
          },
          {
              "constant": false,
              "inputs": [],
              "name": "collect_my_winnings",
              "outputs": [],
              "payable": false,
              "stateMutability": "nonpayable",
              "type": "function"
          },
          {
              "constant": false,
              "inputs": [],
              "name": "the_game_broke",
              "outputs": [],
              "payable": false,
              "stateMutability": "nonpayable",
              "type": "function"
          },
          {
              "constant": false,
              "inputs": [
                  {
                      "name": "myid",
                      "type": "bytes32"
                  },
                  {
                      "name": "result",
                      "type": "string"
                  }
              ],
              "name": "__callback",
              "outputs": [],
              "payable": false,
              "stateMutability": "nonpayable",
              "type": "function"
          },
          {
              "constant": false,
              "inputs": [
                  {
                      "name": "_myid",
                      "type": "bytes32"
                  },
                  {
                      "name": "_result",
                      "type": "string"
                  },
                  {
                      "name": "_proof",
                      "type": "bytes"
                  }
              ],
              "name": "__callback",
              "outputs": [],
              "payable": false,
              "stateMutability": "nonpayable",
              "type": "function"
          },
          {
              "constant": true,
              "inputs": [],
              "name": "asset",
              "outputs": [
                  {
                      "name": "",
                      "type": "string"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": false,
              "inputs": [
                  {
                      "name": "pos_number",
                      "type": "uint256"
                  }
              ],
              "name": "claim_winning_prediction",
              "outputs": [],
              "payable": false,
              "stateMutability": "nonpayable",
              "type": "function"
          },
          {
              "constant": true,
              "inputs": [],
              "name": "price_has_settled",
              "outputs": [
                  {
                      "name": "",
                      "type": "bool"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": false,
              "inputs": [
                  {
                      "name": "_prediction_price",
                      "type": "uint256"
                  }
              ],
              "name": "predict",
              "outputs": [],
              "payable": true,
              "stateMutability": "payable",
              "type": "function"
          },
          {
              "constant": true,
              "inputs": [],
              "name": "fee_collected",
              "outputs": [
                  {
                      "name": "",
                      "type": "bool"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": true,
              "inputs": [],
              "name": "winning_prediction",
              "outputs": [
                  {
                      "name": "",
                      "type": "uint256"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": true,
              "inputs": [
                  {
                      "name": "",
                      "type": "address"
                  }
              ],
              "name": "predicted_price",
              "outputs": [
                  {
                      "name": "",
                      "type": "uint256"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": true,
              "inputs": [],
              "name": "winners",
              "outputs": [
                  {
                      "name": "",
                      "type": "uint256"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": true,
              "inputs": [
                  {
                      "name": "",
                      "type": "address"
                  }
              ],
              "name": "player_has_withdrew",
              "outputs": [
                  {
                      "name": "",
                      "type": "bool"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": true,
              "inputs": [],
              "name": "resolution_period",
              "outputs": [
                  {
                      "name": "",
                      "type": "uint256"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": true,
              "inputs": [
                  {
                      "name": "",
                      "type": "address"
                  },
                  {
                      "name": "",
                      "type": "uint256"
                  }
              ],
              "name": "positions",
              "outputs": [
                  {
                      "name": "",
                      "type": "uint256"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": true,
              "inputs": [],
              "name": "price_prediction_period",
              "outputs": [
                  {
                      "name": "",
                      "type": "uint256"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": true,
              "inputs": [],
              "name": "winning_distance",
              "outputs": [
                  {
                      "name": "",
                      "type": "uint256"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": true,
              "inputs": [
                  {
                      "name": "",
                      "type": "address"
                  }
              ],
              "name": "players_total_stake",
              "outputs": [
                  {
                      "name": "",
                      "type": "uint256"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": true,
              "inputs": [],
              "name": "assetPrice",
              "outputs": [
                  {
                      "name": "",
                      "type": "string"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": false,
              "inputs": [],
              "name": "withdraw_fees",
              "outputs": [],
              "payable": false,
              "stateMutability": "nonpayable",
              "type": "function"
          },
          {
              "constant": true,
              "inputs": [],
              "name": "cost_to_predict",
              "outputs": [
                  {
                      "name": "",
                      "type": "uint256"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": true,
              "inputs": [
                  {
                      "name": "",
                      "type": "address"
                  }
              ],
              "name": "balance",
              "outputs": [
                  {
                      "name": "",
                      "type": "uint256"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": true,
              "inputs": [],
              "name": "total_prediction_stake_pool",
              "outputs": [
                  {
                      "name": "",
                      "type": "uint256"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": true,
              "inputs": [],
              "name": "test",
              "outputs": [
                  {
                      "name": "",
                      "type": "uint256"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "inputs": [
                  {
                      "name": "_name",
                      "type": "string"
                  },
                  {
                      "name": "_asset",
                      "type": "string"
                  },
                  {
                      "name": "prediction_cost",
                      "type": "uint256"
                  },
                  {
                      "name": "time_to_start_minutes",
                      "type": "uint256"
                  },
                  {
                      "name": "duration_minutes",
                      "type": "uint256"
                  },
                  {
                      "name": "_creator",
                      "type": "address"
                  }
              ],
              "payable": false,
              "stateMutability": "nonpayable",
              "type": "constructor"
          },
          {
              "payable": true,
              "stateMutability": "payable",
              "type": "fallback"
          },
          {
              "anonymous": false,
              "inputs": [
                  {
                      "indexed": false,
                      "name": "price",
                      "type": "string"
                  }
              ],
              "name": "assetPriceSet",
              "type": "event"
          },
          {
              "anonymous": false,
              "inputs": [
                  {
                      "indexed": false,
                      "name": "prediction",
                      "type": "uint256"
                  }
              ],
              "name": "winningPredictionSet",
              "type": "event"
          },
          {
              "anonymous": false,
              "inputs": [
                  {
                      "indexed": false,
                      "name": "winners",
                      "type": "uint256"
                  }
              ],
              "name": "numberOfWinners",
              "type": "event"
          },
          {
              "anonymous": false,
              "inputs": [
                  {
                      "indexed": false,
                      "name": "collected",
                      "type": "bool"
                  }
              ],
              "name": "feeCollected",
              "type": "event"
          },
          {
              "anonymous": false,
              "inputs": [
                  {
                      "indexed": false,
                      "name": "total",
                      "type": "uint256"
                  }
              ],
              "name": "totalPredictionPool",
              "type": "event"
          },
          {
              "anonymous": false,
              "inputs": [
                  {
                      "indexed": false,
                      "name": "player",
                      "type": "address"
                  },
                  {
                      "indexed": false,
                      "name": "predictionPrice",
                      "type": "uint256"
                  }
              ],
              "name": "positionAdded",
              "type": "event"
          }
    ];

    // get user address
    web3.eth.getAccounts()
      .then((addr) => {
        // set user address 
        setState(state => ({
          ...state,
          myAddress: addr 
        }))
      })

    // retrieve all games created
    factoryContract.events.contractCreated({
      fromBlock: 0,
      toBlock: 'latest',
    }, (error, event) => {
      if (!error) {
        /***
         * forEach game
         * - subscribe to all game data
         * - initilize control for the game
         ***/  

        // init game contract
        let gameAddress = event.returnValues.newAddress;
        let gameContract = new web3.eth.Contract(gameAbi, gameAddress)
        
        setState(state => ({
          ...state,  
          [gameAddress]: {
            assetPrice: null,
            winningPrediction: null,
            numberOfWinners: 0,
            feeCollected: false,
            totalPredictionPool: 0,
            positions: []
          }
        }))
        
        // prediction cost
        gameContract.methods.cost_to_predict().call()
          .then(result => {
            setState(state => ({
              ...state,
              [gameAddress]: {
                ...state[gameAddress],
                costToPredict: result
              }  
            }))
          })

        // asset
        gameContract.methods.asset().call()
          .then(result => {
            setState(state => ({
              ...state,
              [gameAddress]: {
                ...state[gameAddress],
                assetSymbol: result
              }  
            }))
          })        

        // resolution period
        gameContract.methods.resolution_period().call()
          .then(result => {
            setState(state => ({
              ...state,
              [gameAddress]: {
                ...state[gameAddress],
                resolutionPeriod: result
              }  
            }))
            let resolutionPeriodCountdown = null;
            handleCountdown(gameAddress, resolutionPeriodCountdown, result, 'resolutionPeriodCountdown', 'resolution has ended')            
          })     

        // tournament duration
        gameContract.methods.competition_duration().call()
          .then(result => {
            setState(state => ({
              ...state,
              [gameAddress]: {
                ...state[gameAddress],
                gameDuration: result
              }  
            }))
            // set interval
            let gameEndsCountdown = null;
            handleCountdown(gameAddress, gameEndsCountdown, result, 'gameEndsCountdown', 'Game has ended')
          })           

        // price prediction period
        gameContract.methods.price_prediction_period().call()
          .then(result => {
            setState(state => ({
              ...state,
              [gameAddress]: {
                ...state[gameAddress],
                predictionPeriod: result
              }  
            }))
            let predictionPeriodCountdown = null;
            handleCountdown(gameAddress, predictionPeriodCountdown, result, 'predictionPeriodCountdown', 'price prediction period is over')               
          })            

        // subscribe
        gameContract.events.assetPriceSet({
          fromBlock: 0,
          toBlock: 'latest',
        }, (error, event) => {
          if (!error) {
            setState(state => ({
              ...state,
              [gameAddress]: {
                ...state[gameAddress],
                assetPrice: event.returnValues.price  
              }
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
              [gameAddress]: {
                ...state[gameAddress],
                winningPrediction: event.returnValues.prediction  
              }
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
              [gameAddress]: {
                ...state[gameAddress],
                numberOfWinners: event.returnValues.winners  
              }
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
              [gameAddress]: {
                ...state[gameAddress],
                feeCollected: event.returnValues.collected  
              }
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
              [gameAddress]: {
                ...state[gameAddress],
                totalPredictionPool: event.returnValues.total  
              }
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
              [gameAddress]: {
                ...state[gameAddress],
                positions: [
                  ...state[gameAddress].positions,  
                  {[player]: predictionPrice}
                ]                 
              }
            }))                                                               
          }  
        })  
        setState( state => ({
          ...state,  
          isLoading: false,
        }));          
      }
    });

     

  }, [])  

  if (state.isLoading !== true) {
    return (
      <div>
        <h1>loaded</h1>
        {state['0x25eCDd4a69fE634B7a681E04d2Cc48B5Df83eC14'] !== undefined &&
          <p>{state['0x25eCDd4a69fE634B7a681E04d2Cc48B5Df83eC14'].resolutionPeriodCountdown}</p>
        }
        <button onClick={() => {console.log(state)}}>click</button>
      </div>  
    )
  } else {
    return <p>loading</p>
  }
}

export default withWeb3(Gamelist);
