import { useRef } from "react";

export default function Header_De_Pesquisa({ Titulo_Pagina_Atual }) {
  const Referencia_Input = useRef();

  return (
    <div className="Header_Pesquisa">
      <div className="Alinhamento_De_Titulo">
        <h1>{Titulo_Pagina_Atual}</h1>
      </div>
      <div className="Header_Pesquisa_Input_E_Icon">
        <input
          ref={Referencia_Input}
          type="text"
          placeholder="Pesquise aqui..."
        />
        <i
          className="fa-solid fa-magnifying-glass"
          onClick={() => {
            Referencia_Input.current.focus();
          }}
        ></i>
      </div>
    </div>
  );
}
