# App
Gympass style app.
## RFs - Requisitos Funcionais
- O que vai ser possível o usuário fazer no app.
- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter um perfil de usuário logado;
- [] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [] Deve ser possível obter o seu histórico de check-ins;
- [] Deve ser possível buscar academias próximas;
- [] Deve ser possível buscar academias pelo nome;
- [x] Deve ser possível o usuário realizar check-in em uma academia;
- [] Deve ser possível validar o check-in do usuário;
- [] Dever ser possível cadastrar uma academia.

## RNs - Regras de Negócio
- Caminhos que cada requisito pode seguir
- [x] O usuário deve poder se cadastrar com um e-mail duplicado;
- [] O usuário não pode fazer 2 check-ins no mesmo dia;
- [] O usuário não pode fazer check-in se não tiver perto (100m) da academia;
- [] O check-in só pode ser validado até 20 minutos após ser criado;
- [] O check-in só pode ser validado por administradores;
- [] A academia só pode ser cadastrada por administradores.

## RNFs - Requisitos Não Funcionais
- Restrições do app
- [x] A senha do usuário precisa estar criptografada;
- [] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [] O usuário deve ser identificado por um token JWT.