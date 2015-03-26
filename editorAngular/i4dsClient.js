var i4dsClient = function(){
	window._i4ds = this
	this.data = {
		scale : {
			x : 2,
			y : 1,
			z : 1,
		}
	}
	this.signals = {
		updateSelectedUI	 : new Signals.Signal(),
	}
}

i4dsClient.prototype._dispatchUpdateSelectedUI	= function(){
	console.log('sadfkjahdsflasdjkh')
	
	var object3d = this.getSelected()
	console.log('selected', object3d)
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

//////////////////////////////////////////////////////////////////////////////////
//		Comments
//////////////////////////////////////////////////////////////////////////////////
i4dsClient.prototype.getSelected = function(){
	var iframe = document.getElementsByTagName('iframe')[0]
	return iframe.contentWindow.i4ds.getSelected();
}

//////////////////////////////////////////////////////////////////////////////////
//		Comments
//////////////////////////////////////////////////////////////////////////////////
i4dsClient.prototype.updateScale = function(scale){
	var iframe = document.getElementsByTagName('iframe')[0]
	var i4dsServer = iframe.contentWindow.i4ds
	
	var scale = this.data.scale
	i4dsServer.updateScale(scale.x, scale.y , scale.z);
}

i4dsClient.prototype.changeTranformMode	= function(mode){
	var iframe = document.getElementsByTagName('iframe')[0]
	var i4dsServer = iframe.contentWindow.i4ds
	
	i4dsServer.changeTranformMode(mode);		
}

i4dsClient.prototype.deleteSelected	= function(uuid){
	var iframe = document.getElementsByTagName('iframe')[0]
	var i4dsServer = iframe.contentWindow.i4ds
	
	i4dsServer.deleteSelected();	
}

//////////////////////////////////////////////////////////////////////////////////
//		Comments
//////////////////////////////////////////////////////////////////////////////////
i4dsClient.prototype.addCube = function(){
	var iframe = document.getElementsByTagName('iframe')[0]
	var i4dsServer = iframe.contentWindow.i4ds
	
	i4dsServer.addCube();
}

i4dsClient.prototype.addSphere = function(){
	var iframe = document.getElementsByTagName('iframe')[0]
	var i4dsServer = iframe.contentWindow.i4ds
	
	i4dsServer.addSphere();
}

i4dsClient.prototype.clearScene = function(){
	var iframe = document.getElementsByTagName('iframe')[0]
	var i4dsServer = iframe.contentWindow.i4ds
	
	i4dsServer.clearScene();	
}
