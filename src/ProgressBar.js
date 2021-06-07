import React from 'react';

const ProgressBar = (props) => {
    const { bgcolor, steps } = props;

    const values = steps.map(step => parseInt(step.value));

    let totalSteps = values.reduce(function(total,num){
      return total+num;
    })

    let goal = totalSteps * 0.002 / 1000 * 100;

    const containerStyles = {
      height: 22.5,
      width: '100%',
      backgroundColor: "#e0e0de",
      borderRadius: 50,
      margin: 50
    }
  
    const fillerStyles = {
      height: '100%',
      width: `${goal+10}%`,
      backgroundColor: bgcolor,
      borderRadius: 50,
      textAlign: 'right'
    }
  
    const labelStyles = {
      padding: 30,
      color: 'white',
      fontWeight: 'bold'
    }
  
    return (
      <div style={containerStyles}>
        <div style={fillerStyles}>
          <span style={labelStyles}>{`€${goal.toFixed()*10}`}</span>
        </div>
      </div>
    );
  };
  
  export default ProgressBar;