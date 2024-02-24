# API Documentation

## Starting the App

To start the app:

1. Ensure you have Yarn installed on your system. If not, you can install it using the following npm command:

    ```
    npm install -g yarn
    ```

2. Navigate to the project's root directory.

3. Execute the following command:

    ```
    yarn auto
    ```

    This command will automatically install necessary node modules, build the project, and start the server.

4. Once the server is up and running, you're good to go.

## Testing the API

### Player Registration

To register a player:

- Endpoint: `/players`
- Method: `POST`
- Request Body:
  - `name`: Player's name
  - `email`: Player's email
  - `password`: Player's password
  - `country`: Player's country (two-letter code)
- Response: Access and refresh tokens are returned. Save the refresh token for future use. Use the access token in the headers using the Bearer option to access protected routes.

### Player Management

- **Get All Players**:
  - Endpoint: `/players`
  - Method: `GET`
  - Description: Retrieves all registered players.

- **Update Player Attributes**:
  - Endpoint: `/players/:id`
  - Method: `PUT`
  - Description: Updates player attributes. Only `name` and `score` are allowed to be updated. Access token is required.

- **Get Player by Rank**:
  - Endpoint: `/players/rank/:val`
  - Method: `GET`
  - Description: Retrieves the player using the ranking system. Here, `val` is the value of the rank.

- **Get Random Player**:
  - Endpoint: `/players/random`
  - Method: `GET`
  - Description: Retrieves a random player.

- **Delete Player**:
  - Endpoint: `/players/:id`
  - Method: `DELETE`
  - Description: Deletes the player. Access token provided during signup is required in the headers using the Bearer option.

### Note

Ensure to include the access token in the headers of protected routes(Delete and Update) using the Bearer option for authentication and authorization purposes.
