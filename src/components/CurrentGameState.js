import React from 'react';
import Typography from '@material-ui/core/Typography';

const CurrentGameState = (props) => {
  if (props.game.predictionPeriodCountdown.isOver === true) {
    if (props.game.gameEndsCountdown.isOver === true) {  
      if (props.game.resolutionPeriodCountdown.isOver === true) {
        return (                  
        <Typography align='left' style={{fontWeight: 'bold', color: 'red'}}>
          game has resolved
        </Typography>                
      )} else {
        return (                  
        <Typography align='left' style={{fontWeight: 'bold', color: 'yellow'}}>
          resolution period {props.game.resolutionPeriodCountdown.timeLeft}
        </Typography>                
      )} 
    } else {
      return (              
      <Typography align='left' style={{fontWeight: 'bold', color: '#00b0ff'}}>
        game has started {props.game.gameEndsCountdown.timeLeft}
      </Typography>            
    )}
  } else {
    return (          
    <Typography align='left' style={{fontWeight: 'bold', color: '#00e676'}}>
      game starts: {props.game.predictionPeriodCountdown.timeLeft}
    </Typography>        
  )}
}

export default CurrentGameState;