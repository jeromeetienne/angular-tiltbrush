var i4ds = (function(editor){
	'use strict';
	var i4ds = {};

	i4ds.getSelected	= function(){
		return editor.selected
	}
	
	i4ds.updateScale	= function(x, y, z){
		console.log(arguments)

		var selected = editor.selected
		if( selected === null )	return

		selected.scale.set(x,y,z)
		
		editor.signals.objectChanged.dispatch(selected)
	}
	
	i4ds.deleteSelected	= function(){
		var selected = editor.selected;
		if( selected === null )	return

		var parent = selected.parent;
		editor.removeObject( selected );
		editor.select( parent );
	}
	
	i4ds.changeTranformMode	= function(mode){
		editor.signals.transformModeChanged.dispatch( mode );
	}

	i4ds.addCube	= function(){
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
	
	i4ds.addSphere	= function(){
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
	
	i4ds.clearScene = function(){
		editor.clear()
	}

	//////////////////////////////////////////////////////////////////////////////////
	//		Comments
	//////////////////////////////////////////////////////////////////////////////////

	editor.signals.tranformControlsChange.add(function(){
		var i4dsClient = window.parent._i4ds
		i4dsClient._dispatchUpdateSelectedUI(editor.selected)
	})
	
	editor.signals.objectSelected.add(function(){
		var i4dsClient = window.parent._i4ds
		i4dsClient._dispatchUpdateSelectedUI(editor.selected)
	})	
	
	//////////////////////////////////////////////////////////////////////////////////
	//		Comments
	//////////////////////////////////////////////////////////////////////////////////
	return i4ds
})(editor)
