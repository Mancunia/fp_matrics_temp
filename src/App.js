import Cards from './components/resuables/BigCard';
import NavBar from './components/NavBar';
import Daily from './components/Daily';
import SevenDays from './components/SevenDays';
import {useContext} from 'react'
import {ThemeContext} from './contexts/ThemeContext';
import Yearly from './components/Yearly';
import Transactions from './components/Transactions';
import Monthly from './components/Monthly';
import Differential from './components/Differential';
// import DailyContextProvider from './contexts/DailyContext';
// import {row} from 'react-bootstrap'


function App() {
  const {isLightTheme,light,dark}=useContext(ThemeContext);
  const theme = isLightTheme ? light:dark;//determine theme
  return (
    <div className="App" style={{background:theme.bg,color:theme.syntax,padding:0}}>
      
      <NavBar />
      
      <div className='body'>
        {/* <DailyContextProvider> */}
      <div className='row'>
      <div className={'card-holder x35'}>
      <Cards
      size={'Large'}
      View={<Daily/>}
      />
      </div>

      <div className='card-holder x45P'>
        <Cards
      size={'small'}
      View ={<Monthly/>}
      />
      <Cards
      size={'small'}
      View={<Differential/>}
      
      />
      <Cards
      size={'small'}
      View={<Yearly/>}
      />
      <Cards
      size={'small'}
      
      />
      </div>

      <div className='card-holder x20P'>
      <Cards
            size={'Medium'}
            />
      </div>
      </div>
      {/* </DailyContextProvider> */}
      
      <div className='row'>
      <div className='card-holder x40P100P'>
              <SevenDays/>
          
            </div>
            
            <div className='card-holder x50P'>
              <Transactions />
            </div>
      </div>

      
      </div>
     
    </div>         
      );
}

export default App;
