import React, { createContext, useContext, useMemo, useCallback } from "react";
// import useLocalStorage from "react-use/lib/useLocalStorage";
import { useReducerWithLocalStorage } from "../customHooks";

const SettingsContext = createContext();

function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}

const initialSettings = {
  name: "",
  topColor: "black",
  middleColor: "transparent",
  blendTop: "normal",
  blendBottom: "normal",
  backgroundUrl: "https://source.unsplash.com/collection/3802293/1600x900",
  weather: null
};

function settingsReducer(state, action) {
  switch (action.type) {
    case "SET_NAME": {
      return { ...state, name: action.name };
    }
    case "SET_BACKGROUND_URL": {
      return { ...state, backgroundUrl: action.backgroundUrl };
    }
    case "SET_WEATHER": {
      console.log("SET_WEATHER", state, action);
      return { ...state, weather: action.weather };
    }
    case "SET_TOP_COLOR": {
      return { ...state, topColor: action.topColor };
    }
    case "SET_MIDDLE_COLOR": {
      return { ...state, middleColor: action.middleColor };
    }
    case "SET_BLEND_TOP": {
      return { ...state, blendTop: action.blendTop };
    }
    case "SET_BLEND_BOTTOM": {
      return { ...state, blendBottom: action.blendBottom };
    }
    default: {
      throw new Error(`Unsupported action type: ${action.type}`);
    }
  }
}

function SettingsProvider(props) {
  const [state, dispatch] = useReducerWithLocalStorage(
    settingsReducer,
    "settings",
    initialSettings
  );
  const value = useMemo(() => [state, dispatch], [state, dispatch]);
  return <SettingsContext.Provider value={value} {...props} />;
}

export { SettingsProvider, useSettings };
