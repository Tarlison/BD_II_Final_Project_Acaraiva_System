import React, { useState, FormEvent, ChangeEvent } from "react";
import { useHistory } from "react-router-dom";

import "../styles/pages/likear.css";

import neoApi from "../services/neoApi";
import mongoApi from "../services/mongoApi";
import tree from "../images/arvoreporra.svg";

export default function Likear() {
  const history = useHistory();

  const username = history.location.state;

  console.log(username);

  const [book, setFilm] = useState("");
  const [year, setYear] = useState("");
  const [gender, setGender] = useState("");
  const [autor, setautor] = useState("");


  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const data = {"book":book};
    const relatData = {"name":username, "book":book};

    const validate = await neoApi.get(`/neo4j/${book}/verifica`);
    const verdade = validate.data.books;

    const mongoData = {
      "name":book,
      "year":year,
      "gender":gender,
      "autor":autor
    };

    console.log(verdade);

    if (verdade[0] != null){

      const relat = await neoApi.post("/neo4j/",relatData);
      console.log("teste",relat);

    }else{
      const mongoteste = await mongoApi.post("/mongo/create", mongoData);
      const teste = await neoApi.post("/neo4j/create_film/", data);
      const relat = await neoApi.post("/neo4j/",relatData);

      console.log("teste2", teste, relat);
      console.log(mongoteste);
    }

    alert("Cadastro realizado com sucesso!");

    history.push({pathname: "/dashboard", state:username});
  };

  return (

    <div id="page-create-book">
      
      <main>
        <form onSubmit={handleSubmit} className="create-book-form">

          <fieldset>
            <legend>Informações do Livro</legend>
            <div className="input-block">
              <label htmlFor="book">Nome do Livro</label>
              <input
                id="book"
                value={book}
                required
                onChange={(e) => setFilm(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="gender">Gênero</label>
              <input
                id="gender"
                value={gender}
                required
                onChange={(e) => setGender(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="year">Ano de lançamento</label>
              <input
                id="year"
                value={year}
                required
                onChange={(e) => setYear(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="autor">Autores</label>
              <input
                id="autor"
                value={autor}
                required
                onChange={(e) => setautor(e.target.value)}
              />
            </div>

          </fieldset>
          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>

        <img src={tree} alt="tree" id="tree3" />  
      </main>
      
      
    </div>
  );
}
