import {useState,useEffect} from 'react'

const useFetch= (url,param)=>{
        // states....................................
 const [data,setData] =useState(null);
 const [isPending,setIsPending]=useState(true);
 const [error,setError]=useState(null);

    useEffect(()=>{
        const abortControl = new AbortController();
        fetch(url,{
            method: 'POST',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(param),
            signal:abortControl.signal
        })
            .then(res=>{
                
                if(!res.ok){
                    throw Error('Could not fetch data for that resource');
                }
                return res.json()
            })
            .then((data)=>{
                console.log(data);
                setData(data);
                setIsPending(false);
                setError(null);
            })
            .catch((error)=>{
                if(error.name==='AbortError'){
                    console.log('Fetch aborted');
                }else{
                    setError(error.message);
                setIsPending(false);
                }
                
            })
        return ()=>{
           abortControl.abort();
        }


    },[url,param])

    return {data, isPending, error}

}

export default useFetch;