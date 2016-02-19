# W5CAPI

W5CAPI provides a complete, configurable, and easy-to-use peer-to-peer API built on top of WebRTC, supporting both data channels and media stream.
## Demo Implementation 
  - Audio Call
  - Video Call
  - Text Chat
  - File transfer
  - Screen Sharing

### Audio Call 

#### Create Peer
```sh
var w5capi = new W5Peer({key:'Your Key'});
```
Example
```sh
var w5capi = new W5Peer({key:'989fkeyriyeruyeiuyuiwerwrheukr'});
```
#### Register Username
```sh
 w5capi.registerUserWithId('your uniqueid');
```
 Example
```sh
 w5capi.registerUserWithId('shaad');
```
#### Register Success Callback
Syntax
```sh
w5capi.onSuccess(function(data){//do you stuff here });
```
#### Register Error Callback
Syntax
```sh
w5capi.onFail(function(data){ });
```
**Note:**Callback function return Error message

#### Make Audio call
```sh
w5capi.call('calleeid',{audio:true});
```
Example
```sh
w5capi.call('w5rtc',{audio:true});
```
#### Accept call
Syntax
```sh
w5capi.onCall(function(data) {w5capi.accept(data)});
```
#### Decline call
Syntax
```sh
w5capi.onCall(function(data) {w5capi.decline(data)});
```
#### Receive Local Stream
Syntax
```sh
w5capi.onLocalStream(function(stream){});
```
#### Receive Remote Stream
Syntax
```sh
w5capi.onRemoteStream(function(stream){});
```
#### Attach media stream to audio tag
Syntax
```javascript
attachMediaStream('tagid',stream)
```
Example
```javascript
<audio id="locatstream" autoplay></audio>
attachMediaStream('document.getElementById('localstream'),stream)
```
#### Demo
   [Audio Demo](https://w5rtc.com/demo/voicewindow.php)

### Video Call 
#### Make Video call
```sh
w5capi.call('calleeid',{audio:true,video:true});
```
Example
```sh
w5capi.call('w5rtc',{audio:true,video:true});
```
#### Attach media stream to video tag
Syntax
```javascript
attachMediaStream('tagid',stream)
```
Example
```javascript
<video id="locatstream" autoplay></video>
attachMediaStream('document.getElementById('localstream'),stream)
```
#### Demo
   [Video Demo](https://w5rtc.com/demo/videowindow.php)

### Text Chat
#### Make Data Call
```sh
w5capi.call('calleeid',{data:true});
```
Example
```sh
w5capi.call('w5rtc',{data:true});
```
#### Enable DataChannel
```sh
    w5capi.datachannel = true;
```
####Receive Message
syntax
```sh
    w5capi.onMessage(function(data){});
```
#### Send Message
Syntax
```javascript
w5capi.send('your msg');
```
Example
```sh
w5capi.send({fullName: Murugan,message: Hai});
```
#### Demo
   [Text Chat Demo](https://w5rtc.com/demo/chatwindow.php)

### ** File Transfer **
#### Make Call
```sh
w5capi.call('calleeid',{data:true});
```
Example
```sh
w5capi.call('w5rtc',{data:true});
```
####Enable  DataChannel
```sh
    w5capi.datachannel = true;
```
#### Send File
syntax
```sh
w5capi.sendFile('file Object');
```
Example
```sh
w5capi.sendFile([blob]);
```

#### Receive File
syntax
```sh
w5capi.onFile(function(data){});
```
#### Demo
   [File Transfer Demo](https://w5rtc.com/demo/filetransferwindow.php)
   
### Screen Sharing
#### Make Screen Sharing
```sh
w5capi.call('calleeid',{screen:true,direction:'one-way'});
```
Example
```sh
w5capi.call('w5rtc',{screen:true,direction:'one-way'});
```
#### Demo
   [Screen Sharing Demo](https://w5rtc.com/demo/screensharingwindow.php)




### Version :  #1.4





