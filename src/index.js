import { createRoot } from "react-dom/client";
import App from "./App";

const Div_Mae = document.getElementById("Div_Para_Referencia_E_Criacao_React");
const root = createRoot(Div_Mae);

root.render(<App />);
