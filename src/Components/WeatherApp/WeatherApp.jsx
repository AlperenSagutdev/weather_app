import React, { useState } from "react";
import axios from 'axios';
import './WeatherApp.css'
import clearDayImage from "../Assets/Clear_D.png"
import clearNightImage from "../Assets/Clear_N.png"
import cloudyDayImage from "../Assets/Cloudy_D.png"
import cloudyNightImage from "../Assets/Cloudy_N.png"
import fewcloudDayImage from "../Assets/FewClouds_D.png"
import fewcloudNightImage from "../Assets/FewClouds_N.png"
import rainDayImage from "../Assets/Rain_D.png"
import rainNightImage from "../Assets/Rain_N.png"
import stormDayImage from "../Assets/Storm_D.png"
import stormNightImage from "../Assets/Storm_N.png"
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
import wind_light from '../Assets/Type=wind-light.png'
import thermometer from '../Assets/Type=thermometer-simple-light.png'
import cloud_light from '../Assets/Type=cloud-rain-light.png'
import drop_light from '../Assets/Type=drop-light.png'
import sun_light from '../Assets/Type=sun-dim-light.png'
import logo from '../Assets/Logo.png'
import search_icon from '../Assets/magnifying-glass.png'
import gps from '../Assets/gps.png'
import arrow from '../Assets/arrow-left.png'
import { Text, Table, Tbody, Tr, Td, TableContainer, Box, Grid, GridItem, Image, } from '@chakra-ui/react'

const WeatherApp = () => {
  let api_key = "e51b5988d14ace6cf8ee1ce8935155aa";
  let forecast_api = "3c20c7841c2f45ca922164406241704";
  const [wicon, setWicon] = useState(cloudy_day)
  const [state, setState] = useState("Default");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [currentForecastData, setCurrentForecastData] = useState(null);
  const [forecastData, setForecastData] = useState(null);

  const search = async () => {
    const element = document.getElementsByClassName("cityInput")
    if (element[0].value === "") {
      return 0;
    }
    setLoading(true);
    setState("Searched");

    let weather_url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;
    let forecast_url = `https://api.weatherapi.com/v1/forecast.json?key=${forecast_api}&q=${element[0].value}&days=7`;
    try {
      const weather_response = await axios.get(weather_url);
      const forecast_response = await axios.get(forecast_url);
      const data = weather_response.data;
      const forecast_data = forecast_response.data;

      if (weather_response.status === 404 || forecast_response.status === 404) {
        throw new Error("Belirtilen şehir bulunamadı. Lütfen geçerli bir şehir adı girin ve tekrar deneyin.");
      } else if (weather_response.status === 429 || forecast_response.status === 429) {
        throw new Error("API limiti aşıldı. Lütfen daha sonra tekrar deneyin.");
      }

      setWeatherData(data);
      setForecastData(forecast_data.forecast);
      setCurrentForecastData(forecast_data.forecast.forecastday[0]);
      const iconMap = {
        "01d": clear_day,
        "01n": clear_night,
        "02d": fewcloud_day,
        "02n": fewcloud_night,
        "04d": cloudy_day,
        "04n": cloudy_night,
        "010d": rain_day,
        "010n": rain_night,
        "011d": storm_day,
        "011n": storm_night,
        "09n": rain_night,
        "09d": rain_day,
        "03d": cloudy_day,
        "03n": cloudy_night,
      };

      const icon = iconMap[data.weather[0].icon];
      setWicon(icon);
      setLoading(false);

    } catch (error) {
      console.error("Error:", error.message);
      if (error.response && error.response.status === 404) {
        alert("Belirtilen şehir bulunamadı. Lütfen geçerli bir şehir adı girin ve tekrar deneyin.");
      } else if (error.response && error.response.status === 429) {
        alert("API limiti aşıldı. Lütfen daha sonra tekrar deneyin.");
      } else {
        alert("Bilinmeyen bir hata oluştu. Lütfen daha sonra tekrar deneyin.");
      }

    }
  };
  const searchByLocation = async () => {
    setLoading(true);
    setState("Searched");
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      let weather_url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=Metric&appid=${api_key}`;
      let forecast_url = `https://api.weatherapi.com/v1/forecast.json?key=${forecast_api}&q=${latitude},${longitude}&days=7`
      const [weather_response, forecast_response] = await Promise.all([
        axios.get(weather_url),
        axios.get(forecast_url)
      ]);
      const data = weather_response.data;
      const forecast_data = forecast_response.data;
      setWeatherData(data);
      setForecastData(forecast_data.forecast);
      setCurrentForecastData(forecast_data.forecast.forecastday[0]);
      const iconMap = {
        "01d": clear_day,
        "01n": clear_night,
        "02d": fewcloud_day,
        "02n": fewcloud_night,
        "04d": cloudy_day,
        "04n": cloudy_night,
        "010d": rain_day,
        "010n": rain_night,
        "011d": storm_day,
        "011n": storm_night,
        "09n": rain_night,
        "09d": rain_day,
        "03d": cloudy_day,
        "03n": cloudy_night,
      };

      const icon = iconMap[data.weather[0].icon];
      setWicon(icon);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error.message);
    } finally {
      setLoading(false);
    }
  };
  const backgroundImage = (() => {
    if (wicon === clear_day) {
      return clearDayImage;
    } else if (wicon === clear_night) {
      return clearNightImage;
    } else if (wicon === cloudy_day) {
      return cloudyDayImage;
    } else if (wicon === cloudy_night) {
      return cloudyNightImage;
    } else if (wicon === fewcloud_day) {
      return fewcloudDayImage;
    } else if (wicon === fewcloud_night) {
      return fewcloudNightImage;
    } else if (wicon === rain_day) {
      return rainDayImage;
    } else if (wicon === rain_night) {
      return rainNightImage;
    } else if (wicon === storm_day) {
      return stormDayImage;
    } else if (wicon === storm_night) {
      return stormNightImage;
    }
  })();

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      search();
    }
  };
  const resetState = () => {
    setState("Default");
    setWeatherData(null);
  };

  return (
    <div className="container">
      <div className="search_section"> {state === "Default" ? <div>
        <Box display="flex" alignItems="center" justifyContent="center">
          <Image boxSize='50px' src={logo}></Image>
          <Text marginLeft="4" color='white' fontSize='3xl'>AlpWeather</Text>
        </Box>
        <div className="topbar" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Text fontSize='2xl' color="white" align="center">
            Welcome to  <span style={{ color: "#8FB2F5" }}>AlpWeather</span>
          </Text>
          <Text color='gray' align="center">Choose a location to see the weather forecast</Text>
          <div className="searchContainer">
            <div className="cityInput_Container">
              <input type="text" className="cityInput" placeholder="Search location" onKeyDown={handleKeyPress} />
            </div>
            <button onClick={searchByLocation} style={{ backgroundColor: '#404054', marginRight: '5px', marginLeft: '5px' }}><img src={gps} alt="" /></button>
            <div className="search_icon" onClick={() => { search() }}>
              <img src={search_icon} alt="" />
            </div>
          </div>
        </div></div> : <></>}
      </div>
      <div className="weather_results"> {state === "Searched" && weatherData ? <div>
        <Grid templateColumns="repeat(2, 1fr)" templateRows="repeat(2, 1fr)" gap={6} bgImage={backgroundImage} borderRadius="20">
          <GridItem rowSpan={1} colSpan={1} background={backgroundImage} >

            <Box display="flex" justifyContent="flex-start" alignItems="flex-start" flexDirection="column" p={4} style={{ boxShadow: 'none' }} bg="transparent" border="0">
              <Box>
                <Text color="white">{weatherData.name}, {weatherData.sys.country}</Text>
                <Text color="white">{currentForecastData && currentForecastData.date && (
                  <>
                    <span>{new Date(currentForecastData.date).toLocaleDateString('en-US', { weekday: 'long' })}, </span>
                    <span>{new Date(currentForecastData.date).toLocaleDateString('en-US', { month: 'long' })} </span>
                    <span>{new Date(currentForecastData.date).getDate()}, </span>
                    <span>{new Date(currentForecastData.date).getFullYear()}</span>
                  </>
                )}</Text>
              </Box>
            </Box>
          </GridItem>

          <GridItem rowSpan={1} colSpan={1}>
          </GridItem>

          <GridItem rowSpan={1} colSpan={1} >
            <Box display="flex" justifyContent="flex-start" alignItems="flex-start" flexDirection="column" p={4} style={{ boxShadow: 'none' }} background={backgroundImage}>
              <Box>
                <Text color="white" fontSize="5xl"> {Math.floor(weatherData.main.temp)} °C</Text>
                <Text color="white">{Math.floor(weatherData.main.temp_min)} °C/{Math.floor(weatherData.main.temp_max)} °C</Text>
                <Text color="white">{weatherData.weather[0].description}</Text>
              </Box>
            </Box>
          </GridItem>

          <GridItem rowSpan={1} colSpan={1} >
            <Box display="flex" justifyContent="flex-end" alignItems="flex-end" p={4}>
              <Image src={wicon} alt="" size="100%" />
            </Box>
          </GridItem>
        </Grid>
        <Grid templateColumns="1fr" gap={6} borderRadius="20" paddingTop={'20px'}>
          <GridItem color="black.300">
            <TableContainer>
              <Table variant='simple' colorScheme='whiteAlpha' size='sm'>
                <Tbody>
                  <Tr>
                    <Td><img src={thermometer} alt="" /></Td>
                    <Td textAlign={'center'} color="white">Thermal Sensation</Td>
                    <Td textAlign={'right'} color="white">{Math.floor(weatherData.main.feels_like)} °C</Td>
                  </Tr>
                  <Tr>
                    <Td><img src={cloud_light} alt="" /></Td>
                    <Td textAlign={'center'} color="white">Probability of rain</Td>
                    <Td textAlign={'right'} color="white">{currentForecastData.day.daily_chance_of_rain} %</Td>
                  </Tr>
                  <Tr>
                    <Td><img src={wind_light} alt="" /></Td>
                    <Td textAlign={'center'} color="white">Wind Speed</Td>
                    <Td textAlign={'right'} color="white">{Math.floor(weatherData.wind.speed)} km/h</Td>
                  </Tr>
                  <Tr>
                    <Td><img src={drop_light} alt="" /></Td>
                    <Td textAlign={'center'} color="white">Air Humidty </Td>
                    <Td textAlign={'right'} color="white">{weatherData.main.humidity} %</Td>
                  </Tr>
                  <Tr>
                    <Td><img src={sun_light} alt="" /></Td>
                    <Td textAlign={'center'} color="white">UV Index </Td>
                    <Td textAlign={'right'} color="white">{currentForecastData && currentForecastData.day ? currentForecastData.day.uv : '-'}</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </GridItem>
        </Grid>
        <Grid templateColumns="repeat(5, 1fr)" templateRows="repeat(1, 1fr)" borderRadius="20" size='sm' paddingTop={'20px'}>
          {forecastData.forecastday.slice(1, 6).map((day, index) => (
            <GridItem key={index} color="white">
              <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                <Text fontSize={{ base: '12px', md: '14px', lg: '18px' }} loc>{new Date(day.date).toLocaleDateString()}</Text>
                <Image boxSize="50px" src={`http:${day.day.condition.icon}`} alt="Weather Icon" />
                <Text fontSize='sm'>{Math.floor(day.day.maxtemp_c)} °C</Text>
                <Text color='gray' fontSize='sm'>{Math.floor(day.day.mintemp_c)} °C</Text>
              </Box>
            </GridItem>
          ))}
        </Grid>
      </div> : <></>}
        <div>
          {state === "Searched" && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ marginTop: "24px" }}>
                <button onClick={resetState} gap="5px" className="backWardButton" >
                  <img src={arrow} alt="" /></button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  )
}

export default WeatherApp