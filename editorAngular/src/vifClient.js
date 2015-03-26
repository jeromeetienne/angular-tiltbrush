var vifClient = function(){
	window._vifClient = this	// to be called by the server
	// initial data
	this.data = {
		scale : {
			x : 2,
			y : 1,
			z : 1,
		}
	}
	// signals
	this.signals = {
		updateSelectedUI	 : new Signals.Signal(),
	}
}


//////////////////////////////////////////////////////////////////////////////////
//		private functions
//////////////////////////////////////////////////////////////////////////////////

/**
 * NOTE: called by vifServer
 */
vifClient.prototype._dispatchUpdateSelectedUI	= function(){
	var object3d = this.getSelected()
	// console.log('selected', object3d)
	if( object3d === null )	return

	var domElement = document.querySelector('#positionX')
	domElement.innerHTML = object3d.position.x.toFixed(2)

	var domElement = document.querySelector('#positionY')
	domElement.innerHTML = object3d.position.y.toFixed(2)

	var domElement = document.querySelector('#positionZ')
	domElement.innerHTML = object3d.position.z.toFixed(2)
	
	this.data.scale.x	= object3d.scale.x
	this.data.scale.y	= object3d.scale.y
	this.data.scale.z	= object3d.scale.z
	
	this.signals.updateSelectedUI.dispatch();
}

vifClient.prototype._getVifServer = function () {
	var iframe = document.getElementsByTagName('iframe')[0]
	var vifServer = iframe.contentWindow.vifServer

	return vifServer
}


//////////////////////////////////////////////////////////////////////////////////
//		Comments
//////////////////////////////////////////////////////////////////////////////////
vifClient.prototype.getSelected = function(){
	var vifServer = this._getVifServer()

	return vifServer.getSelected();
}

//////////////////////////////////////////////////////////////////////////////////
//		Comments
//////////////////////////////////////////////////////////////////////////////////
vifClient.prototype.updateScale = function(scale){
	var vifServer = this._getVifServer()
	
	var scale = this.data.scale
	vifServer.updateScale(scale.x, scale.y , scale.z);
}

vifClient.prototype.changeTranformMode	= function(mode){
	var vifServer = this._getVifServer()
	
	vifServer.changeTranformMode(mode);		
}

vifClient.prototype.deleteSelected	= function(uuid){
	var vifServer = this._getVifServer()
	
	vifServer.deleteSelected();	
}

//////////////////////////////////////////////////////////////////////////////////
//		Comments
//////////////////////////////////////////////////////////////////////////////////
vifClient.prototype.addCube = function(){
	var vifServer = this._getVifServer()
	
	vifServer.addCube();
}

vifClient.prototype.addSphere = function(){
	var vifServer = this._getVifServer()
	
	vifServer.addSphere();
}

vifClient.prototype.clearScene = function(){
	var vifServer = this._getVifServer()
	
	vifServer.clearScene();	
}
