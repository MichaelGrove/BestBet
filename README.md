# BestBet

- Create a private and public key pair to project root.

## TODO:

- Frontend (Vue SPA)
    - Routing
        - [x] Login /login
        - [x] Dashboard /
            - Place bet -> /place-bet
            - My bets -> /my-bets
        - [x] Place bet /place-bet
        - [ ] My bets (Pending/Results) /my-bets
        - [ ] axios handle session expiration

- Backend
    - [x] Routing
    - [x] Login system
    - [ ] handle unit transfer on bet state change

- Database
    - Tables:
        - [ ] user
            - id
            - email
            - password
            - admin
            - units
        - [x] sports
            - id 
            - name
        - [x] bookmakers
            - id
            - name
        - [x] bet_types
            - id
            - name
        - [x] bets
            - id
            - user_id
            - sport_id
            - bookmaker_id
            - game/description
            - coefficient
            - units
            - timestamps
            - state
    - Seeds:
        - [x] Users
        - [x] Sports
        - [x] Bookmakers
        - [x] Bet types

## Setting up the backend

- Create your .env-file to the root of the project.
- Generate a private and public RS256 key pair to the root of the project named private.key and public.key.
- Run migrations to database.
- Run seeders to database. 01_users.js seeder creates your admin user, so pick up the password of the admin user from the console after the seeders have run.

## Migrations

*Make sure to have knex installed globally.*

- Create migration: ``` knex make:migration [options] <name> ```
- Migrate: ``` knex migrate:latest ```
- Rollback: ``` knex migrate:rollback ```
- Seed: ``` knex seed:run ```
