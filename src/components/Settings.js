import React from "react";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import useDarkMode from "use-dark-mode";
import Select from "react-select";
import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;
const Label = styled.div`
  flex-basis: 30%;
`;
const Input = styled.div`
  flex-basis: 70%;
`;

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

export function Settings({ settings = {}, dispatch }) {
  const darkMode = useDarkMode(false);
  const { topColor, middleColor, blendTop, blendBottom } = settings;

  return (
    <div className="Settings">
      <h1 style={{ marginTop: 0 }}>Settings</h1>
      <Container>
        <Label>Dark Mode</Label>
        <Input>
          <Toggle checked={darkMode.value} onChange={darkMode.toggle} />
        </Input>
      </Container>
      <Container>
        <Label>Color</Label>
        <Input>
          <Select
            defaultValue={{ value: topColor, label: topColor }}
            onChange={({ value }) =>
              dispatch({ type: "SET_TOP_COLOR", topColor: value })
            }
            options={colorOptions}
          />
        </Input>
      </Container>
      <Container>
        <Label>Blend</Label>
        <Input>
          <Select
            defaultValue={{ value: blendTop, label: blendTop }}
            onChange={({ value }) =>
              dispatch({ type: "SET_BLEND_TOP", blendTop: value })
            }
            options={blendOptions}
          />
        </Input>
      </Container>
    </div>
  );
}
