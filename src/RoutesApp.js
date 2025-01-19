import "./components/styles/index.css";
import Pagina_Com_Listas from "./pages/Pagina_Com_Listas";
import Pagina_Com_Informacoes from "./pages/Pagina_Com_Informacoes/Pagina_Com_Informacoes";
import Pagina_De_Login_E_Perfil from "./pages/Pagina_De_Login_E_Perfil";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function RoutesApp({ Valor_Carregamento_De_Dados_Do_Servidor }) {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Pagina_Com_Listas
              Titulo_Pagina_Da_Sessao="Filmes"
              Valor_Carregamento_De_Dados_Do_Servidor={
                Valor_Carregamento_De_Dados_Do_Servidor
              }
            />
          }
        />
        <Route
          path="/filmes"
          element={
            <Pagina_Com_Listas
              Titulo_Pagina_Da_Sessao="Filmes"
              Valor_Carregamento_De_Dados_Do_Servidor={
                Valor_Carregamento_De_Dados_Do_Servidor
              }
            />
          }
        />
        <Route
          path="/series"
          element={
            <Pagina_Com_Listas
              Titulo_Pagina_Da_Sessao="Series"
              Valor_Carregamento_De_Dados_Do_Servidor={
                Valor_Carregamento_De_Dados_Do_Servidor
              }
            />
          }
        />
        <Route path="/informacoes" element={<Pagina_Com_Informacoes />} />
        <Route path="/perfil" element={<Pagina_De_Login_E_Perfil />} />
      </Routes>
    </BrowserRouter>
  );
}
