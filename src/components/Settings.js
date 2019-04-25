import React from "react";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import useDarkMode from "use-dark-mode";
import Select from "react-select";

export function Settings({ settings = {}, onChange }) {
  const blendOptions = [
    { value: "normal", label: "normal" },
    { value: "multiply", label: "multiply" },
    { value: "screen", label: "screen" },
    { value: "overlay", label: "overlay" },
    { value: "darken", label: "darken" },
    { value: "lighten", label: "lighten" },
    { value: "color-dodge", label: "color-dodge" },
    { value: "color-burn", label: "color-burn" },
    { value: "hard-light", label: "hard-light" },
    { value: "soft-light", label: "soft-light" },
    { value: "difference", label: "difference" },
    { value: "exclusion", label: "exclusion" },
    { value: "hue", label: "hue" },
    { value: "saturation", label: "saturation" },
    { value: "color", label: "color" },
    { value: "luminosity", label: "luminosity" }
  ];
  const colorOptions = [
    { value: "transparent", label: "transparent" },
    { value: "black", label: "black" },
    { value: "green", label: "green" },
    { value: "red", label: "red" },
    { value: "hotpink", label: "hotpink" },
    { value: "blue", label: "blue" },
    { value: "yellow", label: "yellow" },
    { value: "orange", label: "orange" },
    { value: "purple", label: "purple" }
  ];
  const darkMode = useDarkMode(false);
  const { topColor, middleColor, blendTop, blendBottom } = settings;

  function handleChange(property, { value }) {
    onChange({ ...settings, [property]: value });
  }

  return (
    <div>
      <h1>Settings</h1>
      <Toggle checked={darkMode.value} onChange={darkMode.toggle} />
      Top Color:{" "}
      <Select
        defaultValue={{ value: topColor, label: topColor }}
        onChange={handleChange.bind(null, "topColor")}
        options={colorOptions}
      />
      Middle Color:{" "}
      <Select
        defaultValue={{ value: middleColor, label: middleColor }}
        onChange={handleChange.bind(null, "middleColor")}
        options={colorOptions}
      />
      Blend Top:{" "}
      <Select
        defaultValue={{ value: blendTop, label: blendTop }}
        onChange={handleChange.bind(null, "blendTop")}
        options={blendOptions}
      />
      Blend Bottom:{" "}
      <Select
        defaultValue={{ value: blendBottom, label: blendBottom }}
        onChange={handleChange.bind(null, "blendBottom")}
        options={blendOptions}
      />
    </div>
  );
}
