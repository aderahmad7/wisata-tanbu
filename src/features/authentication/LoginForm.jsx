import { BeatLoader } from "react-spinners";
import ButtonLogin from "./LoginButton";
import Input from "../../components/Input";
import InputLogin from "./LoginInput";
import { useForm } from "react-hook-form";
import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/api";

const LoginFormStyled = styled.form`
  padding: 42px 51px;
  max-width: 512px;
`;

function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError("");
    try {
      const response = await login(data.email, data.password);
      sessionStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError("Login gagal, periksa email dan password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginFormStyled onSubmit={handleSubmit(onSubmit)}>
      <h1 className="font-bold text-3xl mb-6">
        Selamat Datang di Wisata Tanah Bumbu
      </h1>
      {error && (
        <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-center text-sm">
          {error}
        </div>
      )}
      <InputLogin title={"Username"}>
        <Input
          type="text"
          placeholder="Masukkan Email Anda"
          {...register("email", { required: "Email wajib diisi" })}
        />
        {errors.email && (
          <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
        )}
      </InputLogin>
      <InputLogin title={"Password"}>
        <Input
          type="password"
          placeholder="Masukkan Password Anda"
          {...register("password", { required: "Password wajib diisi" })}
        />
        {errors.password && (
          <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
        )}
      </InputLogin>
      <ButtonLogin type="submit" variation="primary" className="mb-7 mt-3">
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
