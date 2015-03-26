# TODO
- check the webgl performance especially about spritematerial cloning
  - change it only when needed
  - how to do that ?
  - what about clone the material when it changes
  - is that even clear it affect performancs
  - what about 'just clone the material when it is changed in the UI'

- checkout what is directive/service/factory etc...
- should i remove viewerSetup.js

- can i remove message-bus.js ?
    - it is just exchanging message thru angular signals in $rootScope

- make an UI flexible if possible
  - modular with components folders
  - e.g. UI for brush color or size
  - so a partials per widget
  - like the ones for the file-loader or about
- have the sidebar display the position/rotation/scale of the projectionPlane

- DONE remove all the layers for object loading
  - just add one to load the obj/mtl textured guy
  - this should cleanup the code quite a bit
- DONE remove all the layers for the popup and other 
  - just remove it, this should clean up
- DONE remove wrangler.js
- DONE redo the whole css
  - copy three.js editor dark mode
- DONE add a button to make the planeProject visible or not
- DONE put the projection plane variable in the drawing service
  - this is where it should be
- DONE use space keyboard to draw or not on the plane

# better drawing function
- currently the drawing function is the biggest issue to get a usable application
- what would it cost to make an actual drawning function
- all is in the projectionPlane
- the projectionPlane has to be independant from the camera position
- so it imply to be able to move the projectionPlane
  - so transformControls on it
  - code another plane and see how to plug transformControls on it
  - all that in drawing-services
- remove the code to force the projectionPlane to be face camera
- projection plane is a very large invisible plane
  - there is a gizmo too
  
