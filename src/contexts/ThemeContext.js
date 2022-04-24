import React,{createContext,useState} from 'react';

export const ThemeContext = createContext();


const ThemeContextProvider=(props)=>{
     const [theme,setTheme] = useState({ 
        isLightTheme:true,
        light:{syntax:'#555', ui:'#fff', bg:'#fff'},
        dark:{syntax:'#fefefe', ui:'#333', bg:'#555'}
     }); 


     const toggleTheme = ()=>{
        
        setTheme((theme)=>theme.isLightTheme=!theme.isLightTheme);

        console.log(theme)
      }

        //  console.log(this.state)
        
        return (
            <ThemeContext.Provider value={{...theme,toggleTheme}}>
                {props.children}
            </ThemeContext.Provider>
        );
    
}
 
export default ThemeContextProvider;


