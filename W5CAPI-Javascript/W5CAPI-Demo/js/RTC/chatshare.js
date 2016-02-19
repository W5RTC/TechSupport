function chatshare() {
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
    //For generating random string
    function getRandomString() {
        return (Math.random() * new Date().getTime()).toString(36).replace(/\./g, '');
    }
    var uid4 = getRandomString();
    //get the caller and calee ids
    window.params = params;
    window.params.caller = window.params.caller || w5capi.userid;
    window.params.callee = window.params.callee || uid4;
    /*
          @Old Syntax
          */
    //w5capi.userid = window.params.caller;

    /*
           @ New Syntax
          */
    //Open Signalling channel(Socket.IO)
    w5capiReady(function(){
        console.log(window.params.caller);
 w5capi.registerUserWithId(window.params.caller);
    });
   

    //for generating url for remote side
    document.getElementById('user_name3').value = location.href.replace(location.search, '') + '?caller=' + window.params.callee + '&callee=' + window.params.caller;

    //creating object for start chat button.
    var setUp = document.getElementById('starttalkdtndiv');
    //open socket connection by calling openSignalingChannel function

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
         w5capi.sendCustomMessage({
        enableButton: true,
        to: window.params.callee+document.capikey
    });
        });
    
    //accept incomming call
     w5capi.onCall(function(data){
            
            w5capi.accept(data);
        });
        
    
   
    //.......some global variables declared...............
    var thankYouNotyDiv;
    var buttonDiv;
    var connectNotyDiv;
    var connectLocalNotyDiv;
    var incomingCall;
    var incomingCall1;
    //........................end.........................
    //........custom-signaling-message function defined for handling user's some custom message...............
    w5capi.on('custom-signaling-message', function(message) {
        console.log('custom signaling message', message);
        if (message.to != w5capi.userid) return;
        if (message.enableButton) {
            //when link sender initiated call request to link reciever
            setUp.onclick = function() {
                showchatbox();
                this.disabled = true;
                var div2 = document.createElement('div');
                div2.id = 'connectid';
                div2.style.width = '400px';
                div2.style.height = '30px';
                div2.style.position = 'absolute';
                div2.style.fontSize = '18px';
                div2.style.marginTop = '80px';
                div2.style.marginLeft = '100px';
                div2.innerHTML = '<font color="white">' + '<b>' + "Connecting....." + '</b>' + '</font>';
                document.getElementById('writeText').appendChild(div2);
                connectLocalNotyDiv = div2;
                w5capi.sendCustomMessage({
                    to: window.params.callee+document.capikey,
                    isThisChat: true
                });
            }
            w5capi.sendCustomMessage({
                enableButton1: true,
                to: message.userid
            });
        }
        //Remote client got msg from call initiator 
        if (message.enableButton1) {
            showchatbox();
            var div = document.createElement('div');
            div.id = 'nameid';
            div.style.width = '300px';
            div.style.height = '30px';
            div.style.position = 'absolute';
            div.style.marginTop = '20px';
            div.style.marginLeft = '80px';
            div.style.fontSize = '16px';
            div.innerHTML = '<font color="white">' + '<b>' + "Thank You for joining...!" + '</b>' + '</font>';
            document.getElementById('writeText').appendChild(div);
            thankYouNotyDiv = div;
            var div1 = document.createElement('div');
            div1.innerHTML = '<div class="btn signinbtndivone">' + "Start Chat" + '</div>';
            div1.style.marginTop = '50px';
            div1.style.marginLeft = '140px';
            document.getElementById('writeText').appendChild(div1);
            var div2 = document.createElement('div');
            div2.id = 'connectid';
            div2.style.width = '400px';
            div2.style.height = '30px';
            div2.style.position = 'absolute';
            div2.style.fontSize = '18px';
            div2.style.marginTop = '80px';
            div2.style.marginLeft = '100px';
            div2.style.display = 'none';
            div2.innerHTML = '<font color="white">' + '<b>' + "Connecting....." + '</b>' + '</font>';
            document.getElementById('writeText').appendChild(div2);
            buttonDiv = div1;
            connectNotyDiv = div2;
            buttonDiv.onclick = function() {
                connectNotyDiv.style.display = 'block';
                thankYouNotyDiv.style.display = 'none';
                buttonDiv.style.display = 'none';
                w5capi.sendCustomMessage({
                    to: window.params.callee+document.capikey,
                    readyForChat: true
                });
            }
        }
        //link reciever got incoming call request from link sender
        if (message.isThisChat) {
            thankYouNotyDiv.style.display = 'none';
            buttonDiv.style.display = 'none';
            document.getElementById('incomingChat').style.display = 'block';
            incomingCall = document.getElementById('incomingChat');
            // if link reciever accepting incoming call
            document.getElementById('right').onclick = function() {
                document.getElementById('incomingChat').style.display = 'none';
                w5capi.sendCustomMessage({
                    to: message.userid,
                    gotChatResponse: true
                });
            }
            //if link reciever rejecting the incoming call
            document.getElementById('worng').onclick = function() {
                document.getElementById('incomingChat').style.display = 'none';
                thankYouNotyDiv.style.display = 'none';
                buttonDiv.style.display = 'none';
                textMessage.disabled = true;
                w5capi.sendCustomMessage({
                    to: message.userid,
                    rejectingTheChat: true
                });
            }
        }
        //when link sender got confirmation that other user is ready to join his call
        //initiated call.
        if (message.gotChatResponse) {
            connectLocalNotyDiv.style.display = 'none';
             /*
             @ Old Syntax
            */
            //w5capi.call(window.params.callee);
            
            /*
             @ new Syntax
            */
            w5capi.call(window.params.callee,{data:true});
        }
        //link sneder got chat request from link reciever.
        if (message.readyForChat) {
            showchatbox();
            document.getElementById('incomingChat').style.display = 'block';
            incomingCall1 = document.getElementById('incomingChat');
            document.getElementById('right').onclick = function() {
                //if agree to recieve the chat request.
                document.getElementById('incomingChat').style.display = 'none';
                w5capi.sendCustomMessage({
                    to: message.userid,
                    yesReadyForChat: true
                });
            }
            //if rejecting the chat request.
            document.getElementById('worng').onclick = function() {
                document.getElementById('incomingChat').style.display = 'none';
                textMessage.disabled = true;
                w5capi.sendCustomMessage({
                    to: message.userid,
                    chatRejected: true
                });
            }
        }
        //The link reciever is intiating call to link sender
        if (message.yesReadyForChat) {
            connectNotyDiv.style.display = 'none';
            /*
             @ Old Syntax
            */
            //w5capi.call(window.params.callee);
            
            /*
             @ new Syntax
            */
            w5capi.call(window.params.callee,{data:true});
        }
        //link reciever got message that other user has rejected the call.
        if (message.chatRejected) {
            var str = connectNotyDiv.innerHTML;
            var res = str.replace("Connecting.....", "Call Rejected....");
            connectNotyDiv.innerHTML = res;
            setTimeout(function() {
                connectNotyDiv.style.display = 'none';
            }, 4000);
            textMessage.disabled = true;
        }
        //link sender got message that link reciever has rejected the call.
        if (message.rejectingTheChat) {
            textMessage.disabled = true;
            var str = connectLocalNotyDiv.innerHTML;
            var res = str.replace("Connecting.....", "Call Rejected....");
            connectLocalNotyDiv.innerHTML = res;
            setTimeout(function() {
                connectLocalNotyDiv.style.display = 'none';
            }, 4000);
        }
    })

    w5capi.datachannel = true;
    /**
       @ Old Syntax
    */
    //this event will be handled when user will gat messages through datachannel.
   /* w5capi.on('datachannel-message', function(data) {
        showchatbox();
        appendDIV3(data.message, data.fullName);
    });
    */
    
    /**
     @ New Syntax
    */
    //this event will be handled when user will gat messages through datachannel.
    w5capi.onMessage(function(data){
        showchatbox();
        appendDIV3(data.msg.message, data.msg.fullName);
    });
    
    /**
     @ old Syntax
     */
    
    //This event will handled when datachannel will be open.
    /*
    w5capi.on('datachannel-open', function() {
        if (thankYouNotyDiv && buttonDiv) {
            thankYouNotyDiv.style.display = 'none';
            buttonDiv.style.display = 'none';
        }
        showchatbox();
        document.getElementById('text-message').disabled = false;
    });
    
    
   
    //This event is handling when datachannel is closed.
    w5capi.on('datachannel-close', function(event) {
        w5capi.channels.value = '';
        document.getElementById('text-message').disabled = true;

    });
    */
    
    /**
     @ new Syntax
     */
    
     w5capi.onDatachannel(function(data){
        if(data.event==='open')
        {
            if (thankYouNotyDiv && buttonDiv) {
            thankYouNotyDiv.style.display = 'none';
            buttonDiv.style.display = 'none';
        }
        showchatbox();
        document.getElementById('text-message').disabled = false;
        }else if(data.event==='close')
        {
            w5capi.channels.value = '';
        document.getElementById('text-message').disabled = true;
        }
    });
    
    
    //.......creating object for textarea and message box.
    var textMessage = document.getElementById('text-message');
    var messagesBox = document.getElementById('messages-box1');
    //When user will type messages on the textarea.
    textMessage.onkeyup = function(e) {
        if (e.keyCode != 13) return;
        if (this.value.length == 1) {
            var n = noty({
                text: 'There are no text to send, please type your message..',
                type: 'information',
                dismissQueue: true,
                layout: 'topCenter',
                theme: 'defaultTheme',
                buttons: [{
                    addClass: 'btn btn-primary',
                    text: 'Ok',
                    onClick: function($noty) {
                        $noty.close();
                    }
                }, ]
            });
            this.value = '';
        } else {
            /**
              @Old Syntax
            */
            /*
            w5capi.sendText({
                fullName: document.getElementById('full-name').value,
                message: this.value
            });
            */
            
             /**
              @New Syntax
            */
            w5capi.send({
                fullName: document.getElementById('full-name').value,
                message: this.value
            });
            appendDIV4(this.value);
            this.value = '';
            this.focus();
        }
    };

    //appending localuser's messages on the messagebox
    function appendDIV4(text, fullName) {
        fullName = fullName || document.getElementById('full-name').value;
        var namErr = /^[A-Za-z0-9_]{1,15}$/;
        console.log('hello', namErr.test(fullName));
        if (fullName == "") {
            var n = noty({
                text: 'Please enter your name and send..',
                type: 'information',
                dismissQueue: true,
                layout: 'topCenter',
                theme: 'defaultTheme',
                buttons: [{
                    addClass: 'btn btn-primary',
                    text: 'Ok',
                    onClick: function($noty) {
                        $noty.close();
                    }
                }, ]
            });
            return;
        }
        if (!namErr.test(fullName)) {
            var n = noty({
                text: 'Name must contain characters(a-z)/(A-Z)& maximum upto 15...!',
                type: 'information',
                dismissQueue: true,
                layout: 'topCenter',
                theme: 'defaultTheme',
                buttons: [{
                    addClass: 'btn btn-primary',
                    text: 'Ok',
                    onClick: function($noty) {
                        $noty.close();
                    }
                }, ]
            });
            return;
        }
        var currentTime = new w5desi();
        var y = currentTime.time;
        document.getElementById('innerdiv').innerHTML = document.getElementById('innerdiv').innerHTML + '<div class="bpaddingdiv1 wordbrealaddl"><div class="chatwindowname fl"><div class="rpaddingdiv1"><div class="newallpaddingdiv1 textaligncenterdiv colorwhite fontssizediv5 bgcolordeepblue borderradiusdiv1">' + fullName + '</div></div></div><div class="chatwindowleft fr"><div id="demoright" class="smallallpaddingdiv1 fontssizediv6 colorlightblueone"><div class="smallbpaddingdiv1"><div class="fl smallfontssizediv colorgray">' + currentDay + '</div><div class="fr smallfontssizediv colorgray">' + y + '</div><div class="clear"></div></div>' + text + '</div></div><div class="clear"></div></div>';
        /*for autoscroll*/
        var scroltop = parseInt(document.getElementById('innerdiv').clientHeight) - document.getElementById('messages-box1').clientHeight;
        if (document.getElementById('innerdiv').clientHeight > document.getElementById('messages-box1').clientHeight) {

            document.getElementById('messages-box1').scrollTop = scroltop;

        }



    }
    //appending remote user's message in the messagebox.
    function appendDIV3(text, fullName) {
        console.log('fullname first', fullName);
        var fullName1 = fullName;
        var namErr = /^[A-Za-z0-9_]{1,15}$/;
        if (fullName1 == '') {
            return;
        }
        if (!namErr.test(fullName1)) {

            return;
        }
        var currentTime = new w5desi();
        var y = currentTime.time;
        /* Div to carry msgs*/
        document.getElementById('innerdiv').innerHTML = document.getElementById('innerdiv').innerHTML +
            '<div class="bpaddingdiv1 wordbrealaddl"><div class="chatwindowleft fl"> <div id="demoleft" class="smallallpaddingdiv1 fontssizediv6       colorlightblueone"><div class="smallbpaddingdiv1"> <div class="fl smallfontssizediv colorgray">' + currentDay + '</div><div class="fr smallfontssizediv colorgray">' + y + '</div><div class="clear"></div> </div>' + text + '</div></div><div class="chatwindowname fr"><div class="lpaddingdiv1"><div class="newallpaddingdiv1 textaligncenterdiv colorwhite fontssizediv5 bgcolordeepblue borderradiusdiv1">' + fullName1 + '</div></div></div><div class="clear"></div></div>';
        /*auto scroll*/
        var scroltop = parseInt(document.getElementById('innerdiv').clientHeight) - document.getElementById('messages-box1').clientHeight;
        if (document.getElementById('innerdiv').clientHeight > document.getElementById('messages-box1').clientHeight) {
            document.getElementById('messages-box1').scrollTop = scroltop;

        }
        delete fullName1;

    }

    //Providing the current time and date when user send msgs 
    function startDate() {
        var today = new Date();
        var d = today.getDate();
        var month = new Array();
        month[0] = "January";
        month[1] = "February";
        month[2] = "March";
        month[3] = "April";
        month[4] = "May";
        month[5] = "June";
        month[6] = "July";
        month[7] = "August";
        month[8] = "September";
        month[9] = "October";
        month[10] = "November";
        month[11] = "December";
        var m = month[today.getMonth()];
        var st = m.slice(0, 3);
        var weekday = new Array(7);
        weekday[0] = "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";
        var day = weekday[today.getDay()];
        var day1 = day.slice(0, 3);
        var x = st + "," + d + ", -" + day1 + "-";
        t = setTimeout(function() {
            startDate()
        }, 500);
        return x;
    }

    var currentDay = startDate();

    function w5desi() {
        this.time = getTime1();

        function getTime1() {
            var dTime = new Date();
            var hours = dTime.getHours();
            var minute = dTime.getMinutes();
            var period = "AM";
            if (hours > 12) {
                period = "PM"
            } else {
                period = "AM";
            }
            hours = ((hours > 12) ? hours - 12 : hours)
            var x = hours + "." + minute + period
            return x;
        }

    }
    //Notification when user click on send button for sending messages
    document.getElementById('btn').onclick = function() {
        var value = textMessage.value;
        if (value.length == 0) {
            var n = noty({
                text: 'There are no text in the text-field to send, please type your message..',
                type: 'information',
                dismissQueue: true,
                layout: 'topCenter',
                theme: 'defaultTheme',
                buttons: [{
                    addClass: 'btn btn-primary',
                    text: 'Ok',
                    onClick: function($noty) {
                        $noty.close();
                    }
                }, ]
            });
            this.value = '';
        } else {
            /**
              @Old Syntax
            */
            /*
            w5capi.sendText({
                fullName: document.getElementById('full-name').value,
                message: this.value
            });
            */
            
             /**
              @New Syntax
            */
            w5capi.send({
                fullName: document.getElementById('full-name').value,
                message: this.value
            });
            
            
            appendDIV4(textMessage.value);
            textMessage.value = '';
            textMessage.focus();
        }

    }
    // to end the chat call
    var callclose = document.getElementById('closecall');
    callclose.onclick = function() {
        location.reload(true);
        location.href = location.href.replace(location.search, '');
    }
    //Notification if the other user has disconnected.
    w5capi.on('user-left-all', function(id) {
        if (id == window.params.callee+document.capikey) {
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
                        if (incomingCall1) {
                            incomingCall1.style.display = 'none';
                        }
                        if (incomingCall && thankYouNotyDiv && buttonDiv) {
                            incomingCall.style.display = 'none';
                            thankYouNotyDiv.style.display = 'none';
                            buttonDiv.style.display = 'none';
                        }
                        if (messagesBox) {
                            document.getElementById('innerdiv').innerHTML = "";
                        }
                        if (connectNotyDiv) {
                            connectNotyDiv.style.display = 'none';
                        }
                        if (connectLocalNotyDiv) {
                            connectLocalNotyDiv.style.display = 'none';
                        }
                        location.href = location.href.replace(location.search, '');
                    }
                }, ]
            });
        }
    });

}