var express=require('express'),
    app=express(),
    http=require('http'),
    server=http.createServer(app);




    app.use(express.static(__dirname+'/public'));




    
    app.get('/w5rtc',function(req,res){
     res.sendfile('views/w5rtc.html');
    });

 app.get('/capi',function(req,res){
     res.sendfile('views/w5capi.html');
    });
     

    server.listen(8181);
