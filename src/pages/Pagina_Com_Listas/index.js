import { useState, useEffect } from "react";

import Menu_De_Navegacao from "../../components/Menu_De_Navegacao";
import Header_De_Pesquisa from "../../components/Header_De_Pesquisa";
import Listagem_De_Itens from "../../components/Listagem_De_Itens";

import "./style.css";
import Axios from "axios";

export default function Pagina_Com_Listas({
  Titulo_Pagina_Da_Sessao,
  Valor_Carregamento_De_Dados_Do_Servidor,
}) {
  const [Estado_Da_Nav_Bar, setEstado_Da_Nav_Bar] = useState(false);

  const [Itens_Salvos_Como_Favorito, setItens_Salvos_Como_Favorito] = useState(
    {}
  );
  const [Listas_Achadas_Por_Tipo, setListas_Achadas_Por_Tipo] = useState([]);
  const [Generos_Pertencentes_A_Sessao, setGeneros_Pertencentes_A_Sessao] =
    useState({});

  useEffect(() => {
    setItens_Salvos_Como_Favorito(
      JSON.parse(localStorage.getItem("Itens_Favoritados_Salvos_No_Navegador"))
    );

    setListas_Achadas_Por_Tipo(
      JSON.parse(localStorage.getItem("Listas_Encontradas_Para_Home"))
    );
  }, []);

  useEffect(() => {
    setListas_Achadas_Por_Tipo(
      JSON.parse(localStorage.getItem("Listas_Encontradas_Para_Home"))
    );
  }, [localStorage.getItem("Listas_Encontradas_Para_Home")]);

  useEffect(() => {
    if (Listas_Achadas_Por_Tipo?.Generos) {
      Listas_Achadas_Por_Tipo.Generos.map((Itens_Primais_Do_Objeto) => {
        Itens_Primais_Do_Objeto.Generos.map((Generos_Separados) => {
          setGeneros_Pertencentes_A_Sessao((prev) => {
            return {
              ...prev,
              [Generos_Separados.id]: Generos_Separados.name,
            };
          });
        });
      });
    }
  }, [Listas_Achadas_Por_Tipo]);

  useEffect(() => {
    localStorage.setItem(
      "Itens_Favoritados_Salvos_No_Navegador",
      JSON.stringify(Itens_Salvos_Como_Favorito)
    );

    if (
      Itens_Salvos_Como_Favorito &&
      Object.keys(Itens_Salvos_Como_Favorito).length > 0 &&
      localStorage.getItem("Token_De_Usuario") &&
      JSON.stringify(Itens_Salvos_Como_Favorito) !==
        JSON.stringify(
          JSON.parse(localStorage.getItem("Informacoes_Do_Usuario_Salvas"))
            ?.Itens_Favoritados
        )
    ) {
      Axios.post(
        "https://hub-entreterimento-server.vercel.app/salvar-itens-favoritados",
        {
          Itens_Favoritados: Itens_Salvos_Como_Favorito,
          Token: localStorage.getItem("Token_De_Usuario"),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((result) => {
        if (result.data.Resultado) {
          console.log(result.data.Nova_Estrutura);

          localStorage.setItem(
            "Informacoes_Do_Usuario_Salvas",
            JSON.stringify(result.data.Nova_Estrutura)
          );
        } else {
          alert("Ocorreu um erro ao salvar no perfil");
        }
      });
    }
  }, [Itens_Salvos_Como_Favorito]);

  return (
    <div className="Corpo_Site">
      <Menu_De_Navegacao
        Valor_Estado_Da_Nav_Bar={Estado_Da_Nav_Bar}
        Setar_Estado_Da_Nav_Bar={setEstado_Da_Nav_Bar}
      />

      <div
        onClick={() => {
          setEstado_Da_Nav_Bar(false);
        }}
        onMouseEnter={() => {
          setEstado_Da_Nav_Bar(false);
        }}
        className="Conteudo_Do_Site"
      >
        <Header_De_Pesquisa Titulo_Pagina_Atual={Titulo_Pagina_Da_Sessao} />
        <Listagem_De_Itens
          Valor_Carregamento_De_Dados_Do_Servidor={
            Valor_Carregamento_De_Dados_Do_Servidor
          }
          Valor_Lista_Com_Os_Itens_Da_Sessao={
            Listas_Achadas_Por_Tipo
              ? Listas_Achadas_Por_Tipo[Titulo_Pagina_Da_Sessao]
                ? Listas_Achadas_Por_Tipo[Titulo_Pagina_Da_Sessao]
                : []
              : []
          }
          Valor_Itens_Salvos_Como_Favorito={Itens_Salvos_Como_Favorito}
          Valor_Itens_Favoritos_Da_Sessao={
            Itens_Salvos_Como_Favorito
              ? Itens_Salvos_Como_Favorito[Titulo_Pagina_Da_Sessao]
                ? Itens_Salvos_Como_Favorito[Titulo_Pagina_Da_Sessao]
                : []
              : []
          }
          Setar_Itens_Favoritos_Da_Sessao={setItens_Salvos_Como_Favorito}
          Valor_Generos_Pertencentes_A_Sessao={Generos_Pertencentes_A_Sessao}
          Titulo_Pagina_Atual={Titulo_Pagina_Da_Sessao}
        />
      </div>
    </div>
  );
}
