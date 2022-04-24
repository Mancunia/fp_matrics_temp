import { useContext,useState,useEffect } from 'react';
// import { DailyContext } from '../contexts/DailyContext';
import {Fetch,onlyUnique,service} from '../utils'

import { Chart as ChartJS, ArcElement, Tooltip, Legend,Title } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, Title);





const Daily = () => {
  let thisDay = new Date();


  // const {today,lastTime} = useContext(DailyContext);

  // console.log('today',today.transaction);

  const [countries,setCountries] =useState([]);
  const [calculation,setCalculation]=useState([]);

  const [start,setStart]=useState(`${thisDay.getFullYear()}/${thisDay.getMonth()+1}/${thisDay.getDate()}:00:00`);
  const [end,setEnd]=useState(`${thisDay.getFullYear()}/${thisDay.getMonth()+1}/${thisDay.getDate()}:00:00`);
  const [isPending,setIsPending]=useState(false);
  const [error,setError]=useState(false);

        useEffect(()=>{
            const result = Fetch(`${service.baseURL}transaction/all`,{start:'2022/4/1',end:'2022/4/19',status:'processing'});

          result.then((data)=>{
              return data.transaction;
          }).then((final)=>{
            let countries = final.map(c=>c.sent_from);

            let newcountries = countries.filter(onlyUnique);


            //set countries
            setCountries(newcountries);
            // return final;
            //calculate
            let byCount=[]
            let thisCount=0; 
              final.forEach(count => {
                let i=0;
                if(count.sent_from==newcountries[i]){
                // console.log(count.sent_from,newcountries[i])
                  thisCount+=1;
                }
                i++;
                
          });
          // console.log(thisCount)

          byCount.push(thisCount);


          
          setCalculation(byCount);


          }) 

          

          

        },[])

  // console.log(calculation)
  


  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
        textDirection:'rtl',
        font:{
          size:'12'
        }
      },
      title: {
        display: true,
        text: 'Daily Transactions',
        fullSize:true,
        font:{weight:'bolder',size:'25'}
      },
    },
  };


  const chartData = {
    labels: countries,
    datasets: [
      {
        label: 'Transactions',
        data: calculation,
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 206, 86)'
        ],
        borderColor: [
          'rgb(255, 99, 132, 1)',
          'rgb(54, 162, 235, 1)',
          'rgb(255, 206, 86, 1)'
        ],
        borderWidth: 5,
        hoverOffset: 4,
        width:'100%'
      },
      
    ],
  };


    return ( 
      <div style={{width:'65%',alignItems:'center',margin:'10px'}}>
        <Doughnut data={chartData} options={options}> </Doughnut>
        

       
      </div>
        
     );
}
 
export default Daily;