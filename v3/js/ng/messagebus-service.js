'use strict';
goog.provide('ThreeViewer.MessageBusServiceService');

/**
 * This is a messaging service.  It broadcasts from $rootScope allowing all Angular components to digest changes.
 * @param {angular.Scope} $rootScope
 *
 * @constructor
 * @export
 * @ngInject
 */
ThreeViewer.MessageBusService = function ($rootScope) {
    this.message = {};
    this.rootScope = $rootScope;
};

/**
 * @export
 *
 * Trigger a message from rootScope.
 * @param {!string} type
 * @param {!string=} message
 */
ThreeViewer.MessageBusService.prototype.trigger = function (type, message) {
    this.message[type] = message;
    this.broadcast(type);
};

/**
 * Trigger a message from rootScope.
 * @param {!string} type
 */
ThreeViewer.MessageBusService.prototype.broadcast = function (type) {
    this.rootScope.$broadcast(type);
};
