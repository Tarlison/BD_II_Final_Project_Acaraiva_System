# Final_Project_BDII_2020.1

O SISTEMA ACARAIVA
        Um sistema de recomendação para leitores. O sitema faz recomendação com base nos livros que você
        costuma ler, além de armazenar sua lista de livros lidos! para que você possa manter o controle e
        assim não se perca na leitura. É preciso se cadastrar no sistema antes de entrar. Caso você entre 
        no sistema sem cadastrar nenhum livro, os livros mais lidos por todos serão recomendados!.

Bancos de dados utilizados
        *   MongoDB
        *   SqLite
        *   Neo4j

Instruções para a execução
        Nota: É preciso ter acesso ao MongoDB e ao Neo4j na máquina, além do NPM e YARN.

        *   Ligando os bancos:
                    Primeiro é necessário inicializar os bancos.
                    Para o MongoDB você deve apenas executá-lo e deixar o serviço em execução.
                    Para o Neo4j você deve:
                            Criar (e inicializar) ou inicializar o seu banco, depois acessar o arquivo "routes.js"
                            dentro da pasta ~/BD_II_Final_Project_Acaraiva_System/backendNeo4j/ 
                            assim na linha
                            `**const driver = new neo4j.driver("neo4j://localhost:7687", neo4j.auth.basic("neo4j", "millo")); //("usuario", "senha")**`
                            e alterar a `porta` e seus `dados de login`.

        * Instalar depedências:
                    Acesse cada Pasta:
                        `cd backendNeo4j/` depois, `cd backendMongo/`, `cd backendSql/` e `cd web/`
                            E execute o comando `yarn install`
        * Executando
                    Ao finalizar a instalação das depedências.
                    Acesse cada pasta assim como foi acessado nas instalações da depedências,
                    Ao acessar digite o comando `yarn dev`.
                    Obs: Na pasta `web` (acessada por `cd web/`) ***deve ser executado o comando npm start***.
                    


        
