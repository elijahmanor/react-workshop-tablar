import styled from "@emotion/styled";

// Blend modes adapted from https://codepen.io/danwilson/pen/dqZvmx
export const Background = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: 1fr 2fr 1fr;
  grid-template-areas:
    "tl tm tr"
    "mm mm mm"
    "bl bm br";
  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${props => `
      radial-gradient(circle, transparent 40%, ${props.topColor} 75%),
      linear-gradient(to right, ${props.middleColor}, ${props.middleColor}),
      url(${props.url});
    `};
    background-position: center center;
    background-size: cover;
    background-blend-mode: ${props => `
      ${props.blendTop},
      ${props.blendBottom},
      normal;
    `};
    z-index: -1;
  }
  .dark-mode &:after {
    filter: invert(100%);
  }
`;
