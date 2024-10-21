import React, { useContext } from "react";
import "./Navbar.css";
import { TiWeatherPartlySunny } from "react-icons/ti";
import {WeatherContext} from '../../context/Weather-context.jsx'

function Navbar() {
    const {fetchWeatherData} = useContext(WeatherContext)
    return (
        <div className="navbar-container">
            <div className="icon-container">
                <TiWeatherPartlySunny className="navbar-icon" />
            </div>
            <div className="separator"></div>
            <div className="title-container">
                <h1 className="title">Today's <span className="title-span">Weather</span></h1>
            </div>
            <div className="button-container">
                <a onClick={fetchWeatherData}>Refresh</a>
                <a href="https://github.com/ashutosh-187">Github</a>
                <a href="https://www.linkedin.com/in/ashutosh-tiwari-a938a6243/">Linkedin</a>
            </div>
        </div>
    )
}

export default Navbar;