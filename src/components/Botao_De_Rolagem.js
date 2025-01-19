import { useEffect, useState } from "react";

export default function Botao_De_Rolagem({
  Referencia_Obtida_Para_Rolagem,
  Index_Para_Referencia,
  Valor_Itens_Favoritos_Da_Sessao,
}) {
  const [Tamanho_Do_Scroll_Do_Elemento, setTamanho_Do_Scroll_Do_Elemento] =
    useState();

  useEffect(() => {
    setTamanho_Do_Scroll_Do_Elemento(
      window.innerWidth / 2 <
        Referencia_Obtida_Para_Rolagem.current[Index_Para_Referencia]
          .scrollWidth
    );
  }, []);

  useEffect(() => {
    setTamanho_Do_Scroll_Do_Elemento(
      window.innerWidth / 2 <
        Referencia_Obtida_Para_Rolagem.current[Index_Para_Referencia]
          .scrollWidth
    );
  }, [Valor_Itens_Favoritos_Da_Sessao]);

  const Mover_Barra_De_Rolagem = (Rolar_Para_Frente) => {
    const containerWidth =
      Referencia_Obtida_Para_Rolagem.current[Index_Para_Referencia]
        .offsetWidth * 0.9;

    Referencia_Obtida_Para_Rolagem.current[Index_Para_Referencia].scrollBy({
      left: Rolar_Para_Frente ? containerWidth : -containerWidth,
      behavior: "smooth",
    });
  };

  return (
    <span
      style={
        Tamanho_Do_Scroll_Do_Elemento
          ? { display: "flex" }
          : { display: "none" }
      }
    >
      <i
        className="fa-solid fa-arrow-left Seta_Para_Navegacao_De_Barra"
        onClick={() => {
          Mover_Barra_De_Rolagem(false);
        }}
      ></i>
      <i
        className="fa-solid fa-arrow-right Seta_Para_Navegacao_De_Barra_Direita"
        onClick={() => {
          Mover_Barra_De_Rolagem(true);
        }}
      ></i>
    </span>
  );
}
