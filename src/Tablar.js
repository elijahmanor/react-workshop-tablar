import React, { useState, useEffect } from "react";
// import useLocalStorage from "react-use/lib/useLocalStorage";
import "./Tablar.css";

import {
  Palette,
  Greeting,
  IconLibrary,
  Icon,
  Timer,
  Weather,
  TicTacToe,
  Rss,
  Settings,
  Dialog
} from "./components";
import { useDocumentTitle, useLocalStorage } from "./customHooks";

const dialogs = {
  settings: () => [Settings],
  weather: () => [Weather, { view: "detailed" }],
  ticTacToe: () => [TicTacToe],
  timer: () => [Timer],
  rss: () => [Rss, { url: "https://www.reddit.com/r/reactjs/.rss" }]
};

export default function Tablar() {
  const [dateTime, setDateTime] = useState(new Date());
  const [name, setName] = useLocalStorage("name", "");
  const [isEditing, setIsEditing] = useState(!name);
  const [currentDialog, setCurrentDialog] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [settings, setSettings] = useLocalStorage("settings", {
    topColor: "black",
    middleColor: "grey",
    blendTop: "normal",
    blendBottom: "saturation"
  });
  const [CurrentDialog, dialogProps] = dialogs[currentDialog]
    ? dialogs[currentDialog]()
    : [];

  useEffect(() => {
    window.setInterval(() => {
      setDateTime(new Date());
    }, 60000);
  }, []);

  const time = dateTime.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric"
  });
  const [hourMinute, amPm] = time.split(" ");
  useDocumentTitle(time);

  return (
    <Palette
      refresh={refresh}
      onRefreshed={() => setRefresh(false)}
      settings={settings}
    >
      <div className="tl" onClick={() => setCurrentDialog("timer")}>
        <Icon type="timer" width="1rem" height="1rem" />
      </div>
      <div className="tm" onClick={() => setCurrentDialog("ticTacToe")}>
        <Icon type="ticTacToe" width="1rem" height="1rem" />
      </div>
      <div className="tr" onClick={() => setCurrentDialog("weather")}>
        <Weather />
      </div>
      <header className="App-header mm">
        <h1 className="App-time">
          <span>{hourMinute}</span> <span>{amPm}</span>
        </h1>
        <Greeting
          dateTime={dateTime}
          name={name}
          isEditing={isEditing}
          onChange={name => setName(name)}
          onExit={() => setIsEditing(false)}
          onDoubleClick={() => setIsEditing(true)}
        />
      </header>
      <div className="bl" onClick={() => setCurrentDialog("settings")}>
        <Icon type="settings" width="1rem" height="1rem" />
      </div>
      <div className="bm" onClick={() => setRefresh(true)}>
        <Icon type="refresh" width="1rem" height="1rem" />
      </div>
      <div className="br" onClick={() => setCurrentDialog("rss")}>
        <Icon type="refresh" width="1rem" height="1rem" />
      </div>
      <Dialog isOpen={!!CurrentDialog} onClose={() => setCurrentDialog(null)}>
        <CurrentDialog
          settings={settings}
          onChange={setSettings}
          {...dialogProps}
        />
      </Dialog>
      <IconLibrary />
    </Palette>
  );
}
