/**
 * viewport-in-iframe server
 * - it is to be used from the 3d viewport iframe
 */
var vifServer = (function(editor){
	'use strict';
	var vifServer = {};
	
	//////////////////////////////////////////////////////////////////////////////////
	//		list of functions to be called 
	//////////////////////////////////////////////////////////////////////////////////

	vifServer.getSelected	= function(){
		return editor.selected
	}
	
	vifServer.updateScale	= function(x, y, z){
		console.log(arguments)

		var selected = editor.selected
		if( selected === null )	return

		selected.scale.set(x,y,z)
		
		editor.signals.objectChanged.dispatch(selected)
	}
	
	vifServer.deleteSelected	= function(){
		var selected = editor.selected;
		if( selected === null )	return

		var parent = selected.parent;
		editor.removeObject( selected );
		editor.select( parent );
	}
	
	vifServer.changeTranformMode	= function(mode){
		editor.signals.transformModeChanged.dispatch( mode );
	}

	vifServer.addCube	= function(){
		var width = 100;
		var height = 100;
		var depth = 100;

		var widthSegments = 1;
		var heightSegments = 1;
		var depthSegments = 1;

		var geometry = new THREE.BoxGeometry( width, height, depth, widthSegments, heightSegments, depthSegments );
		var mesh = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial() );
		// mesh.name = 'Box ' + ( ++ me;

		editor.addObject( mesh );
		editor.select( mesh );
	}
	
	vifServer.addSphere	= function(){
		var radius = 75;
		var widthSegments = 32;
		var heightSegments = 16;
		var phiStart = 0;
		var phiLength = Math.PI * 2;
		var thetaStart = 0;
		var thetaLength = Math.PI;

		var geometry = new THREE.SphereGeometry( radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength );
		var mesh = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial() );
		
		editor.addObject( mesh );
		editor.select( mesh );
	}
	
	
	vifServer.addPointLight	= function(){
		var color = 0xffffff;
		var intensity = 1;
		var distance = 0;

		var light = new THREE.PointLight( color, intensity, distance );
		light.position.set( 0.5, 1, 0.75 ).multiplyScalar( 200 );

		editor.addObject( light );
		editor.select( light );
	}

	vifServer.addDirectionalLight	= function(){
		var color = 0xffffff;
		var intensity = 1;

		var light = new THREE.DirectionalLight( color, intensity );

		light.position.set( 0.5, 1, 0.75 ).multiplyScalar( 200 );

		editor.addObject( light );
		editor.select( light );
	}

	vifServer.clearScene = function(){
		editor.clear()
	}

	//////////////////////////////////////////////////////////////////////////////////
	//		Comments
	//////////////////////////////////////////////////////////////////////////////////

	editor.signals.tranformControlsChange.add(function(){
		var vifClient = window.parent._vifClient
		vifClient._dispatchUpdateSelectedUI(editor.selected)
	})
	
	editor.signals.objectSelected.add(function(){
		var vifClient = window.parent._vifClient
		vifClient._dispatchUpdateSelectedUI(editor.selected)
	})	
	
	//////////////////////////////////////////////////////////////////////////////////
	//		Comments
	//////////////////////////////////////////////////////////////////////////////////
	return vifServer
})(editor)
