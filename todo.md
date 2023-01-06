# F1: PWD Functional requirements
### Please check that your application meets the requirements below before submitting your final version.

1. [X] The application should be a single page application.

2. [X] The user shall be able to open multiple windows (not browser windows/tabs but custom windows created using the DOM) within the application.

3. [X] The user shall be able to drag and move the windows inside the PWD.

4. [X] The user shall be able to open new windows of the desired application by clicking or double clicking an icon at the desktop.

5. [X] The icon used to close the window should be represented in the upper bar of the window.

6. [X] Windows should get focus when clicked/dragged.

7. [X] The window with focus shall be on top of all other windows.

### The following three window applications should at least be included in the desktop application:

* [X] A memory game.
* [X] A chat connected to a central chat channel using websockets.
* [X] One, by you, designed and decided application (perhaps the quiz or another application).
# F2: PWD Non functional requirements
1. [ ] A complete git commit history should be present for assessment. For this assignment somewhere between 30 and 200 commits is normal

2. [X] The code standard standard.js should be followed. Use the development environment you learnt earlier.

3. [X] All exported functions, modules and classes should be commented using JSDoc.

4. [X] The linters should pass without notices when running npm test.

5. [X] The code shall be organized in appropriate ES modules, at least four (4).

6. [ ] The application shall be visually appealing.

# F3: Memory game window application
## Read for a description of the memory application.

1. [X] You should be able to play the game with and without using the mouse.

2. [X] The game should count how many attempts the user have made and present that when the game is finnished.

3. [X] It should be possible to render different sizes of the gameboard. (4x4, 2x2, 2x4)

### These are the requirements for the Memory application that should exists as a window application in the PWD.

1. [X] The user should be able to open and play multiple memory games simultaneously.

2. [X] The user should be able to play the game using only the keyboard (accessability).

3. [ ] One, by you decided, extended feature for the game.

# F4: Chat window application
## Read for a description of the chat application.

### The chat application should exists as a window application in the PWD. The chat application shall be connected to other students chats via a web socket-server.

1. [X] The user should be able to have several chat applications running at the same time.

2. [X] When the user opens the application for the first time the user should be asked to write his/her username.

3. [X] The username should remain the same the next time the user starts a chat application or the PWD is restarted.

4. [X] The user should be able to send chat messages using a textarea.

5. [X] The user should be able to see at least the 20 latest messages since the chat applications was opened.

6. [X] One, by you decided, extended feature.

# F5: An additional window application
You should add one additional window application to your PWD. It should be developed by yourself and it can for example be the Quiz application or another application you choose to develop.

# F6: An enhanced chat application (OPTIONAL)
## This is an optional feature that might help you to a higher grade.

### Fulfill some (at least three) requirements to enhance your chat application. Here are suggestions and feel free to add your own enhancements.

* [X] Ability to choose which channel to listen to.
* [ ] Caching message history.
* [ ] Added support for emojis.
* [ ] Added support for writing code.
* [X] Ability to change username.
* [X] Encrypted messages on a special channel to allow secret communication.
* [ ] Added functionality to the "chat protocol". Discuss with others in the course and agree upon added functionality to add to the sent messages.
* [ ] Use the messages to play memory against an opponent. Perferably using a seperate channel.
# F7: Additional enhancements (OPTIONAL)
## This is an optional feature that might help you to a higher grade. You need to have implemented F6 to be able to solve this requirement.

You may implement and document additional enhancements to your PDW to make it more personal, flexible and usable. You may define these requirements on your, document them and explain how they works.
