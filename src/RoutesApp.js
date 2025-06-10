import "./components/styles/index.css";
import Pagina_Inicial from "./pages/Pagina_Inicial/Pagina_Inicial";
import Pagina_Com_Listas from "./pages/Pagina_Com_Listas";
import Pagina_Com_Informacoes from "./pages/Pagina_Com_Informacoes/Pagina_Com_Informacoes";
import Pagina_De_Login_E_Perfil from "./pages/Pagina_De_Login_E_Perfil";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Layout from "./components/Layout";

export default function RoutesApp({
  Valor_Carregamento_De_Dados_Do_Servidor,
  Setar_Carregamento_De_Dados_Do_Servidor,
}) {
  return (
    <BrowserRouter>
      <Layout
        Setar_Carregamento_De_Dados_Do_Servidor={
          Setar_Carregamento_De_Dados_Do_Servidor
        }
      >
        <Routes>
          <Route path="/" element={<Pagina_Inicial />} />
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
          <Route
            path="/informacoes"
            element={
              <Pagina_Com_Informacoes
                Valor_Carregamento_De_Dados_Do_Servidor={
                  Valor_Carregamento_De_Dados_Do_Servidor
                }
              />
            }
          />
          <Route path="/perfil" element={<Pagina_De_Login_E_Perfil />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
