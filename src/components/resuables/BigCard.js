import { useContext } from "react";
import {ThemeContext} from '../../contexts/ThemeContext';

const BigCard = (props) => {

    //context.......
    const {isLightTheme,light,dark}=useContext(ThemeContext);
    const theme = isLightTheme ? light:dark;//determine theme


    let providedSize; 
    const {size,View} = props;

    //Card sizes
    switch (size) {
        case "Large":
            providedSize={card:{width:'100%',maxHeight:'32rem',background:theme.ui,color:theme.syntax},text:{fontSize:'3vw',fontWeight:'bolder'}};
            break;
        case "Medium":
            providedSize={card:{width:'100%',maxHeight:'30%',background:theme.ui,color:theme.syntax},text:{fontSize:'2vw',fontWeight:'bolder'}};
            break;
    
        default:
            providedSize={card:{width:'38%',maxHeight:'30%',background:theme.ui,color:theme.syntax},text:{fontSize:'2vw',fontWeight:'bolder'}};
            break;
    }

   

   

    return ( 
        <div className="card" style={providedSize.card}>
            
               {View}                 
            
        </div>
     );
}
 
export default BigCard;