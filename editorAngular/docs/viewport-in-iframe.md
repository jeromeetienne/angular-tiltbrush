Trying to find a cleaner/simpler architechture for the designer.
I experimented with a complete separation between the UI and the 3D.
Each being in its own web frame.


The UI with angular in a page.
the 3d with three.js, aka the viewport in another webpage
the UI page will include 3d viewport as an iframe.

I used this architecture with success in the past in a webgl game.

# PRO
- separation of concern
  - ui people do ui
  - 3d people do 3d
- More stable code
  - easier to handle tab, no more memory or events leak
  - each part is may be test separatly
- smaller, simpler parts, easier to handle


# Key Concepts
- the UI is in the main frame with angular
- viewport is in a iframe with three.js
- They both communicate via a clear well-defined API
- all 3d display happens in 3d viewport

---

Inspired by a remark from lawrence during last chat 
and by a 

i got the idea, could we reuse more of three.js editor ?

What could it be ?


# Notes from the train station
* If we had to code it again what could we do?
* List all the pros and cons of this alternative 
  * see when to do it 
  * how to split the tasks 
* 3D people do stuff on their own 
* Angular people do stuff on their own
* stuff that is decoupled 
* dev. is more efficient this way 
* stuff can be testes separately 
* there is no leak between the two parts 
* it makes the product simpler 
