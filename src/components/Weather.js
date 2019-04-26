import React, { useState, useEffect } from "react";
import axios from "axios";
import adapter from "axios-jsonp";
import WeatherIcon from "react-icons-weather";
import useGeolocation from "react-use/lib/useGeolocation";
import useLocalStorage from "react-use/lib/useLocalStorage";
import { useSettings } from "../contexts";
import { throttle } from "lodash";

import "./Weather.css";

const apiKey = "fcadf5275df8ceef12000950d379c52d";

function SimpleForecast({ weather }) {
  return (
    <div className="Weather-weather">
      <WeatherIcon
        name="owm"
        iconId={weather.weather[0].id.toString()}
        className="Weather-icon"
      />
      <div className="Weather-temperature">
        {Math.round(weather.main.temp)} °F
      </div>
    </div>
  );
}

function DetailedForecast({ weather }) {
  return (
    <div className="Weather-weather">
      <h3 style={{ marginTop: 0, textAlign: "center" }}>{weather.name}</h3>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center"
        }}
      >
        <WeatherIcon
          name="owm"
          iconId={weather.weather[0].id.toString()}
          style={{ fontSize: "2.5rem" }}
        />
        <div>
          <div style={{ fontSize: "1.5rem" }}>
            {Math.round(weather.main.temp)}°F {weather.weather[0].main}
          </div>
          <div>
            {Math.round(weather.main.temp_min)}° -{" "}
            {Math.round(weather.main.temp_max)}°
          </div>
        </div>
      </div>
      <div>
        <div className="Weather-detail">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path d="M20.021 12.593c-.141-.427-.314-.844-.516-1.242l-2.454 1.106c.217.394.39.81.517 1.242l2.453-1.106zm-12.573-.903c.271-.354.58-.675.919-.957l-1.89-1.969c-.328.294-.637.615-.918.957l1.889 1.969zm1.715-1.515c.379-.221.781-.396 1.198-.523l-1.034-2.569c-.41.142-.812.318-1.198.524l1.034 2.568zm-2.759 3.616c.121-.435.288-.854.498-1.25l-2.469-1.066c-.197.403-.364.822-.498 1.25l2.469 1.066zm9.434-6.2c-.387-.205-.79-.379-1.2-.519l-1.024 2.573c.417.125.82.299 1.2.519l1.024-2.573zm2.601 2.13c-.282-.342-.59-.663-.918-.957l-1.89 1.969c.339.282.647.604.918.957l1.89-1.969zm-5.791-3.059c-.219-.018-.437-.026-.649-.026s-.431.009-.65.026v2.784c.216-.025.434-.038.65-.038.216 0 .434.012.649.038v-2.784zm-.648 14.338c-1.294 0-2.343-1.049-2.343-2.343 0-.883.489-1.652 1.21-2.051l1.133-5.606 1.133 5.605c.722.399 1.21 1.168 1.21 2.051 0 1.295-1.049 2.344-2.343 2.344zm12-6c0 2.184-.586 4.233-1.61 5.999l-1.736-1.003c.851-1.471 1.346-3.174 1.346-4.996 0-5.523-4.477-10-10-10s-10 4.477-10 10c0 1.822.495 3.525 1.346 4.996l-1.736 1.003c-1.024-1.766-1.61-3.815-1.61-5.999 0-6.617 5.383-12 12-12s12 5.383 12 12z" />
          </svg>
          <span>{weather.main.pressure} hpa</span>
        </div>
        <div className="Weather-detail">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path d="M11.234 14.141c0 .714-.138 1.249-.414 1.608-.276.358-.681.538-1.215.538-.512 0-.907-.184-1.187-.552-.278-.367-.418-.899-.418-1.594 0-1.418.535-2.127 1.606-2.127.524 0 .927.184 1.208.552.28.368.42.893.42 1.575zm-2.061.01c0 .394.035.688.105.882.07.194.182.291.337.291.298 0 .447-.391.447-1.173 0-.776-.149-1.163-.447-1.163-.155 0-.268.095-.337.286-.07.19-.105.483-.105.877zm5.263-2.039l-3.774 6.804h-1.117l3.774-6.804h1.117zm1.564 4.747c0 .711-.138 1.245-.414 1.603-.276.359-.681.538-1.215.538-.512 0-.908-.184-1.187-.552-.279-.368-.419-.897-.419-1.589 0-1.418.535-2.127 1.606-2.127.524 0 .927.184 1.208.552.281.367.421.893.421 1.575zm-2.062.009c0 .394.035.688.105.882.07.194.182.291.337.291.298 0 .447-.391.447-1.173 0-.776-.149-1.163-.447-1.163-.155 0-.268.095-.337.286-.07.191-.105.484-.105.877zm-1.938-11.308c2.725 5.186 6 6.718 6 10.515 0 3.267-2.691 5.925-6 5.925s-6-2.658-6-5.925c0-3.797 3.274-5.327 6-10.515zm0-5.56c-2.333 8.958-8 10.188-8 16.075 0 4.378 3.579 7.925 8 7.925 4.421 0 8-3.547 8-7.925 0-5.887-5.667-7.117-8-16.075z" />
          </svg>
          <span>{weather.main.humidity}%</span>
        </div>
        <div className="Weather-detail">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path d="M11 10h-11v-2h11c.552 0 1-.448 1-1s-.448-1-1-1c-.403 0-.747.242-.905.587l-1.749-.956c.499-.965 1.494-1.631 2.654-1.631 3.971 0 3.969 6 0 6zm7 7c0-1.656-1.344-3-3-3h-15v2h15c.552 0 1 .448 1 1s-.448 1-1 1c-.403 0-.747-.242-.905-.587l-1.749.956c.499.965 1.494 1.631 2.654 1.631 1.656 0 3-1.344 3-3zm1.014-7.655c.082-.753.712-1.345 1.486-1.345.827 0 1.5.673 1.5 1.5s-.673 1.5-1.5 1.5h-20.5v2h20.5c1.932 0 3.5-1.568 3.5-3.5s-1.568-3.5-3.5-3.5c-1.624 0-2.977 1.116-3.372 2.617l1.886.728z" />
          </svg>
          <span>{weather.wind.speed} mph</span>
        </div>
        <div className="Weather-detail">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path d="M22.088 13.126l1.912-1.126-1.912-1.126c-1.021-.602-1.372-1.91-.788-2.942l1.093-1.932-2.22-.02c-1.185-.01-2.143-.968-2.153-2.153l-.02-2.219-1.932 1.093c-1.031.583-2.34.233-2.941-.788l-1.127-1.913-1.127 1.913c-.602 1.021-1.91 1.372-2.941.788l-1.932-1.093-.02 2.219c-.01 1.185-.968 2.143-2.153 2.153l-2.22.02 1.093 1.932c.584 1.032.233 2.34-.788 2.942l-1.912 1.126 1.912 1.126c1.021.602 1.372 1.91.788 2.942l-1.093 1.932 2.22.02c1.185.01 2.143.968 2.153 2.153l.02 2.219 1.932-1.093c1.031-.583 2.34-.233 2.941.788l1.127 1.913 1.127-1.913c.602-1.021 1.91-1.372 2.941-.788l1.932 1.093.02-2.219c.011-1.185.969-2.143 2.153-2.153l2.22-.02-1.093-1.932c-.584-1.031-.234-2.34.788-2.942zm-10.117 6.874c-4.411 0-8-3.589-8-8s3.588-8 8-8 8 3.589 8 8-3.589 8-8 8zm.029-2c-3.313 0-6-2.687-6-6s2.687-6 6-6v12z" />
          </svg>
          <span>
            {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()} -{" "}
            {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}
          </span>
        </div>
      </div>
      <footer>Last Updated: {new Date(weather.dt).toLocaleTimeString()}</footer>
    </div>
  );
}

const getWeather = throttle(url => {
  console.log("actually doing the ajax call...");
  const data = {
    coord: { lon: -86.78, lat: 36.16 },
    weather: [
      { id: 501, main: "Rain", description: "moderate rain", icon: "10n" }
    ],
    base: "stations",
    main: {
      temp: 60.69,
      pressure: 1008,
      humidity: 93,
      temp_min: 59,
      temp_max: 63
    },
    visibility: 16093,
    wind: { speed: 8.05, deg: 190 },
    rain: { "1h": 1.2 },
    clouds: { all: 90 },
    dt: Date.now(),
    sys: {
      type: 1,
      id: 4964,
      message: 0.0092,
      country: "US",
      sunrise: 1556190074,
      sunset: 1556238519
    },
    id: 4644585,
    name: "Nashville",
    cod: 200
  };
  // return axios({ url, adapter });
  return Promise.resolve({ data });
}, 60000);

export function Weather({ view = "simple" }) {
  const [settings, dispatch] = useSettings();
  const { latitude, longitude, loading, error } = useGeolocation();
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude ||
    36.162663}&lon=${longitude || -86.781601}&units=imperial&appid=${apiKey}`;

  useEffect(() => {
    let timer;
    const refresh = () => {
      // if (!loading && !error) {
      if (url) {
        console.log("Getting weather...", url);
        getWeather(url).then(({ data }) => {
          console.log("Weather is back...");
          dispatch({ type: "SET_WEATHER", weather: data });
        });
        timer = window.setTimeout(refresh, 300000);
      } else {
        console.log("Loading or error", {
          loading,
          message: error ? error.message : ""
        });
      }
    };
    refresh();
    return () => window.clearTimeout(timer);
  }, [latitude, longitude, url, dispatch, loading, error]);

  return (
    <div className="Weather">
      {settings.weather ? (
        view === "simple" ? (
          <SimpleForecast weather={settings.weather} />
        ) : (
          <DetailedForecast weather={settings.weather} />
        )
      ) : (
        <svg width="1rem" height="1rem" viewBox="0 0 24 24">
          <path
            fill="white"
            d="M11 3c-1.613 0-3.122.437-4.432 1.185l1.65 2.445-6.702-.378 2.226-6.252 1.703 2.522c1.633-.959 3.525-1.522 5.555-1.522 4.406 0 8.197 2.598 9.953 6.34l-1.642 1.215c-1.355-3.258-4.569-5.555-8.311-5.555zm13 12.486l-2.375-6.157-5.307 3.925 3.389.984c-.982 3.811-4.396 6.651-8.488 6.75l.891 1.955c4.609-.461 8.373-3.774 9.521-8.146l2.369.689zm-18.117 3.906c-2.344-1.625-3.883-4.33-3.883-7.392 0-1.314.29-2.56.799-3.687l-2.108-.12c-.439 1.188-.691 2.467-.691 3.807 0 3.831 1.965 7.192 4.936 9.158l-1.524 2.842 6.516-1.044-2.735-6.006-1.31 2.442z"
          />
        </svg>
      )}
    </div>
  );
}
