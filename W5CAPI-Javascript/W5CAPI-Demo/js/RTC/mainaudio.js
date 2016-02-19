// Audio Call DEMO functionality
function audioCall() {
    var params = {},
        r = /([^&=]+)=?([^&]*)/g;

    function d(s) {
        return decodeURIComponent(s.replace(/\+/g, ' '));
    }
    var match, search = window.location.search.toLowerCase();
    while (match = r.exec(search.substring(1)))
        params[d(match[1])] = d(match[2]);
    //User is creating instance of W5peer class for acessing the required methods/functions defined in that particular class.
    var w5capi = new W5Peer({
        key: document.capikey
    });

    // Generate Random string
    function getRandomString() {
        return (Math.random() * new Date().getTime()).toString(36).replace(/\./g, '');
    }
    var uid = getRandomString();
    window.params = params;
    window.params.caller = window.params.caller || w5capi.userid;
    window.params.callee = window.params.callee || uid;
    /*
    @Old Syntax
    */
    //w5capi.userid = window.params.caller;

    /*
    @ New Syntax
    */
    //Open Signalling channel(Socket.IO)
    console.log(window.params.caller);
    w5capi.registerUserWithId(window.params.caller);

    w5capiReady(function(){
    });
    
    /*
    @ New Syntax
    */
    //accept incomming call
    w5capi.onCall(function(data) {

        w5capi.accept(data);
    });


    document.getElementById('user_name1').value = location.href.replace(location.search, '') + '?caller=' + window.params.callee + '&callee=' +window.params.caller;
    /*
          @Old Syntax
          */
    // Mention the type of Media
    //w5capi.mediaType = {audio: true};

    // Describes the bandwidth of the media	  
    w5capi.bandwidth = {
        audio: 50
    }; // 30kbs

    //  Some Global variables declared
    var localStream;
    var removeMediaElement;
    var mediaType;
    var thankYouNotyDiv;
    var buttonDiv;
    var connectNotyDiv;
    var connectLocalNotyDiv;
    var incomingCall;
    var incomingCall1;

     /*
     @ Old Syntax
     */    
    /*
    // Append the local media stream	
    w5capi.on('local-stream-private', function(stream) {
        if (thankYouNotyDiv && buttonDiv && connectNotyDiv) {
            thankYouNotyDiv.style.display = 'none';
            buttonDiv.style.display = 'none';
            connectNotyDiv.style.display = 'none';
        }
        if (connectLocalNotyDiv) {
            connectLocalNotyDiv.style.display = 'none';
        }
        showvoicebox();
        appendMediaElement(stream, 'local', 'source');
        localStream = stream;
    });

    // Append remote media stream
    w5capi.on('remote-stream-private', function(stream) {
        console.log('remote-stream-private');
        appendMediaElement(stream, 'remote', 'remote');
    });
    */

  /*
     @ New Syntax
     */
    w5capi.onLocalStream(function(stream){
         if (thankYouNotyDiv && buttonDiv && connectNotyDiv) {
            thankYouNotyDiv.style.display = 'none';
            buttonDiv.style.display = 'none';
            connectNotyDiv.style.display = 'none';
        }
        if (connectLocalNotyDiv) {
            connectLocalNotyDiv.style.display = 'none';
        }
        showvoicebox();
        appendMediaElement(stream, 'local', 'source');
        localStream = stream;
        });
    /*
     @ new Sytax
     */
    w5capi.onRemoteStream(function(stream){
        appendMediaElement(stream, 'remote', 'remote');
    });
    
    
    // Describes the Media Element Controls	
    function appendMediaElement(stream, type, id) {
        var mediaElement = getMediaElement(stream, {
            buttons: ['stop', 'volume-slider', 'full-screen', 'mute-audio', 'mute-video'],
            width: innerWidth / 2 - 20,
            showOnMouseEnter: false
        }, id);
        document.getElementById('audio').appendChild(mediaElement);
        mediaType = type;
        removeMediaElement = mediaElement;
        var isIE = /*@cc_on!@*/ false || !! document.documentMode;
        var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;

        if (isIE || isSafari) {
            setTimeout(function() {
                var audiotag = document.getElementById(id);
                attachMediaStream(audiotag, stream);
            }, 400);
        } else {

        }
        var callback = {
            mediaElement: mediaElement,
            stream: stream
        };
        stream.onended = function() {
            w5capi.emit('stream-removed', callback);
        }

        // Functionality for Remote Media Element
        if (type == 'remote') {
            var h2 = document.createElement('h2');
            h2.innerHTML = 'Remote Audio';
            removeMediaElement = mediaElement;
            mediaElement.appendChild(h2);
            document.getElementById('crossbutton').onclick = function() {
                mediaElement.style.opacity = 0;
                setTimeout(function() {
                    if (mediaElement.parentNode) {
                        mediaElement.parentNode.removeChild(mediaElement);
                    }
                }, 800);
            }
        }

        // Functionality for Local Media Element
        if (type == 'local') {
            var h2 = document.createElement('h2');
            h2.innerHTML = 'Local Audio';
            mediaElement.appendChild(h2);
            mediaElement.media.muted = true;
            mediaElement.media.volume = 0;
            document.querySelector('.stop').id = 'crossButton1';
            document.getElementById('crossButton1').onclick = function() {
                mediaElement.style.opacity = 0;
                setTimeout(function() {
                    if (mediaElement.parentNode) {
                        mediaElement.parentNode.removeChild(mediaElement);
                    }
                }, 800);
                stream.stop();
                w5capi.sendCustomMessage({
                    removeMediaElement1: true,
                    to: window.params.callee+document.capikey
                });
            }
        }
    }
    var setUp = document.getElementById('starttalkdtndiv');

    // Setup Socket Connection by calling the openSignalingChannel function.
  
    
    /*
      @ Old Syntax
    */
    /*
    w5capi.openSignalingChannel({
        onReady: function() {
            setUp.disabled = false;
            
        }
    });
    */
    /*
           @ New Syntax
          */
    
    w5capi.onSuccess(function(data){
        setUp.disabled = false;
        });
    
    

    // Send custom message
    w5capi.sendCustomMessage({
        enableButton: true,
        to: window.params.callee+document.capikey
    });
    //........custom-signaling-message function defined for handling user's some custom message...............
    w5capi.on('custom-signaling-message', function(message) {
        console.log('custom signaling message', message);
        if (message.to != w5capi.userid) return;

        // Start the Call	
        setUp.onclick = function() {
            showvoicebox();
            this.disabled = true;
            var div2 = document.createElement('div');
            div2.id = 'connectid';
            div2.style.width = '400px';
            div2.style.height = '30px';
            div2.style.position = 'absolute';
            div2.style.marginTop = '80px';
            div2.style.marginLeft = '100px';
            div2.style.fontSize = '18px';
            div2.innerHTML = '<font color="white">' + '<b>' + "Connecting..." + '</b>' + '</font>';
            document.getElementById('writeText').appendChild(div2);
            connectLocalNotyDiv = div2;
            //when link sender initiated call request to link reciever
            w5capi.sendCustomMessage({
                to: window.params.callee+document.capikey,
                doYouWantToRecieveCall: true
            });
        }
        if (message.enableButton) {
            w5capi.sendCustomMessage({
                enableButton1: true,
                to: message.userid
            });
        }
        //Remote client got msg from call initiator 
        else if (message.enableButton1) {
            showvoicebox();
            var div = document.createElement('div');
            div.id = 'nameid';
            div.style.width = '300px';
            div.style.height = '30px';
            div.style.position = 'absolute';
            div.style.marginTop = '80px';
            div.style.marginLeft = '80px';
            div.style.fontSize = '16px';
            div.innerHTML = '<font color="white">' + '<b>' + "Thank You for joining...!" + '</b>' + '</font>';
            document.getElementById('writeText').appendChild(div);
            var div1 = document.createElement('div');
            div1.id = 'starttalkdtndiv';
            div1.innerHTML = '<div class="btn signinbtndivone">' + "Start Audio" + '</div>';
            div1.style.marginTop = '120px';
            div1.style.marginLeft = '130px';
            document.getElementById('writeText').appendChild(div1);
            div2 = document.createElement('div');
            div2.id = 'connectid';
            div2.style.width = '400px';
            div2.style.height = '30px';
            div2.style.position = 'absolute';
            div2.style.marginTop = '80px';
            div2.style.marginLeft = '100px';
            div2.style.fontSize = '18px';
            div2.style.display = 'none';
            div2.innerHTML = '<font color="white">' + '<b>' + "Connecting....." + '</b>' + '</font>';
            document.getElementById('writeText').appendChild(div2);
            thankYouNotyDiv = div;
            buttonDiv = div1;
            connectNotyDiv = div2;

            buttonDiv.onclick = function() {
                connectNotyDiv.style.display = 'block';
                buttonDiv.style.display = 'none';
                thankYouNotyDiv.style.display = 'none';
                w5capi.sendCustomMessage({
                    to: window.params.callee+document.capikey,
                    pleaseRecieveTheCall: true
                });
            }
        } else {
            setTimeout(function() {
                if (removeMediaElement && removeMediaElement.parentNode && !message.iWantToRecieve && !message.yesRecieving) {
                    try {
                        removeMediaElement.parentNode.removeChild(removeMediaElement);
                    } catch (e) {}
                }
            }, 800);
        }

        //link reciever got incoming call request from link sender
        if (message.doYouWantToRecieveCall) {
            buttonDiv.style.display = 'none';
            thankYouNotyDiv.style.display = 'none';
            document.getElementById('incomingCall').style.display = 'block';
            incomingCall = document.getElementById('incomingCall');
            // if link reciever accepting incoming call
            document.getElementById('right').onclick = function() {
                document.getElementById('incomingCall').style.display = 'none';
                thankYouNotyDiv.style.display = 'none';
                buttonDiv.style.display = 'none';
                w5capi.sendCustomMessage({
                    to: message.userid,
                    iWantToRecieve: true
                });
            }
            //if link reciever rejecting the incoming call
            document.getElementById('worng').onclick = function() {
                document.getElementById('incomingCall').style.display = 'none';
                thankYouNotyDiv.style.display = 'none';
                buttonDiv.style.display = 'none';
                w5capi.sendCustomMessage({
                    to: message.userid,
                    rejectingTheCall: true
                })
            }
        }
        //when link sender got confirmation that other user is ready to join his call
        //initiated call.
        if (message.iWantToRecieve) {
            connectLocalNotyDiv.style.display = 'none';
            /*
            Old Syntax
            */
            //w5capi.call(window.params.callee);
            /*
             New Syntax
            */
            console.error('executed once');
            //w5capi.call(window.params.callee,{audio:true});
        }
        //link sneder got call request from link reciever.
        if (message.pleaseRecieveTheCall) {
            showvoicebox();
            document.getElementById('incomingCall').style.display = 'block';
            incomingCall1 = document.getElementById('incomingCall');
            //if agree to recieve the call request.
            document.getElementById('right').onclick = function() {
                document.getElementById('incomingCall').style.display = 'none';
                w5capi.sendCustomMessage({
                    to: message.userid,
                    yesRecieving: true
                });
            }
            //if rejecting the call request.
            document.getElementById('worng').onclick = function() {
                document.getElementById('incomingCall').style.display = 'none';
                w5capi.sendCustomMessage({
                    to: message.userid,
                    iAmRejecting: true
                });
            }
        }
        //The link reciever is intiating call to link sender
        if (message.yesRecieving) {
            connectNotyDiv.style.display = 'none';
             /*
            Old Syntax
            */
            //w5capi.call(window.params.callee);
            /*
             New Syntax
            */
            console.error('executed once');
            w5capi.call(window.params.callee,{audio:true});
        }

        //link reciever got message that other user has rejected the call.
        if (message.iAmRejecting) {
            var str = connectNotyDiv.innerHTML;
            var res = str.replace("Connecting.....", "Call Rejected....");
            connectNotyDiv.innerHTML = res;
            setTimeout(function() {
                connectNotyDiv.style.display = 'none';
            }, 4000);
        }
        //link sender got message that link reciever has rejected the call.
        if (message.rejectingTheCall) {
            var str = connectLocalNotyDiv.innerHTML;
            var res = str.replace("Connecting...", "Call Rejected....");
            connectLocalNotyDiv.innerHTML = res;
            setTimeout(function() {
                connectLocalNotyDiv.style.display = 'none';
            }, 4000);
        }
    })

    // Media Stream Removed
    w5capi.on('stream-removed', function(e) {
        console.log('stream removed');
        if (e.mediaElement && e.mediaElement.parentNode) {
            e.mediaElement.parentNode.removeChild(e.mediaElement);
        }
    });

    // End the call
    var callclose = document.getElementById('closecall');
    callclose.onclick = function() {
        location.reload(true);
        location.href = location.href.replace(location.search, '');
    }

    // Notify when user has disconnected the call
    w5capi.on('user-left-all', function(id) {
        if (id == window.params.callee+document.capikey) {
            try {
                localStream.stop();
                if (removeMediaElement && removeMediaElement.parentNode) {
                    removeMediaElement.parentNode.removeChild(removeMediaElement);
                }
            } catch (e) {
                console.log(e);
            }
            var n = noty({
                text: 'The user whose id is:' + id + ' has disconnected...!!!',
                type: 'information',
                dismissQueue: true,
                layout: 'topCenter',
                theme: 'defaultTheme',
                buttons: [{
                    addClass: 'btn btn-primary',
                    text: 'Ok',
                    onClick: function($noty) {
                        $noty.close();
                        if (thankYouNotyDiv && buttonDiv && incomingCall) {
                            thankYouNotyDiv.style.display = 'none';
                            buttonDiv.style.display = 'none';
                            incomingCall.style.display = 'none';
                        }
                        if (connectLocalNotyDiv) {
                            connectLocalNotyDiv.style.display = 'none';
                        }
                        if (connectNotyDiv) {
                            connectNotyDiv.style.display = 'none';
                        }
                        if (incomingCall1) {
                            incomingCall1.style.display = 'none';
                        }
                        location.href = location.href.replace(location.search, '');
                    }
                }],
            });

        }
    });
}