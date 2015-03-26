goog.provide('Viewer.Scene');

Viewer.Scene = function (params) {

    // this.parentContainer = $('#' + params.containerId);
    this.container = document.getElementById(params.canvasId);


    this.scene = null;
    this.renderer = null;
    this.camera = null;
    this.controls = null;

    this._setup = null;
    this._init();
};


/**
* init the object ?
*/
Viewer.Scene.prototype._init = function () {
    
    var params = {context: this};
    
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({canvas: this.container, antialias: true});

    this.camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight, 1, 10000);
    this.camera.position.set(0,100,400)
    this.camera.lookAt( this.scene.position );
    
    this._setup = new Viewer.Setup(params);

    window.addEventListener( 'resize', function(){
        this._onWindowResize();
    }.bind(this), false );
}


/**
* Resizes the camera when document is resized.
*/
Viewer.Scene.prototype._onWindowResize = function () {
    var width = window.innerWidth;
    var height = window.innerHeight;
    // setup camera
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    // setup renderer size
    this.renderer.setSize(width, height);
    this.renderer.setViewport(0, 0, width, height);
}
