# API (Application Program Interface)
### 1.W5Peer()
#### 1.1 Description
Method to construct a w5rtc user object. It takes the API-Key as an argument, which is validated by the server. On successful validation a user object is constructed. It contains the functions and members to establish an RTC communication.
#### 1.2 Return
    W5Peer object.
#### 1.3 Argument
    API-Key
#### 1.4 Usage
    Var W5CAPIuser = new W5Peer({key:'22f55f4a79aaafca72248c7f8f7d3adb80e07d66eb091f3f});

### 2.onSuccess(callback)
#### 2.1 Description
This API takes a callback function as an argument. The users can implement their own application logic and add callback.
    
#### 2.2 Return    
    W5Peer object.   
#### 2.3 Argument    
    API-Key
#### 2.4 Usage    
    Var W5CAPIuser = new W5Peer(API-Key); //construct W5Peer object
    w5rtcUser.onSuccess( function() {callButton.disabled = false;}});
    
### 3.call('target-userid')
#### 3.1 Description
This API initiates a call to another user. It takes the target-user-id as an argument to initiate the call. The target user id is the user id assigned to the w5rtcUser object.
###### Note: 
Once the signaling channel is established, user is able to make call to the desired peer.
#### 3.2 Return    
    Null   
#### 3.3 Argument    
    Null
#### 3.4 Usage    
    Var W5CAPIuser = new W5Peer(API-Key); //construct W5Peer object
    W5CAPIuser.registerUserWithId(caller)
    w5rtcUser.onSuccess( function() {callButton.disabled = false;}});
    w5rtcUser.call(‘callee’);
     
### 4.stopCall()
#### 4.1 Description
Disconnects the call.    
#### 4.2 Return    
    Null  
#### 4.3 Argument    
    Null  
#### 4.4 Usage    
    Var W5CAPIuser = new W5Peer(API-Key); //construct W5Peer object
    W5CAPIuser.registerUserWithId(‘caller’);
    W5CAPIuser.onSuccess( function() {callButton.disabled = false;}});
    W5CAPIuser.call(‘callee’);
    W5CAPIuser.stopCall(); 
 
 ### 5.muteAudio ()
#### 5.1 Description
Disables the local microphone.    
#### 5.2 Return    
    Null   
#### 5.3 Argument    
    Null
#### 5.4 Usage    
    W5CAPIuser. muteAudio (); // Mute the Audio track  
    
### 6.unmuteAudio ()
#### 6.1 Description
Enables the local microphone.    
#### 6.2 Return    
    Null
#### 6.3 Argument    
    Null
#### 6.4 Usage    
    W5CAPIuser. unmuteAudio ();
    
### 7.pauseVideo ()
#### 7.1 Description
Mute video track of the stream. Video is muted on local and remotes sides.
#### 7.2 Return
    Null
#### 7.3 Argument
    Null
#### 7.4 Usage
    W5CAPIuser. pauseVideo ();

### 8.playVideo ()
#### 8.1 Description
Play video track of the stream. Video is played on local and remotes sides.
#### 8.2 Return
    Null
#### 8.3 Argument
    Null
#### 8.4 Usage
    W5CAPIuser. playVideo ();

### 9.setResolutions(width,height);
#### 9.1 Description
This method overrides resolutions object to set custom video resolutions. The supported values are: 1920:1080, 1280:720, 960:720, 640:360, 640:480, 320:240, and 320:180

#### 9.2 Return
    Null
#### 9.3 Argument
    width: numeric,
    height: numeric,
#### 9.4Usage
    W5CAPIuser.setResolutions(1280, 720);

### 10.signal(string);	
#### 10.1 Description
This API is used to send data directly to the peers using the signaling gateway.
#### 10.2 Return
    Null
#### 10.3 Argument
    string: string data, send message to the peer through signaling gateway.
#### 10.4 Usage
    W5CAPIuser.signal({
    to: message.from,
    peerid: message.peerid,
    ready: true    
    });   
   
### 11.send(data);	API
#### 11.1 Description
This API allows user to send longest possible string to the peer. This method also allows you to send any JavaScript object.
This object will be the "data" passed over "datachannel-message" event.
The datachannel-message event id fired as soon as peer receives data.
#### 11.2 Return
    Null
#### 11.3 Argument
    data: longest-possible-string
#### 11.3 Usage
    W5CAPIuser.send({ message: '----', sender: 'userid', sendingTime: '----',sendingLanguage: 'en-US'});

### 12.sendFile(file);	API
#### 12.1 Description
This API allows user to send file to the peer. User is allowed to send more than one file concurrently.The send file method is associated with file progress helper events file-start, file-end and file-progress. These events are used to notify the file sharing/sending progress.
#### 12.2 Return
    Null
#### 12.3 Argument
    file: selected file that user needs to send to the peer.
#### 12.4 Usage
    document.querySelector('input[type=file]').onchange = function() {
    W5CAPIuser.sendFile(this.files[0]);
    };
### 13.send(var);	
#### 13.1 Description
"send" method provides a common style to send both file and text messages. This API provides the flexibility to use single API instead of sendText and sendFile.
#### 13.2 Return
    Null
#### 13.3 Argument
    var: string/file/object.
#### 13.4 Usage
    W5CAPIuser.send('longest-possible-string');
    W5CAPIuser.send(file);
    W5CAPIuser.send(data);

### 14.setStatus(status)
#### 14.1 Description
This API allows user to send status to other user’s.
The setStatus method is associated with status helper events user-status, online-users and offline-user. These events are used to notify the user status progress.

### 15.on(event, callback)	API
#### 15.1 Description
This API is used to register a callback function for an event. The function is executed when the event is fired by the application.
#### 15.2 Return
    Null
#### 15.3 Argument
    Event: W5CAPI events.
    callback: function that should perform certain task on receiving the event
#### 15.4 Usage
    W5CAPIuser. onLocalStream (, function (event) {
    event.stream ---- MediaStream object
    event.mediaElement ---- HTMLAudioElement or HTMLVideoElement
    });


### 16.saveToDisk(fileurl, filename)	API
#### 16.1 Description
Developers can use this API to save DataURL or fileURL to disk using "save-as" dialog.
### 16.2 Return
    Null
#### 16.3 Argument
    fileurl : string.
    filename : string.

### 17.onLocalStream	Event
#### 17.1 Description
This event is always fired while capturing local media sources.
#### 17.2 Usage
    W5CAPIuser. onLocalStream ( function (event) {
    event.stream ---- MediaStream object
    event.mediaElement ---- HTMLAudioElement or HTMLVideoElement
    });

### 18.onRemotestream	Event
#### 18.1 Description
This event is always fired as soon as remote stream is delivered to remote peer.
### 18.2 Usage
    W5CAPIuser.onRemotestream( function (event) {
    event.stream ---- MediaStream object
    event.mediaElement ---- HTMLAudioElement or HTMLVideoElement
    });

### 19.datachannel-open	Event
#### 19.1 Description
This event is fired as soon as data connection is opened and makes the user ready to send and receive data.This event is fired repeatedly for each peer. So if you're interconnecting 10 users, this event will be fired 9-times for each user.
#### 19.2 Usage
    W5CAPIuser. onDatachannel ( function (event) {
    If(event.event==’open’)
    {
    console.log(“data channel is opend”)
    }
    });

### 20.datachannel-message	Event
#### 20.1 Description
This event is fired when a peer receives data (string/object/file) from other peer.
#### 20.2 Usage
    W5CAPIuser. onMessage ( function(data) { console.log(‘ received data’ , data);
    });

### 21.datachannel-close	Event
#### 21.1 Description
This event is fired as soon as data connection is closed
#### 21.2 Usage
    W5CAPIuser.onDatachannel( function(data) {
    If(event.event==’close’)
    {
    console.log(“data channel is close”)
    }
    });

### 22.file-start	Event
#### 22.1 Description
This event is fired when user selects a file to be uploaded and uploads the file .
#### 22.2 Usage
    W5CAPIuser.onFile( function (file){
    If(file.event==’file-start’
    // Add an inner html to display the shared file.
    }
    });

### 23.file-end	Event
#### 23.1 Description
This event is fired when a file is sent form peer end or when a file is receives and a peers end.
### 23.Usage
    W5CAPIuser.onFile( function (file){
    If(file.event==’file-end’)
    {
    //Download the file
    }
    }

### 24.file-progress	Event
#### 24.1 Description
This event is fired to notify that the File transmission is on progress.
#### 24.2Usage
    W5CAPIuser.onFile( function (file) {
    If(file.event==’file-progress’)
    {
    //Display the file transmission progress.
    }
    }

### 25.user-left-all	Event
#### 25.1 Description
This event is fired when a user leaves a session (Audio/Video/Data/Screen)
### 25.2 Usage
    W5CAPIuser.on('user-left-all', function (id) {
    console.log ('The user whose id is:'+ id +' has disconnected...!!!');
    }
### 26.stream-removed
Event
#### 26.1 Description
This event is fired when media stream is stopped.
#### 26.2 Usage
    W5CAPIuser.on('stream-removed', function (e) {
    //console.log ('media stream stopped need to remove the stream');
    }
### 27.user-status
Event
#### 27.1 Description
This event is fired when user change status.
#### 27.2 Usage
    W5CAPIuser.on('user-status',function(data){
    //console.log(‘Username:’+data.from+’Status:’+data.status);
    });

### 28.online-users
Event
#### 28.1 Description
This event is fired when user come online.
### 28.2 Usage
    W5CAPIuser.on('online-users',function(data){
    //console.log(‘Online user’s list’+data.id);});
    })
    
### 29. offline-user	Event
#### 29.1 Description
This event is fired when user goes offline.
#### 29.2 Usage
    W5CAPIuser.on('offline-user',function(data){
    //console.log(‘offline user id’+data.from);
    });

### 30.peer-stats	Event
#### 30.1 Description
This event is fired when peer connection established and this event emit peer connection stats.
##### 30.2Usage
    W5CAPIuser.on('peer-stats',function(data){
    //console.log(‘bandwidth’+data.bandwidth);
    // console.log(‘bandwidthused’+data.useBandwidth);
    //console.log(‘localAddress’+data.localAddress);
    //console.log(‘remoteAddress’+data.remoteAddress);
    });

### 31.userid	String Attribute
#### 31.1 Description
Sets user-id for the user. The id (Alpha Numeric value) is unique within the Application or API-key domain. By default, W5CAPI auto generates a random number for the id. However, you can override it to use custom values.
#### 31.2 Return
    Null
#### 31.Argument
    Null

#### 31.Usage
    Var W5CAPIuser = new W5Peer(API-Key);
    W5CAPIuser.registerUserWithId(‘caller1234’);

### 32. mediatype	Array Attribute
#### 32.1 Description
Set audio-video transmission by the local user in any subsequent calls. This array contains three values audio, video and screen. When audio is true the application transmits audio stream only, similar works when the video is true. When both the attributes are true, the application streams both audio and video packets. When screen is true the application shares the screen among the peers.
#### 32.2Return
    Null
#### 32.2.argument
    Null
#### 32.3 Usage
    var w5rtcUser = new W5Peer(API-Key);
    w5rtcUser.call(‘callee’,{audio:true,video:true});

Note: This is override parameter, when user constructs the W5Per object, the default value set for audio and video is true.

### 33. bandwidth	Array Attribute
#### 33.1 Description
Set bandwidth for the data transmission in any subsequent calls. This array contains two values audio, video. Assigning the value overrides the default values set for the bandwidth. The unit taken by the values is kbps.
#### 33.2 Return
    Null
#### 33,2 Argument
    Null
#### 33.3Usage

    var w5rtcUser = new W5Peer(API-Key); w5rtcUser.bandwidth = {audio: 50,video: 256};


Note: This works only on Chrome browser; auto-skipped for Firefox. The default value set for audio & video are 50kbps and 256 kbps respectively.

### 34 direction	Array Attribute
#### 34.1 Description
This attribute sets the type of communication; weather the user wants one-way/two-way communication.
#### 34.2 Return
    Null
#### 34.3 Argument
    Null
### 34.3 Usage
    var w5rtcUser = new W5Peer(API-Key);
    w5rtcUser.call(‘callee’,{audio:true,direction:’two-way’});


### 35.datachannel	Boolean Attribute
#### 35.1 Description
Sets the webrtc data channels to send chat messages or transfer files. It can work without media-streaming. It is used when users want to chat and share files or screen.
#### 35.2 Return
    Null
#### 35.3 Argument
    Null
#### 35.4 Usage
    var w5rtcUser = new W5Peer(API-Key); w5rtcUser. registerUserWithId(caller);     w5rtcUser.datachannel = true;

### 36.chunkSize	Attribute
#### 36.1 Description
This attribute chunks the file into a given size in bytes. Currently 64k bytes is the maximum limit for Chrome-to-Chrome connection and 16k bytes is maximum receiving limit for Firefox.
#### 36.2 Return
    Null
#### 36.3 Argument
    Null
#### 36.4 Usage
    var w5rtcUser = new W5Peer(API-Key); w5rtcUser.chunkSize = 16 * 1000;

### 37.chunkInterval	Attribute
#### 37.1 Description
This attribute sets the time interval between two chunk packets. The unit is in milliseconds.
#### 37.2 Return
    Null
#### 37.3 Argument
    Null
#### 37.4 Usage
    var w5rtcUser = new W5Peer(API-Key); w5rtcUser.chunkInterval = 200;

### 38.Resolutions	Array Object
#### 38.1 Description
This parameter sets the video resolution. You can override this object to set custom video resolutions.
#### 38.2 Return
    Null
#### 38.3 Argument
    Null
#### 38.4 Elements
    {minWidth: value, minHeight: value, maxWidth: value, maxHeight: value}
#### 38.5 Usage
    var w5rtcUser = new W5Peer(API-Key);
    w5rtc.resolutions = {minWidth: 320, minHeight: 180, maxWidth: 1280, maxHeight: 720};

### 39.peers	Array Object
#### 39.1 Description
This array object holds the list of all users (W5Peer object). You can access a user object (W5Peer object) from the peers list using the user id.
#### 39.2 Return
    W5Peer object
#### 39.3 Argument
    Null
#### 39.4 Usage
    var w5rtcUser = new W5Peer(API-Key); var user1 = w5rtcUser.peers[7564321]

