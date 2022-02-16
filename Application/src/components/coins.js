import React ,{useState, useEffect} from 'react';

const Coins = ({mode, data}) => {

   useEffect(() => {
      const ele = document.getElementById('row');
      if(mode && ele!==undefined){
         for(let i = 0; i < ele.childNodes.length; i++)
            ele.childNodes[i].style.color = "rgb(230,230,230)";
      }
      else if(ele !== undefined){
         for(let i = 0; i < ele.childNodes.length; i++)
            ele.childNodes[i].style.color = "rgb(68, 78, 89)";
      }

      for(let i = 0; i < data.length; i++){
         let ele = document.getElementById(data[i].id);
         for(let j = 0; j < ele.childNodes.length; j++)
            if(mode)
               ele.childNodes[j].style.color = "rgb(230,230,230)";
            else 
               ele.childNodes[j].style.color = "rgb(68, 78, 89)";
      }
   },[mode]);


   const viewHandler = (e) => {
      var ele = e.target.parentNode;
      for(let i = 0; i < data.length; i++){
         if(data[i].id === ele.id){
            ele = data[i];
            break;
         }
      }
      var currEle = document.getElementById('show');
      document.getElementById('about-image').src = ele.image;
      document.getElementById('about-coin-name').textContent = ele.name;
      document.getElementById('about-price').textContent = "$"+ele.current_price;
      document.getElementById('max_price').textContent = "$"+ele.high_24h;
      document.getElementById('min_price').textContent = "$"+ele.low_24h;
      document.getElementById('about-change').textContent = ele.price_change_24h+"%";
      document.getElementById('rank').textContent = ele.market_cap_rank;
      document.getElementById('about-volume').textContent = ele.total_volume;
      currEle.style.display = "flex";
   }

   return <table className="coins" id = "table">
         <thead>
            <tr className = "row" id = "row">
               <th className = "name">Name</th>
               <th>market cap</th>
               <th className="price">price</th>
               <th>volume (24hr)</th>
               <th>circulating supply</th>
               <th className = "change">change (24hr)</th>
               <th className = "trade">trade</th>
            </tr>
         </thead>
         {data.length>0 && <tbody>
            {data.map((coin) => {
               let change = Math.floor(coin.price_change_percentage_24h);
               let colour = "rgb(212, 67, 67)";
               if(change<0){
                  change = "▼"+change;
               }
               else{
                  change = "▲"+change;
                  colour = "green";
               }
               return <tr onClick = {viewHandler} className = "row coin" key = {coin.id} id = {coin.id}>
                        <td id = "name"><div className="photo"><img className = "coin-image" src={coin.image} alt="" /></div><h2 className = "row coin-name">{coin.name}</h2></td>
                        <td>${coin.market_cap}</td>
                        <td id = "price">${(coin.current_price*0.013).toFixed(5)}</td>
                        <td>{(Math.floor)(coin.total_volume)}</td>
                        <td>{Math.floor(coin.circulating_supply)}</td>
                        <td id = "change" style = {{color: colour}}>{change}%</td>
                        <td id = "trade"><h2>buy</h2><h2>sell</h2></td>
                     </tr>
            })}
         </tbody>}
      </table>
}

export default Coins;