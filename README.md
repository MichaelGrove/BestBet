# BestBet

## TODO:

- Frontend (Vue SPA)
    - Routing
        - [ ] Login /login
        - [ ] Dashboard /
            - Place bet -> /place-bet
            - My bets -> /my-bets
        - [ ] Place bet /place-bet
        - [ ] My bets (Pending/Results) /my-bets

- Backend
    - [ ] Routing
    - [ ] Login system

- Database
    - Tables:
        - [ ] user
            - id
            - email
            - password
            - admin
        - [ ] sports
            - id 
            - name
        - [ ] bookmakers
            - id
            - name
        - [ ] bet_states
            - id
            - name
        - [ ] bets
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
        - [ ] Users
        - [ ] Sports
        - [ ] Bookmakers