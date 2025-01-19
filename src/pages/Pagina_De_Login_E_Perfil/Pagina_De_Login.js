import { useState, useEffect } from "react";
import Axios from "axios";

import Loading from "../../img/Loading.gif";

export default function Pagina_De_Login() {
  const [Valor_Do_Input_De_Login_Email, setValor_Do_Input_De_Login_Email] =
    useState("");
  const [Valor_Do_Input_De_Login_Senha, setValor_Do_Input_De_Login_Senha] =
    useState("");

  const [Valor_Do_Input_De_Cadastro_User, setValor_Do_Input_De_Cadastro_User] =
    useState("");
  const [
    Valor_Do_Input_De_Cadastro_Email,
    setValor_Do_Input_De_Cadastro_Email,
  ] = useState("");
  const [
    Valor_Do_Input_De_Cadastro_Senha,
    setValor_Do_Input_De_Cadastro_Senha,
  ] = useState("");

  const [Estado_De_Visao_De_Senha, setEstado_De_Visao_De_Senha] =
    useState(false);
  const [Local_Da_Pagina_De_Login, setLocal_Da_Pagina_De_Login] =
    useState(true);
  const [Carregamento_De_Servidor, setCarregamento_De_Servidor] =
    useState(false);

  const Validar_Tentativa_De_Login = () => {
    Axios.post(
      "https://zvfmwc2c-5000.brs.devtunnels.ms/tentativa-de-login",
      {
        Email_Do_Usuario: Valor_Do_Input_De_Login_Email,
        Senha_Do_Usuario: Valor_Do_Input_De_Login_Senha,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((Resposta) => {
        let Resultado = Resposta.data;
        if (Resultado.Resultado) {
          alert("Usuário conectado!");
          localStorage.setItem("Token_De_Usuario", Resultado.Resposta.Token);
          localStorage.setItem(
            "Informacoes_Do_Usuario_Salvas",
            JSON.stringify(Resultado.Resposta)
          );
        } else {
          alert("Senha Invalida");
        }
      })
      .catch((error) => {
        console.log("Error: " + error);
      })
      .finally(() => {
        setCarregamento_De_Servidor(false);
      });
  };
  const Cadastrar_Usuario = () => {
    Axios.post(
      "https://zvfmwc2c-5000.brs.devtunnels.ms/cadastrar-usuario",
      {
        Usuario: Valor_Do_Input_De_Cadastro_User,
        Email: Valor_Do_Input_De_Cadastro_Email,
        Senha: Valor_Do_Input_De_Cadastro_Senha,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((Resposta) => {
        let Resultado = Resposta.data;
        if (Resultado.Resultado) {
          alert("Usuário conectado!");
          localStorage.setItem("Token_De_Usuario", Resultado.Resposta.Token);
          localStorage.setItem(
            "Informacoes_Do_Usuario_Salvas",
            JSON.stringify(Resultado.Resposta)
          );

          setValor_Do_Input_De_Cadastro_User("");
          setValor_Do_Input_De_Cadastro_Email("");
          setValor_Do_Input_De_Cadastro_Senha("");
        } else {
          alert(Resultado.Resposta);
        }
      })
      .catch((error) => {
        console.log("Error: " + error);
      })
      .finally(() => {
        setCarregamento_De_Servidor(false);
      });
  };

  if (Local_Da_Pagina_De_Login) {
    return (
      <div className="Sessao_De_Login">
        <div className="Conjunto_Inputs_E_Dados_De_Login">
          <h2>Login</h2>
          <form className="Container_De_Formulario_De_Login">
            <div className="Conjunto_De_Inputs Conjunto_De_Input_Email">
              <label
                htmlFor="Id_Do_Input_De_Login_Email"
                style={
                  Valor_Do_Input_De_Login_Email
                    ? {
                        top: "-35px",
                        left: "-10px",
                        fontSize: "1.5rem",
                      }
                    : { cursor: "text" }
                }
              >
                E-mail
              </label>
              <input
                id="Id_Do_Input_De_Login_Email"
                type="email"
                autoComplete="email"
                value={Valor_Do_Input_De_Login_Email}
                onChange={(e) => {
                  setValor_Do_Input_De_Login_Email(e.target.value);
                }}
              />
            </div>
            <div className="Conjunto_De_Inputs Conjunto_De_Input_Senha">
              <label
                htmlFor="Id_Do_Input_De_Login_Senha"
                style={
                  Valor_Do_Input_De_Login_Senha
                    ? {
                        top: "-35px",
                        left: "-10px",
                        fontSize: "1.5rem",
                      }
                    : { cursor: "text" }
                }
              >
                Senha
              </label>
              <input
                id="Id_Do_Input_De_Login_Senha"
                type={!Estado_De_Visao_De_Senha ? "password" : "text"}
                value={Valor_Do_Input_De_Login_Senha}
                autoComplete="current-password"
                onChange={(e) => {
                  setValor_Do_Input_De_Login_Senha(e.target.value);
                }}
              />
              <i
                onClick={() => {
                  setEstado_De_Visao_De_Senha(!Estado_De_Visao_De_Senha);
                }}
                className={
                  !Estado_De_Visao_De_Senha
                    ? "fa-solid fa-eye-slash"
                    : "fa-solid fa-eye"
                }
              ></i>
            </div>
          </form>
          <div className="Conjunto_De_Botoes">
            <button
              className="Primeiro_Botao_Do_Conjunto"
              style={
                Carregamento_De_Servidor ? { backgroundColor: "gray" } : {}
              }
              onClick={() => {
                if (!Carregamento_De_Servidor) {
                  Validar_Tentativa_De_Login();
                }
              }}
            >
              {Carregamento_De_Servidor ? (
                <img src={Loading} className="Carregamento_De_Botao" />
              ) : (
                "Logar"
              )}
            </button>
            <button
              className="Botao_De_Cadastrar"
              style={
                Carregamento_De_Servidor ? { backgroundColor: "gray" } : {}
              }
              onClick={() => {
                if (!Carregamento_De_Servidor) {
                  setLocal_Da_Pagina_De_Login(false);
                }
              }}
            >
              {Carregamento_De_Servidor ? (
                <img src={Loading} className="Carregamento_De_Botao" />
              ) : (
                "Cadastrar"
              )}
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="Sessao_De_Login">
        <div className="Conjunto_Inputs_E_Dados_De_Login">
          <h2>Cadastrar</h2>
          <form className="Container_De_Formulario_De_Login">
            <div className="Conjunto_De_Inputs Conjunto_De_Input_Email">
              <label
                htmlFor="Id_Do_Input_De_Cadastro_User"
                style={
                  Valor_Do_Input_De_Cadastro_User
                    ? {
                        top: "-35px",
                        left: "-10px",
                        fontSize: "1.5rem",
                      }
                    : { cursor: "text" }
                }
              >
                Usuário
              </label>
              <input
                id="Id_Do_Input_De_Cadastro_User"
                type="email"
                autoComplete="email"
                value={Valor_Do_Input_De_Cadastro_User}
                onChange={(e) => {
                  setValor_Do_Input_De_Cadastro_User(e.target.value);
                }}
              />
            </div>
            <div className="Conjunto_De_Inputs Conjunto_De_Input_Email">
              <label
                htmlFor="Id_Do_Input_De_Cadastro_Email"
                style={
                  Valor_Do_Input_De_Cadastro_Email
                    ? {
                        top: "-35px",
                        left: "-10px",
                        fontSize: "1.5rem",
                      }
                    : { cursor: "text" }
                }
              >
                E-mail
              </label>
              <input
                id="Id_Do_Input_De_Cadastro_Email"
                type="email"
                autoComplete="email"
                value={Valor_Do_Input_De_Cadastro_Email}
                onChange={(e) => {
                  setValor_Do_Input_De_Cadastro_Email(e.target.value);
                }}
              />
            </div>
            <div className="Conjunto_De_Inputs Conjunto_De_Input_Senha">
              <label
                htmlFor="Id_Do_Input_De_Cadastro_Senha"
                style={
                  Valor_Do_Input_De_Cadastro_Senha
                    ? {
                        top: "-35px",
                        left: "-10px",
                        fontSize: "1.5rem",
                      }
                    : { cursor: "text" }
                }
              >
                Senha
              </label>
              <input
                id="Id_Do_Input_De_Cadastro_Senha"
                type={!Estado_De_Visao_De_Senha ? "password" : "text"}
                value={Valor_Do_Input_De_Cadastro_Senha}
                autoComplete="current-password"
                onChange={(e) => {
                  setValor_Do_Input_De_Cadastro_Senha(e.target.value);
                }}
              />
              <i
                onClick={() => {
                  setEstado_De_Visao_De_Senha(!Estado_De_Visao_De_Senha);
                }}
                className={
                  !Estado_De_Visao_De_Senha
                    ? "fa-solid fa-eye-slash"
                    : "fa-solid fa-eye"
                }
              ></i>
            </div>
          </form>
          <div className="Conjunto_De_Botoes">
            <button
              className="Primeiro_Botao_Do_Conjunto"
              style={
                Carregamento_De_Servidor ? { backgroundColor: "gray" } : {}
              }
              onClick={() => {
                if (!Carregamento_De_Servidor) {
                  Cadastrar_Usuario();
                }
              }}
            >
              {Carregamento_De_Servidor ? (
                <img src={Loading} className="Carregamento_De_Botao" />
              ) : (
                "Cadastrar"
              )}
            </button>
            <button
              className="Botao_De_Cadastrar"
              style={
                Carregamento_De_Servidor ? { backgroundColor: "gray" } : {}
              }
              onClick={() => {
                if (!Carregamento_De_Servidor) {
                  setLocal_Da_Pagina_De_Login(true);
                }
              }}
            >
              {Carregamento_De_Servidor ? (
                <img src={Loading} className="Carregamento_De_Botao" />
              ) : (
                "Logar"
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }
}
