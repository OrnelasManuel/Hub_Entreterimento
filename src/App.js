import { useState, useEffect } from "react";
import Axios from "axios";

import "./StylePadrao.css";
import RoutesApp from "./RoutesApp";

import Atualizacao_De_Dados_No_Navegador from "./components/Atualizacao_De_Dados_No_Navegador";

export default function App() {
  const [
    Carregamento_De_Dados_Do_Servidor,
    setCarregamento_De_Dados_Do_Servidor,
  ] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("Token_De_Usuario")) {
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
      ).then((result) => {
        Atualizacao_De_Dados_No_Navegador(result.data.Estrutura_Encontrada);
      });
    }

    Axios.post(
      "https://hub-entreterimento-server.vercel.app/buscar-filmes-series-home",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((Resposta) => {
        localStorage.setItem(
          "Listas_Encontradas_Para_Home",
          JSON.stringify(Resposta.data)
        );
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setCarregamento_De_Dados_Do_Servidor(false);
      });

    if (localStorage.getItem("Listas_Encontradas_Para_Home")) {
      setCarregamento_De_Dados_Do_Servidor(false);
    }
  }, []);

  return (
    <RoutesApp
      Valor_Carregamento_De_Dados_Do_Servidor={
        Carregamento_De_Dados_Do_Servidor
      }
      Setar_Carregamento_De_Dados_Do_Servidor={
        setCarregamento_De_Dados_Do_Servidor
      }
    />
  );
}
