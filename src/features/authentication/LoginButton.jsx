import styled, { css } from "styled-components";

const variations = {
  secondary: css`
    width: 103px;
    height: 34px;
    background-color: #fff;
    color: #1d5477;
    font-size: 12px;
    font-weight: 500;
  `,
  primary: css`
    width: 405px;
    height: 50px;
    background-color: #2eb2c2;
    color: #fff;
    font-size: 18px;
    font-weight: 700;
  `,
};

const ButtonLogin = styled.button`
  border-radius: 5px;
  cursor: pointer;  

  ${(props) => variations[props.variation]}
`;

export default ButtonLogin;
