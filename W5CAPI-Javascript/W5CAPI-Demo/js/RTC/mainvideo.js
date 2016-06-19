/*demo for w5capi video call*/
function videoCall()
{
	var params = {},
 r = /([^&=]+)=?([^&]*)/g;
	function d(s) {
		return decodeURIComponent(s.replace(/\+/g, ' '));
	}
	var match, search = window.location.search.toLowerCase();
	while (match = r.exec(search.substring(1)))
		params[d(match[1])] = d(match[2]);
	//User is creating instance of W5peer class for acessing the required methods/functions defined in that particular class.
	var w5capi = new  W5Peer({key:document.capikey});

	//Generate Random string
	function getRandomString() {
    return (Math.random() * new Date().getTime()).toString(36).replace( /\./g , '');
	}
	var uid1= getRandomString();
	window.params = params;
	window.params.caller=window.params.caller ||  w5capi.userid;
	window.params.callee=window.params.callee ||uid1;

    /*
          @Old Syntax
          */
    //w5capi.userid = window.params.caller;

    /*
           @ New Syntax
          */
    //Open Signalling channel(Socket.IO)
    //w5capi.registerUserWithId(window.params.caller);
    w5capiReady(function(){
       // alert(window.params.caller);
        w5capi.registerUserWithId(window.params.caller);
    });
    
     /*
    @ New Syntax
    */
    //accept incomming call
    w5capi.onCall(function(data) {

        w5capi.accept(data);
    });

    

	document.getElementById('user_name2').value =location.href.replace(location.search, '') + '?caller=' + window.params.callee + '&callee=' +window.params.caller;

      /*
          @Old Syntax
          */
	// Defines the Media Type
    /*
	w5capi.mediaType = {
    audio: true,
    video: true
	};*/
   
    
    
	// Describes the bandwidth of the media   
	w5capi.bandwidth = {
        audio: 50,
        video: 256
    };
	//  Some Global variables declared
	var  removeMediaElement;
	var localMediaStream;
	var thankYouNotyDiv;
	var buttonDiv;
	var connectNotyDiv;
	var connectLocalNotyDiv;
	var incomingCall;
	var incomingVideoCall1;
	
     /*
          @Old Syntax
          */
    /*
	// Append the local media stream	
 w5capi.on('local-stream-private', function(stream) {
	 if(thankYouNotyDiv && buttonDiv){
				thankYouNotyDiv.style.display='none';
				buttonDiv.style.display='none';
				connectNotyDiv.style.display = 'none';
			}
			if(connectLocalNotyDiv){
				connectLocalNotyDiv.style.display='none';
			}
		showvideobox();
        appendMediaElement(stream, 'local','source');
    });
    

	// Append remote media stream
  w5capi.on('remote-stream-private', function(stream) {
        appendMediaElement(stream, 'remote','remote');
    });
    */

     /*
      @ New Syntax
     */
    w5capi.onLocalStream(function(stream){
        if(thankYouNotyDiv && buttonDiv){
				thankYouNotyDiv.style.display='none';
				buttonDiv.style.display='none';
				connectNotyDiv.style.display = 'none';
			}
			if(connectLocalNotyDiv){
				connectLocalNotyDiv.style.display='none';
			}
		showvideobox();
        appendMediaElement(stream, 'local','source');
    });
    
    w5capi.onRemoteStream(function(stream){
        appendMediaElement(stream, 'remote','remote');
    });
    
    
    // Describes the Media Element Controls
    function appendMediaElement(stream, type,id) {
        var mediaElement = getMediaElement(stream, {
            buttons: ['take-snapshot', 'volume-slider', 'full-screen', 'mute-audio', 'mute-video'],
            width: innerWidth / 2 - 20,
            showOnMouseEnter: false
        },id);
		 removeMediaElement=mediaElement;
		stream.onended = function() {
        w5capi.emit('stream-removed', callback);
		}
		 var callback = {
            mediaElement: mediaElement,
            stream: stream
        };
		var isIE = /*@cc_on!@*/false || !!document.documentMode;
		var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
		
		if(isIE || isSafari)
		{
		setTimeout(function(){
	   var videotag=document.getElementById(id);
	   attachMediaStream(videotag,stream);
	   },400);
		}else
		{
		mediaElement.media.play();
		}
       
	   
   
	// Append the Remote Media Element in the specific container
        if(type == 'remote') {
       console.log('remote');
   document.querySelector('.big-video').appendChild(mediaElement);
			document.querySelector('.media-container').style.position='relative';
			document.querySelector('.media-container').style.width='101.8%';
  document.querySelector('.media-controls').style.marginTop='10px';
  document.querySelector('.media-controls').style.height='20px';
  document.querySelector('.volume-control').style.display='none';
    }
    
    // Append the Local Media Element in the specific container
    if(type == 'local') {
	  
	   localMediaStream=stream;
       document.querySelector('.small-video').appendChild(mediaElement);
  document.querySelector('.media-container').style.width='100%';
  document.querySelector('.small-video').style.maxHeight='200px';
  document.querySelector('.small-video').style.maxWidth='400px';
 document.querySelector('.media-controls').style.marginLeft='-175px';
 document.querySelector('.media-controls').style.width='130px';
 document.querySelector('.media-controls').style.height='30px';
 document.querySelector('.media-controls').style.marginTop='3px';
  document.querySelector('.volume-slider').style.marginTop='-1px';
  document.querySelector('.volume-slider').style.marginLeft='3px';
   document.querySelector('.volume-slider').style.height ='20px';
   document.querySelector('.volume-slider').style.display ='none';
   document.querySelector('.mute-audio').style.marginLeft='67px';
   document.querySelector('.mute-audio').style.marginTop='-10px'; 
  document.querySelector('.mute-video').style.marginLeft='97px';
  document.querySelector('.mute-video').style.marginTop='-35px';
  $('.media-box').find('audio, video').each(function(){
    this.volume = 0;
  });
       }
	}
		
	// Media Stream Removed
	w5capi.on('stream-removed', function(stream) {	
        var mediaElement = document.getElementById(stream.uuid);
        if (mediaElement) {
            mediaElement.parentNode.removeChild(mediaElement);
        }
    });
	w5capi.on('stream-removed', function(e) {
        if (e.mediaElement && e.mediaElement.parentNode) {
            e.mediaElement.parentNode.removeChild(e.mediaElement);
        }
    });
	var setUp = document.getElementById('starttalkdtndiv');

	// Setup Socket Connection by declaring openSignalingChannel function.
     /*
      @ Old Syntax
    */
    /*
    w5capi.openSignalingChannel({
        onReady: function() {
            setUp.disabled = false;
            setUp.className = 'textaligncenterdiv';
        }
    });
    */
    /*
           @ New Syntax
          */
    w5capi.onSuccess(function(data){
        setUp.disabled = false;
        setUp.className = 'textaligncenterdiv';
        // Send custom message
	w5capi.sendCustomMessage({
		enableButton:true,
		to:window.params.callee+document.capikey
	});
        });
	
	
    //........custom-signaling-message function defined for handling user's some custom message...............
	w5capi.on('custom-signaling-message',function(message){
	console.log('custom signaling message',message);
	if(message.to!=w5capi.userid)return;
	if(message.enableButton){
			 setUp.disabled = false;
			// Start the Call
		    setUp.onclick = function () {
			window.action1=null;
			showvideobox();
			var div2=document.createElement('div');
			div2.id='connectid';
			div2.style.width='400px';
			div2.style.height='30px';
			div2.style.position='absolute';
			div2.style.marginTop='80px';
			div2.style.marginLeft='130px';
			div2.style.fontSize ='18px';
			div2.innerHTML='<font color="black">'+'<b>'+ "Connecting..."+'</b>'+'</font>';
			document.getElementById('writeText').appendChild(div2);
			connectLocalNotyDiv=div2;
				//when link sender initiated call request to link reciever
			w5capi.sendCustomMessage({
				to:window.params.callee+document.capikey,
				readyForVideoCall:true
			});
		}	
		w5capi.sendCustomMessage({
			enableButton1:true,
			to:message.userid
		});
	}
		//Remote client got msg from call initiator 
		else if(message.enableButton1){
		 showvideobox();
		 var div=document.createElement('div');
		 div.id='nameid';
		 div.style.width='300px';
		 div.style.height='30px';
		 div.style.position='absolute';
         div.style.marginTop='20px';
         div.style.marginLeft='70px';
		 div.style.fontSize='16px';
		 div.innerHTML='<font color="black">'+'<b>'+"Thank You for joining...!"+'</b>'+'</font>';
		 document.getElementById('writeText').appendChild(div); 
		 thankYouNotyDiv=div;
         var div1=document.createElement('div');
        div1.innerHTML='<div class="btn signinbtndivone">'+"Start Video"+'</div>';
        div1.style.marginTop='50px';
        div1.style.marginLeft='130px';
        document.getElementById('writeText').appendChild(div1);
		div2=document.createElement('div');
				div2.id='connectid';
				div2.style.width='400px';
               div2.style.height='30px';
               div2.style.position='absolute';
               div2.style.marginTop='80px';
               div2.style.marginLeft='130px';
			   div2.style.fontSize ='18px';
			   div2.style.display='none';
				div2.innerHTML='<font color="black">'+'<b>'+"Connecting..."+'</b>'+'</font>';
				document.getElementById('writeText').appendChild(div2);
		buttonDiv=div1;
		connectNotyDiv=div2;
		buttonDiv.onclick=function(){
		connectNotyDiv.style.display = 'block';
		  buttonDiv.style.display='none';
	      thankYouNotyDiv.style.display='none';
		  w5capi.sendCustomMessage({
			  to:window.params.callee+document.capikey,
			  itsOneVideoCall:true
		  });
		}
	}
		
		  //link reciever got incoming call request from link sender
	if(message.readyForVideoCall){
		document.getElementById('incomingVideo').style.display='block';
		incomingCall=document.getElementById('incomingVideo');
		thankYouNotyDiv.style.display='none';
		buttonDiv.style.display='none';
			 // if link reciever accepting incoming call
		document.getElementById('right').onclick=function(){
			document.getElementById('incomingVideo').style.display='none';
			w5capi.sendCustomMessage({
				to:message.userid,
				yesIamReady:true
			});
		}
			//if link reciever rejecting the incoming call
        document.getElementById('wrong').onclick=function(){
            document.getElementById('incomingVideo').style.display='none';
			w5capi.sendCustomMessage({
				to:message.userid,
				rejectingTheCall:true
			})
        }
	}
		//when link sender got confirmation that other user is ready to join his call
	   //initiated call.
	if(message.yesIamReady){
		connectLocalNotyDiv.style.display='none';
		/*
            Old Syntax
            */
            //w5capi.call(window.params.callee);
            /*
             New Syntax
            */
            w5capi.call(window.params.callee,{audio:true,video:true});
	}
		//link sneder got call request from link reciever.
	if(message.itsOneVideoCall){
		showvideobox();
		document.getElementById('incomingVideo').style.display='block';
		incomingVideoCall1=document.getElementById('incomingVideo');
			//if agree to recieve the call request.
		document.getElementById('right').onclick=function(){
		document.getElementById('incomingVideo').style.display='none';
			w5capi.sendCustomMessage({
				to:message.userid,
				yesItsVideo:true
			});
		}
			   //if rejecting the call request.
        document.getElementById('wrong').onclick=function(){
            document.getElementById('incomingVideo').style.display='none';
			w5capi.sendCustomMessage({
				to:message.userid,
				iAmRejecting:true
			});
        }
	}
		//The link reciever is intiating call to link sender
	if(message.yesItsVideo){
		connectNotyDiv.style.display='none';
		/*
            Old Syntax
            */
            //w5capi.call(window.params.callee);
            /*
             New Syntax
            */
            w5capi.call(window.params.callee,{audio:true,video:true});
	}
		
      //link reciever got message that other user has rejected the call.
	if(message.iAmRejecting){
		console.log('call rejected');
		var str=connectNotyDiv.innerHTML;
		console.log('str',str);
		var res=str.replace("Connecting...","Call Rejected....");
		connectNotyDiv.innerHTML=res;
		setTimeout(function(){
			connectNotyDiv.style.display='none';
			}, 4000);
	}
		 //link sender got message that link reciever has rejected the call.
	if(message.rejectingTheCall){
		var str=connectLocalNotyDiv.innerHTML;
		var res=str.replace("Connecting...","Call Rejected....");
		connectLocalNotyDiv.innerHTML=res;
		setTimeout(function(){
			connectLocalNotyDiv.style.display='none';
			}, 4000);
		
	}
	})
	// End the call
	var callclose = document.getElementById('closecall');
	callclose.onclick = function(){
		location.reload(true);
		location.href = location.href.replace(location.search, '');
	}
	
	// Notify when user left the call
	w5capi.on('user-left-all',function(id){
	if(id==window.params.callee+document.capikey){
			try
			{
		localMediaStream.stop();
		if(removeMediaElement && removeMediaElement.parentNode){
			removeMediaElement.parentNode.removeChild( removeMediaElement);
		}
			}
			catch(e){
			console.log(e);
		}
		   var n = noty({
            text        : 'The user whose id is:'+ id +' has disconnected...!!!',       
            type            : 'information',
            dismissQueue: true,
            layout      : 'topCenter',
            theme       : 'defaultTheme',
				buttons     : [{addClass: 'btn btn-primary', text: 'Ok', 
							onClick: function ($noty) {
                    $noty.close();
					if(thankYouNotyDiv && buttonDiv && incomingCall){
						thankYouNotyDiv.style.display='none';
						buttonDiv.style.display='none';
						incomingCall.style.display='none';
					}
					if(incomingVideoCall1){
						incomingVideoCall1.style.display='none';
					}
					if(connectLocalNotyDiv){
						connectLocalNotyDiv.style.display='none';
					}
					if(connectNotyDiv){
						connectNotyDiv.style.display='none';
					}
					location.href = location.href.replace(location.search, '');
                }
				}]
        });
	}
	});
}
