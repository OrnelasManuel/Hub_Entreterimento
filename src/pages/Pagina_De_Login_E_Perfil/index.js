import { useState } from "react";

import Menu_De_Navegacao from "../../components/Menu_De_Navegacao";
import Pagina_De_Perfil from "./Pagina_De_Perfil";
import Pagina_De_Login from "./Pagina_De_Login";

import "./style.css";

export default function Pagina_De_Login_E_Perfil() {
  const [Estado_Da_Nav_Bar, setEstado_Da_Nav_Bar] = useState(false);

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
        {localStorage.getItem("Token_De_Login") ? (
          <Pagina_De_Perfil />
        ) : (
          <Pagina_De_Login />
        )}
      </div>
    </div>
  );
}
