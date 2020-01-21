import React from 'react';
import Typography from '@material-ui/core/Typography';


const FormattedTime = (props) => {
  // add a 0 to minutes less than 10
  if (props.duration.getMinutes() < 10) {
    return (
      <div>
        <Typography align='left' display='inline' style={{fontWeight: 'bold', color: 'white'}}>
          {props.name}
        </Typography>      
        <Typography align='left' display='inline' style={{color: 'white'}}>
          : {props.duration.getMonth() + 1}/{props.duration.getDate() + 1}, {props.duration.getHours()}:0{props.duration.getMinutes()} 
        </Typography>     
      </div>    
    )
  } else {
    return (
      <div>
        <Typography align='left' display='inline' style={{fontWeight: 'bold', color: 'white'}}>
          {props.name}
        </Typography>      
        <Typography align='left' display='inline' style={{color: 'white'}}>
          : {props.duration.getMonth() + 1}/{props.duration.getDate() + 1}, {props.duration.getHours()}:{props.duration.getMinutes()} 
        </Typography>     
      </div>    
    )     
    
  }
}

export default FormattedTime;