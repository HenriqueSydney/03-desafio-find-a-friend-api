# APP

Find a Friend - Rocketseat Challenge <br>

## RFs (Requisitos Funcionais)
[X] - Deve ser possível cadastrar um pet<br>
[X] - Deve ser possível listar todos os pets disponíveis para adoção em uma cidade<br>
[X] - Deve ser possível filtrar pets por suas características<br>
[X] - Deve ser possível visualizar detalhes de um pet para adoção<br>
[X] - Deve ser possível se cadastrar como uma ORG<br>
[X] - Deve ser possível realizar login como uma ORG<br>
[X] - Deve ser possível cadastrar imagens para os PETs <br>

## RN (Regras de Negócio)
[X] - Para listar os pets, obrigatoriamente precisamos informar a cidade<br>
[X] - Uma ORG precisa ter um endereço e um número de WhatsApp<br>
[X] - Um pet deve estar ligado a uma ORG<br>
[X] - O usuário que quer adotar, entrará em contato com a ORG via WhatsApp<br>
[X] - Todos os filtros, além da cidade, são opcionais<br>
[X] - Para uma ORG acessar a aplicação como admin, ela precisa estar logada<br>

## RNFs (Requisitos não-funcionais)
[X] A senha do usuário precisa estar criptografada;<br>
[X] Os dados da aplicação precisão estar persistidos em um banco PostgreSQL;<br>
[X] Todas as listas de dados precisam estar paginadas com 20 itens por página;<br>
[X] O usuário responsável pela organização deve ser identificado por um JWT (JSON Web Token);<br>