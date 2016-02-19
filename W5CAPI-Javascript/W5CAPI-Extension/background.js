// when connect event is triggered from app.js
chrome.runtime.onConnect.addListener( function( port ){
    port.onMessage.addListener( function( message ){
		chrome.desktopCapture.chooseDesktopMedia(["screen", "window"], port.sender.tab, function( id ){
			var response = {
				task:'finished',
				streamId:id
			};
			// send back a "completed" answer on the port
			port.postMessage( response );
		} );
	} );
} );