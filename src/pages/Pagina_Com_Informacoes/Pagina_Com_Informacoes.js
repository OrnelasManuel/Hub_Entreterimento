import { useState, useEffect, useRef } from "react";

import Menu_De_Navegacao from "../../components/Menu_De_Navegacao";

import "./style.css";

export default function Pagina_Com_Informacoes() {
  const Referencia_De_Estrelas_Para_Precisao = useRef();

  const [Estado_Da_Nav_Bar, setEstado_Da_Nav_Bar] = useState(false);
  const [Informacoes_Do_Item, setInformacoes_Do_Item] = useState(false);
  const [Coracao_Com_O_Mouse_Focado, setCoracao_Com_O_Mouse_Focado] =
    useState(undefined);
  const [Itens_Salvos_Como_Favorito, setItens_Salvos_Como_Favorito] = useState(
    {}
  );
  const [
    Opiniao_Deixada_Dentro_Do_Texte_Area,
    setOpiniao_Deixada_Dentro_Do_Texte_Area,
  ] = useState();

  const Transformar_Palavra_Em_Cor = (Palavra) => {
    let hash = 0;
    for (let i = 0; i < Palavra.length; i++) {
      hash = Palavra.charCodeAt(i) + ((hash << 5) - hash);
    }

    const rgb = [];
    for (let i = 0; i < 3; i++) {
      rgb.push((hash >> (i * 8)) & 0xff);
    }

    return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.7)`;
  };

  useEffect(() => {
    setInformacoes_Do_Item(
      JSON.parse(localStorage.getItem("Produto_Que_Vai_Obter_Informacao"))
    );
    setItens_Salvos_Como_Favorito(
      JSON.parse(localStorage.getItem("Itens_Favoritados_Salvos_No_Navegador"))
    );
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "Itens_Favoritados_Salvos_No_Navegador",
      JSON.stringify(Itens_Salvos_Como_Favorito)
    );
  }, [Itens_Salvos_Como_Favorito]);

  useEffect(() => {
    console.log(Informacoes_Do_Item);
  }, [Informacoes_Do_Item]);

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
        className="Conteudo_Do_Site Div_Com_Informacoes"
      >
        <div className="Conjunto_De_Informacoes_Lado_Esquerdo">
          <div className="Conjunto_Imagem_Com_Coracao_Informacao ">
            <i
              onClick={(event) => {
                event.stopPropagation();

                if (Informacoes_Do_Item.Item_Favoritado) {
                  console.log("Item favoritado");

                  setItens_Salvos_Como_Favorito((prev) => {
                    let Novo_Array = [];
                    prev[Informacoes_Do_Item.Estilo_De_Item].map(
                      (item_filtro) => {
                        if (
                          item_filtro.Nome_Do_Item !==
                          Informacoes_Do_Item.Nome_Do_Item
                        ) {
                          console.log(Informacoes_Do_Item.Nome_Do_Item);
                          console.log(
                            "Itens que passaram: " + item_filtro.Nome_Do_Item
                          );
                          Novo_Array.push(item_filtro);
                        }
                      }
                    );

                    setInformacoes_Do_Item((prev) => {
                      return { ...prev, Item_Favoritado: false };
                    });

                    return {
                      ...Itens_Salvos_Como_Favorito,
                      [Informacoes_Do_Item.Estilo_De_Item]: [...Novo_Array],
                    };
                  });
                } else {
                  setInformacoes_Do_Item((prev) => {
                    return { ...prev, Item_Favoritado: true };
                  });

                  if (
                    Itens_Salvos_Como_Favorito[
                      Informacoes_Do_Item.Estilo_De_Item
                    ] &&
                    Itens_Salvos_Como_Favorito[
                      Informacoes_Do_Item.Estilo_De_Item
                    ].length > 0
                  ) {
                    setItens_Salvos_Como_Favorito((prev) => {
                      let Validador_De_Duplicidade = true;

                      if (prev[Informacoes_Do_Item.Estilo_De_Item] && prev) {
                        prev[Informacoes_Do_Item.Estilo_De_Item].map(
                          (item_para_verificar_duplicidade) => {
                            if (
                              item_para_verificar_duplicidade.Nome_Do_Item ==
                              Informacoes_Do_Item.Nome_Do_item
                            ) {
                              Validador_De_Duplicidade = false;
                            }
                          }
                        );
                      }

                      if (Validador_De_Duplicidade) {
                        if (
                          prev &&
                          prev[Informacoes_Do_Item.Estilo_De_Item].length > 0
                        ) {
                          return {
                            ...Itens_Salvos_Como_Favorito,
                            [Informacoes_Do_Item.Estilo_De_Item]: [
                              ...prev[Informacoes_Do_Item.Estilo_De_Item],
                              Informacoes_Do_Item,
                            ],
                          };
                        } else {
                          return {
                            ...Itens_Salvos_Como_Favorito,
                            [Informacoes_Do_Item.Estilo_De_Item]: [
                              Informacoes_Do_Item,
                            ],
                          };
                        }
                      } else {
                        return {
                          ...Itens_Salvos_Como_Favorito,
                        };
                      }
                    });
                  } else {
                    setItens_Salvos_Como_Favorito({
                      ...Itens_Salvos_Como_Favorito,
                      [Informacoes_Do_Item.Estilo_De_Item]: [
                        Informacoes_Do_Item,
                      ],
                    });
                  }
                }
              }}
              className={
                Informacoes_Do_Item.Item_Favoritado
                  ? Coracao_Com_O_Mouse_Focado ==
                    Informacoes_Do_Item.Nome_Do_Item
                    ? "fa-regular fa-heart"
                    : "fa-solid fa-heart"
                  : Coracao_Com_O_Mouse_Focado ==
                    Informacoes_Do_Item.Nome_Do_Item
                  ? "fa-solid fa-heart"
                  : "fa-regular fa-heart"
              }
              onMouseEnter={() => {
                setCoracao_Com_O_Mouse_Focado(Informacoes_Do_Item.Nome_Do_Item);
              }}
              onMouseLeave={() => {
                setCoracao_Com_O_Mouse_Focado(undefined);
              }}
            ></i>

            <img src={Informacoes_Do_Item.Url_Do_Item} />
          </div>
          <h2>Informações:</h2>
          <div className="Conjunto_Generos_E_Titulo">
            <p>Gêneros: </p>

            {Informacoes_Do_Item.Ids_Dos_Generos &&
              Informacoes_Do_Item.Ids_Dos_Generos.map((item, index) => {
                return (
                  <span
                    key={item + index}
                    style={{
                      backgroundColor: Transformar_Palavra_Em_Cor(item),
                    }}
                  >
                    {item}
                  </span>
                );
              })}
          </div>
          <p>Categorias: </p>
          <p>
            Lançamento:{" "}
            {Informacoes_Do_Item.Data_De_Lancamento &&
              Informacoes_Do_Item.Data_De_Lancamento.split("-")
                .reverse()
                .join("/")}
          </p>
          <p>Sinopse:</p>
          <p>{Informacoes_Do_Item.Sinpose_Do_Item}</p>
        </div>
        <div className="Conjunto_De_Informacoes_Lado_Direito">
          <div className="Conjunto_De_Titulo_E_Notas">
            <h1 className="Titulo_Do_Item_informacoes">
              {Informacoes_Do_Item.Nome_Do_Item}
            </h1>
            <span className="Nota_Do_Item_Informacoes">
              Nota:{" "}
              {Informacoes_Do_Item.Quantia_De_Estrelas_Do_Item
                ? Informacoes_Do_Item.Quantia_De_Estrelas_Do_Item.toFixed(2)
                : "??"}
              /10
            </span>
            <div className="Conjunto_De_Estrelas_Informacao">
              <div className="Estrelas_Vazias_Informacao">
                <i className="fa-regular fa-star"></i>
                <i className="fa-regular fa-star"></i>
                <i className="fa-regular fa-star"></i>
                <i className="fa-regular fa-star"></i>
                <i className="fa-regular fa-star"></i>
              </div>
              <div
                className="Estrelas_Cheias_Informacao"
                ref={Referencia_De_Estrelas_Para_Precisao}
                style={
                  Referencia_De_Estrelas_Para_Precisao.current
                    ? {
                        width:
                          (Referencia_De_Estrelas_Para_Precisao.current
                            .scrollWidth /
                            10) *
                            Informacoes_Do_Item.Quantia_De_Estrelas_Do_Item +
                          "px",
                      }
                    : {}
                }
              >
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </div>
            </div>
          </div>

          <div className="Conjunto_Avaliacao_Titulo_E_Escrita">
            <h3>Avaliação:</h3>

            <textarea
              onInput={(e) => {
                if (
                  e.target.value.trim().split(/\s+/).filter(Boolean).length <
                  5000
                ) {
                  setOpiniao_Deixada_Dentro_Do_Texte_Area(e.target.value);
                } else {
                  console.log(
                    e.target.value.trim().split(/\s+/).filter(Boolean).length
                  );
                  alert("Limite máximo atingido");
                }
              }}
              value={Opiniao_Deixada_Dentro_Do_Texte_Area}
              className="Input_De_Avaliacao_Informacao"
              placeholder="Deixe sua opinião aqui..."
            ></textarea>
            <p className="Informacao_De_Quantas_Palavras_Maximas">
              Máx. 5.000 letras
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
