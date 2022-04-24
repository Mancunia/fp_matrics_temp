import {useContext} from 'react';
import {ThemeContext} from '../contexts/ThemeContext';

const NavBar = () => {
    const {isLightTheme,light,dark,toggleTheme}=useContext(ThemeContext);
    const theme = isLightTheme ? {bg:'#383d6f',syntax:'#fff',btn:'#000',btnColor:'#fff'}:{bg:'#000000',syntax:'#fff',btn:'#fff',btnColor:'#383d6f'};//determine theme
    return ( 
        <nav className="nav" style={{background:theme.bg,color:theme.syntax}}>
            <button onClick={toggleTheme} style={{background:theme.btn,color:theme.btnColor}}>
                Toggle Theme
            </button>
        </nav>
     );
}
 
export default NavBar;