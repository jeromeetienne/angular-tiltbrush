### Files

- ng/app-controller.js : app controller

- ng/drawing-service.js : a service to handle the drawing on the projectionPlane
- ng/message-bus.js: a service to broadcast message
  - could i simply use the rootScope directly ?

- ng/select-directive.js: directive to get mouse/keyboard events from the webgl canvas
  - to rename canvasevent-directive.js

- ng/viewer-service.js: service to view the 3d itself

- threeViewer/ViewerScene.js: handle all the three.js rendering itself
- threeViewer/ViewerSetup.js: setup the original scene for the 
  - supposedly because it contains some part of it
  - and other parts are elsewhere
  - regroup everything here
