import React, {useEffect, useState} from 'react';
import { Route, Switch } from 'react-router-dom';
// WEB 3
import { withWeb3 } from 'react-web3-provider';
// COMPONENTS
import ProductSelection from './ProductSelection';
import Gamelist from './Gamelist';
import Game from './Game';
import Graph from './Graph';

const Navigation = (props) => {
  const { web3 } = props;  
  const [state, setState] = useState({
    isLoading: true,
  })  
  const factoryAbi = [
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
      "name": "createGame",
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
  ];
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
  const factoryAddress = '0x437FB32e688CB7C9D0d16E08E1D1Cad2B607Aa3b';
  const factoryContract = new web3.eth.Contract(factoryAbi, factoryAddress);  

  useEffect(() => {
    const getAddress = async() => {
      const address = await web3.eth.getAccounts();
      setState(state => ({
        ...state,
        numOfGames: 0,
        myAddress: address 
      }))
      console.log(address)
    }
    getAddress();
  }, [])

  useEffect(() => {
    const getGameData = async(gameContract, contractAddress) => {
      // CONSTANTS
      const predictionCost = await gameContract.methods.cost_to_predict().call()
      const assetName = await gameContract.methods.asset().call()
      const resolutionPeriod = await gameContract.methods.resolution_period().call()
      const competitionPeriod = await gameContract.methods.competition_duration().call()
      const pricePredictionPeriod = await gameContract.methods.price_prediction_period().call()
      // COUNTDOWNS
      let resolutionPeriodCountdown = null;
      let gameEndsCountdown = null;
      let predictionPeriodCountdown = null;
      handleCountdown(contractAddress, resolutionPeriodCountdown, resolutionPeriod, 'resolutionPeriodCountdown', 'resolution has ended');
      handleCountdown(contractAddress, gameEndsCountdown, competitionPeriod, 'gameEndsCountdown', 'Game has ended');
      handleCountdown(contractAddress, predictionPeriodCountdown, pricePredictionPeriod, 'predictionPeriodCountdown', 'price prediction period is over');

      setState(state => ({
        ...state,
        games: {
          ...state.games,
          [contractAddress]: {
            gameContract: gameContract,
            predictionCost: predictionCost,
            assetName: assetName,
            resolutionPeriod: resolutionPeriod,
            competitionPeriod: competitionPeriod,
            pricePredictionPeriod: pricePredictionPeriod,
            positions: [],
          }
        }
      }))
    }

    const subscribeToGame = async (gameContract, gameAddress) => {
      // subscribe turn into hooks? 
      await gameContract.events.assetPriceSet({
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
      await gameContract.events.winningPredictionSet({
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
                winningPrediction: event.returnValues.prediction
              }
            }
          }))                         
        }  
      })
      await gameContract.events.numberOfWinners({
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
                numOfWinners: event.returnValues.winners
              }
            }
          }))              
        }  
      })
      await gameContract.events.feeCollected({
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
                feeCollected: event.returnValues.collected
              }
            }
          }))                    
        }  
      })
      await gameContract.events.totalPredictionPool({
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
                totalPredictionPool: event.returnValues.total
              }
            }
          }))                        
        }  
      })
      await gameContract.events.positionAdded({
        fromBlock: 0,
        toBlock: 'latest',
      }, (error, event) => {
        if (!error) {
          let player = event.returnValues.player
          let predictionPrice = event.returnValues.predictionPrice
          setState(state => ({
            ...state,
            games: {
              ...state.games,
              [gameAddress]: {
                ...state.games[gameAddress],
                positions: [
                  ...state.games[gameAddress].positions,
                  {
                    player: player, 
                    predictionPrice: predictionPrice
                  }
                ]
              }
            }
          }))                                                          
        }  
      }) 
    }
    // for each contract get gameData
    factoryContract.events.contractCreated({
      fromBlock: 0,
      toBlock: 'latest',
    }, (error, event) => {
      if (!error) { 
        // init game contract
        let gameAddress = event.returnValues.newAddress;
        let gameContract = new web3.eth.Contract(gameAbi, gameAddress)
        setState(state => ({
          ...state,
          numOfGames: state.numOfGames + 1
        }))   
        // Get constant data then subscribe to events
        getGameData(gameContract, gameAddress)
          .then(() => {
            subscribeToGame(gameContract, gameAddress);
          })  
      }
    })
    setState(state => ({
      ...state,
      isLoading: false,
    }));
  }, [])

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
        games: {
          ...state.games,
          [address]: {
            ...state.games[address],
            [countdownName]: timeLeft 
          }    
        }
      }))
      // If the count down is finished
      if (distance < 0) {
        clearInterval(countdown);
        setState(state => ({
          ...state,
          games: {
            ...state.games,
            [address]: {
              ...state.games[address],
              [countdownName]: isOverMessage 
            }    
          }
        }))         
      }
    }, 1000);      
  }

  if (state.isLoading !== true) {
    return (
      <React.Fragment>
  
        <Switch>  
          <Route 
            exact path="/"
            render={() => <Gamelist factoryContract={factoryContract} state={state} />}
          />
          <Route 
            path="/game_:id"
            render={({match}) => <Game
              gameState={state.games[match.params.id]} 
              myAddress={state.myAddress} 
            />}
          />
        </Switch>
  
      </React.Fragment>
    );
  
  } else {
    return <p>loading</p>
  }
};

export default withWeb3(Navigation);