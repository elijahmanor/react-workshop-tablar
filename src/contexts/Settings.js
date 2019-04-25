import React, { createContext, useContext } from "react";

const SettingsContext = createContext();

function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error(`useSettings must be used within a SettingsProvider`);
  }
  return context;
}

function SettingsProvider(props) {
  const [count, setCount] = useState(0);
  const value = React.useMemo(() => [count, setCount], [count]);
  return <CountContext.Provider value={value} {...props} />;
}

export { CountProvider, useCount };
