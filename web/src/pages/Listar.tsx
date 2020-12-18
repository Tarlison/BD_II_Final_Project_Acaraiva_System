import { useHistory } from "react-router-dom";
import {useState, useEffect} from 'react';
import mongoApi from "../services/mongoApi";
import neoApi from "../services/neoApi";


import "../styles/pages/listar.css";

export default function Listar(){

  const history = useHistory();
  const username = history.location.state;

  console.log(username);

  const [books, setFilmes] = useState([]);
  
  async function populate() {
    const dados = await neoApi.get(`/neo4j/${username}/books`).then(res =>{
      setFilmes(res.data.books)
    });
  }

  useEffect(() =>{
    populate();
  },[]);

  console.log(books);
  
  async function handleDelete(book:String) {
    console.log(book);
    const delData = {
      data:{
        "name":username,
        "book":book
      }
    };

    const res = await neoApi.delete("/neo4j", delData)
    alert("Descurtido com sucesso!");
    history.push({pathname:"/dashboard", state:username});
  }
  

  return(
    <div id="likelist">
        <h1><br></br>Filmes Curtidos</h1>
      <div className="like-menu">      
        <table className="lista">
          <tr><th>Filme</th><th>Ações</th></tr>
          {books.map((book) => 
                <tr>
                  <td>{book}</td>
                  <td>
                    <button className="delBtn"
                      onClick={(event) => handleDelete(book)}>
                      Descurtir
                    </button>
                    </td>
                  </tr>
                )}
        </table>


      </div>

    </div>
  )
}