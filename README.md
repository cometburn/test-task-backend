- npm i
- cp .env.local .env
- Login to psql
  create database "todo-db";
  create user "todo-user";
  grant all privileges on database "todo-db" to "todo-user";

- sequelize init
- sequelize db:migrate

- npm run dev
