// Screen Share DEMO functionality
function shareScreen()
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

	// Generate Random string
	function getRandomString() {
    return (Math.random() * new Date().getTime()).toString(36).replace( /\./g , '');
	}
	var uid1= getRandomString();
	
	// Check if browser is Mozilla Firefox
	var isFirefox = !! navigator.mozGetUserMedia;
	if(isFirefox){
	alert('Screen sharing in WEBRTC is not supported in firefox,please run it in google chrome')
	return;
	}
	window.params = params;
	window.params.caller= window.params.caller || w5capi.userid;
	window.params.callee= window.params.callee ||uid1;
	/*
          @Old Syntax
          */
    //w5capi.userid = window.params.caller;

    /*
           @ New Syntax
          */
    //Open Signalling channel(Socket.IO)
    w5capiReady(function(){
        w5capi.registerUserWithId(window.params.caller);
    });
    

    //set extention ID
    w5capi.extensionID(document.extensionid);
   /*
    @ New Syntax
    */
    //accept incomming call
    w5capi.onCall(function(data) {

        w5capi.accept(data);
    });


	// Check if browser is Internet Explorer
	function isIE () {
  var myNav = navigator.userAgent.toLowerCase();
  return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
	}
	
	// If internet explorer then notify the user that some features will not work 
	if (isIE()) {
	 var n = noty({
            text        : 'Internet explorer does not support Webrtc...please test this w5capi Screensharing demo only in chrome!!!',       
            type            : 'information',
            dismissQueue: true,
            layout      : 'topCenter',
            theme       : 'defaultTheme',
			buttons     : [{addClass: 'btn btn-primary', text: 'Ok', 
							onClick: function ($noty) {
                    $noty.close();
                }
						}]
        });
	return;
	}
	// Check if Browser is Safari then notify the user that some features will not work 
	var isSafari=navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0;
	if (isSafari) 
		{
   alert("You are using Safari browser");
    var n = noty({
            text        : 'Safari does not support Webrtc..please test this w5capi Screensharing demo only in chrome!!!',       
            type            : 'information',
            dismissQueue: true,
            layout      : 'topCenter',
            theme       : 'defaultTheme',
			buttons     : [{addClass: 'btn btn-primary', text: 'Ok', 
							onClick: function ($noty) {
                    $noty.close();
                }
						}]
        });
	return;
	}
	document.getElementById('user_name6').value =location.href.replace(location.search, '') + '?caller=' + window.params.callee + '&callee=' +window.params.caller;
             
    /**
     @Old syntax
     **/
	// Mention the type of Media
	//w5capi.mediaType = {screen: true};

	// Describe the screen resolution needed for Screen Sharing
  w5capi.resolutions = {
       minWidth:1280,
        minHeight:720,
        maxWidth:1280,
        maxHeight:720,
		minAspectRatio:1.77,
		minFrameRate: 30
    };

	// Describes the bandwidth of the media
	w5capi.bandwidth = {video: 300};   // 300kbs is needed for screen

    /**
     @ Old Syntax
    **/
	// Mention the direction 
  // w5capi.direction = 'one-way';
	/**
     @ Old Syntax
    **/
	// Append the local media stream
    /*
  w5capi.on('local-stream-private', function(stream) {
        appendMediaElement(stream, 'local');
    });
	
	// Append remote media stream
   w5capi.on('remote-stream-private', function(stream) {
	   showscreensharingbox();
        appendMediaElement(stream, 'remote');
    });
    */
    /**
      @ New Syntax
      **/
    w5capi.onLocalStream(function(stream){
        appendMediaElement(stream, 'local');
    });
    /**
      @ New Syntax
      **/
     w5capi.onRemoteStream(function(stream){
        appendMediaElement(stream, 'remote');
    });

    // Describes the Media Element Controls	
    function appendMediaElement(stream) {
        var mediaElement = document.createElement(stream.getVideoTracks().length ? 'video' : 'audio');
        mediaElement.src = URL.createObjectURL(stream);
        mediaElement.controls =false;
        mediaElement.play();
         document.querySelector('#writeText').appendChild(mediaElement);
	}
	var setUp = document.getElementById('starttalkdtndiv');
    
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
	
	
	   //  Some Global variables declared
		var thankYouNotyDiv;
		var buttonDiv;
		var connectNotyDiv;
		var connectLocalNotyDiv;
		var incomingCall1;
		var incomingCall;
	   //........custom-signaling-message function defined for handling user's some custom message...............
	w5capi.on('custom-signaling-message',function(message){
	console.log('custom signaling message',message);
	if(message.to!=w5capi.userid)return;
	if(message.enableButton){
		w5capi.sendCustomMessage({
			enableButton1:true,
			to:message.userid
		});
	}
			//Remote client got msg from call initiator 
	if(message.enableButton1){
		showscreensharingbox();
		 var div=document.createElement('div');
		 div.id='nameid';
			div.style.width='100%';
		 div.style.height='30px';
		 div.style.position='absolute';
         div.style.marginTop='100px';
			div.style.textAlign='center';
		 div.style.fontSize='16px';
		 div.innerHTML='<font color="black">'+'<b>'+"Thank You for joining...!"+'</b>'+'</font>';
		 document.getElementById('writeText').appendChild(div); 
		 thankYouNotyDiv=div;
         var div1=document.createElement('div');
        div1.innerHTML='<div class="btn signinbtndivone">'+"Screen share"+'</div>';
        div1.style.marginTop='120px';
			div1.style.textAlign='center';
            div1.style.width='100%';
            div1.style.position='absolute';
        document.getElementById('writeText').appendChild(div1);
		var div2=document.createElement('div');
				div2.id='connectid';
				div2.style.width='400px';
               div2.style.height='30px';
               div2.style.position='absolute';
               div2.style.marginTop='80px';
			div2.style.marginLeft='350px';
			   div2.style.fontSize ='18px';
			   div2.style.display='none';
				div2.innerHTML='<font color="black">'+'<b>'+"Connecting....."+'</b>'+'</font>';
				document.getElementById('writeText').appendChild(div2);
		buttonDiv=div1;
		connectNotyDiv=div2;
		buttonDiv.onclick=function(){
			connectNotyDiv.style.display = 'block';
			thankYouNotyDiv.style.display='none';
			buttonDiv.style.display='none';
			
			if (sessionStorage.w5rtc_capiext) {
         w5capi.sendCustomMessage({
				to:window.params.callee+document.capikey,
				readyForScreenShare:true
			});
}else
{
	console.error('poda');
var installing=true;
chrome.webstore.install('https://chrome.google.com/webstore/detail/'+document.extensionid,
                    function (arg) {
				       setTimeout(function(){
					   location.reload();
					    w5capi.sendCustomMessage({
				       to:window.params.callee+document.capikey,
				         readyForScreenShare:true
			           });
					   },4000);
                    }, function (err) {
                        console.error(err)
                    });
}
		}
	}
		
		 //link reciever got incoming call request from link sender
	if(message.isThisScreen){
		 thankYouNotyDiv.style.display='none';
		 buttonDiv.style.display='none';
		document.getElementById('incomingScreen').style.display='block';
		incomingCall=document.getElementById('incomingScreen');
			 // if link reciever accepting incoming call
		document.getElementById('right').onclick=function(){
			document.getElementById('incomingScreen').style.display='none';
			w5capi.sendCustomMessage({
				to:message.userid,
				yesThisIsScreen:true
			});
		}
			//if link reciever rejecting the incoming call
		document.getElementById('wrong').onclick=function(){
			document.getElementById('incomingScreen').style.display='none';
			w5capi.sendCustomMessage({
				to:message.userid,
				rejectingScreensharing:true
			});
		}
	}
		//when link sender got confirmation that other user is ready to join his call
	   //initiated call.
	if(message.yesThisIsScreen){
		connectLocalNotyDiv.style.display='none';
        /**
         @Old Syntax
         */
		//w5capi.call(window.params.callee);
        /**
         @ New Syntax
         */
		w5capi.call(window.params.callee,{screen:true,direction:'one-way'});
	}
			//link sneder got call request from link reciever.
	if(message.readyForScreenShare){
		showscreensharingbox();
		document.getElementById('incomingScreen').style.display='block';
	    incomingCall1=document.getElementById('incomingScreen');
			//if agree to recieve the call request.
		document.getElementById('right').onclick=function(){
			document.getElementById('incomingScreen').style.display='none';
			w5capi.sendCustomMessage({
				to:message.userid,
				yesIamReady:true
			});
		}
			   //if rejecting the call request.
		document.getElementById('wrong').onclick=function(){
			document.getElementById('incomingScreen').style.display='none';
			w5capi.sendCustomMessage({
				to:message.userid,
				wantToRejectScreen:true
			});
		}
	}
		//The link reciever is intiating call to link sender
	if(message.yesIamReady){
		connectNotyDiv.style.display='none';
		 /**
         @Old Syntax
         */
		//w5capi.call(window.params.callee);
        /**
         @ New Syntax
         */
		w5capi.call(window.params.callee,{screen:true,direction:'one-way'});
	}
		
		//link reciever got message that other user has rejected the call.
	if(message.wantToRejectScreen){
		var str=connectNotyDiv.innerHTML;
		var res=str.replace("Connecting.....","Call Rejected....");
		connectNotyDiv.innerHTML=res;
		setTimeout(function(){
			connectNotyDiv.style.display='none';
			}, 4000);
	}
		 //link sender got message that link reciever has rejected the call.
	if(message.rejectingScreensharing){
		var str=connectLocalNotyDiv.innerHTML;
		var res=str.replace("Connecting.....","Call Rejected....");
		connectLocalNotyDiv.innerHTML=res;
		setTimeout(function(){
			connectLocalNotyDiv.style.display='none';
			}, 4000);
	}
	})
	// Start the Call
		setUp.onclick = function () {
	showscreensharingbox();
    this.disabled = true;
	var div2=document.createElement('div');
				div2.id='connectid';
				div2.style.width='400px';
               div2.style.height='30px';
               div2.style.position='absolute';
               div2.style.marginTop='80px';
			   div2.style.fontSize ='18px';
			div2.style.marginLeft='350px';
			   div2.innerHTML='<font color="black">'+'<b>'+"Connecting....."+'</b>'+'</font>';
				document.getElementById('writeText').appendChild(div2);
				connectLocalNotyDiv=div2;
				//when link sender initiated call request to link reciever
  w5capi.sendCustomMessage({
	  to:window.params.callee+document.capikey,
	  isThisScreen:true
  })
		}
	// End the call
	var endShare=document.getElementById('callClose');
	endShare.onclick=function(){
		location.reload(true);
		location.href = location.href.replace(location.search, '');
	}
	w5capi.on('user-left-all',function(id){
	if(id==window.params.callee+document.capikey){
		   var n = noty({
            text        : 'The user whose id is:'+ id +' has disconnected...!!!',       
            type            : 'information',
            dismissQueue: true,
            layout      : 'topCenter',
            theme       : 'defaultTheme',
				buttons     : [{addClass: 'btn btn-primary', text: 'Ok', 
							onClick: function ($noty) {
                    $noty.close();
					if(incomingCall1){
						incomingCall1.style.display='none';
					}
					if(incomingCall && thankYouNotyDiv && buttonDiv){
						incomingCall.style.display='none';
						thankYouNotyDiv.style.display='none';
						buttonDiv.style.display='none';
					}
					if(connectNotyDiv){
						connectNotyDiv.style.display='none';
					}
					if(connectLocalNotyDiv){
						connectLocalNotyDiv.style.display='none';
					}
					location.href = location.href.replace(location.search, '');
                }
				}]
        });
	}
	});
};