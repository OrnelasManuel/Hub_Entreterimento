import { useState, useEffect } from "react";
import Axios from "axios";

import "./StylePadrao.css";
import RoutesApp from "./RoutesApp";

export default function App() {
  const [
    Carregamento_De_Dados_Do_Servidor,
    setCarregamento_De_Dados_Do_Servidor,
  ] = useState(true);

  useEffect(() => {
    Axios.post(
      "https://hub-entreterimento.vercel.app/buscar-filmes-series-home",
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
    />
  );
}
