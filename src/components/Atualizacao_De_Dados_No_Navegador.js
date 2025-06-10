export default function Atualizacao_De_Dados_No_Navegador(Atualizacao) {
  // console.log("Executado");
  // console.log(Atualizacao);

  localStorage.setItem(
    "Informacoes_Do_Usuario_Salvas",
    JSON.stringify(Atualizacao)
  );

  if (Atualizacao.Itens_Favoritados) {
    localStorage.setItem(
      "Itens_Favoritados_Salvos_No_Navegador",
      JSON.stringify(Atualizacao.Itens_Favoritados)
    );
  }
  if (Atualizacao.Avaliacoes_Escritas) {
    localStorage.setItem(
      "Avaliacoes_Escritas",
      JSON.stringify(Atualizacao.Avaliacoes_Escritas)
    );
  }
}
