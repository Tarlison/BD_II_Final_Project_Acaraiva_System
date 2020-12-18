import { useHistory } from "react-router-dom";

import "../styles/pages/dashboard.css";

import tree from "../images/arvoreporra.svg";
import logo from "../images/LogoAcaraiva.svg";

export default function Dashboard(){
  const history = useHistory();

  const teste = history.location;
  const username = teste.state;
  console.log(username);

  function goToLikear(){
    history.push({pathname:"/likear", state:username})
  }

  function goToRecomendation(){
    history.push({pathname:"/recomendations", state:username})
  }

  function goToList(){
    history.push({pathname:"/booklist", state:username})
  }

  return(
    <div id="dashboard">
      
      
      <div className="dashboard-menu">
        <div className="area2" >
                        <ul className="circles2">
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
        <main>

          <div>
            <button 
              className="registerBtn" 
              onClick={goToLikear}>
              <span className="laike">Adicionar Leitura</span>
            </button>
          </div>

          <div>
            <button 
              className="recomendationBtn" 
              onClick={goToRecomendation}>
              <span className="gimme">Recomendações/Dicas</span>
            </button>
          </div>

          <div>
            <button 
              className="moviesBtn" 
              onClick={goToList}>
              <span className="movies">Minha Lista de Livros</span>
            </button>
          </div>
          
        </main>

      </div>
      
    
    <img src={logo} alt="logo2" id="logo2" /> 

    <img src={tree} alt="tree2" id="tree2" /> 
    

    </div>
  )
}