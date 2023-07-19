import { FileProvider } from "../context/fileContext";
import { RouterApp } from "../routes";

import Logo from "../assets/logo-fundo-preto.png";
function App() {
  return (
    <div className="bg-nk-mineirao bg-repeat bg-cover">
      <div className="bg-black/70">
        <FileProvider>
          <header className="bg-black h-20">
            <div>
              <a href="/">
                <img className="h-16" src={Logo} />
              </a>
            </div>
          </header>
          <RouterApp />
        </FileProvider>
      </div>
    </div>
  );
}

export default App;
