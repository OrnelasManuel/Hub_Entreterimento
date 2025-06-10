import Axios from "axios";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

import Atualizacao_De_Dados_No_Navegador from "../components/Atualizacao_De_Dados_No_Navegador";

export default function Layout({
  children,
  Setar_Carregamento_De_Dados_Do_Servidor,
}) {
  const Local = useLocation();
  useEffect(() => {
    if (localStorage.getItem("Token_De_Usuario")) {
      Setar_Carregamento_De_Dados_Do_Servidor(true);
      Axios.post(
        "https://hub-entreterimento-server.vercel.app/atualizar-informacoes",
        {
          Token: localStorage.getItem("Token_De_Usuario"),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((result) => {
          Atualizacao_De_Dados_No_Navegador(result.data.Estrutura_Encontrada);
        })
        .finally(() => {
          Setar_Carregamento_De_Dados_Do_Servidor(false);
        });
    }
  }, [Local]);
  return children;
}
