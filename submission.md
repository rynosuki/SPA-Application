## 1. For each feature (F1, F2 and so on except F8) you have implemented, write a 5-10 sentences text about it and let the teacher know how you solved it. This is essential. There is no grade if you fail to write about the features.

### F1 -
I created a divided webpage with three sections - header, body, footer. The body used to host all the applications and footer to allow starting applications. I didn't use the recommended API for drag and move but created my own using eventlisteners and updating the style of the element being dragged. A window being focused was done by just grabbing the entire DOM element and raising its Z-index such that its on top.
I also created a close button that just removes the entire dom if clicked.

### F2 -
I forgot to commit alot early because it went quickly along and just did it when i went home basically, which led to alot fewer commits than what i'd expect. I tried the lint after basically being done and it gave me just a few hints towards my CSS file, where i don't like how it wants it, but i gave in (this time ;)) Added JSDocs to everything i found necessary. I'd say it needs quite abit of revising in terms of visual appeal but i'm no designer.

### F3 -
I started by just googling how a memory game works then broke that down in levels. It went quite smooth to create it but had some hickups in terms of making it looks nice when you pick two cards that arent the same. I added keyboard support through tabbing and enter key, but I think it can be easily improved by adding ways to move through the board with keys. I made the reset function of the game only be through changing size, but can easily be changed, focus was on the extra application. My extended function was to allow the player to switch between some graphical differences.  You can also play different games at the same time by just launching them as they are all objects.

### F4 -
I changed a little in how i work with usernames as i use the same name in the battleship application down below. Therefore the name is not saved after the session, as I needed to be able to play against myself on the battleship application. I added doms to the div when messages came through until there was 20, after that i removed the oldest one and entered the newest one. It shows name and which channel you are in, which can be changed by using the command /join "Channel Name" to enter another one. That was my extended function of the chat. Aswell as cyphering the text sent in the channel Robin

### F5 -
I decided to create a multiplayer variant of battleship that could be played using an application, this is done through sending messages on the websocket. It can be played by just sending messages, but hardly doable. Could be made to fit that style too quite easily. It only works currently if two players are using the application since it needs responses from the other player, and these two players need to have different usernames. I'm sending the coordinates when clicked to the other player, who checks it was a hit or not. Then responding the true or false, allowing the other player to update its board. This involved alot of troubleshooting as apparently networking is not very simple. But i got a decent product in the end and im quite happy even though its not fully functional (cant win)

### F6 -
I added three and halfish functions, as stated above I added the ability to choose channel to listen to when in chat. Also able to change username by clicking top left corner and then entering a new one. This only saved in session storage since i wanted to have multiple session on same browser. Also added encryption in the channel Robin by using a simple cypher encryption. Learnt later that its not that hard to apply SHA256 encoding.

### F7 -
I'd say the main enchancements i did was try to make a multiplayer program that could be played by multiple people as thats what took the most time. Other than that i just wanted an as smooth as possible interaction with the application, sadly i had two exams behind me since before which lowered the amount of time i could put into this.

## 2. Write a concluding text, 5-10 sentences, about your implementation of the project. Write reflective about hard/easy, troubles/solutions, and so on, things you encountered and thought of during the project and its implementation.
The hardest parts for me was setting up an socketcommunications protocol that would work with how i wanted the game to work and allowing the same code to work both ways. It just forced me to put alot of time into planning and putting down my thoughts which i thoroughly enjoyed. I also found it very fun and challenging to create all the small things that you just assume a program should have and seeing how intricate it becomes.

I believe that if i had made alot more groundwork before, and sketched things and planned it. I could have done alot more than what i got time for now as i needed to go back when i bumped into new implementation ideas and interactions.

## 3. What is your TIL for this course part?
PROGRAMs have a lot of stuff that you don't think about, closing windows, opening windows, sorting, design, functionality, user interface. It's very much to do for a single person who hasn't done anything this "Fullstack" before.

## 4. What is your overall TIL for this course (this far)?
Very fun and challenging, i've learnt so much that i dont even know what to put here. I've learnt some networking, some design principles, some underlying architecture. Overall one of the most engaging and fun courses i've had.
