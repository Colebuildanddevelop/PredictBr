import React from 'react';


// gets a list of all availible and expired games
const Gamelist = (props) => {
  
  // inject into presentational components  
  return (
    <div>
      <h1>loaded</h1>
      <button onClick={() => props.handleCreateGame(props.state.myAddress[0], "spy", "spy", 1000000000, 1, 1)}>create game</button>
      <button onClick={() => {console.log(props)}}>click</button>
    </div>  
  )

}

export default Gamelist;
