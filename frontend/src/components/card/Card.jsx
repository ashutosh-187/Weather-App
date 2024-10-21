import React, { useContext, useEffect, useState } from "react";
import {WeatherContext} from '../../context/Weather-context'
import "./Card.css"

export function Card() {
    const {weatherData, summary, loading, fetchWeatherData, fetchSummary} = useContext(WeatherContext)
    if (loading){
        return (
            <div class="spinner">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
        )
    }
    const calculateMidnight = ()=>{
        const currentTime = new Date();
        const midnight = new Date()
        midnight.setHours(24, 0, 0, 0)
        const differnece = midnight.getTime() - currentTime.getTime()
    }
    useEffect(() => {
        const interval = setInterval(fetchWeatherData, 1000 * 60 * 5);
        return () => clearInterval(interval);
    }, []);
    return (
        <div className="card-container container">
            {weatherData.length > 0 ?
                (
                    weatherData.map((city) => (
                        <div className="card">
                            <div className="weather-report-container">
                                <div className="weather-icon">
                                    <img src={`https://openweathermap.org/img/wn/${city.iconId}@2x.png`} />
                                    <h3>{city.description}</h3>
                                </div>
                                <div className="weather">
                                    <h1 className="temperature">{city.temperature}</h1>
                                    <h3>Feels like: {city.feelsLike}</h3>
                                </div>
                                <div className="other-details">
                                    <h3>location: {city.location}</h3>
                                    <h3>max: {city.max_temp}</h3>
                                    <h3>min: {city.min_temp}</h3>
                                </div>
                            </div>
                            <div className="summary-container">
                                <div className="summary">
                                    <button className="summary-icon">
                                        <img src={`https://openweathermap.org/img/wn/${summary.iconId}@2x.png`} alt="" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )
                : (
                    <h3>
                        No data available.
                    </h3>
                )
            }
        </div>
    );
}
