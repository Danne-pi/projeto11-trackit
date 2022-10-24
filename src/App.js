import {createGlobalStyle} from "styled-components";
import { Home, Register } from "./pages/Home";
import { History } from "./pages/History";
import { Today } from "./pages/Today";
import { Habits } from "./pages/Habits";
import { GlobalProvider } from "./components/Global";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { UnknownPage } from "./pages/UnknownPage";


function App() {

  return (
    <BrowserRouter>
      <GlobalStyle />
      <GlobalProvider>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/cadastro" element={<Register/>}/>
            <Route path="/habitos" element={<Habits/>}/>
            <Route path="/hoje" element={<Today/>}/>
            <Route path="/historico" element={<History/>}/>
            <Route path="*" exact={true} element={<UnknownPage msg={2}/>} />
          </Routes>
      </GlobalProvider>
    </BrowserRouter>
  );
}

export default App;


const GlobalStyle = createGlobalStyle`
  body{
    height: 100vh;
    margin: 0;
    padding: 0;
  }
  *{
    box-sizing: border-box;
    font-family: 'Lexend Deca', sans-serif;
  }
`