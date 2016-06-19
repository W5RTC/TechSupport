/*demo for w5capi file transfer*/
function fileShare()
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
    
    //generate random string
    function getRandomString() {
    return (Math.random() * new Date().getTime()).toString(36).replace( /\./g , '');
    }
    var uid3=getRandomString();
    
    //get the caller and calee ids
    window.params = params;
    window.params.caller= window.params.caller || w5capi.userid;
    window.params.callee= window.params.callee ||uid3;
    w5capi.datachannel = true;

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
    

    
      //for generating url for remote side
document.getElementById('user_name4').value =  location.href.replace(location.search, '') + '?caller=' + window.params.callee + '&callee=' +window.params.caller;
   //declaring the mediaType
    /*
          @Old Syntax
          */
 //w5capi.mediaType = {};
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
            setUp.className='textaligncenterdiv';
            
        }
    });
    */


 /*
    @ New Syntax
    */
    //accept incomming call
    w5capi.onCall(function(data) {

        w5capi.accept(data);
    });

    /*
           @ New Syntax
          */
    
    w5capi.onSuccess(function(data){
        setUp.disabled = false;
        setUp.className='textaligncenterdiv';
        });
    
w5capi.sendCustomMessage({
		enableButton:true,
		to:window.params.callee+document.capikey
	});
//.......some global variables declared...............
var thankYouDiv;
var buttonDiv;
var connectNotyDiv;
var connectLocalNotyDiv;
var incomingCall1;
var incomingCall;
//........................end.........................
//........custom-signaling-message function defined for handling user's some custom message...............
w5capi.on('custom-signaling-message',function(message)
          {
	console.log('custom signaling message',message);
	if(message.to!=w5capi.userid)return;
	if(message.enableButton){
			//when link sender initiated call to link reciever
            setUp.onclick = function ()
            {
            showfilesharingbox();
            this.disabled = true;
            var div2=document.createElement('div');
                       div2.id='connectid';
                       div2.style.width='400px';
                       div2.style.height='30px';
                       div2.style.position='absolute';
                       div2.style.fontSize ='18px';
                       div2.style.marginTop='80px';
                       div2.style.marginLeft='100px';
                       div2.innerHTML='<font color="black">'+'<b>'+"Connecting....."+'</b>'+'</font>';
                       document.getElementById('writeText').appendChild(div2);
                       connectLocalNotyDiv=div2;
                       document.getElementById('uplod').style.display='none';
             w5capi.sendCustomMessage({
               to:window.params.callee+document.capikey,
               startFileShare:true
           });
           }
		w5capi.sendCustomMessage({
			enableButton1:true,
			to:message.userid
		});
	}
   //Remote client got msg from call initiator 
	if(message.enableButton1)
        {
		showfilesharingbox();
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
		 thankYouDiv=div;
         var div1=document.createElement('div');
        div1.innerHTML='<div class="btn signinbtndivone">'+"Start Transfer"+'</div>';
        div1.style.marginTop='50px';
        div1.style.marginLeft='120px';
        document.getElementById('writeText').appendChild(div1);
		document.getElementById('uplod').style.display='none';
		var div2=document.createElement('div');
				div2.id='connectid';
				div2.style.width='400px';
               div2.style.height='30px';
               div2.style.position='absolute';
               div2.style.marginTop='80px';
               div2.style.marginLeft='100px';
			   div2.style.fontSize ='18px';
			   div2.style.display='none';
				div2.innerHTML='<font color="black">'+'<b>'+"Connecting....."+'</b>'+'</font>';
				document.getElementById('writeText').appendChild(div2);
		buttonDiv=div1;
		connectNotyDiv=div2;
            buttonDiv.onclick=function()
                {
			connectNotyDiv.style.display = 'block';
			thankYouDiv.style.display='none';
			buttonDiv.style.display='none';
			document.getElementById('uplod').style.display='none';
			w5capi.sendCustomMessage({
				to:window.params.callee+document.capikey,
				readyToRecieveFile:true
			});
		}
	}
   //link reciever got incoming call request from link sender
	if(message.startFileShare)
                {
		thankYouDiv.style.display='none';
		buttonDiv.style.display='none';
		document.getElementById('incomingFile').style.display='block';
		 incomingCall=document.getElementById('incomingFile');
					   // if link reciever accepting incoming call
		document.getElementById('right').onclick=function(){
		document.getElementById('uplod').style.display='block';	
		document.getElementById('incomingFile').style.display='none';
			w5capi.sendCustomMessage({
				to:message.userid,
				gotFileInfo:true
			});
		}
               //if link reciever rejecting the incoming call
                document.getElementById('wrong').onclick=function()
                    {
			document.getElementById('incomingFile').style.display='none';
			w5capi.sendCustomMessage({
				to:message.userid,
				fileRejected:true
			});
		}
		
	}
	//when link sender got confirmation that other user is ready to join his call
	//initiated call.
	if(message.gotFileInfo)
    {
      console.error('start file');
		document.getElementById('uplod').style.display='block';
		connectLocalNotyDiv.style.display='none';
        /**
        @ Old Syntax
        */
        //w5capi.call(window.params.callee);
        /**
        @ New Syntax
        */
		w5capi.call(window.params.callee,{data:true});
	}
    //link sneder got  request from link reciever.
	if(message.readyToRecieveFile)
        {
		showfilesharingbox();
		document.getElementById('incomingFile').style.display='block';
		incomingCall1=document.getElementById('incomingFile');
		document.getElementById('uplod').style.display='none';
				//if agree to recieve the  request.
		document.getElementById('right').onclick=function(){
		document.getElementById('uplod').style.display='block';
		  	document.getElementById('incomingFile').style.display='none';
			w5capi.sendCustomMessage({
				to:message.userid,
				yesIamReady:true
			});
		}
          //if rejecting the  request.
		document.getElementById('wrong').onclick=function()
        {
			document.getElementById('incomingFile').style.display='none';
			w5capi.sendCustomMessage({
				to:message.userid,
				wantToRejectedFileSharing:true
			});
		}
	}
  //The link reciever is intiating call to link sender
	if(message.yesIamReady)
        {
		document.getElementById('uplod').style.display='block';
		connectNotyDiv.style.display='none';

/**
        @ Old Syntax
        */
        //w5capi.call(window.params.callee);
        /**
        @ New Syntax
        */


		w5capi.call(window.params.callee,{data:true});
	}
   //link reciever got message that other user has rejected the call.
	if(message.wantToRejectedFileSharing)
        {
		var str=connectNotyDiv.innerHTML;
		var res=str.replace("Connecting.....","Call Rejected....");
		connectNotyDiv.innerHTML=res;
		setTimeout(function(){
			connectNotyDiv.style.display='none';
			}, 4000);
	}
	 //link sender got message that link reciever has rejected the call.
	if(message.fileRejected)
        {
		var str=connectLocalNotyDiv.innerHTML;
		var res=str.replace("Connecting.....","Call Rejected....");
		connectLocalNotyDiv.innerHTML=res;
		setTimeout(function(){
			connectLocalNotyDiv.style.display='none';
			}, 4000);
	}
    })
 

    // to customize chunk-size; defualt is 15k
 w5capi.chunkSize = 40*1000; // 12k

    // to customize interval size; defualt is 500ms
 w5capi.chunkInterval = 100;
    /*
      @Old Syntac
      */
    /*
 //This event will handled when datachannel will be open.
 w5capi.on('datachannel-open', function() 
           {
        document.getElementById('file').disabled = false;
		showfilesharingbox();
    });
    */
    
    /*
     @New Syntax
     */
    w5capi.onDatachannel(function(data){
        if(data.event==='open')
        {
            document.getElementById('file').disabled = false;
		showfilesharingbox();
        }
    });
  
 var progressHelper = {};
 var storeDiv;
        var messagesBox = document.getElementById('messages-box2');
        /**
        @ Old Syntax
         */
         
    /*
        w5capi.on('file-start', function (file)
                  {
        var div = document.createElement('div');
        div.title = file.name;
        div.innerHTML = '<div class="bgcolorgray allpaddingdiv1 colorlightblack headdingfonts fontssizediv4">' + file.name + '</div><div class="bgcolorlightgray allpaddingdiv1"><label>0%</label> <progress></progress></div>';
        messagesBox.appendChild(div);
                    progressHelper[file.uuid] = 
                                {
            div: div,
            progress: div.querySelector('progress'),
            label: div.querySelector('label')
        };
        progressHelper[file.uuid].progress.max = file.maxChunks;
    });

    // when you sent a file; or when you received a file
  w5capi.on('file-end', function (file)
            {
        if (!progressHelper[file.uuid]) {
            console.error('No such progress-helper element exists.', file);
            return;
        }
            if (file.type.indexOf('image') != -1)
            {
            progressHelper[file.uuid].div.innerHTML ='<div class="bgcolorgray allpaddingdiv1 colorlightblack headdingfonts fontssizediv4">' + file.name + '</div><div class="bgcolorlightgray allpaddingdiv1"> <img src="' + file.url + '" title="' + file.name + '">  </div>' + '<br/>';
            } else
            {
                /*downloading the file*/
    /*
            progressHelper[file.uuid].div.innerHTML = '<div class="bgcolorgray allpaddingdiv1 colorlightblack headdingfonts fontssizediv4">'+file.name+'<a href="' + file.url + '" download="' + file.name + '"><div class="btn signinbtndivone download">'+"Download file"+'</div></a></div>'+'<br/>';
        }
    });*/

/*
    // file transmission is on the way
     w5capi.on('file-progress', function (file) 
               {
        var helper = progressHelper[file.uuid];
        if (!helper) return;
        helper.progress.value = file.currentPosition || file.maxChunks || helper.progress.max;
        updateLabel(helper.progress, helper.label);
    });
*/

    /**
     @ New Syntax
     */
     w5capi.onFile(function(data){
         
         if(data.event==='file-start')
         {
             var file=data.file;
             var div = document.createElement('div');
        div.title = file.name;
        div.innerHTML = '<div class="bgcolorgray allpaddingdiv1 colorlightblack headdingfonts fontssizediv4">' + file.name + '</div><div class="bgcolorlightgray allpaddingdiv1"><label>0%</label> <progress></progress></div>';
        messagesBox.appendChild(div);
                    progressHelper[file.uuid] = 
                                {
            div: div,
            progress: div.querySelector('progress'),
            label: div.querySelector('label')
        };
        progressHelper[file.uuid].progress.max = file.maxChunks;
         }else if(data.event==='file-progress')
        {
            console.error('file progress');
            
                  var file=data;
                  var helper = progressHelper[file.uuid];
            console.log(file);
        if (!helper) return;
        helper.progress.value = file.currentPosition || file.maxChunks || helper.progress.max;
        updateLabel(helper.progress, helper.label);
        }else if(data.event==='file-end')
     {
         var file=data.file;
         if (!progressHelper[file.uuid]) {
            console.error('No such progress-helper element exists.', file);
            return;
        }
            if (file.type.indexOf('image') != -1)
            {
            progressHelper[file.uuid].div.innerHTML ='<div class="bgcolorgray allpaddingdiv1 colorlightblack headdingfonts fontssizediv4">' + file.name + '</div><div class="bgcolorlightgray allpaddingdiv1"> <img src="' + file.url + '" title="' + file.name + '">  </div>' + '<br/>';
            } else
            {
                /*downloading the file*/
            progressHelper[file.uuid].div.innerHTML = '<div class="bgcolorgray allpaddingdiv1 colorlightblack headdingfonts fontssizediv4">'+file.name+'<a href="' + file.url + '" download="' + file.name + '"><div class="btn signinbtndivone download">'+"Download file"+'</div></a></div>'+'<br/>';
        }
     }


         
     });
    
    
    
    
    
    // to display percentage for sending or receiving instance

    function updateLabel(progress, label) 
    {
        if (progress.position == -1) return;
        var position = +progress.position.toFixed(2).split('.')[1] || 100;
        label.innerHTML = position + '%';
    }
	//when user will select the file and send.
	 document.getElementById('file').onchange = function ()
     {
       w5capi.sendFile(this.files[0]);
    }; 
  //This event is handling when datachannel is closed.
w5capi.on('datachannel-close', function(event)
          {
	document.getElementById('uplod').style.display='none';
    });
 //when user will click on end share button
var callclose = document.getElementById('closecall');
callclose.onclick = function()
{
        location.reload(true);
        location.href = location.href.replace(location.search, '');
        }
//Notification if the other user has disconnected.
w5capi.on('user-left-all',function(id)
          {
        if(id==window.params.callee+document.capikey)
        {
		   var n = noty({
            text        : 'The user whose id is:'+ id +' has disconnected...!!!',       
            type            : 'information',
            dismissQueue: true,
            layout      : 'topCenter',
            theme       : 'defaultTheme',
            buttons     : [
                    {addClass: 'btn btn-primary', text: 'Ok', 
					   onClick: function ($noty) {
                    $noty.close();
                        if(incomingCall1)
                        {
						incomingCall1.style.display='none';
					}
                        if(incomingCall && thankYouDiv && buttonDiv)
                        {
						incomingCall.style.display='none';
						thankYouDiv.style.display='none';
						buttonDiv.style.display='none';
					}
                        if(connectNotyDiv)
                        {
						connectNotyDiv.style.display='none';
					}
                        if(connectLocalNotyDiv)
                        {
						connectLocalNotyDiv.style.display='none';
					}
					location.href = location.href.replace(location.search, '');
                }
                },
            ]
        });
	}
    });
}
