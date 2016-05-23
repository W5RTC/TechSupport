Folder Structure Conventions
============================

> Folder structure options and naming conventions for W5CAPI

### A typical top-level directory layout

    .
    ├── w5capi-Api               # Client Side API (lternatively `browser side`)
    ├── w5capi-Cloud             # Server Side  Code (lternatively `nodejs code`)
    ├── docs                    # Documentation files (alternatively `doc`)
    └── README.md

> `LICENSE`, `README.md`

### W5capi-API

     ├── documents              # Documentation files (alternatively `doc`)
     ├── modularFiles           # Separate files  for W5capi client side API     
     └── singleFile             #  Single file for W5capi client side API

> **documents**: [W5capi user guide](https://github.com/W5RTC/W5capi/blob/master/w5capi-Api/documents/w5capi%20User%20Guide-2016.doc) `doc`.

> **modularFiles**:

> List of Files:

File Name         | Type      | Description   |
--------------------|------------------|-----------------------|
|adapter.js | lib  | Third party library  |
common.js       | lib   | Third party library   |
EventEmitter.js  | lib      | Third party library       |
FileConverter.js      | src  | Convert DataURL to Blob Object for file share    |
FileReceiver.js          | src    | Emit file receive event and send file to callabck  |
FileSaver.js        | src     | Create Download anchor link using href tag  |
FileSender.js           | src     | Conver file to dataURL and slice dataURL for send        |
getMediaElement.js| src | Media tag element   |
|jquery.FSRTC.js| lib | Verto  
|jquery.jsonrpcclient.js| lib | Verto   |jquery.verto.js| [\^4] and [\^4]: | [^4] and footnote 4 
|jquerycookies.js| lib | verto
|jqueryjson.js| lib| verto
|screenShare.js| src | Check screen share extention installed and emit event
|TextReceiver.js| src | Receive Text message and emit message event
|TextSender.js| src | Send Text message
|w5capiVertoWrapper.js| src | Wrapper for verto client
|W5Peer.js| src | Handle signalling and callback event for w5capi API
|W5RTCWrapper.js| src | WebRTC wrapper for w5capi
|W5SIPEmitter.js| lib | Third party library
|W5SIPSingleFile.js| src | Single file for w5capi SIP(verto)

**Note:** 

  - lib - Thirdparty Library
  - src - W5capi API code

> **modularFiles**:
> List of Files:


File Name         | Type      | Description   |
--------------------|------------------|-----------------------|
|w5capi_v1.3.js | lib  | W5capi client side single file vertion 1.3  |
w5capi_v2.0.js       | lib   | client side single file vertion 1.3   |

### w5capi-Cloud

     ├── w5capiSIG              # Signalling server files (alternatively `server side`)
     
            


> **w5capiSIG**:
>  
    ├── routes                  # Pubsub redis server code (lternatively `nodejs code`)
    ├── configure.js            # Server Side  configuration file (lternatively `nodejs code`)
    ├── package.json            # NPM package version JSON file (alternatively `JSOn file`)
    └── w5_sigSever.js

>    **routes**:
>  
    ├── pubsubRedis.js                  # Pubsub redis server code (lternatively `nodejs code`)


