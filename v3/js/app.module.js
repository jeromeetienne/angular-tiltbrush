'use strict';

goog.require('ThreeViewer.ViewerService');
goog.require('ThreeViewer.DrawingService');
goog.require('ThreeViewer.AppController');
goog.require('ThreeViewer.CanvasEventsDirective');
goog.require('ThreeViewer.MessageBusService');

// define the app
var angularModule = angular.module('ThreeViewerApp', ['ngRoute'])

// define the directory
angularModule.directive('canvasEvents', ['ViewerService', ThreeViewer.CanvasEventsDirective.factory])

// define all the services
angularModule.service('MessageBusService', ['$rootScope', ThreeViewer.MessageBusService])
angularModule.service('ViewerService', ['MessageBusService', ThreeViewer.ViewerService])
angularModule.service('DrawingService', ['MessageBusService', 'ViewerService', ThreeViewer.DrawingService])

// define the controllers
angularModule.controller('AppController', ['$scope', '$rootScope','ViewerService', 'DrawingService', ThreeViewer.AppController])
