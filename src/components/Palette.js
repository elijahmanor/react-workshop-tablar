import React, { useEffect } from "react";
// import useLocalStorage from "react-use/lib/useLocalStorage";

import { Background } from "./Background";
import { useLocalStorage } from "../customHooks";

const UNSPLASH_COLLECTION =
  "https://source.unsplash.com/collection/3802293/1600x900";

export function Palette({
  refresh = false,
  onRefreshed = () => {},
  settings = {},
  children
}) {
  const [url, setUrl] = useLocalStorage("backgroundUrl", UNSPLASH_COLLECTION);

  useEffect(() => {
    async function getUrl() {
      if (url === UNSPLASH_COLLECTION || refresh) {
        console.log("refresh", refresh);
        const response = await window.fetch(
          "https://source.unsplash.com/collection/3802293/1600x900"
        );
        setUrl(response.url);
        onRefreshed();
      }
    }
    getUrl();
  }, [refresh]);

  return (
    <Background classNamex="Background" url={url} {...settings}>
      {children}
    </Background>
  );
}
