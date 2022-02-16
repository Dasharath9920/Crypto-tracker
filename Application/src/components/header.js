import React from 'react';

const Header = ({mode,setMode}) => {

   const changeMode = () => {
      setMode(1-mode);
      document.getElementById('mode').style.marginLeft = `${(1-mode)*10}px`;
      if(mode-1){
         document.getElementById(`${mode}`).style.color = "white";
         document.getElementById(`${1-mode}`).style.color = "white";
      }
      else{
         document.getElementById(`${mode}`).style.color = "rgb(48, 48, 59)";
         document.getElementById(`${1-mode}`).style.color = "rgb(48, 48, 59)";
      }
   };

   return <div className="header">
      <h1 className="hero" style = {{color: mode? "white": "rgb(48, 48, 59)", fontSize: '1.3rem'}}>Crypto Currency</h1>
      <div className="options">
         <h2 id = "0">day view</h2>
         <button onClick = {changeMode} className = "night-mode-btn"><div className = "switch" id = "mode"></div></button>
         <h2 id = "1">night view</h2>
      </div>
   </div>
}

export default Header;