'use strict';
goog.provide('ThreeViewer.CanvasEventsDirective');


//////////////////////////////////////////////////////////////////////////////////
//        ThreeViewer.CanvasEventsDirective
//////////////////////////////////////////////////////////////////////////////////
/**
 * @param {ThreeViewer.ViewerService} ViewerService
 *
 * @constructor
 */
ThreeViewer.CanvasEventsDirective = function (ViewerService) {
    /**@type {ThreeViewer.ViewerService} */
    this.ViewerService = ViewerService;

    this.link = this.link.bind(this);
};

/**
 * @return {Object}
 *
 * @param {ThreeViewer.ViewerService} ViewerService
 *
 * @ngInject
 */
ThreeViewer.CanvasEventsDirective.factory = function(ViewerService) {
    var d = new ThreeViewer.CanvasEventsDirective(ViewerService);
    return {
        'restrict': 'A',
        link: d.link
    };
};

/**
 * Linking function.
 * @ngInject
 */
ThreeViewer.CanvasEventsDirective.prototype.link = function (scope, element, attrs) {
    var domElement = element[0]

    //////////////////////////////////////////////////////////////////////////////////
    //        Bind keyboard events
    //////////////////////////////////////////////////////////////////////////////////
    document.body.addEventListener('keydown', function(domEvent){
        // console.log('keydown')
        this.ViewerService.MessageBus.rootScope.$broadcast('selectKeydown', domEvent)
    }.bind(this))
    
    document.body.addEventListener('keyup', function(domEvent){
        // console.log('keyup')
        this.ViewerService.MessageBus.rootScope.$broadcast('selectKeyup', domEvent)
    }.bind(this))

    document.body.addEventListener('keypress', function(domEvent){
        // console.log('keyup')
        this.ViewerService.MessageBus.rootScope.$broadcast('selectKeypress', domEvent)
    }.bind(this))
    
    //////////////////////////////////////////////////////////////////////////////////
    //        Bind mouse events
    //////////////////////////////////////////////////////////////////////////////////
    domElement.addEventListener('mousedown', function(domEvent){
        // console.log('mouseDown', domEvent)        
        var mousePosition = {}
        mousePosition.x =   ( event.clientX / window.innerWidth  ) * 2 - 1;
		mousePosition.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
        this.ViewerService.MessageBus.rootScope.$broadcast('selectMouseDown', mousePosition)
    }.bind(this))

    domElement.addEventListener('mousemove', function(domEvent){
        // console.log('mousemove', domEvent)
        var mousePosition = {}
        mousePosition.x =   ( event.clientX / window.innerWidth  ) * 2 - 1;
		mousePosition.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
        this.ViewerService.MessageBus.rootScope.$broadcast('selectMouseMove', mousePosition)
    }.bind(this))
};
