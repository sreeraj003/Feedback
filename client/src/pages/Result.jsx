import { useEffect, useState } from 'react'
import './Result.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Result() {

  const navigate = useNavigate()
  const [data, setData] = useState({})
  const [usageLarge,setUsageLarge] = useState()
  const [goalLarge,setGoalLarge] = useState()

  useEffect(() => {
    const call = async () => {
      await axios.get("http://localhost:8080/result")
        .then(res => {
          setData(res.data);
          let largestPair = {}; // Initialize as an empty object
          for (const key in res.data.usageData) {
            if (res.data.usageData.hasOwnProperty(key)) {
              const value = res.data.usageData[key];
              if (!largestPair.key || value > largestPair.value) {
                largestPair = { key, value };
              }
            }
          }
          setUsageLarge(largestPair);

          let largestGoalPair = {}; // Initialize as an empty object
          for (const key in res.data.goal) {
            if (res.data.goal.hasOwnProperty(key)) {
              const value = res.data.goal[key];
              if (!largestGoalPair.key || value > largestGoalPair.value) {
                largestGoalPair = { key, value };
              }
            }
          }
          setGoalLarge(largestGoalPair); // Update the state with the largest pair
        })
        .catch(error => {
          console.log(error);
        });
    };
    call();
  }, []);
  console.log(goalLarge);  

  
  return (
    <div className="container">
      <div className='headCards'>
        <div className='m-2 cards bg-dark'>
          <h4>Usage</h4>
          {usageLarge?.key?usageLarge?.key:'-'} <br />
          {usageLarge?.value?usageLarge?.value:'-'}
        </div>
        <div className='m-2 cards bg-dark'>
          <h4>Goal</h4>
          {goalLarge?.key?goalLarge?.key:'-' } <br />
          {goalLarge?.value?goalLarge?.value:'-'}
        </div>
        <div className='m-2 cards bg-dark'>
          <h4>Experience</h4>
          {!data.avgRating && '-'}
          {data.avgRating==1&&"Very bad"+` (${data.avgRating})` }
          {data.avgRating==2&&"Bad"+` (${data.avgRating})` }
          {data.avgRating==3&&"Not good"+` (${data.avgRating})` }
          {data.avgRating==4&&"Okey"+` (${data.avgRating})` }
          {data.avgRating==5&&"Good"+` (${data.avgRating})` }
          {data.avgRating==6&&"Very good"+` (${data.avgRating})` }
          {data.avgRating==7&&"Excellent"+` (${data.avgRating})` }
          {data.avgRating==8&&"Outstanding"+` (${data.avgRating})` }
          {data.avgRating==9&&"Exceptional"+` (${data.avgRating})` }
          {data.avgRating==10&&"Perfect"+` (${data.avgRating})` }
        </div>
      </div>
      <div className="row">
        <div className='col-md-6 text-center mt-5'>
          <h3>Often Usage</h3>
          <div className="row">
            <div className="col-6 ">
              <ul className='list'>
                <li>Daily</li>
                <li>Weekly</li>
                <li>Monthly</li>
                <li>Rarely</li>
                <li>First time</li>
              </ul>
            </div>
            <div className="col-6">
              <ul>
                {data.usageData?.Daily ? data.usageData.Daily : 0} <br />
                {data.usageData?.Weekly ? data.usageData.Weekly : 0} <br />
                {data.usageData?.Monthly ? data.usageData.Monthly : 0}<br />
                {data.usageData?.Rarely ? data.usageData.Rarely : 0} <br />
                {data.usageData?.First_time ? data.usageData.First_time : 0} <br />
              </ul>
            </div>
          </div>
          <br />
          <h3>Goals</h3>
          <div className="row">
            <div className="col-6">
              <ul className='list'>
                <li>Information</li>
                <li>Chat</li>
                <li>Entertainment</li>
                <li>Buy</li>
                <li>Socialize</li>
                <li>Others</li>
              </ul>
            </div>
            <div className="col-6">
              <ul>
                {data.goal?.Information ? data.goal?.Information : 0} <br />
                {data.goal?.Chat ? data.goal?.Chat : 0} <br />
                {data.goal?.Entertainment ? data.goal?.Entertainment : 0} <br />
                {data.goal?.Buy ? data.goal?.Buy : 0} <br />
                {data.goal?.socialize ? data.goal?.socialize : 0} <br />
                {data.goal?.Others ? data.goal?.Others : 0} <br />
              </ul>
            </div>
          </div>
      <button className='btn btn-dark' onClick={()=>navigate('/')}>Go Back</button>
        </div>
        <div className='col-md-6 text-center mt-5'>
          <h3>Suggestions</h3>
          <div className="row">
            <ul className='text-start '>
              {data.suggestions &&
                data.suggestions.map((el, index) => (
                  <li className='ms-5' key={index}>{el}</li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Result