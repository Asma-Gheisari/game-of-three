# Game of Three
Game of Three is a two-player game implemented in Node.js that utilizes Socket.io for real-time communication between players. This README provides an overview of the project's folder structure, key components, and additional information about assumptions and limitations.

## Interaction Flow

In the Game of Three, clients interact with the server by sending a request to the following endpoint:

`localhost:3000/game`

Upon making this request, the server responds by serving the `Game.html` file to the clients. This HTML page is the entry point for players and serves as the user interface for the game.

### Socket Connection

The server establishes a WebSocket (Socket.io) connection on application startup. When clients open the served `Game.html` page, they automatically connect to this WebSocket. The WebSocket connection is a crucial component for enabling real-time communication and coordination between players during the game.

### GameCoordinator

The `GameCoordinator` plays a pivotal role in the Game of Three. It is in charge of coordinating the game and managing player interactions. When clients connect to the WebSocket, they are automatically joined to a `GameCoordinator` instance. This coordination ensures that players can communicate, initiate games, and play rounds seamlessly.

The `GameCoordinator` orchestrates the flow of the game, including starting new games, handling player moves, and determining game outcomes. It ensures that the two-player limit is maintained for each game session.

# Folder Structure
The project's folder structure is organized as follows:

├───application

├───configurations

├───controllers

├───domain

│   ├───client

│   ├───game

│   ├───messaging

│   ├───move

│   └───player

├───exceptions

├───infrastructure

├───middlewares

├───routers

├───services

└───test

**application:** Contains application-specific files.
**configurations:** Holds configuration files.
**controllers: **Contains controllers responsible for handling HTTP requests.
**domain: **Houses domain-related components.
**client:** Defines client-related classes and interfaces.
**game:** Contains game-related logic and classes.
**messaging:** Includes messaging-related classes and interfaces.
**move:** Holds move-related logic and classes.
**player:** Defines player-related classes.
**exceptions:** Contains custom exception classes.
**infrastructure:** Includes infrastructure-related components.
**middlewares:** Holds Express middleware functions.
**routers:** Defines Express routers for handling routes.
**services:** Contains service classes.
**test:** Contains test files.
# Project Components
### ExpressApp
The ExpressApp class sets up an Express.js application with Socket.io integration. It initializes the game coordinator, configures middleware, and sets up routes.

### Client and MessageChannel
These interfaces define client and message channel properties and methods for communication between players.

### MoveStrategy and DefaultMoveStrategy
The MoveStrategy interface defines methods for calculating moves in the game. The DefaultMoveStrategy class implements a default move strategy for the game.

### MoveResultMoveResult
The MoveResult interface represents the result of a player's move.

### Game
The Game abstract class provides the blueprint for the game. It includes properties like the number of players, current player, and current move. Subclasses implement game-specific logic.

### GameOfThree
The GameOfThree class extends Game and represents the specific implementation of the Game of Three. It handles game initiation and rounds between two players.

#### BasePlayer and GameOfThreePlayer
The BasePlayer abstract class defines player properties and methods. GameOfThreePlayer extends BasePlayer and implements the Game of Three player logic.

#### PlayerFactory and GameOfThreePlayerFactory
These interfaces define player factory methods. The GameOfThreePlayerFactory creates GameOfThreePlayer instances.

## Assumptions
**Communication via Socket:** The game assumes communication between players occurs through Socket.io, providing real-time interaction between participants.

**Game Start Policy:** A game can only commence when precisely two players are connected. Each Player is free to start the game.

**Limitations**
**Limited Test Coverage:** The current implementation includes only basic test coverage with two sample tests. Extending test coverage is recommended for comprehensive testing.

**Basic Exception Handling:** The current exception handling focuses on the GameStart exception, and an exception handling middleware is set up for HTTP errors. For production readiness, a more comprehensive exception-handling strategy should be implemented.

**Dependency Decoupling:** While the project utilizes Socket.io, further architectural work is necessary to ensure clean decoupling from specific libraries or packages, making it easier to swap out underlying technologies without extensive code changes.

**Simple UI:** The user interface (UI) is currently a basic HTML page with no design or layout. It serves as a minimal frontend for the game.

## Future Enhancements
This project can be extended and improved in various ways:

**Exception Handling:** Implement robust exception-handling strategies to cover various error scenarios and improve error messaging.

**Extended Testing:** Expand test coverage to thoroughly validate the functionality and edge cases of the application.

**Architecture Refinement:** Refactor the architecture for cleaner separation of concerns and improved maintainability.

**Enhanced UI with React:** Develop a more sophisticated user interface for the game using technologies like React to provide a better user experience, including features such as real-time game updates and interactive gameplay elements.

**Security:** The cookie is being set client-side which is accessible to any scripts running on the same page. It is better to be configured server-side and manage the Cross-Origing concerns, For example by using samesite attribute. Also, there is no Authentication/Authorization mechanism. On the other hand, the data is being exchanged among players in plain text, while it is better to encrypt the sensitive data.

