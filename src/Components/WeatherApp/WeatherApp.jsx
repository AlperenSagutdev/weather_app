import React from "react";
import './WeatherApp.css'
import clear_day from '../Assets/Weather=Clear, Moment=Day.png'
import clear_night from '../Assets/Weather=Clear, Moment=Night.png'
import cloudy_day from '../Assets/Weather=Cloudy, Moment=Day.png'
import cloudy_night from '../Assets/Weather=Cloudy, Moment=Night.png'
import fewcloud_day from '../Assets/Weather=Few clouds, Moment=Day.png'
import fewcloud_night from '../Assets/Weather=Few clouds, Moment=Night.png'
import rain_day from '../Assets/Weather=Rain, Moment=Day.png'
import rain_night from '../Assets/Weather=Rain, Moment=Night.png'
import storm_day from '../Assets/Weather=Storm, Moment=Day.png'
import storm_night from '../Assets/Weather=Storm, Moment=Night.png'
import spinner_gap from '../Assets/Type=spinner-gap-regular.png'
import wind_light from '../Assets/Type=wind-light.png'
import thermometer from '../Assets/Type=thermometer-simple-light.png'
import cloud_light from '../Assets/Type=cloud-rain-light.png'
import drop_light from '../Assets/Type=drop-light.png'
import sun_light from '../Assets/Type=sun-dim-light.png'
import logo from '../Assets/Logo.png'
import search_icon from '../Assets/magnifying-glass.png'

const WeatherApp = () => {
    let api_key ="e51b5988d14ace6cf8ee1ce8935155aa";
    const search = () => {
        const element= document.getElementsByClassName("cityInput")
        if(element[0].value==""){
            return 0;
        }
    }

 return (
    <div className="container">
        <div className="topbar">
            <input type="text" className="cityInput" placeholder="Search location"/>
            <div className="search_icon" onClick={()=>{search()}}>
                <img src={search_icon} alt="" />
            </div>
        </div>
        <div className="weather_image">
            <img src={cloudy_day} alt="alperen weather app deneme WE-01" />    
        </div>
        <div className="weather_temp">
            24°C
        </div>
    </div>
 )
}

export default WeatherApp