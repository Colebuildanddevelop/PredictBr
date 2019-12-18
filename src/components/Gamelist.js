import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';


// gets a list of all availible and expired games
const Gamelist = (props) => {
  let { url } = useRouteMatch();
  // create game functionality 
  // handle click for creating a Game
  const handleCreateGame = (
    playerAddress,
    gameName, 
    predictionCost, 
    timeToStart, 
    durationMinutes
    ) => {
    props.factoryContract.methods.createGame(
      gameName, 
      predictionCost, 
      timeToStart, 
      durationMinutes
    ).send({
      from: playerAddress
    })
    .then((error, result) => {
      if (!error) {
        console.log(result)
      } else {
        console.log(error)
      }
    })
  }  
  
  // inject into presentational components  
  // if statement wouldnt be necc if HOC didnt pass props until loaded
  if (props.state.games !== undefined || null) {
    return (
      <div>
        <h1>loaded</h1>
        <button onClick={() => handleCreateGame(props.state.myAddress[0], "spy", 1000000000, 5, 1)}>create game</button>
        <button onClick={() => {console.log(props)}}>click</button>
        <ul>
          {Object.keys(props.state.games).map((game, key) => (
            
            <Link to={`${url}/game_${game}`}>
              <li key={key}>
                {game}
              </li>
            </Link>            
          ))}   
        </ul>
     
      </div>  
    )
  } else {
    return (
      <div>
        <button onClick={() => handleCreateGame(props.state.myAddress[0], "spy", 1000000000, 5, 1)}>create game</button>
        <button onClick={() => {console.log(props)}}>click</button>      
        <p>loading games</p>
      </div>

    )
  }

}

export default Gamelist;

