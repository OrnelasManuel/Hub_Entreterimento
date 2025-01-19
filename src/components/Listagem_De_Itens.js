import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Botao_De_Rolagem from "./Botao_De_Rolagem";

import Loading from "../img/Loading.gif";

export default function Listagem_De_Itens({
  Valor_Carregamento_De_Dados_Do_Servidor,
  Valor_Lista_Com_Os_Itens_Da_Sessao,
  Valor_Itens_Favoritos_Da_Sessao,
  Setar_Itens_Favoritos_Da_Sessao,
  Valor_Itens_Salvos_Como_Favorito,
  Valor_Generos_Pertencentes_A_Sessao,
  Titulo_Pagina_Atual,
}) {
  const Navegar = useNavigate();

  const Div_Para_Controle_De_Rolagem = useRef([]);
  const Div_Favorito_Ref_Rolagem = useRef([]);

  const [Coracao_Com_O_Mouse_Focado, setCoracao_Com_O_Mouse_Focado] =
    useState(undefined);
  const [
    Referencias_De_Div_Para_Controle_De_Rolagem,
    setReferencias_De_Div_Para_Controle_De_Rolagem,
  ] = useState([]);

  useEffect(() => {
    setReferencias_De_Div_Para_Controle_De_Rolagem(
      Div_Para_Controle_De_Rolagem
    );
  }, [Div_Para_Controle_De_Rolagem]);

  var Array_De_Itens_Favoritados = [];

  const Construcao_Do_Corpo_Do_Item = (sub_item, Salvando_Favorito) => {
    let Generos_Do_Item = [];

    if (sub_item.genre_ids) {
      sub_item.genre_ids.map((genero_id) => {
        Generos_Do_Item.push(Valor_Generos_Pertencentes_A_Sessao[genero_id]);
      });
    }

    return {
      Nome_Do_Item: sub_item.title || sub_item.name,
      Url_Do_Item: `https://image.tmdb.org/t/p/original${sub_item.backdrop_path}`,
      Id_Do_Item: sub_item.id,
      Quantia_De_Estrelas_Do_Item: sub_item.vote_average,
      Ids_Dos_Generos: Generos_Do_Item,
      Sinpose_Do_Item: sub_item.overview,
      Data_De_Lancamento: sub_item.release_date || sub_item.first_air_date,
      Item_Favoritado: Salvando_Favorito
        ? Salvando_Favorito
        : Array_De_Itens_Favoritados.includes(sub_item.title || sub_item.name),
      Estilo_De_Item: Titulo_Pagina_Atual,
    };
  };

  const Navegar_Para_Mais_Informacoes_Do_Item = (Item_Recebido) => {
    let Corpo_Para_Salvar = Construcao_Do_Corpo_Do_Item(Item_Recebido);

    localStorage.setItem(
      "Produto_Que_Vai_Obter_Informacao",
      JSON.stringify(Corpo_Para_Salvar)
    );

    Navegar("/informacoes");
  };

  return (
    <div className="Conjunto_De_Sessoes">
      <div className="Sessao_De_Filmes_E_Series_Individual">
        {Valor_Itens_Favoritos_Da_Sessao.length > 0 ? (
          <>
            <h2>Meus Favoritos</h2>
            <div
              className="Conjunto_De_Banner_Com_Nome"
              ref={(referencia) =>
                (Div_Favorito_Ref_Rolagem.current[0] = referencia)
              }
            >
              <Botao_De_Rolagem
                Referencia_Obtida_Para_Rolagem={Div_Favorito_Ref_Rolagem}
                Index_Para_Referencia={0}
                Valor_Itens_Favoritos_Da_Sessao={
                  Valor_Itens_Favoritos_Da_Sessao
                }
              />
              {Valor_Itens_Favoritos_Da_Sessao.map((item) => {
                Array_De_Itens_Favoritados.push(item.Nome_Do_Item);

                return (
                  <div
                    className="Banner_E_Nome_Individual"
                    key={
                      item.Url_Do_Item + item.Nome_Do_Item + Titulo_Pagina_Atual
                    }
                    onClick={() => {
                      localStorage.setItem(
                        "Produto_Que_Vai_Obter_Informacao",
                        JSON.stringify({ ...item, Item_Favoritado: true })
                      );

                      Navegar("/informacoes");
                    }}
                  >
                    <i
                      onClick={(event) => {
                        event.stopPropagation();

                        Setar_Itens_Favoritos_Da_Sessao((prev) => {
                          let Novo_Array = [];
                          prev[Titulo_Pagina_Atual].map((item_filtro) => {
                            if (
                              item_filtro.Nome_Do_Item !== item.Nome_Do_Item
                            ) {
                              Novo_Array.push(item_filtro);
                            }
                          });
                          return {
                            ...Valor_Itens_Salvos_Como_Favorito,
                            [Titulo_Pagina_Atual]: [...Novo_Array],
                          };
                        });
                      }}
                      className={
                        Coracao_Com_O_Mouse_Focado == item.Nome_Do_Item
                          ? "fa-regular fa-heart"
                          : "fa-solid fa-heart"
                      }
                      onMouseEnter={() => {
                        setCoracao_Com_O_Mouse_Focado(item.Nome_Do_Item);
                      }}
                      onMouseLeave={() => {
                        setCoracao_Com_O_Mouse_Focado(undefined);
                      }}
                    ></i>
                    <img src={item.Url_Do_Item} />
                    <h3>{item.Nome_Do_Item}</h3>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          ""
        )}
      </div>
      {Valor_Carregamento_De_Dados_Do_Servidor ? (
        <img src={Loading} className="Imagem_De_Carregamento_De_Listas" />
      ) : (
        Valor_Lista_Com_Os_Itens_Da_Sessao.map((item, index) => {
          return (
            <div
              className="Sessao_De_Filmes_E_Series_Individual"
              key={
                "Sessao_De_Filmes_E_Series_Individual" +
                Titulo_Pagina_Atual +
                item.Nome_Categoria
              }
            >
              <h2>{item.Nome_Categoria}</h2>
              <div
                className="Conjunto_De_Banner_Com_Nome"
                ref={(referencia) =>
                  (Div_Para_Controle_De_Rolagem.current[index] = referencia)
                }
              >
                <Botao_De_Rolagem
                  Referencia_Obtida_Para_Rolagem={
                    Referencias_De_Div_Para_Controle_De_Rolagem
                  }
                  Index_Para_Referencia={index}
                />
                {item.Filmes_E_Series_Achados.map((sub_item) => {
                  return (
                    <div
                      className="Banner_E_Nome_Individual"
                      key={
                        Titulo_Pagina_Atual +
                        (sub_item.title || sub_item.name) +
                        sub_item.id
                      }
                      onClick={() => {
                        Navegar_Para_Mais_Informacoes_Do_Item(sub_item);
                      }}
                    >
                      <i
                        onClick={(event) => {
                          event.stopPropagation();

                          if (
                            Array_De_Itens_Favoritados.includes(
                              sub_item.title || sub_item.name
                            )
                          ) {
                            Setar_Itens_Favoritos_Da_Sessao((prev) => {
                              let Novo_Array = [];
                              prev[Titulo_Pagina_Atual].map((item_filtro) => {
                                if (
                                  item_filtro.Nome_Do_Item !==
                                  (sub_item.title || sub_item.name)
                                ) {
                                  Novo_Array.push(item_filtro);
                                }
                              });
                              return {
                                ...Valor_Itens_Salvos_Como_Favorito,
                                [Titulo_Pagina_Atual]: [...Novo_Array],
                              };
                            });
                          } else {
                            if (Valor_Itens_Favoritos_Da_Sessao.length > 0) {
                              Setar_Itens_Favoritos_Da_Sessao((prev) => {
                                let Validador_De_Duplicidade = true;
                                let Criando_Estrutura_Padrao =
                                  Construcao_Do_Corpo_Do_Item(sub_item, true);

                                if (prev[Titulo_Pagina_Atual] && prev) {
                                  prev[Titulo_Pagina_Atual].map(
                                    (item_para_verificar_duplicidade) => {
                                      if (
                                        item_para_verificar_duplicidade.Nome_Do_Item ==
                                        (sub_item.title || sub_item.name)
                                      ) {
                                        Validador_De_Duplicidade = false;
                                      }
                                    }
                                  );
                                }

                                if (Validador_De_Duplicidade) {
                                  if (
                                    prev &&
                                    prev[Titulo_Pagina_Atual].length > 0
                                  ) {
                                    return {
                                      ...Valor_Itens_Salvos_Como_Favorito,
                                      [Titulo_Pagina_Atual]: [
                                        ...prev[Titulo_Pagina_Atual],
                                        Criando_Estrutura_Padrao,
                                      ],
                                    };
                                  } else {
                                    return {
                                      ...Valor_Itens_Salvos_Como_Favorito,
                                      [Titulo_Pagina_Atual]: [
                                        Criando_Estrutura_Padrao,
                                      ],
                                    };
                                  }
                                } else {
                                  return {
                                    ...Valor_Itens_Salvos_Como_Favorito,
                                  };
                                }
                              });
                            } else {
                              let Criando_Estrutura_Padrao =
                                Construcao_Do_Corpo_Do_Item(sub_item, true);

                              Setar_Itens_Favoritos_Da_Sessao({
                                ...Valor_Itens_Salvos_Como_Favorito,
                                [Titulo_Pagina_Atual]: [
                                  Criando_Estrutura_Padrao,
                                ],
                              });
                            }
                          }
                        }}
                        className={
                          Array_De_Itens_Favoritados.includes(
                            sub_item.title || sub_item.name
                          )
                            ? Coracao_Com_O_Mouse_Focado ==
                              (sub_item.title || sub_item.name) +
                                item.Nome_Categoria
                              ? "fa-regular fa-heart"
                              : "fa-solid fa-heart"
                            : Coracao_Com_O_Mouse_Focado ==
                              (sub_item.title || sub_item.name) +
                                item.Nome_Categoria
                            ? "fa-solid fa-heart"
                            : "fa-regular fa-heart"
                        }
                        onMouseEnter={() => {
                          setCoracao_Com_O_Mouse_Focado(
                            (sub_item.title || sub_item.name) +
                              item.Nome_Categoria
                          );
                        }}
                        onMouseLeave={() => {
                          setCoracao_Com_O_Mouse_Focado(undefined);
                        }}
                      ></i>
                      <img
                        src={`https://image.tmdb.org/t/p/original${sub_item.backdrop_path}`}
                      />
                      <h3>{sub_item.title || sub_item.name}</h3>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
