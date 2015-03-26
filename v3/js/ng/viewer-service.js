'use strict';
goog.provide('ThreeViewer.ViewerService');

/**
 * @fileOverview - this file has no need for angular
 */

/**
 * Service which initiates the THREE.js scene and
 *  provides methods to interact with that scene
 *
 * @param {ThreeViewer.MessageBusService} MessageBus
 *
 * @constructor
 * @export
 * @ngInject
 */
ThreeViewer.ViewerService = function(MessageBus){
    this.MessageBus = MessageBus;
    this.viewerScene = null;
    
    this._currentModel  = null;
    this._clock = new THREE.Clock()
    
    console.log('ViewerService', this)

    //////////////////////////////////////////////////////////////////////////////////
    //        Comments
    //////////////////////////////////////////////////////////////////////////////////

    // make the 'Textured guy' move
    this.MessageBus.rootScope.$on('onThreejsRender', function (event, delta) {
        
        // find the object3d
        var object3d = this._currentModel
        if( object3d === null )    return
        
        // // change object3d rotation
        // object3d.rotation.z += 0.2 * Math.PI*2 * delta
        // object3d.rotation.x += 0.2 * Math.PI*2 * delta
        // object3d.position.z += 20 * delta
        object3d.position.z += 20 * delta
        
        if( object3d.position.z > 0 ){
            object3d.position.z = -200
        }
    }.bind(this));
    
    // update the UI binding for the object
    this.MessageBus.rootScope.$on('onThreejsRender', function () {
        // find the object3d
        var object3d = this._currentModel
        if( object3d === null )    return

        var appController = window.appController

        appController.data.scale = object3d.scale.x

        appController.data.rotateX = THREE.Math.radToDeg(object3d.rotation.x) % 360
        appController.data.rotateY = THREE.Math.radToDeg(object3d.rotation.y) % 360
        appController.data.rotateZ = THREE.Math.radToDeg(object3d.rotation.z) % 360

        appController.data.positionX = object3d.position.x
        appController.data.positionY = object3d.position.y
        appController.data.positionZ = object3d.position.z

        var $scope = appController.scope
        $scope.$apply()
    }.bind(this))
    
    //////////////////////////////////////////////////////////////////////////////////
    //        Comments
    //////////////////////////////////////////////////////////////////////////////////

    
};

/**
 * Initialize the 3D scene
 * @param {!object} params
 */
ThreeViewer.ViewerService.prototype.init = function (params){
    this.viewerScene = new Viewer.Scene(params);
    

    //////////////////////////////////////////////////////////////////////////////////
    //        load this._currentModel
    //////////////////////////////////////////////////////////////////////////////////
;(function(){
    THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );
    
    var objUrl  = '/v3/models/male02.obj'
    var mtlUrl  = '/v3/models/male02.mtl'
    var loader = new THREE.OBJMTLLoader();
    loader.load(objUrl, mtlUrl, function(object3d) {
        var scene       = this.viewerScene.scene
        scene.add(object3d);
        
        this._currentModel  = object3d
    }.bind(this));
}.bind(this))()



    this._animate();
};

/**
 * @export
 */
ThreeViewer.ViewerService.prototype._animate = function(){
    requestAnimationFrame(this._animate.bind(this));
    this.render();
};

/**
 * @export
 */
ThreeViewer.ViewerService.prototype.render = function () {    
    
    //////////////////////////////////////////////////////////////////////////////////
    //        Notify onThreejsRender
    //////////////////////////////////////////////////////////////////////////////////
    // init this._clock
    var delta   = this._clock.getDelta()
    this.MessageBus.rootScope.$broadcast('onThreejsRender', delta)

    //////////////////////////////////////////////////////////////////////////////////
    //        Actually render the webgl scene
    //////////////////////////////////////////////////////////////////////////////////
    var renderer    = this.viewerScene.renderer
    var scene       = this.viewerScene.scene
    var camera      = this.viewerScene.camera
    renderer.render(scene, camera);
};
