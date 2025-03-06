import styled, { css } from "styled-components";

const sizes = {
  small: css`
    width: 132px;
  `,
  medium: css`
    width: 160px;
  `,
  large: css`
    width: 552px;
  `,
  xlarge: css`
    width: 623px;
  `,
};

const LogoStyled = styled.img`
  ${(props) => sizes[props.size]}
`;

function Logo({ size = "medium", className }) {
  return (
    <LogoStyled src="/logo.png" alt="Logo Wisata Tanah Laut" size={size} className={className} />
  );
}

export default Logo;
