import {createContext,useState,useEffect} from 'react'

// import useFetch from '../hooks/useFetch'
import { Last7Days,Fetch } from '../utils'

export const DailyContext = createContext()

const DailyContextProvider=(props)=>{
    const thisDay = new Date();
    const frame = Last7Days(thisDay);
    let lastTime;
    let start = frame[0];
    let end = frame[frame.length-1];

    // console.log(frame[frame.length-1]);

    const [today,setToday]= useState('');
    const [yesterday,setYesterday]=useState('');
    const [week,setWeek]=useState('');

    useEffect(()=>{
                    let result =Fetch('http://localhost:5000/transactions/',{start,end,status:''});
            
        result.then((res)=>{    
            console.log(res);            
                let newResult = res.forEach(ele => {
                    let date =  ele.date.split('T');
                    
                    ele.date = date[0];
                })
                

                // today filtered out
                let today = newResult.filter(day=>{
                    return day.date===end;
                })
                setToday(today);

                // yesterday filter out
                let yesterday =newResult.filter(day=>{
                    return day.date===Last7Days[Last7Days.length-2];
                })
                setYesterday(yesterday);

                // let dayOne,dayTwo,dayThree,dayFour,dayFive,daySix,daySeven



                lastTime = `${thisDay.getHours()}:${thisDay.getMinutes()}:${thisDay.getSeconds()}`
        })

    },[thisDay])

    // console.log(today)
    

    



        return(
            <DailyContext.Provider value={{today,yesterday,lastTime}}>
                {props.children}
            </DailyContext.Provider>
        )
}

export default DailyContextProvider
