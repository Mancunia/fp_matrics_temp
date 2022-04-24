import { useEffect, useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowTrendUp,faArrowTrendDown,faEarthAfrica,faChartLine,faSpinner, faCalendarDays,faCalendarCheck, faArrowRotateLeft, faGlobe} from '@fortawesome/free-solid-svg-icons'
import { icon } from '@fortawesome/fontawesome-svg-core'

/*
0.get data from prop
1.reformat number
2.get icon from font-awesome
3.apply image details to image
*/ 

const icons = {
    trend_UP:faArrowTrendUp,
    trend_down:faArrowTrendDown,
    globe:faGlobe,
    graph:faChartLine,
    month:faCalendarCheck,
    year:faCalendarDays,
    none:faArrowRotateLeft
}

const CardContent = ({title,number,state,color,style}) => {

    const [icon,setIcon]=useState(state);
    const [image,setImage]=useState(faSpinner);
    console.log(color);
    // const []
    
    useEffect(()=>{
        switch (state) {
            case "Up":
                    setImage(icons.trend_UP)
                break;
            case "Down":
                setImage(icons.trend_down)
            break;
    
            case "Africa":
                setImage(icons.globe)
            break;
    
            case "Graph":
                setImage(icons.year)
            break;
            case "Month":
                setImage(icons.month)
                break;
            case "None":
                setImage(icons.none)

            default:
                    setImage(faSpinner)
                break;
        }
    
    },[state,number,style,color])


    

    return ( 
        <div>
            <div className="smallContent">
                <div>
                <span className='h4'>{title}</span>
                <h2 style={{color:color}}>{number}</h2>
                
                </div>
            
            <div className="imgHold">
                <FontAwesomeIcon style={style} size="3x" icon={image}/>
            </div>
        </div>
        </div>
        
     );
}
 
export default CardContent;