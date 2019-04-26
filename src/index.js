import React from "react";
import ReactDOM from "react-dom";
import Tablar from "./Tablar";
import { SettingsProvider } from "./contexts";

import "./styles.css";

ReactDOM.render(
  <SettingsProvider>
    <Tablar />
  </SettingsProvider>,
  document.getElementById("root")
);
