import React from 'react';
import { NavLink } from 'react-router-dom';


// gets a list of all availible and expired games
const Gamelist = (props) => {

  // create game functionality 
  // handle click for creating a Game
  const handleCreateGame = (
    playerAddress,
    gameName, 
    assetName, 
    predictionCost, 
    timeToStart, 
    durationMinutes
    ) => {
    props.factoryContract.methods.createGame(
      gameName, 
      assetName, 
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
        <button onClick={() => handleCreateGame(props.state.myAddress[0], "spy", "spy", 1000000000, 5, 1)}>create game</button>
        <button onClick={() => {console.log(props)}}>click</button>
        <ul>
          {Object.keys(props.state.games).map((game, key) => (
            
            <NavLink style={{width: "100%", textDecoration: 'none', color: 'unset'}} to={`/game_${game}`}>
              <li key={key}>
                {game}
              </li>
            </NavLink>            
          ))}   
        </ul>
     
      </div>  
    )
  } else {
    return <p>loading games</p>
  }

}

export default Gamelist;

