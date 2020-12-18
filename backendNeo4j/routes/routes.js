const express = require('express');
const router = express.Router();

//Configuração neo4j -- https://adamcowley.co.uk/javascript/using-the-neo4j-driver-with-nodejs/
const neo4j = require('neo4j-driver');
const driver = new neo4j.driver("neo4j://localhost:7687", neo4j.auth.basic("neo4j", "millo")); //("usuario", "senha")


//books + assistidos, usuario novo sem curtidas
router.get('/neo4j/recomendados', async function(req, res, next){

    const session = driver.session({
        database: 'neo4j', // <-- Connect to the database `myclient`
    })

    const node_res = await session.run(
        `MATCH (:Person)-[l:READ]->(b:Book)
        WITH b, count(l) as quant_atores
        RETURN b.title, quant_atores
        ORDER BY quant_atores DESC
        LIMIT 3`
    , {});
    session.close();
    
    console.log({books: node_res["records"].map((name)=>{
        return name["_fields"][0]
    })});

    res.send({books: node_res["records"].map((name)=>{
        return name["_fields"][0]
    })});

}); 

 //books + assistidos, usuario ja existente e ja curtiu um filme
router.get('/neo4j/:name', async function(req, res, next){
    const session = driver.session({
        database: 'neo4j', // <-- Connect to the database `myclient`
    })

    console.log(req.params.name);

    const node_res = await session.run(
        `MATCH
        (p:Person)-[:READ]->(b:Book)<-[:READ]-(p2:Person)-[:READ]->(b2:Book)
        WHERE p.name = "${req.params.name}"
        WITH b2
        WHERE NOT (p)-[:READ]->(b2)
        RETURN b2.title, COUNT(b2) as m2_t
        ORDER BY m2_t DESC LIMIT 3`
    , {});
    session.close();
    
    console.log({books: node_res["records"].map((name)=>{
        
        return name["_fields"][0]
    })});

    res.send({books: node_res["records"].map((name)=>{

        return name["_fields"][0]
    })});

});

//CRIAR NODO PESSOA
router.post('/neo4j/create/', async function(req, res, next){

    let {name} = req.body;

    const session = driver.session({
        database: 'neo4j', // <-- Connect to the database `myclient`
    });

    const node_res = await session.run(
        `CREATE (n:Person {name:"${name}"}) return n`, {});
    session.close();

    console.log("RESULT", node_res);

    res.send({books: node_res["records"].map((name)=>{
        return name["_fields"]
    })});
   
});

//CRIAR NODO FILME
router.post('/neo4j/create_film/', async function(req, res, next){

    let {book} = req.body;

    const session = driver.session({
        database: 'neo4j', // <-- Connect to the database `myclient`
    });

    const node_res = await session.run(
        `CREATE (b:Book {title:"${book}"}) return b`, {});
    session.close();

    console.log("RESULT", node_res);

    res.send({books: node_res["records"].map((name)=>{
        return name["_fields"]
    })});
   
});

// CRIAR RELACAO PESSOA -- GOSTA -- FILME
router.post('/neo4j/', async function(req, res, next){

    let {name, book} = req.body;

    const session = driver.session({
        database: 'neo4j', // <-- Connect to the database `myclient`
    });

    const node_res = await session.run(
        `MATCH (a: Person), (b:Book)
        WHERE a.name = '${name}' AND b.title = '${book}'
        CREATE (a)-[r:READ]->(b)
        RETURN a.name, b.title`, {});
    session.close();

    console.log("RESULT", node_res);

    res.send({books: node_res["records"].map((name)=>{
        return name["_fields"]
    })});
   
});

//DELETA RELACAO PESSOA -- GOSTA -- FILME
router.delete('/neo4j', async function(req, res, next){

    let {name, book} = req.body;

    const session = driver.session({
        database: 'neo4j', // <-- Connect to the database `myclient`
    });
    const node_res = await session.run(
        `MATCH (a: Person)-[r:READ]->(b:Book)
        WHERE a.name = '${name}' AND b.title = '${book}'
        DELETE r
        RETURN a.name, b.title`, {});
    session.close();
    
    res.send({books: node_res["records"].map((name)=>{
        return name["_fields"]
    })});
});

//checa se o nodo com o filme ja existe
router.get('/neo4j/:name/verifica', async function(req, res, next){
    const session = driver.session({
        database: 'neo4j', // <-- Connect to the database myclient
    })

    const node_res = await session.run(
        `MATCH (b:Book {title: "${req.params.name}"}) RETURN b.title`
    , {});
    session.close();

    // console.log("RESULT", node_res);
    res.send({books: node_res["records"].map((name)=>{
        return name["_fields"][0]
    })});

});

//devolve os books que a pessoa curtiu
router.get('/neo4j/:name/books', async function(req, res, next){
    const session = driver.session({
        database: 'neo4j', // <-- Connect to the database myclient
    })

    const node_res = await session.run(
        `MATCH (p:Person {name: "${req.params.name}"})-[:READ]->(b:Book) RETURN b.title` 
    , {});
    session.close();

    // console.log("RESULT", node_res);
    res.send({books: node_res["records"].map((name)=>{
        return name["_fields"][0]
    })});

});
module.exports = router;