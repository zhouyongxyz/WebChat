var WebSocket = require('ws');
var WebSocketServer = require('ws').Server,
wss = new WebSocketServer({ port: 8181 });

var webClient,androidClient;
var androidClientNames = new Array();
var androidClientSockets = new Array();

wss.on('connection', function (ws) {
    console.log('client connected');
    ws.on('message', function (message) {
        console.log(message);
        //ws.send("return->"+message);

        if(message.indexOf("client-web") == 0 ) {
            webClient = ws;
        } else if(message.indexOf("client-android") == 0){
            //androidClient = ws;
            var dats = message.split("-");
            androidClientNames.push(dats[2]);
            androidClientSockets.push(ws);
        }
        if(message.indexOf("aimdevice") == 0) {
            var aimdevice = message.split("-")[1];
            console.log("aim device = " + aimdevice);
            for(var i=0;i<androidClientNames.length;i++) {
                if(androidClientNames[i] == aimdevice) {
                    console.log("aim device selected index = " + i);
                    androidClient = androidClientSockets[i];
                }
            }
        }
        if(message.indexOf("web-getdevice") == 0) {
            var devicenames = "device:";
            for(var i=0;i<androidClientNames.length;i++) {
                devicenames += androidClientNames[i]+":";
            }
            ws.send(devicenames);
        }
        if(ws == webClient && androidClient != null && androidClient.readyState == WebSocket.OPEN){
            androidClient.send(message);
        } else if(ws == androidClient && webClient != null && webClient.readyState == WebSocket.OPEN) {
            webClient.send(message);
        }
        //wss.broadcast(message);
    });
});

//广播  
wss.broadcast = function broadcast(msg) {
    // console.log(ws);  
    // debugger;  
    wss.clients.forEach(function each(client) {  
        // if (typeof client.user != "undefined") {
           client.send(msg);
        // }  
    });  
};
