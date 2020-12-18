import { FormEvent, useState} from "react";
import { useHistory } from "react-router-dom";
import '../styles/pages/landing.css';
import api from "../services/api";
import neoApi from "../services/neoApi";
import logo from "../images/LogoAcaraiva.svg";
import tree from "../images/arvoreporra.svg";

function Landing(){
  const [name, setName] = useState("");
  const [senha, setSenha] = useState("");

  const history = useHistory()

  

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    console.log(name);

    const teste = await api.get(`/user/${name}`)

    const empty = teste.data;

    if (empty.length > 0){
      console.log(empty[0].id);
      if (empty[0].senha != senha){
        alert("Senha Incorreta!");
      }else{
        history.push({pathname:"/dashboard", state: empty[0].name });
      }
    }else{
      console.log("Nada");
      alert("Usuário não cadastrado!");
      history.push("/");
    }

  };

  const handleRegister = async(event: FormEvent) =>{
    event.preventDefault();

    const data = {
      "name":name,
      "senha":senha
    }

    const neoData = {"name":name}

    
    console.log(data);

    if (data.name == ""){
      alert("Nome de Usuário Inválido");
    }else if (data.senha == ""){
      alert("Senha Inválida");
    }else{

      const teste = await api.get(`/user/${name}`)

      if (teste.data.length > 0){
        console.log("Already Registered");
        alert("Usuário já cadastrado!");
        history.push("/");

      }else{
        const neoteste = await neoApi.post("/neo4j/create/", neoData);
        const test = await api.post("/user", data);
        alert("Cadastro realizado com Sucesso!");
        console.log(neoteste)
        console.log(test);
      }      
    }
  }

  return(

    <div id="page-landing">
      <div className="content-wrapper">
          <aside>

            <form onSubmit={handleSubmit} className="loginForm">
               <div className="area" >
                       <ul className="circles">
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                   </ul>
                </div >
               <div className="infoForm">
                    <div className="input-block">
                          <label htmlFor="name">Login</label>
                          <input
                            id="name"
                            value={name}
                            required
                            onChange={(e) => setName(e.target.value)}
                          />
                    </div>
                    <div className="input-block">
                          <label htmlFor="senha">Senha</label>
                          <input
                            id="senha"
                            value={senha}
                            required
                            onChange={(e) => setSenha(e.target.value)}
                          />
                    </div>
                    <div className="btnContainer">

                      <button className="confirm-button" type="submit">
                          Entrar
                      </button>
                      <button className="register-button" onClick={handleRegister}>
                          Registrar
                      </button>
                    </div>
                </div>
            </form>
            
          </aside>
          <img src={logo} alt="logo" id="logo" />
          <img src={tree} alt="tree" id="tree" />
          <footer id="rodape">
      Obrigado!
      Markus Kaul, Miller Raycell, Joshua Kook-ho, Josemar Rocha, Luigi Muller, Matheus Fellype.
      Os brabos s2
    </footer>

      </div>
      
    </div>
  );
}

export default Landing;