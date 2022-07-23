# Boas-vindas ao repositório do projeto API de Blogs!

- Este projeto contém minha API e banco de dados para a produção de conteúdos para um blog. Através dos endpoints é possivel fazer um login que disponibilizará um token, e também fazer um CRUD completo (Create, Read, Update e Delete) de usuários, categorias e posts.

- O projeto foi desenvolvida para utilzar a ORM Sequelize e tokens para autentificação com JWT, uma arquitetura de software MSC (model-service-controller), Express para as rotas, utiliza um banco MySQL para a gestão de dados e Joi para validação dos dados recebidos. Além disso, a API é RESTful!

  - Este projeto foi individual e foram `6` dias de projeto.

---

# Como rodar localmente...

- Para rodar este projeto localmente você vai precisar ter instalado o Docker, GitHub, Node e um gerenciador de banco de dados, e basta seguir o passo a passo abaixo.

1. Clone o repositório com o comando:
  - `git clone git@github.com:caioBatistaDosSantos/Project-Blogs-API.git`;
    - Entre na pasta do repositório:
      - `cd Project-Blogs-API`
2. Instale as dependencia com o comando:
  - `npm install`
3. Suba o container Docker com o comando:
  - `docker-compose up -d --build`
4. Concte-se a um gerenciador de banco de dados com os seguintes dados:
  - host='localhost',
  - user='root',
  - port='3306',
  - password='password',
  (Essa conexão será nescessária para criar o banco de dados)
5. Entre no terminal do container Docker com o comando:
  - `docker exec -it blogs_api bash`
6. Suba o banco de dados com o comando:
  - `npm run prestart` (este comando deve ser realizado dentro do terminal do container)
7. Popule o banco de dados com o comando:
  - `npm run seed` (este comando deve ser realizado dentro do terminal do container)
8. Por fim inicie a aplicação com o comando:
  - `npm start` (este comando deve ser realizado dentro do terminal do container)

---

# Rotas do Projeto

## 1 - Endpoint POST /user

- O endpoint adiciona um novo usuário ao banco de dados;

- O corpo da requisição deverá ter o seguinte formato:

  ```json
  {
    "displayName": "Brett Wiltshire",
    "email": "brett@email.com",
    "password": "123456",
    "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
  }
  ```

- O campo `displayName` deverá ter no mínimo 8 caracteres. Ele é obrigatório.
- O campo `email` deverá ser um email no formato válido e não pode já estar cadastrado. Ele é obrigatório.
- O campo `password` deverá ter no mínimo 6 caracteres. Ele é obrigatório.
- O campo `image` é obrigatório.


- Caso esteja tudo certo, retorna o `status 201` e um token válido.

## 2 - Endpoint POST /login

- O endpoint é capaz de realizar um login;

- O corpo da requisição deverá ter o seguinte formato:

  ```json
  {
    "email": "lewishamilton@gmail.com",
    "password": "123456"
  }
  ```


- Caso 'email' e 'password' estejam corretos, retorna o `status 200` e um token válido.

## 3 - Endpoint GET /user

- O endpoint retorna um array com todos os usuários cadastrados. Devendo retornar o `status 200`, com os dados no corpo.

- Este endpoint nessecita de um campo `authorization` no header da requisição com um token válido gerado nos endpoints POST `/user` e `/login`.

## 4 - Endpoint GET /user/:id

- O endpoint retorna um usuário com base no id da rota. Devendo retornar o `status 200` ao fazer uma requisição com um usuário existente (ex: `/user/1`), tambem retorna com os dados do usuário no corpo.

- Este endpoint nessecita de um campo `authorization` no header da requisição com um token válido gerado nos endpoints POST `/user` e `/login`.

- Caso não seja encontrado um produto com base no id da rota, o endpoint deve retornar o `status 404` com o seguinte corpo:

  ```json
  {
    "message": "User does not exist"
  }
  ```

## 5 - Endpoint POST /categories

- O endpoint adiciona uma nova categoria ao banco de dados;

- Este endpoint nessecita de um campo `authorization` no header da requisição com um token válido gerado nos endpoints POST `/user` e `/login`.

- O corpo da requisição deverá ter o seguinte formato:

  ```json
  {
    "name": "Typescript",
  }
  ```

- O campo `name`  é obrigatório.

- Caso esteja tudo certo, retorna o `status 201` e a nova categoria no corpo.

## 6 - Endpoint GET /categories

- O endpoint retorna um array com todas as categorias cadastradas. Devendo retornar o `status 200`, com os dados no corpo.

- Este endpoint nessecita de um campo `authorization` no header da requisição com um token válido gerado nos endpoints POST `/user` e `/login`.

## 7 - Endpoint POST /post

- O endpoint adiciona um novo post ao banco de dados;

- Este endpoint nessecita de um campo `authorization` no header da requisição com um token válido gerado nos endpoints POST `/user` e `/login`.

- O corpo da requisição deverá ter o seguinte formato:

  ```json
  {
    "title": "Latest updates, August 1st",
    "content": "The whole text for the blog post goes here in this key",
    "categoryIds": [1, 2]
  }
  ```

- O campo `title` é obrigatório.
- O campo `content` é obrigatório.
- O campo `categoryIds` deve ser um id de uma categorias existente. Ele é obrigatório.


- Caso esteja tudo certo, retorna o `status 201` e o novo post no corpo.

## 8 - Endpoint GET /post

- O endpoint retorna um array com todos os posts cadastrados, com seus respectivos usuários donos e categorias. Devendo retornar o `status 200`, com os dados no corpo.

- Este endpoint nessecita de um campo `authorization` no header da requisição com um token válido gerado nos endpoints POST `/user` e `/login`.

## 9 - Endpoint GET /post/:id

- O endpoint retorna um posst com base no id da rota, com seu respectivo usuário dono e categoria. Devendo retornar o `status 200`, com os dados no corpo.

- Este endpoint nessecita de um campo `authorization` no header da requisição com um token válido gerado nos endpoints POST `/user` e `/login`.

## 10 - Endpoint PUT /post:id

- O endpoint atualiza post do banco de dados;

- Este endpoint nessecita de um campo `authorization` no header da requisição com um token válido gerado nos endpoints POST `/user` e `/login`.

- O corpo da requisição deverá ter o seguinte formato:

  ```json
  {
    "title": "Latest updates, August 1st",
    "content": "The whole text for the blog post goes here in this key"
  }
  ```

- O campo `title` é obrigatório.
- O campo `content` é obrigatório.
- So é possível atualizar um post caso você seja dono dele.


- Caso esteja tudo certo, retorna o `status 200` e o post atualizado no corpo.

## 11 - Endpoint DELETE /post/:id

- O endpoint deleta um post cadastrado no banco, passado pelo id da rota. Devendo retornar o `status 204`, com o corpo vazio.

- So é possível deletar um post caso você seja dono dele.

- Este endpoint nessecita de um campo `authorization` no header da requisição com um token válido gerado nos endpoints POST `/user` e `/login`.

## 12 - Endpoint DELETE /user/me

- O endpoint deleta o seu usuário do banco de dados, passado atraves do token da requisição. Devendo retornar o `status 204`, com o corpo vazio.

- Este endpoint nessecita de um campo `authorization` no header da requisição com um token válido gerado nos endpoints POST `/user` e `/login`.

## 13 - Endpoint GET /post/search?q=:searchTerm

- O endpoint retorna um array com todos os posts cadastrados que tenham o 'searchTerm' extraído do query params em seu título ou conteúdo, com seus respectivos usuários donos e categorias. Devendo retornar o `status 200`, com os dados no corpo.

- Este endpoint nessecita de um campo `authorization` no header da requisição com um token válido gerado nos endpoints POST `/user` e `/login`.

---

# Feedback são bem-vindos!!

- Se Possivel, deixe seu feedback ou seu code-review! Muito Obrigado! :)🤝🛠

- Linkedin: https://www.linkedin.com/in/caio-batista-dos-santos/
- Gmail: drcaiosan@gmail.com
