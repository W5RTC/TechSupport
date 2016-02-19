// open a port to communicate with background
var port = chrome.runtime.connect();
// listen for messages from webpage and forward them to the background, through the previously opened port
window.addEventListener( 'message', function ( event ){
console.log(event);
    if ( event.source != window || !event.data ){
        return;
    }
    var data=event.data;
       if(data.task=='desktop-share')
          {
		  port.postMessage(data );
		  }else
		  {
		  return;
		 }
    
} );

// listen for messages from background and forward them to the webpage
port.onMessage.addListener( function( data ){
    window.postMessage( data, '*' );
} );
