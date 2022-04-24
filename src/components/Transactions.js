/*
0. get data from api call
1. print results
2. render
*/

import { useContext,useState,useEffect } from "react";

import {ThemeContext} from '../contexts/ThemeContext';
import TableCell from "./resuables/TableCell";
import Error from "./resuables/Error";
import Loading from "./resuables/Loading";
import { Fetch,service,genRandCode } from "../utils";

const Transactions = () => {
     //context.......
     const {isLightTheme,light,dark}=useContext(ThemeContext);
     const theme = isLightTheme ? {ui:'#f5f6fa',syntax:'#383d6f',bg:'#fff'}:{ui:'#262525bf',syntax:'#ffffffcc',bg:'#001'};//determine theme

    const head =['From','To','Sent','Receiving']

    const [tableData,setTableData]=useState([]);
    const [isPending,setIsPending]=useState(true);
    const [error,setError]=useState('');

    useEffect(()=>{
        let result=fetch(`${service.baseURL}transaction/grouped`,{
            method:'POST',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({start:'2022/3/1',end:'2022/4/19',status:'processing'})
        });
        result.then((res)=>{
            if(!res.ok){
                console.log('Errors')
                throw Error('Could not fetch data for that resource');
            }
            console.log(res)
            return res.json();
            

        }).then((res)=>{
            console.log(res.result);
              setTableData(res.result)
              setIsPending(false)
                setError(false)
        }).catch((e)=>{
            
            setError(e.message);
            setIsPending(false)
            setTableData([])
            // throw Error()
        })
      


    },[])

    

    return ( 
        <div style={{width: '-webkit-fill-available', borderTopLeftRadius: '15px',borderTopRightRadius: '15px'}}>
           {isPending&&<Loading/>}
            {error?<Error extra={{error}}/>:<table className='table'>
            <thead style={{background:theme.ui,color:theme.syntax}}>
            <tr>
                    
                    {head.map(h=><TableCell label={h} />)}
                    
                </tr>
            </thead>
            <tbody>
            {
                    tableData.map((d)=>
                         <tr key={genRandCode(5)} style={{background:'inherit',color:theme.syntax}}>
                        <TableCell label={d.sending_currency} />
                        <TableCell label={d.receiving_currency} />
                        <TableCell label={d.sent} />
                        <TableCell label={d.received} /> 
                        {/* <TableCell label={d.sent+d.received} /> */}
                         </tr>
                         )
                }
            </tbody>
        </table>}

        </div>
     );
}
 
export default Transactions;