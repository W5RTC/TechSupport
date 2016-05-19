## a) Local Machine

This section explains how to setup and execute the demo. This will allow the user to understand how W5CAPI can be used to implement various features. By just cut and paste the code from demo source code provided, once can easily build the real-time communication in their own application.

### Setting up the demo

To set up the demo:

1. Download W5CAPI-WebRTC repositories and open W5CAPI-Demo directory.

![Home View](https://raw.githubusercontent.com/W5RTC/W5RTC_TechSupport/master/W5CAPI/docs/images/screen1.jpg)

The W5CAPI-Demo directory contains the following subdirectories:

 - Image: Contains the images required for the demo
 - Css: Contains the style sheet required for the demo
 - Js: Contains the java scripts for license activation, notification, and RTC application logic.
 
2. Open the license.js file from the following path: /W5CAPI-Demo/js/license.js

![Home View](https://raw.githubusercontent.com/W5RTC/W5RTC_TechSupport/master/W5CAPI/docs/images/editcode.jpg)

3. Paste your license key in the file, within the quotation marks “”. The license is provided to you in “License.txt” file by W5RTC along with the package sent to you.
4. Copy the W5CAPI-Demo directory to your hosting space.
Now you have successfully set up the W5CAPI-Demo application. You can run the RTC calls, as explained in the subsections further.

### To run the audio call:

- Open a browser and open the index file of the hosted directory. http://<domainName>/W5CAPI-Demo/index.html. The RTC Demo pane appears with the following list of features: Audio, Video, Chat, File Transfer, and Screen Sharing.

    ![Home View](https://raw.githubusercontent.com/W5RTC/W5RTC_TechSupport/master/W5CAPI/docs/images/capimenu.jpg)

- Click Audio.

    The w5 Audio window appears.
    
    ![Home View](https://raw.githubusercontent.com/W5RTC/W5RTC_TechSupport/master/W5CAPI/docs/images/capiaudio.jpg)
    
- Under Copy & Send URL to your Friend, copy the URL, and send it to your friend (Callee) to initiate the call or type your friends email address and click Invite, this will open your email client with URL in the email body.
- When the Callee opens the URL in browser, he/she finds the same window as yours.

    ![Home View](https://raw.githubusercontent.com/W5RTC/W5RTC_TechSupport/master/W5CAPI/docs/images/audiocall.jpg)

- After starting the audio call, remember to watch out for browser pop up to allow access to you system’s camera and micro phone in both Caller and Callee window. This is the extra security provides to ask permission to use your camera and microphone.

    ![Home View](https://raw.githubusercontent.com/W5RTC/W5RTC_TechSupport/master/W5CAPI/docs/images/allow.jpg)
    
- Now both Caller and Callee are engaged in the audio call.

    ![Home View](https://raw.githubusercontent.com/W5RTC/W5RTC_TechSupport/master/W5CAPI/docs/images/audioend.jpg)
    
- To disconnect the call click End Audio.

### To run the video call:

- Open a browser and open the index file of the hosted directory. http://<domainName>/W5CAPI-Demo/index.html. The RTC Demo pane appears with the following list of features: Audio, Video, Chat, File Transfer, and Screen Sharing.

    ![Home View](https://raw.githubusercontent.com/W5RTC/W5RTC_TechSupport/master/W5CAPI/docs/images/capimenu.jpg)

- Click Video. The steps here after is same as explained in audio call Step 2 to Step 7 except the Video communication window looks differently as shown in figure below.

    ![Home View](https://raw.githubusercontent.com/W5RTC/W5RTC_TechSupport/master/W5CAPI/docs/images/videonew.jpg)

### To run the chat:

- Open a browser and open the index file of the hosted directory.
<Hosting space directory>/W5CAPI-Demo/index.html. The RTC Demo pane appears with the following list of features: Audio, Video, Chat, File Transfer, and Screen Sharing.

    ![Home View](https://raw.githubusercontent.com/W5RTC/W5RTC_TechSupport/master/W5CAPI/docs/images/capimenu.jpg)
    
- Click Chat. The steps here after is same as explained in audio call Step 2 to Step 7 except the Chat communication window looks differently as depicted in the following steps.

- When the Callee/Caller opens the URL in browser, he/she finds the chat window.

    ![Home View](https://raw.githubusercontent.com/W5RTC/W5RTC_TechSupport/master/W5CAPI/docs/images/chat1.jpg)
    
- Both Caller and Callee enter their respective names inside the text box Enter Your Name as shown below.

    ![Home View](https://raw.githubusercontent.com/W5RTC/W5RTC_TechSupport/master/W5CAPI/docs/images/chat2.jpg)
    
- Now both Caller and Callee can chat with each other.

    ![Home View](https://raw.githubusercontent.com/W5RTC/W5RTC_TechSupport/master/W5CAPI/docs/images/chat3.jpg)
    
### To run file transfer:

- Open a browser and open the index file of the hosted directory.<hosting space directory>/W5CAPI-Demo/index.html. The RTC Demo pane appears with the following list of features: Audio, Video, Chat, File Transfer, and Screen Sharing.

    ![Home View](https://raw.githubusercontent.com/W5RTC/W5RTC_TechSupport/master/W5CAPI/docs/images/capimenu.jpg)
    
- Click File Transfer. The initial steps are similar to the earlier explained steps with the difference of the screen as depicted below for file transfer.

    ![Home View](https://raw.githubusercontent.com/W5RTC/W5RTC_TechSupport/master/W5CAPI/docs/images/trans1.jpg)
    
- Click Upload File, and browse and select the file that you want to transfer.
The Callee can see the file in his/her file transfer window available for download. The Callee can download the file clicking Download file button.

    ![Home View](https://raw.githubusercontent.com/W5RTC/W5RTC_TechSupport/master/W5CAPI/docs/images/trans2.jpg)
    
### To run screen sharing:

- Open a browser and open the index file of the hosted directory.<hosting space directory>/W5CAPI-Demo/index.html. The RTC Demo pane appears with the following list of features: Audio, Video, Chat, File Transfer, and Screen Sharing.

    ![Home View](https://raw.githubusercontent.com/W5RTC/W5RTC_TechSupport/master/W5CAPI/docs/images/capimenu.jpg)
    
- Click Screen Sharing. The initial steps are similar to the earlier explained steps with the difference of the screen as depicted below for screen sharing.

    ![Home View](https://raw.githubusercontent.com/W5RTC/W5RTC_TechSupport/master/W5CAPI/docs/images/share1.jpg)
    
    Note:	Screen sharing can only work with SSL service. That is the URL must start with https:// and not http://.
    
