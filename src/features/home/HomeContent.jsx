import { useNavigate } from "react-router";
import Logo from "../../components/Logo";

function HomeContent() {
  const navigate = useNavigate()
  
  return (
    <>
      <main className="absolute top-0">
        <Logo size="large" />
        <div className="absolute top-[430px] space-y-8">
          <h1 className="font-medium text-[28px] text-white">
            Jelajahi dan Temukan Indahnya Dunia Baru di Tanah Bumbu
          </h1>
          <button
            onClick={() => navigate("/maps")}
            className="w-[205px] h-[52px] bg-[#1D5477] rounded-[44px] text-white font-bold cursor-pointer"
          >
            Lihat Peta
          </button>
        </div>
      </main>
      <img src="human.png" alt="" className="absolute bottom-0 right-0 w-2xl" />
    </>
  );
}

export default HomeContent;
