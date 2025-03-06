import { NavLink, useNavigate } from "react-router";
import Logo from "../../components/Logo";
import ButtonLogin from "../authentication/LoginButton";

function HomeNav() {
  const navigate = useNavigate();

  return (
    <nav className="flex justify-between items-center">
      <Logo size="small" />
      <ul className="flex gap-8 text-white font-bold">
        <li>
          <NavLink to="/home">Home</NavLink>
        </li>
        <li>
          <NavLink to="/maps">Peta</NavLink>
        </li>
      </ul>
      <ButtonLogin onClick={() => navigate("/login")} variation="secondary">
        Login
      </ButtonLogin>
    </nav>
  );
}

export default HomeNav;
