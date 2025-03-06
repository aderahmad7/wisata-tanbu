import { BeatLoader } from "react-spinners";
import ButtonLogin from "./LoginButton";
import Input from "../../components/Input";
import InputLogin from "./LoginInput";
import { useForm } from "react-hook-form";
import { useState } from "react";
import styled from "styled-components";

const LoginFormStyled = styled.form`
  padding: 42px 51px;
  max-width: 512px;
`;

function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit } = useForm();

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <LoginFormStyled onSubmit={handleSubmit(onSubmit)}>
      <h1 className="font-bold text-3xl mb-6">
        Selamat Datang di Wisata Tanah Bumbu
      </h1>
      <InputLogin title={"Email"}>
        <Input
          type="email"
          placeholder="Masukkan Email Anda"
          {...register("email")}
        />
      </InputLogin>
      <InputLogin title={"Password"}>
        <Input
          type="Password"
          placeholder="Masukkan Email Anda"
          {...register("password")}
        />
      </InputLogin>
      <ButtonLogin
        type="submit"
        variation="primary"
        onClick={() => {
          setIsLoading((val) => !val);
        }}
        className="mb-7 mt-3"
      >
        {isLoading ? <BeatLoader color="#fff" size={10} /> : "Login"}
      </ButtonLogin>
      <p className="text-sm text-center">
        Belum mempunyai Akun?{" "}
        <a href="#" className="text-[#1976D2]">
          Daftar Disini!
        </a>
      </p>
    </LoginFormStyled>
  );
}

export default LoginForm;
