'use strict';

goog.provide('Viewer.Setup');


/**
* @class Scene setup.  Most initialization of geometry and managers happen here.
*/
/**
* Setup the scene geometry
* @param {Object} params
* @constructor
*/
Viewer.Setup = function (params) {
    
    this.viewerScene = params.context;
    
    this._initRenderer();
    this._addDefaultLights();
    this._createGrid();
};

//////////////////////////////////////////////////////////////////////////////////
//        Comments
//////////////////////////////////////////////////////////////////////////////////
/**
* Setup the render information.
*/
Viewer.Setup.prototype._initRenderer = function () {
    var width = window.innerWidth;
    var height = window.innerHeight;
        
    this.viewerScene.renderer.setSize(width, height);
    this.viewerScene.renderer.setViewport(0, 0, width, height);
}


/**
* Add light(s) to the scene
*/
Viewer.Setup.prototype._addDefaultLights = function () {
    var scene =  this.viewerScene.scene

    var light = new THREE.DirectionalLight( 0xdddddd );
    light.position.set( 0, -1, 1 ).normalize();
    light.name="direction light 1";
    scene.add( light );
    
    var light   = new THREE.SpotLight( 0xffffff, 1 );
    light.position.set( -300, 600, 300 );
    light.target.position.set( 0, 0, 0 );
    light.name = "spot light 1";
    scene.add( light );
    
    var light = new THREE.AmbientLight( 0x444444 );
    light.name="ambient";
    scene.add( light );
    
    var light = new THREE.DirectionalLight( 0xffeedd );
    light.position.set( 0, 0, 1 ).normalize();
    light.name="direction light 2";
    scene.add( light );
}

/**
* Create a floor grid
*/
Viewer.Setup.prototype._createGrid = function () {
    var scene =  this.viewerScene.scene

    var size = 100, step = 10;
    var geometry = new THREE.Geometry();
    var material = new THREE.LineBasicMaterial({
        color: 'white'
    });
    for(var i = -size; i <= size; i += step){
        geometry.vertices.push(new THREE.Vector3(-size, 0.04, i));
        geometry.vertices.push(new THREE.Vector3(size, 0.04, i));
        geometry.vertices.push(new THREE.Vector3(i, 0.04, -size));
        geometry.vertices.push(new THREE.Vector3(i, 0.04, size));
    }
    var line = new THREE.Line(geometry, material, THREE.LinePieces);
    line.name="grid";
    scene.add(line);
}
