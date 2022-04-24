import { useState,useEffect } from "react";
import { Fetch,service } from "../utils";

import Error from "./resuables/Error";
import Loading from "./resuables/Loading";
import CardContent from "./resuables/CardContent";
/*
0.get yesterday's date
1.get today's date
2.fetch data based on yesterday and today's date
3.compare data
4.get percentage of yesterday's based on today's
5.get icon and set color based on difference
6.print info 
7.render
*/
const Differential = () => {

    const day = new Date();
    const [day1,setDay1]=useState(day)//today
    const [day0,setDay0]=useState(day.setDate(day.getDate() - 1))//yesterday

    setInterval(() => {
        setDay1(day);
        setDay0(day.setDate(day.getDate() - 1));

    }, 5000);

        const [isPending,setIsPending]=useState(false);
        const [error,setError]=useState(false);


        const [yesterValue,setYesterValue]=useState(0);
        const [todayValue,setTodayValue]=useState(0);
        const [difference,setDifference]=useState(0);
        const [percentage,setPercentage]=useState(0)
        const [data,setData]=useState({state:'None',color:'#000'})

        useEffect(()=>{
            let result =fetch(`${service.baseURL}transaction/difference`,{
                method:'POST',
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({yesterday:'2022/4/4'/*day0 */,today:'2022/4/1'/*day1*/})
            })
        
                result.then((res)=>{
                    if(!res.ok){
                        console.log('Errors')
                        throw Error('Could not fetch data for that resource');
                    }
                    // console.log(res)
                    let back=res.json();
                    back.then((bk)=>{
                        setIsPending(false);
                        setError(false)

                        setYesterValue(bk.yesterday);
                        setTodayValue(bk.today);
                        setDifference(bk.difference);
                        setPercentage(bk.percentage);


                    })
                }).catch((e)=>{
                    console.log('error',e)
                    setError(true);
                    setIsPending(false)
                    throw e;
                })

                // ckeck if difference is positive
                setData(percentage>0?{state:'Up',color:'#1f1'}:{state:'Down',color:'#ff4141'}) 
                

        },[day1])

        

    return ( 
        <div>
            
            {isPending&&<Loading/>}
            {error?<Error/>:<CardContent title='Differential' number={`${percentage}%`} state={data.state} style={{border:'5px solid',borderRadius:'60px',padding:'10px',color:data.color}} color={data.color}/>}
            <sub>{`Yesterday:${yesterValue} | Today :${todayValue}`}</sub>
        </div>
     );
}
 
export default Differential;