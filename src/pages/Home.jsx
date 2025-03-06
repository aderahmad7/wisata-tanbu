import HomeNav from "../features/home/HomeNav";
import HomeContent from "../features/home/HomeContent";

function Home() {
  return (
    <div className="h-dvh px-20 bg-[url('/background-home.png')] bg-cover">
      <HomeNav />
      <HomeContent />
    </div>
  );
}

export default Home;
