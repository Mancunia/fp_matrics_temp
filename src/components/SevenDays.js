import { useContext,useState,useEffect } from 'react';
// import { DailyContext } from '../contexts/DailyContext';
import {ThemeContext} from '../contexts/ThemeContext';
import {Fetch,onlyUnique,Last7Days} from '../utils'
import { Line } from 'react-chartjs-2';
import {Chart as ChartJS} from 'chart.js/auto';
  
//   import faker from 'faker';
// ChartJS.register(CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend);




const SevenDays = () => {
         //context.......
    const {isLightTheme,light,dark}=useContext(ThemeContext);
    const theme = isLightTheme ? light:dark;//determine theme

        let thisDay = new Date();
        const frame = Last7Days(thisDay);

        let start = frame[frame.length-1];
        let end = frame[0];

        console.log(start,end)

        const [days,setDays] =useState([]);
        const [countries,setCountries]=useState([]);
        const [calculation,setCalculation]=useState([]);


        useEffect(()=>{
            let result = Fetch('http://localhost:5000/transaction/all',{start:'2021/12/1',end:'2022/4/19',status:'processing'});

        result.then((data)=>{
            return data.transaction;
        }).then((final)=>{
            let days = final.map(c=>c.date.split('T')[0]);
            let countries = final.map(c=>c.sent_from);

            // days.forEach((d)=>d.split('T'));
                
                
            let newdays = days.filter(onlyUnique);
            let newcountries = countries.filter(onlyUnique);
                // console.log(newcountries);
            //set countries
            setDays(newdays);
            // return final;
            //calculate
            let byCount=[]
            let thisCount;
            let count; 

            newcountries.forEach(count => {
                /*
                1. get country data
                2. loop through dates
                3. compare countries
                3. resturn data to array
                */
                let i=0;
                let dataCount=0;            
                     thisCount={
                    barPercentage: 0.5,
                    barThickness: 50,
                    maxBarThickness: 8,
                    minBarLength: 2,
                    label:count,
                    data:[],
                    backgroundColor:`#${i}ffe`
                }
                    for(let i=0;i<=newcountries.length-1;i++){//loop every country
                        thisCount.label = newcountries[i]
                        let data=[]
                        
                        for(let j=0;j<=newdays.length-1;j++){//loop in every date
                            count=0;
                            for(let l=0;l<=final.length-1;l++){//loop every record retried
                                let dd = final[l]
                                if(newdays[j]==dd.date.split('T')[0]){

                                    count+=1

                                }
                            }
                            thisCount.data.push(count);
                            thisCount.backgroundColor=`#${count}fe`;

                        }
                        byCount.push(thisCount);

                    }

               
                
                
                // console.log(i)
                i++;
                // console.log(thisCount)
                
        });

        

        


        
        setCalculation(byCount);


        }) 

        

        

        },[])

        // console.log(calculation)

        
        const options = {
            responsive: true,
            plugins: {
            legend: {
                position: 'bottom',
            },
            title: {
                display: true,
                text: 'Last Seven Days',
                fullSize:true,
                font:{weight:'bolder',size:'25'}
            },
            },
        };
        
        const labels = days;
        // console.log(labels);
        
        const data = {
            labels,
            datasets: calculation
        };


    return ( 
        <div style={{width:'100%',color:theme.syntax,background:theme.ui,borderRadius:10}}>
            <Line data={data} options={options}>

            </Line>
        </div>
     );
}
 
export default SevenDays;