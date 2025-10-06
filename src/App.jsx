import React, { useState } from 'react'
import './App.css';


export default function App() {
  let[city,setcity]=useState('')
  let[wdetails,setwdetails]=useState()
  let[isloading,setisloading]=useState(false)
  let getData=(event)=>{
    setisloading(true)
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=751d66e130befad396405dc13796a57c&units=metric`)
    .then((res)=>res.json())
    .then((finalRes)=>{
      if(finalRes.cod=="404"){
        setwdetails(undefined)
      }
      else{
        setwdetails(finalRes)
      }
      setisloading(false)
    })
    event.preventDefault()
    setcity('')
  }
  return (
    <div className='w-[1315px] h-[100vh] bg-[#4aacb1]'>
      <div className='max-w-[1320px] mx-auto'>
        <h1 className='text-[40px] font-bold p-[50px] text-white'>Simple weather App</h1>

        <form onSubmit={getData} className='pl-[50px] gap-[20px]' >
          <input type='text' value={city} onChange={(e)=>setcity(e.target.value)} className='w-[300px] bg-amber-50 h-[40px] pl-3' placeholder='City Name' /> 
          <button className=" h-[40px] m-[10px]  p-[10px_20px] ">Submit</button>
        </form>

        <div className='w-[400px] mx-auto bg-white shadow-lg mt-[40px] p-[25px] relative'>
          <img src="https://www.icegif.com/wp-content/uploads/2023/07/icegif-1263.gif" width={200} className={`absolute left-[100px] ${ isloading ? '' : 'hidden'} `} />

          {
            wdetails!==undefined
            ?
            <>
              <h3 className='font-bold text-[30px]'>{wdetails.name} <span className='bg-[yellow]'>
                {wdetails.sys.country}</span> </h3>
              <h2 className='font-bold text-[40px]'>
                {wdetails.main.temp}  
              </h2> 
              <img src={`http://openweathermap.org/img/w/${wdetails.weather[0].icon}.png`} />
              <p>{wdetails.weather[0].description}</p>
            </>
            :
            "NO DATA"
          }
        </div>
      </div>  
    </div>
  )
}




  
