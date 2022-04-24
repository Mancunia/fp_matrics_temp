/*
0. get data from api call
1. count array length
2. reformat
3. print results
4. render
*/

import { useContext,useState,useEffect } from "react";

import {ThemeContext} from '../contexts/ThemeContext';
import TableCell from "./resuables/TableCell";
import Error from "./resuables/Error";
import Loading from "./resuables/Loading";
import CardContent from "./resuables/CardContent";
import { Fetch,service,genRandCode } from "../utils";

const Monthly = () => {

    const thisDay = new Date();


    const [start,setStart]=useState(`${thisDay.getFullYear()}/${thisDay.getMonth()+1}/1`);
    const [end,setEnd]=useState(`${thisDay.getFullYear()}/${thisDay.getMonth()+1}/${thisDay.getDate()}`);
    const [data,setData]=useState(0);
    const [isPending,setIsPending]=useState(false);
    const [error,setError]=useState(false);


    useEffect(()=>{
        let result =fetch(`${service.baseURL}transaction/all`,{
        method:'POST',
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({start:'2021/1/1',end:'2022/4/19'})
    })

        result.then((res)=>{
            if(!res.ok){
                console.log('Errors')
                throw Error('Could not fetch data for that resource');
            }
            // console.log(res)
            let back=res.json();
            back.then((bk)=>bk.transaction)

            .then((res)=>{
                console.log(res.length);
               let count =res.length
               count?setData(count):setData(0)
              setIsPending(false)
                setError(false)
        })
        }).catch((e)=>{
            console.log('error',e)
            setError(true);
            setIsPending(false)
            setData([])
            // throw Error()
        })

    },[])

    return ( 
        <div>
        {isPending&&<Loading/>}
        {error?<Error extra={'loading yearly data'}/>:<CardContent title="Monthly Transactions" number={data} state={'Month'} style={{border:'0px solid',borderRadius:'0px',padding:'10px'}} color={'#000'}/>}
            
        </div>
     );
}
export default Monthly;