import styled from "styled-components";

const Input = styled.input`
  font-size: 13px;
  padding: 0 20px;
  width: 405px;
  height: 50px;
  border-radius: 5px;
  border: 1px solid #b5b5b5;

  &:focus {
    border-color: #2eb2c2;
    outline: none;
    box-shadow: 0 0 2px rgba(0, 123, 255, 0.5);
  }
`;

export default Input;
