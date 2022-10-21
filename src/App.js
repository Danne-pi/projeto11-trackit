import {createGlobalStyle} from "styled-components";
import { Home } from "./pages/Home";
import { History } from "./pages/History";
import { Register } from "./pages/Register";
import { Today } from "./pages/Today";
import { Habits } from "./pages/Habits";
import { GlobalProvider } from "./Global";
import { BrowserRouter, Routes, Route } from "react-router-dom";


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
          </Routes>
      </GlobalProvider>
    </BrowserRouter>
  );
}

export default App;


const GlobalStyle = createGlobalStyle`
  body{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: aqua;
  }
`