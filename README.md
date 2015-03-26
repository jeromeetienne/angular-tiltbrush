# Title Brush Angular
* prototype ala tiltbrush to learn how to handle three.js and angular
* just an idea to experiment
* the [original tiltbrush](http://www.tiltbrush.com/) is much better.

* it is taken from [ng-three-viewer](https://github.com/cubicleDowns/ng-three-viewer)


## Notes
- all the UI should be angular
- must be easy to remove the angular to get only the runner
- all function should be .prototype ?
  - not mandatory
  - no .prototype = {} tho
- all private are _ prefixed
- get back the components organisation folder hierachie


---

# Version 0

- Version 0 is a version minimal of the application
- it is an internal prototype, it doesnt have to be shown to a user
- orbitcontrols around the center of the scene
  - or the AR marker in AR
  - so this is only a camera controls ?
- we got a projection plane which is always facing the camera 
  at a given distance
- with an action of click by the user, we get the particle position
  at the intersection of the click and the projection plane
- there is a basic but classy UI to tune the brush (size, color, texture)
- i think it is possible to port that to work on current mobile
  - the object would be at the center
  - you get only the rotation from the device orientation api
  - is that enougth ? 
  - it would immediatly make the application more widely deployable
- this 'work on current mobile' feature is a definitive plus
  - but clearly not a Version0 requirement. keep that for later


# Possible Mobile Application - tagging a sphere 
- you hold the mobile or tablet 
- you move it around you 
- you use device orientation to display that in VR 
  - currently just put a sphere map 
- when you touch the screen you draw on the inside of a sphere surrounding you 
