document.getElementById('call_btn').disabled = true;
document.getElementById("endcall_btn").style.display = 'none';
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
    key: document.capikey,
    requestedService: 'sip'
  });

  // Generate Random string
  function getRandomString() {
    return (Math.random() * new Date().getTime()).toString(36).replace(/\./g, '');
  }
  var uid = getRandomString();
  window.params = params;
  window.params.caller = window.params.caller || w5capi.userid;
  window.params.callee = window.params.callee || uid;


  w5capi.setSIPVideo({
    remote: 'remoteaudio'
  })
  w5capi.registerUserWithId(window.params.caller);

  w5capiReady(function() {});


  w5capi.onSIPStatus(function(data) {
    console.error(data.event)
    if (data.event == 'trying') {
      document.getElementById('sip_status').innerHTML = "Trying....."

    } else if (data.event == 'sip_register') {
      document.getElementById('sip_status').innerHTML = "Registered"
      document.getElementById('call_btn').disabled = false;
    } else if (data.event == 'progress') {
      document.getElementById('call_btn').disabled = false;
      document.getElementById('sip_status').innerHTML = "Progress"
      document.getElementById("endcall_btn").style.display = 'block';
    } else if (data.event == 'connected') {


    } else if (data.event == 'hangup') {
      document.getElementById("endcall_btn").style.display = 'none';
      document.getElementById('call_btn').disabled = false;
      document.getElementById('sip_status').innerHTML = "Hangup";

    } else if (data.event == 'terminate') {


      document.getElementById("endcall_btn").style.display = 'none';
      document.getElementById('call_btn').disabled = false;
      document.getElementById('sip_status').innerHTML = "Hangup";

    }else if(data.event == 'connected'){
        document.getElementById('sip_status').innerHTML = "Connected";
    }
  })

 

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



  window.make_call = function() {

    if (document.getElementById('user_search').value) {
      document.getElementById('call_btn').disabled = true;
      w5capi.SIPCall({
        number: document.getElementById('user_search').value,
        video: false
      });
    }
  }
  
  
  window.end_call=function()
  {
      w5capi.SIPHangup();
  }





  var setUp = document.getElementById('starttalkdtndiv');

  // Setup Socket Connection by calling the openSignalingChannel function.


 

  w5capi.onSuccess(function(data) {
   
  });





  

  // End the call
  var callclose = document.getElementById('closecall');


}
