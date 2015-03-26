# How could they communicate with each other
- So we got a UI frame and 3D frame. 
- I know about 2 possibles alternatives for them to communicate.

**PostMessage**
- it is possible to communicate with [postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage). It is the usual way when both frame aren't in the same domain

**function call**
- in our case, we controls both frames, so they can be on the same domain
- it is then possible for each frame to access each other javascript

**Picking one** :
I love the ```PostMessage``` option as it force us to have a 
clearly defined communication. 
It is impossible to hijack any javascript variable in the other frame.
interframe javascript function call is convenient but clearly 
go against the separation of concern between the ui and 3d.
