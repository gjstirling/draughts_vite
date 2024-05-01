# Checkers App 

This is a checkers app built using React, Vite and Typescript. Two players share the same browser and are notified above the board about which turn is next. There is a winner when the opposing team cannot make any more moves. Click on the draft and the desired square to jump to. Here are some rules to get you started: 

- Checkers and kings can only be placed on black squares.
- Checkers can only jump one diagonal.
- Checkers can take opposing checkers by jumping over them assuming the target is empty (no checker on square).
- Kings are created when a checker makes it to the other end of the board, They can move in any direction.
- When a checker/king takes another piece and lands within range to take another checker then the player must take an extra move to take it. 

## Installation and Setup Instructions

Clone down this repository. You will need `node` and `npm` installed globally on your machine.  

Installation:

`npm install`  

To Run Test Suite:  

`npm test`  

To Start Server:

`npm run dev`  

To Visit App:

`localhost:3000`

## Learning/Reflections: 
**Keep UI and State Separate**: One fundamental principle I embraced was the separation of concerns between UI rendering and state management. By encapsulating the board's state within the useBoardState hook, I ensured that the UI components remained focused solely on rendering. This adherence to the single responsibility principle not only simplified the UI but also facilitated easier management and updates of the board's state within the dedicated hook.

**Understanding useState Asynchronicity:** Through practical experience, I came to appreciate the asynchronous nature of useState updates. Leveraging the callback form of setState allowed for scheduling updates of state; however, it was crucial to recognize that the state may not have been updated before the next render cycle. This insight prompted me to carefully consider the timing of state updates to avoid potential bugs arising from incorrect assumptions about state immediacy. 

**Navigating Dependency Minimization and Mocking Challenges:** In the process of developing the app, I found that by structuring the main method's functionality around well-tested, modular functions, I was able to minimize the need for extensive mocking. This strategic approach significantly simplified the unit testing process, as I could focus on testing each individual function independently.By reducing the interdependencies between different parts of the codebase, I ensured that each unit test could accurately confirm the behavior based on the specific action or state of the board. This not only streamlined the testing process but also enhanced the reliability and maintainability of the code.
In hindsight, this approach exemplified the importance of modular design and test-driven development practices. By breaking down the functionality into smaller, testable units, I was able to achieve comprehensive test coverage while maintaining code clarity and flexibility. This experience reinforced my belief in the value of minimizing dependencies and leveraging unit testing to ensure robustness in software development projects.


