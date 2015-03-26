'use strict';
goog.provide('ThreeViewer.AppController');

//////////////////////////////////////////////////////////////////////////////////
//        Comments
//////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param {angular.Scope} $scope
 * @param {ThreeViewer.ViewerService} ViewerService
 *
 * @constructor
 * @export
 * @ngInject
 */
ThreeViewer.AppController = function ($scope, $rootScope, ViewerService, DrawingService) {


    this.scope = $scope;
    this.ViewerService = ViewerService;
    this.DrawingService = DrawingService;

// TODO jme- dirty way to export window.appController
window.appController = this;


    /**
     * @expose
     * @type {{scale: number, rotateX: number, rotateY: number, rotateZ: number, positionX: number, positionY: number, positionZ: number}}
     */
    this.data = {
        // needed as rotation is shown in degree
        'rotateX': 0,
        'rotateY': 0,
        'rotateZ': 0,
    };

    this.init();
};

ThreeViewer.AppController.prototype.init = function () {
    this.ViewerService.init({
        canvasId: 'viewer',
        containerId: 'container'
    });
    this.DrawingService.init();
};


//////////////////////////////////////////////////////////////////////////////////
//        Comments
//////////////////////////////////////////////////////////////////////////////////

/**
 * Rotate around an axis
 */
ThreeViewer.AppController.prototype.rotate = function () {
    var object3d    = this.DrawingService.projectionPlane
    object3d.rotation.set(
        THREE.Math.degToRad(this.data.rotateX),
        THREE.Math.degToRad(this.data.rotateY),
        THREE.Math.degToRad(this.data.rotateZ)
    );
};
