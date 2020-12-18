import { useHistory } from "react-router-dom";
import neoApi from "../services/neoApi";
import "../styles/pages/recomendations.css";
import {useEffect, useState} from 'react';
import tree from "../images/arvoreporra.svg";

export default function Recomendations(){
  const history = useHistory();

  const [films, setFilms] = useState([]);
  const username = history.location.state;

  async function dale(){
    //recupera os books recomendados
    const recomendation = await neoApi.get(`/neo4j/${username}`);/*.then( res =>{
      setFilms(res.data.books)
    });*/
    const teste = recomendation.data.books;

    if (teste[0] != null){
      console.log("tem", teste);
      setFilms(teste);
    }else{
      console.log("nao tem", teste);
      const planob = await neoApi.get("/neo4j/recomendados");
      setFilms(planob.data.books);
    }
    
  }

  useEffect(() =>{
    dale()
  }, [])

  console.log(username);

  return(

    <div id="recomendation">

        <h1><br></br>Recomendações</h1>

      <div className="rec-menu">
        <ul>{films.map((book) => <li>{book}</li>)}</ul>
      </div>       

    </div>
  )
}