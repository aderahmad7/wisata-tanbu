import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import Logo from "../components/Logo";

const LoginBox = styled.div`
  width: 1200px;
  height: 607px;
  border-radius: 25px;
  stroke: #bcbcbc;
  padding-left: 75px;
  background-color: #fff;
`;

function Login() {
  return (
    <div className="flex justify-center items-center h-screen bg-[url('/background.png')] bg-cover bg-bottom">
      <LoginBox className="flex justify-between shadow mx-5">
        <div className="flex items-center h-full">
          <Logo size="large" />
        </div>
        <LoginForm />
      </LoginBox>
    </div>
  );
}

export default Login;
