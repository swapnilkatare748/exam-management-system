import React, { useEffect, useState } from 'react'
import Toggle from 'react-toggle'
import "react-toggle/style.css"
import './ThemeToggel.css';
import { useMediaQuery } from 'react-responsive';

function ThemeToggel() {
const storagekey = "theme";
  const [isDark,setIsDark] = useState(JSON.parse(localStorage.getItem(storagekey)));
  useMediaQuery(
    {
        query:"(prefers-color-scheme:dark)"
    },
    undefined,
    (preferDark)=>{
        setIsDark(preferDark);
    }
  );
  useEffect(()=>{
    if(isDark){
        document.firstElementChild
        .setAttribute('data-theme','dark');
        localStorage.setItem(storagekey,true);
        return;
    }else{
        document.firstElementChild
        .setAttribute('data-theme','light');
        localStorage.setItem(storagekey,false);
    }
  })
    return (
    <div className='flex-center them-toggle-container'>
     <Toggle
     checked = {isDark}
     onChange={(event)=>setIsDark(event.target.checked)}
     icons={false}
     />    
    </div>
  )
}

export default ThemeToggel
