'use strict';
goog.provide('ThreeViewer.DrawingService');

/**
 * @fileOverview - this file has no need for angular
 */

/**
 * Service which initiates the THREE.js scene and
 *  provides methods to interact with that scene
 *
 * @param {angular.$timeout} $timeout
 * @param {ThreeViewer.MessageBus} MessageBus
 *
 * @constructor
 * @export
 * @ngInject
 */
ThreeViewer.DrawingService = function(MessageBus, ViewerService){
    this.MessageBus = MessageBus;
    this.ViewerService = ViewerService
    
    //////////////////////////////////////////////////////////////////////////////////
    //        Comments
    //////////////////////////////////////////////////////////////////////////////////  
    this.brushSize = 250
    this.brushCSSColor = '#ffffff'
    this.brushOn    = false

    // create this.spriteMaterial
    this.spriteMaterial = new THREE.SpriteMaterial({
        map: THREE.ImageUtils.loadTexture( "/v3/images/blue_particle.jpg" ),
        opacity: 0.1,
        blending : THREE.AdditiveBlending,
    })
    
    //////////////////////////////////////////////////////////////////////////////////
    //        Handle events for brushes
    //////////////////////////////////////////////////////////////////////////////////
    
    // display a sprite at the collision point between the click and the projectionPlane
    this.MessageBus.rootScope.$on('selectKeydown', function (event, domEvent) {
        // console.log('brush on keypress')
        // only when pressing space
        if( domEvent.keyCode !== 32 )   return
        // enable .brushOn
        this.brushOn    = true
    }.bind(this))
    this.MessageBus.rootScope.$on('selectKeyup', function (event, domEvent) {
        // console.log('brush on keyup')
        // only when pressing space
        if( domEvent.keyCode !== 32 )   return
        // disable .brushOn
        this.brushOn    = false
    }.bind(this))

    
    // display a sprite at the collision point between the click and the projectionPlane
    this.MessageBus.rootScope.$on('selectKeypress', function (event, domEvent) {
        // only when pressing space
        if( domEvent.keyCode !== 't'.charCodeAt(0) )   return

        this.transformControls.setMode('translate')
    }.bind(this))
    this.MessageBus.rootScope.$on('selectKeypress', function (event, domEvent) {
        // console.log('brush on keyup')
        // only when pressing space
        if( domEvent.keyCode !== 'r'.charCodeAt(0) )   return

        this.transformControls.setMode('rotate')
    }.bind(this))
    
    // display a sprite at the collision point between the click and the projectionPlane
    this.MessageBus.rootScope.$on('selectMouseMove', function (event, mousePosition) {
        if( this.brushOn === false )    return
        this.drawDot(mousePosition)
    }.bind(this))

    // display a sprite at the collision point between the click and the projectionPlane
    this.MessageBus.rootScope.$on('selectMouseDown', function (event, mousePosition) {
        this.drawDot(mousePosition)
    }.bind(this))
};

/**
 * Initialize the 3D scene
 * @param {!object} params
 */
ThreeViewer.DrawingService.prototype.init = function (){

    //////////////////////////////////////////////////////////////////////////////////
    //        Init the projection plane
    //////////////////////////////////////////////////////////////////////////////////
;(function(){
    var geometry = new THREE.PlaneGeometry(500, 500, 10, 10);
    var material = new THREE.MeshBasicMaterial({
        wireframe : true,
        color: 'grey',
        side: THREE.DoubleSide
    });
    var projectionPlane = new THREE.Mesh(geometry, material);
    this.projectionPlane= projectionPlane

    var scene = this.ViewerService.viewerScene.scene
    scene.add(projectionPlane);
}.bind(this))()

    //////////////////////////////////////////////////////////////////////////////////
    //        Handle controls
    //////////////////////////////////////////////////////////////////////////////////

;(function(){
    var viewerScene = this.ViewerService.viewerScene
    var camera = viewerScene.camera

    var renderer = viewerScene.renderer
    var domElement = renderer.domElement


    var transformControls = new THREE.TransformControls( camera, domElement );
    this.transformControls= transformControls

    // Attach it to projectionPlane
    var projectionPlane = this.projectionPlane
    transformControls.attach(projectionPlane)
    
    
    transformControls.addEventListener( 'change', function () {
        // console.log('transformControls change', arguments)
    });
    transformControls.addEventListener( 'mouseDown', function () {
        console.log('transformControls mouseDown', arguments)
        editorControls.enabled = false
    });
    transformControls.addEventListener( 'mouseUp', function () {
        console.log('transformControls change', arguments)
        editorControls.enabled = true
    });
    
    var scene = this.ViewerService.viewerScene.scene
    scene.add( transformControls );    
    
    // init editorControls
    var editorControls = new THREE.EditorControls( camera, domElement );
	editorControls.center.set(0,0,0)
	editorControls.addEventListener( 'change', function () {
		transformControls.update();
	});

}.bind(this))()

};

//////////////////////////////////////////////////////////////////////////////////
//        Comments
//////////////////////////////////////////////////////////////////////////////////

/**
 * Update the .SpriteMaterial
 */
ThreeViewer.DrawingService.prototype.updateSpriteMaterial = function(){
    // clone to get a new material
    this.spriteMaterial = this.spriteMaterial.clone()
    // set the new parameters for this material
    this.spriteMaterial.color.set(this.brushCSSColor)
}

//////////////////////////////////////////////////////////////////////////////////
//        Comments
//////////////////////////////////////////////////////////////////////////////////

/**
 * Draw a dot on the projection plane if the mouse intersect with it
 */
ThreeViewer.DrawingService.prototype.drawDot = function (mousePosition) {
    // console.log('click select', mousePosition)
    // setup some alias
    var viewerScene = this.ViewerService.viewerScene
    var scene = viewerScene.scene
    var camera = viewerScene.camera


    //////////////////////////////////////////////////////////////////////////////////
    //        Comments
    //////////////////////////////////////////////////////////////////////////////////
    // setup raycaster
    var vector = new THREE.Vector3( mousePosition.x, mousePosition.y, 1).unproject(camera);
    var raycaster = new THREE.Raycaster();
    raycaster.set(camera.position, vector.sub(camera.position).normalize());

    // compute intersections
    var projectionPlane = this.projectionPlane
    var intersects = raycaster.intersectObjects([projectionPlane], true);
    // return if no intersection
    if(intersects.length === 0) return

    
    //////////////////////////////////////////////////////////////////////////////////
    //        Comments
    //////////////////////////////////////////////////////////////////////////////////

    // Add a sprite at intersect[0].point
    var material = this.spriteMaterial
    var object3d = new THREE.Sprite( material );
    object3d.scale.multiplyScalar(this.brushSize)
                 
    object3d.position.copy(intersects[0].point)
    scene.add(object3d)
};
