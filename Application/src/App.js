import './App.css';
import React, {useState, useEffect} from 'react';
import Header from './components/header.js';
import Coins from './components/coins.js';
import Input from './components/input.js';

var prev = 0;

function App() {

  const [mode, setMode] = useState(1);
  const [data, setData] = useState([]);
  const [searchName, setSearchName] = useState('');

  const fetchData = () => {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR&order=market_cap_desc&per_page=100&page=1&sparkline=false')
      .then(res=>{
        if(res.ok)
          return res.json();
        else{
          console.log("unable to fetch url");
          throw new Error("Unable to fetch url");
        }
      })
      .then((data) => {
        setData(data);
      })
      .catch(error=>console.log(error))
  }
  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 30000);
    
    return () => clearInterval(interval);
  },[]);

  useEffect(() => {
      if(mode){
        document.getElementById('container').style.backgroundColor = "rgb(48, 48, 59)";
        document.getElementById('search-icon').style.filter = "contrast(.9)";
      }
      else{
        document.getElementById('container').style.backgroundColor = "white";
        document.getElementById('container').style.border = "1px solid grey";
        document.getElementById('search-icon').style.filter = "contrast(0)";
      }
  },[mode]);

  const displayCoin = () => {
    document.getElementById('show').style.display = "none";
  }

  return (
    <div className = "container">
      <div className="frame" id = "container">
        <Header 
        mode = {mode}
        setMode = {setMode}
        />
        <Input 
        data = {data}
        setData = {setData}
        mode = {mode}
        searchName = {searchName}
        setSearchName = {setSearchName}
        />
        <Coins mode = {mode}
         data = {data}
         />
      </div>
      <div className="coin-details" id = "show">
        <button className="close-btn" onClick = {displayCoin}>X</button> 
        <div className="photo2"><img id = "about-image" src="search.png" alt="Coin Image" /></div>
        <h1 id = "about-coin-name"></h1>
        <h4 >Price: <span id = "about-price"></span></h4>
        <h4 >24 Hours Max price: <span id = "max_price"></span></h4>
        <h4 >24 Hours Min Price: <span id = "min_price"></span></h4>
        <h4 >Change: <span id = "about-change"></span></h4>
        <h4 >Market Capital Rank: <span id = "rank"></span></h4>
        <h4 >Total Volume: <span id = "about-volume"></span></h4>
      </div>
    </div>
  );
}

export default App;
