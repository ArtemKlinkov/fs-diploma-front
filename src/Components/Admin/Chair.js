import { useState } from "react";

function Chair(props) {
  const {chair} = props;
 
  const [chairState, setChairState] = useState(chair.status);
  const handleChairStatusChange = () => {

    switch (chairState){
      case "standard":
        setChairState("vip"); 
        chair.status =  "vip";      
        break;
      case "vip":
        setChairState("disabled");
        chair.status =  "disabled";      
        break;
      default:
        setChairState("standard");
        chair.status =  "standard";      
    } 

  }

  return(
    <span onClick={()=> handleChairStatusChange()} className={"conf-step__chair conf-step__chair_" + chairState}></span>
  );
}

export default Chair