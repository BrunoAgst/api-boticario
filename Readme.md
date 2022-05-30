# API Boticário
> Esse projeto consiste em uma aplicação responsável por registrar as vendas dos revendedores, e também consultar o saldo de cashback do mês e de cada venda. Utilizando o banco de dados MongoDB.
## Rotas
> A API possui 5 rotas:
### Cadastro um novo revendedor
#### POST /dealer
> Essa rota é para cadastrar um novo revendedor, precisa passar um json com os campos para cadastro, por exemplo:
```
{
   "name": "Ana Melissa",
   "tax_id": "12343567844",
   "email": "ana@teste.com",
   "password": "123123123123"
}
```
### Fazer o Login do revendedor
#### POST /dealer/login
> Essa rota é responsável por fazer o login do revendedor e retornar o token para autenticação, por exemplo:
```
{
   "email": "ana@teste.com",
   "password": "123123123123"
}
```
### Cadastrar uma venda
#### POST /sale
> Essa rota é responsável por cadastrar uma venda, precisa passar um json com as informaçōes da venda e token, por exemplo:
```
Json:
 
{
   "cod": "8",
   "value": "100.90",
   "tax_id": "15350946056",
   "date": "11/11/2022"
 
}
 
Token:
{
   Bearer: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOTQyZGZmNGExODNmMzYzMzg0MzhkZiIsImlhdCI6MTY1Mzg3ODI3NSwiZXhwIjoxNjUzODc4ODc1fQ.ihD9x6KCYqZRtTq3OPH2yEXDSdKm-iatPDiJsmJHGL4"
}
```
### Consultar vendas
#### GET /sale
>Essa rota é responsável por retornar todas as vendas de um revendedor, basta informar o token na autorização, por exemplo:
```
Token:
{
   Bearer: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOTQyZGZmNGExODNmMzYzMzg0MzhkZiIsImlhdCI6MTY1Mzg3ODI3NSwiZXhwIjoxNjUzODc4ODc1fQ.ihD9x6KCYqZRtTq3OPH2yEXDSdKm-iatPDiJsmJHGL4"
}
```
### Consultar saldo de cashback
#### GET /cashback/:tax_id
> Essa rota é responsável por retornar o acumulado de cashback do revendedor, basta passar o CPF do mesmo como parâmetro.
## Build
>Existe duas formas de executar a aplicação:
```
1) Após baixar e instalar as dependências, crie o arquivo .env e configure as variáveis de ambiente e por último rode o comando npm run start.
2) Com o docker instalado execute o comando docker-compose up, que irá subir a aplicação com o banco de dados configurado.
```

### Obs: Caso for utilizar o docker alterar a chave secreta do JWT.