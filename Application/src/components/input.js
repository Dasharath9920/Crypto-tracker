import React from 'react';
import search_icon from './search.png';
const Input = ({data,setData,mode, searchName, setSearchName}) => {

   const searchHandler = () => {
      if(searchName.length==0){
         setSearchName('');
         window.alert("Enter valid coin name");
      }
      else{
         let found = false;
         for(let i = 0; i < data.length; i++){
            if(data[i].name.toLowerCase()===searchName.toLowerCase()){
               found = true;
               [data[0],data[i]] = [data[i],data[0]];
               setData(data);
            }
         }
         if(!found)
            window.alert("Enter valid coin name");
         else
            setSearchName('');
      }
   }

   const filterHandler = (e) => {
      let ele = document.getElementById('options');
      if(ele.value==='name: asc'){
         let new_data = [...data];
         new_data.sort((a,b) => {
            return a.name.localeCompare(b.name);
         })
         setData(new_data);
         // console.log(data);
      }
      else if(ele.value==='name: desc'){
         let new_data = [...data];
         new_data.sort((a,b) => {
            return b.name.localeCompare(a.name);
         })
         setData(new_data);
      }
      else if(ele.value==='price: low to high'){
         let new_data = [...data];
         new_data.sort((a,b) => {
            return a.current_price-b.current_price;
         })
         setData(new_data);
      }
      else  {
         let new_data = [...data];
         new_data.sort((a,b) => {
            return b.current_price-a.current_price;
         })
         setData(new_data);
      }
      // console.log(data);
   }

   return <div className="input-field">
      <input placeholder = "Search" type="text" value = {searchName} onChange = {(e) => setSearchName(e.target.value)}/>
      <button className = "btn" onClick = {searchHandler}><img id = "search-icon" src = {search_icon} /></button>
      <label htmlFor="sortBy" style = {{fontSize: '.8rem',color: mode===1? "rgb(230,230,230)": "rgb(30,30,30)"}}>sort by</label>
      <select className = "choose-list" name="select" id="options" onChange = {filterHandler} >
         <option name="name asc">name: asc</option>
         <option name="name desc">name: desc</option>
         <option name="price low to high">price: low to high</option>
         <option name="price high to low">price: high to low</option>
      </select>
   </div>
};

export default Input;