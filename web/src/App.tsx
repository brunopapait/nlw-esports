import "./styles/main.css";
import logo from "./assets/logo-nlw-esports.svg";

function App() {
  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logo} alt="Logo da aplicação" />

      <h1 className="text-6xl text-white font-black mt-20">
        Seu{" "}
        <span className="bg-nlw-gradient bg-clip-text text-transparent">
          duo
        </span>{" "}
        está aqui.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        <a href="">
          <img src="/game-1.png" alt="Game 1" />
        </a>
        <a href="">
          <img src="/game-2.png" alt="Game 2" />
        </a>
        <a href="">
          <img src="/game-3.png" alt="Game 3" />
        </a>
        <a href="">
          <img src="/game-4.png" alt="Game 4" />
        </a>
        <a href="">
          <img src="/game-5.png" alt="Game 5" />
        </a>
        <a href="">
          <img src="/game-6.png" alt="Game 6" />
        </a>
      </div>
    </div>
  );
}

export default App;
