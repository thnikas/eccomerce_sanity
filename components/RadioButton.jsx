import * as React from 'react';
import { pink } from '@mui/material/colors';
import Radio from '@mui/material/Radio';
import { styled } from '@mui/material/styles';
import { RadioGroup, FormControlLabel,  } from '@mui/material';
const ColorRadioButtons=({colors,selectedRadioIndex,setSelectedRadioIndex})=> {//the custom radio button that change the image 
  const [selectedValue, setSelectedValue] = React.useState(colors[selectedRadioIndex]);
  const handleChange = (color,index) => {
      setSelectedValue(color)
      setSelectedRadioIndex(index)
  };
 
  
  return (
    <div>
      <RadioGroup  style={{flexDirection:'row'}}>
        {colors.map((color, index) => (
          <FormControlLabel
          sx={selectedRadioIndex==index?({
            border: "2px solid #f02d34",
            borderRadius: "50%",
            "& .MuiSvgIcon-root": {
              fontSize: 35,
              color: color,
              borderRadius: '50%',
              backgroundColor: color,
              transform: 'scale(1.3)', // Adjust the scale factor as needed
          }
            
            }):({
              borderRadius: "50%",
              "& .MuiSvgIcon-root": {
                fontSize: 35,
                color: color,
                borderRadius: '50%',
                backgroundColor: color,
                transform: 'scale(1.3)', // Adjust the scale factor as needed
              }
            
            })}
            key={index}
            value={color}
            control={<Radio key={index} onChange={()=>handleChange(color,index)}  />}
          />
        ))}
    </RadioGroup>
        
    
      
    </div>
  );
}
export default ColorRadioButtons
const styles={
  active:{
    
  }
}