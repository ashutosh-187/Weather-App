import React, { createContext, useState, useEffect } from "react";

export const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
    const [weatherData, setWeatherData] = useState([]);
    const [summary, setSummary] = useState([])
    const [loading, setLoading] = useState(false);

    const fetchWeatherData = async () => {
        setLoading(true);
        try {
            const response = await fetch("http://localhost:3000/latest-data");
            if (!response.ok) {
                throw new Error("Unable to fetch data from backend.");
            }
            const data = await response.json();
            setWeatherData(data);
        } catch (error) {
            console.error("Error fetching weather data:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchSummary = async () => {
        try {
            const response = await fetch("http://localhost:3000/weather-summary");
            if (!response.ok) {
                throw new Error("Unable to fetch summary data from backend.");
            }
            const data = await response.json();
            setWeatherData(data);
        } catch (error) {
            console.error("Error fetching summary data:", error);
        }
    };

    useEffect(() => {
        fetchWeatherData();
    }, []);

    return (
        <WeatherContext.Provider value={{ weatherData, summary, loading, fetchWeatherData, fetchSummary }}>
            {children}
        </WeatherContext.Provider>
    );
};
