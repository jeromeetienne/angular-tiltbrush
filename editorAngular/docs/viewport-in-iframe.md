# Viewport in Iframe architecture

Here is a possible architecture for the designer.
It aims to cleaner separation between the UI and the 3D.
Each being in its own web [frame](https://developer.mozilla.org/en/docs/Web/HTML/Element/iframe).

**Principle** : The UI would be done with angular.
The 3d viewport, would be in a specific iframe and coded with three.js
the UI page will include 3d viewport as an iframe.

# Key Concepts
- the UI is in the main frame with angular
- 3d viewport is in a iframe with three.js
- They both communicate via a **small well-defined API**

## PRO
- separation of concern
  - ui people do ui
  - 3d people do 3d
- More stable code
  - easier to handle tab, no more memory or events leak
  - each part is may be test separatly
- smaller, simpler parts, easier to handle
- less tied to three.js so much easier to support three.js version upgrade

## CON
- it isnt yet coded, so it require work to port currrent code
  - see migration section for details on possible paths
