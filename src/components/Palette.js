import React, { useEffect } from "react";

import { Background } from "./Background";
import { useSettings } from "../contexts";

const UNSPLASH_COLLECTION =
  "https://source.unsplash.com/collection/3802293/1600x900";

export function Palette({ refresh = false, onRefreshed = () => {}, children }) {
  const [settings, dispatch] = useSettings();

  useEffect(() => {
    async function getUrl() {
      if (settings.backgroundUrl === UNSPLASH_COLLECTION || refresh) {
        console.log("refresh", refresh);
        const response = await window.fetch(
          "https://source.unsplash.com/collection/3802293/1600x900"
        );
        dispatch({ type: "SET_BACKGROUND_URL", backgroundUrl: response.url });
        onRefreshed();
      }
    }
    getUrl();
  }, [refresh, onRefreshed, dispatch, settings.backgroundUrl]);

  return (
    <Background url={settings.backgroundUrl} {...settings}>
      {children}
    </Background>
  );
}
