import styled from "@emotion/styled";

// https://css-tricks.com/overriding-default-button-styles/
export const Button = styled.button`
  display: inline-block;
  border: none;
  padding: 0.5rem 1rem;
  margin: 0 0.5rem 0 0;
  min-width: 5rem;
  text-decoration: none;
  background: ${props => (props.primary ? "#0069ed" : "#ccc")};
  color: ${props => (props.primary ? "#fff" : "#000")};
  font-size: 1rem;
  cursor: pointer;
  text-align: center;
  transition: background 250ms ease-in-out, transform 150ms ease;

  &:last-of-type {
    margin-right: 0;
  }

  &:hover,
  &:focus {
    background: ${props => (props.primary ? "#0053ba" : "#aaa")};
  }

  &:focus {
    outline: 1px solid #fff;
    outline-offset: -4px;
  }

  &:active {
    transform: scale(0.99);
  }
`;
