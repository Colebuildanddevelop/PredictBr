import React, { useEffect, useState } from 'react';

export const useMyPositions = (games, myAddress) => {
  const [state, setState] = useState({
    isLoading: true,
    games: null,
  });
  console.log(games)
  useEffect(() => {
   
    handlePositions();  
    setState(state => ({
      ...state,
      isLoading: false
    }))
  }, [])  

  return state.games;

}


