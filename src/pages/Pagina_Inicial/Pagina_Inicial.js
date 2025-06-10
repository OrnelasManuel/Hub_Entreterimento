import "./style.css";
import { useNavigate } from "react-router-dom";

var Tamanho_De_Item = 100;

const Conjunto_Opcoes = [
  {
    Nome: "Filmes",
    Icone: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height={Tamanho_De_Item}
        viewBox="0 -960 960 960"
        width={Tamanho_De_Item}
        fill="#e8eaed"
      >
        <path d="m160-800 80 160h120l-80-160h80l80 160h120l-80-160h80l80 160h120l-80-160h120q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800Zm0 240v320h640v-320H160Zm0 0v320-320Z" />
      </svg>
    ),
  },
  {
    Nome: "Series",
    Icone: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height={Tamanho_De_Item}
        viewBox="0 -960 960 960"
        width={Tamanho_De_Item}
        fill="#e8eaed"
      >
        <path d="M160-80q-33 0-56.5-23.5T80-160v-400q0-33 23.5-56.5T160-640h640q33 0 56.5 23.5T880-560v400q0 33-23.5 56.5T800-80H160Zm0-80h640v-400H160v400Zm240-40 240-160-240-160v320ZM160-680v-80h640v80H160Zm120-120v-80h400v80H280ZM160-160v-400 400Z" />
      </svg>
    ),
  },
];

export default function Pagina_Inicial() {
  const Navegar = useNavigate();

  return (
    <div className="Corpo_Site">
      <div
        className="Conteudo_Do_Site"
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        {Conjunto_Opcoes.map((item, index) => {
          return (
            <div
              key={index + item.Nome + item.Icone}
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: 25,
                margin: 20,
                borderRadius: 200,
                backgroundColor: "#424057",
              }}
              onClick={() => {
                Navegar("/" + item.Nome);
              }}
            >
              {item.Icone}
            </div>
          );
        })}
      </div>
    </div>
  );
}
