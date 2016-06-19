/*w5capi demo server*/
var express=require('express'),
    app=express(),
    http=require('http'),
    server=http.createServer(app);

app.use(express.static(__dirname+'/public'));


app.get('/',function(req,req){
    req.sendfile('views/index.html');
});

app.get('/video',function(req,req){
    req.sendfile('views/videowindow.html');
});


app.get('/audio',function(req,req){
    req.sendfile('views/voicewindow.html');
});

app.get('/chat',function(req,req){
    req.sendfile('views/chatwindow.html');
});

app.get('/file',function(req,req){
    req.sendfile('views/filetransferwindow.html');
});

app.get('/screen',function(req,req){
    req.sendfile('views/screensharingwindow.html');
});

app.get('/pstn',function(req,req){
    req.sendfile('views/pstnwindow.html');
});

server.listen(9090);
