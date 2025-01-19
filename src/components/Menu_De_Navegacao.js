import { Link } from "react-router-dom";

const Itens_Menu = [
  {
    Nome_Link: "Login",
    Nome_Link_Alternative: "Olá Usuario",
    Icone_Name: "fa-solid fa-right-to-bracket",
    Icone_Name_Alternative: "fa-solid fa-user",
    Link_Navegacao: "/perfil",
    Condicao_De_Alternative: (item) => {
      return (
        item.Nome_Link == "Login" && localStorage.getItem("Token_De_Login")
      );
    },
    Alternative: false,
  },
  {
    Nome_Link: "Home",
    Icone_Name: "fa-solid fa-house",
    Link_Navegacao: "/",
  },

  {
    Nome_Link: "Filmes",
    Icone_Name: "fa-solid fa-video",
    Link_Navegacao: "/filmes",
  },
  {
    Nome_Link: "Series",
    Icone_Name: "fa-solid fa-tv",
    Link_Navegacao: "/series",
  },
  {
    Nome_Link: "Gêneros",
    Icone_Name: "fa-solid fa-bars",
    Link_Navegacao: "/generos",
  },
  {
    Nome_Link: "Categorias",
    Icone_Name: "fa-regular fa-bookmark",
    Link_Navegacao: "/categorias",
  },
  {
    Nome_Link: "Configuração",
    Icone_Name: "fa-solid fa-gear",
    Link_Navegacao: "/configuracao",
  },
];

export default function Menu_De_Navegacao({
  Valor_Estado_Da_Nav_Bar,
  Setar_Estado_Da_Nav_Bar,
}) {
  return (
    <div
      className="Conjunto_Menu"
      onClick={() => {
        Setar_Estado_Da_Nav_Bar(true);
      }}
      onMouseEnter={() => {
        Setar_Estado_Da_Nav_Bar(true);
      }}
    >
      {Itens_Menu.map((item) => {
        if (item.Condicao_De_Alternative) {
          item.Alternative = item.Condicao_De_Alternative(item);
        }

        if (window.location.pathname !== item.Link_Navegacao) {
          return (
            <Link
              to={item.Link_Navegacao}
              key={
                "Item_Do_Menu" +
                item.Icone_Name +
                item.Link_Navegacao +
                item.Nome_Link
              }
              className="Item_Do_Menu"
              style={
                Valor_Estado_Da_Nav_Bar
                  ? {
                      width: "15vw",
                    }
                  : {
                      width: "4.3rem",
                    }
              }
            >
              <i
                className={
                  item.Alternative
                    ? item.Icone_Name_Alternative
                    : item.Icone_Name
                }
              ></i>
              <span
                style={
                  Valor_Estado_Da_Nav_Bar
                    ? {
                        opacity: 1,
                      }
                    : {
                        opacity: 0,
                      }
                }
              >
                {item.Alternative ? item.Nome_Link_Alternative : item.Nome_Link}
              </span>
            </Link>
          );
        }
      })}
    </div>
  );
}
